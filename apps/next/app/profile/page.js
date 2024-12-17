import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Mon Profil</h1>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            {session.user.image && (
              <img 
                src={session.user.image} 
                alt={session.user.name}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{session.user.name}</h2>
              <p className="text-gray-400">{session.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 