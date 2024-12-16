import AsyncStorage from '@react-native-async-storage/async-storage'

export const storage = {
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('Error reading from storage:', error)
      return null
    }
  },
  
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to storage:', error)
    }
  },
  
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from storage:', error)
    }
  }
} 