import Stripe from 'stripe'

export const createPaymentIntent = async ({ amount, currency = 'usd' }) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  
  return stripe.paymentIntents.create({
    amount,
    currency
  })
}

export const handleInAppPurchase = async (purchase) => {
  // Handle iOS/Android in-app purchase
} 