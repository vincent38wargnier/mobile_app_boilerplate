import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
})

export const subscriptionSchema = z.object({
  status: z.enum(['active', 'inactive', 'trial']),
  expiresAt: z.string().datetime(),
}) 