import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request) {
  try {
    const { code, redirectUri } = await request.json()

    if (!code || !redirectUri) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // Exchange code for token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error('LinkedIn token error:', error)
      return Response.json({ error: 'Failed to exchange code for token' }, { status: 401 })
    }

    const { access_token } = await tokenResponse.json()

    // Get user profile using OpenID Connect userinfo endpoint
    const userInfoResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      const error = await userInfoResponse.text()
      console.error('LinkedIn profile error:', error)
      return Response.json({ error: 'Failed to get user profile' }, { status: 401 })
    }

    const userInfo = await userInfoResponse.json()

    // Connect to database
    await connectDB()

    // Check if user exists
    const existingUser = await User.findOne({ email: userInfo.email })
      .select('_id role subscription')
      .lean()

    let userId = existingUser?._id

    if (!existingUser) {
      // Create new user
      const newUser = await User.create({
        email: userInfo.email,
        name: userInfo.name,
        image: userInfo.picture,
        provider: 'linkedin',
        providerId: userInfo.sub,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      userId = newUser._id
    }

    return Response.json({
      user: {
        id: userId.toString(),
        email: userInfo.email,
        name: userInfo.name,
        image: userInfo.picture,
        role: existingUser?.role || 'user',
        subscription: existingUser?.subscription,
        provider: 'linkedin',
        providerId: userInfo.sub,
      },
      accessToken: access_token,
    })
  } catch (error) {
    console.error('Mobile LinkedIn auth error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
} 