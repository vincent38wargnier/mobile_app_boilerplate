import Link from 'next/link'
import FeatureCard from '@/components/features/FeatureCard'
import { EPOCHS } from '@/lib/constants'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">MY TEMPORALIS</h1>
        <p className="text-xl mb-8">Transcendez les époques à travers votre carrière</p>
        <Link href="/auth/signin" className="btn-primary">
          Commencer l'Odyssée
        </Link>
      </header>

      <section className="bg-gray-800/50 py-16">
        <div className="container mx-auto container-padding">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explorez Les Grandes Époques de l'Histoire
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {EPOCHS.map((epoch) => (
              <FeatureCard key={epoch.title} {...epoch} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto container-padding text-center">
          <nav className="flex justify-center space-x-6 mb-4">
            {['cgv', 'cgu', 'privacy'].map((page) => (
              <Link 
                key={page}
                href={`/legal/${page}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {page.toUpperCase()}
              </Link>
            ))}
          </nav>
          <p className="text-gray-500">© 2024 My Temporalis. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
} 