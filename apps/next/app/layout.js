import './globals.css'
import { Providers } from './providers'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import NavMenu from '@/components/ui/NavMenu'

export const metadata = {
  title: 'My Temporalis',
  description: 'Transcendez les époques à travers votre carrière',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  
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