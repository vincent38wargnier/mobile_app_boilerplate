import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose || { conn: null, promise: null }
if (process.env.NODE_ENV === 'development') {
  if (!global.mongoose) {
    global.mongoose = cached
  }
}

// Connection options
const options = {
  bufferCommands: false,
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 60000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  heartbeatFrequencyMS: 5000,
  retryWrites: true,
  w: 'majority'
}

/**
 * Handles database connection events and logging
 * @param {mongoose.Connection} connection
 */
function handleConnectionEvents(connection) {
  connection.on('connected', () => {
    console.log('MongoDB connected successfully')
  })

  connection.on('error', (error) => {
    console.error('MongoDB connection error:', error)
  })

  connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
  })

  // Handle process termination
  process.on('SIGINT', async () => {
    await connection.close()
    process.exit(0)
  })
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true)
    
    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => {
        handleConnectionEvents(mongoose.connection)
        return mongoose
      })
      .catch((error) => {
        cached.promise = null
        console.error('MongoDB connection error:', error)
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
} 