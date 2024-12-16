import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const createStripePayment = async (product, userId) => {
  const stripe = await stripePromise
  
  const response = await fetch('/api/payments/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId: product._id,
      userId
    }),
  })

  const { sessionId } = await response.json()
  
  return stripe.redirectToCheckout({
    sessionId
  })
} 