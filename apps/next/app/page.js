import { getServerSession } from "next-auth/next"

export default async function Home() {
  const session = await getServerSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Subscription App
        </h1>
        
        {session ? (
          <div>
            <p>Signed in as {session.user.email}</p>
            <a 
              href="/api/auth/signout"
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 inline-block"
            >
              Sign out
            </a>
          </div>
        ) : (
          <a 
            href="/api/auth/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign in
          </a>
        )}
      </div>
    </div>
  )
} 