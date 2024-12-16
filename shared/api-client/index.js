import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL: API_URL,
})

export const fetchAuth = async () => {
  return api.get('/api/auth/session')
}

export const fetchSubscriptionStatus = async () => {
  return api.get('/api/subscriptions')
} 