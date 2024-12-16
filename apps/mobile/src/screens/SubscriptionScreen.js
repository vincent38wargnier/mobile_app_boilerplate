import React, { useEffect, useState } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import Purchases from 'react-native-purchases'
import { purchaseProduct } from '@subscription-app/shared-logic/payments'

export default function SubscriptionScreen() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const offerings = await Purchases.getOfferings()
      setProducts(offerings.current.availablePackages)
    } catch (error) {
      Alert.alert('Error', 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (product) => {
    try {
      const result = await purchaseProduct(product)
      if (result.success) {
        Alert.alert('Success', 'Purchase completed!')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      {products.map((product) => (
        <View key={product.identifier}>
          <Text>{product.product.title}</Text>
          <Text>{product.product.description}</Text>
          <Text>{product.product.priceString}</Text>
          <Button
            title="Purchase"
            onPress={() => handlePurchase(product)}
          />
        </View>
      ))}
    </View>
  )
} 