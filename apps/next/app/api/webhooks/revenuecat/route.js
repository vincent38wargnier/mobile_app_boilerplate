import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Subscription from '@/models/Subscription'

export async function POST(request) {
  const event = await request.json()
  
  await connectDB()

  switch (event.type) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
      const { app_user_id, product_id, purchase_date } = event
      
      const user = await User.findById(app_user_id)
      if (!user) break

      await Subscription.findOneAndUpdate(
        { userId: user._id },
        {
          status: 'active',
          plan: product_id.includes('yearly') ? 'yearly' : 'monthly',
          startDate: new Date(purchase_date),
          paymentProvider: event.platform,
          paymentProviderId: event.transaction_id
        },
        { upsert: true }
      )
      break

    case 'CANCELLATION':
    case 'EXPIRATION':
      await Subscription.findOneAndUpdate(
        { paymentProviderId: event.transaction_id },
        { status: 'inactive', endDate: new Date() }
      )
      break
  }

  return NextResponse.json({ received: true })
} 