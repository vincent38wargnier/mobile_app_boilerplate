import './globals.css'

export const metadata = {
  title: 'My Temporalis',
  description: 'Transcendez les époques à travers votre carrière',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
} 