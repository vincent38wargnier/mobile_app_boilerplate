'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function NavMenu() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Temporalis
        </Link>
        <div className="space-x-4">
          {status === "loading" ? (
            <div className="animate-pulse bg-gray-700 h-8 w-24 rounded" />
          ) : session ? (
            <>
              <Link href="/profile" className="hover:text-gray-300">
                {session.user.name}
              </Link>
              <button
                onClick={() => signOut({ 
                  callbackUrl: '/',
                  redirect: true
                })}
                className="hover:text-gray-300"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="hover:text-gray-300">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 