import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB()
      
      const existingUser = await User.findOne({ email: user.email })
      
      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account.provider,
          providerId: account.providerAccountId
        })
      }
      
      return true
    },
    async session({ session, token }) {
      await connectDB()
      const user = await User.findOne({ email: session.user.email })
        .populate('subscription')
      
      session.user.id = user._id
      session.user.subscription = user.subscription
      
      return session
    },
  },
})

export { handler as GET, handler as POST } 