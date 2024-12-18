'use client'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Error</h1>
        <p className="text-xl mb-8">Something went wrong</p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
} 