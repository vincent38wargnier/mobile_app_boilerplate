import './globals.css'
import { Providers } from './providers'
import { getServerSession } from 'next-auth'
import NavMenu from '@/components/ui/NavMenu'
import { authOptions } from './api/auth/[...nextauth]/route'

export const metadata = {
  title: 'My Temporalis',
  description: 'Transcendez les époques à travers votre carrière',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="fr">
      <body>
        <Providers session={session}>
          <NavMenu />
          {children}
        </Providers>
      </body>
    </html>
  )
} 