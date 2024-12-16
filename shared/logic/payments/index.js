import { Platform } from 'react-native'
import Purchases from 'react-native-purchases'
import { createStripePayment } from './stripe'
import { createRevenueCatPayment } from './revenueCat'

export const initializePayments = async () => {
  if (Platform.OS === 'web') {
    // Initialize Stripe
    return
  }

  // Initialize RevenueCat
  await Purchases.configure({
    apiKey: Platform.select({
      ios: process.env.REVENUECAT_IOS_KEY,
      android: process.env.REVENUECAT_ANDROID_KEY
    })
  })
}

export const purchaseProduct = async (product, userId) => {
  if (Platform.OS === 'web') {
    return createStripePayment(product, userId)
  }
  
  return createRevenueCatPayment(product)
}

export const validateReceipt = async (receipt, platform) => {
  switch (platform) {
    case 'ios':
      return Purchases.validateIOSReceipt(receipt)
    case 'android':
      return Purchases.validateAndroidReceipt(receipt)
    default:
      throw new Error('Invalid platform')
  }
} 