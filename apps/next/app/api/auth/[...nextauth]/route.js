import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
        token.providerId = profile.sub
      }
      return token
    },
    async session({ session, token }) {
      try {
        await connectDB()
        const user = await User.findOne({ email: session.user.email })
        if (user) {
          session.user.id = user._id.toString()
          session.user.provider = token.provider
          session.user.providerId = token.providerId
        }
        return session
      } catch (error) {
        console.error('Session error:', error)
        return session
      }
    },
    async signIn({ user, account, profile }) {
      try {
        await connectDB()
        const existingUser = await User.findOne({ email: user.email })
        
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            providerId: profile.sub,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
        return true
      } catch (error) {
        console.error('Sign in error:', error)
        return true
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST } 