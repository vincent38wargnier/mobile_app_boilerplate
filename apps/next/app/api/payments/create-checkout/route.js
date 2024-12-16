import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import Stripe from 'stripe'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productId } = await request.json()
  
  await connectDB()
  const product = await Product.findById(productId)
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: product.type === 'subscription' ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price: product.stripePriceId,
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/canceled`,
    metadata: {
      productId: product._id.toString(),
      userId: session.user.id
    }
  })

  return NextResponse.json({ sessionId: checkoutSession.id })
} 