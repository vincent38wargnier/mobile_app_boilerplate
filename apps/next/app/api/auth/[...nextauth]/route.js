import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

let isDbConnected = false

async function tryConnectDB() {
  if (isDbConnected) return true
  try {
    await connectDB()
    isDbConnected = true
    return true
  } catch (error) {
    console.warn('Database connection failed, running in offline mode')
    return false
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email',
          response_type: 'code',
        }
      },
      token: {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        params: { grant_type: 'authorization_code' },
      },
      userinfo: {
        url: 'https://api.linkedin.com/v2/userinfo',
        params: { format: 'json' },
      },
      issuer: 'https://www.linkedin.com/oauth',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider
        token.providerId = profile?.sub || profile?.id
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (!session?.user?.email) return session
      
      const isConnected = await tryConnectDB()
      if (!isConnected) {
        return {
          ...session,
          user: {
            ...session.user,
            role: 'user',
            provider: token.provider,
            providerId: token.providerId,
            accessToken: token.accessToken
          }
        }
      }
      
      try {
        const user = await User.findOne({ email: session.user.email })
          .select('_id role subscription')
          .lean()
          .maxTimeMS(2000)
        
        if (user) {
          session.user.id = user._id.toString()
          session.user.provider = token.provider
          session.user.providerId = token.providerId
          session.user.role = user.role || 'user'
          session.user.subscription = user.subscription
          session.user.accessToken = token.accessToken
        }
        return session
      } catch (error) {
        console.error('Session error:', error)
        return {
          ...session,
          user: {
            ...session.user,
            role: 'user'
          }
        }
      }
    },
    async signIn({ user, account, profile }) {
      if (!user?.email) return false
      
      const isConnected = await tryConnectDB()
      if (!isConnected) {
        return process.env.NODE_ENV === 'development'
      }
      
      try {
        const existingUser = await User.findOne({ email: user.email })
          .select('_id')
          .lean()
          .maxTimeMS(2000)
        
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            providerId: profile?.sub || profile?.id,
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
        return true
      } catch (error) {
        console.error('Sign in error:', error)
        return process.env.NODE_ENV === 'development'
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 