import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  image: String,
  provider: {
    type: String,
    enum: ['google', 'linkedin'],
    required: true
  },
  providerId: String,
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema) 