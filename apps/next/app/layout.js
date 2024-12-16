import './globals.css'

export const metadata = {
  title: 'Subscription App',
  description: 'A cross-platform subscription application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 