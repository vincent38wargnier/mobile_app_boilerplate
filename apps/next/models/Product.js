import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['one_time', 'subscription'],
    required: true
  },
  platform: {
    type: String,
    enum: ['web', 'ios', 'android', 'all'],
    default: 'all'
  },
  revenueCatId: {
    ios: String,
    android: String
  },
  stripeProductId: String,
  stripePriceId: String,
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema) 