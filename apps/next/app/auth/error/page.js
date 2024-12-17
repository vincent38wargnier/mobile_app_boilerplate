'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Erreur d'authentification</h1>
        <p className="text-lg mb-8">
          {error === 'AccessDenied' 
            ? "L'accès a été refusé. Veuillez vérifier vos autorisations."
            : "Une erreur s'est produite lors de la connexion."}
        </p>
        <div className="space-y-4">
          <Link 
            href="/auth/signin"
            className="block w-full py-3 px-4 rounded-md bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Réessayer
          </Link>
          <Link 
            href="/"
            className="block w-full py-3 px-4 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
} 