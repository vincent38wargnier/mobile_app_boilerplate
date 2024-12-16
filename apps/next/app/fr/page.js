import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link 
        href="/fr/auth/signin" 
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Commencer l'Odyssée
      </Link>

      <div className="flex justify-center space-x-4 mb-4">
        <Link href="/fr/legal/cgv" className="hover:text-blue-400">CGV</Link>
        <Link href="/fr/legal/cgu" className="hover:text-blue-400">CGU</Link>
        <Link href="/fr/legal/privacy" className="hover:text-blue-400">Confidentialité</Link>
      </div>
    </div>
  )
} 