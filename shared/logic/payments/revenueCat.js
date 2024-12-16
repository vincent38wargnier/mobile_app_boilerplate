import Purchases from 'react-native-purchases'
import { Platform } from 'react-native'

export const createRevenueCatPayment = async (product) => {
  try {
    const offerings = await Purchases.getOfferings()
    const productId = Platform.select({
      ios: product.revenueCatId.ios,
      android: product.revenueCatId.android
    })

    const { customerInfo } = await Purchases.purchaseProduct(productId)
    
    return {
      success: true,
      customerInfo,
      platform: Platform.OS
    }
  } catch (error) {
    console.error('RevenueCat purchase error:', error)
    throw error
  }
}

export const checkSubscriptionStatus = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    return customerInfo.activeSubscriptions.length > 0
  } catch (error) {
    console.error('RevenueCat status check error:', error)
    return false
  }
} 