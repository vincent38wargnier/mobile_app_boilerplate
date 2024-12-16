import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Subscription from '@/models/Subscription'

export async function GET(request) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const user = await User.findOne({ email: session.user.email })
    .populate('subscription')

  return NextResponse.json({ subscription: user.subscription })
}

export async function POST(request) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { plan, paymentProvider, paymentProviderId } = await request.json()

  const user = await User.findOne({ email: session.user.email })
  
  const subscription = await Subscription.create({
    userId: user._id,
    plan,
    status: 'active',
    startDate: new Date(),
    paymentProvider,
    paymentProviderId
  })

  user.subscription = subscription._id
  await user.save()

  return NextResponse.json({ subscription })
} 