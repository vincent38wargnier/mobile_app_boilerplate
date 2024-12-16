import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'trial'],
    default: 'inactive'
  },
  plan: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true
  },
  startDate: Date,
  endDate: Date,
  trialEndsAt: Date,
  paymentProvider: {
    type: String,
    enum: ['stripe', 'apple', 'google'],
    required: true
  },
  paymentProviderId: String
}, {
  timestamps: true
})

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema) 