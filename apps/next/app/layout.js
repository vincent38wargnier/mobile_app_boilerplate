import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'My Temporalis',
  description: 'Transcendez les époques à travers votre carrière',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
} 