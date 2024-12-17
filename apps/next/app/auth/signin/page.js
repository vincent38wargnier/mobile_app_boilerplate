'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 text-center text-white">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Connectez-vous à My Temporalis
        </h2>
        <div>
          <button
            onClick={() => signIn('google', { 
              callbackUrl: '/',
              redirect: true
            })}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Se connecter avec Google
          </button>
        </div>
      </div>
    </div>
  );
} 