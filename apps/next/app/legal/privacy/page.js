export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto container-padding max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <section className="prose prose-lg">
          <h2>Collecte des Données</h2>
          <p>
            My Temporalis collecte uniquement les données nécessaires au fonctionnement du service :
            - Informations de profil professionnel
            - Adresse email
            - Données d'utilisation du service
          </p>

          <h2>Utilisation des Données</h2>
          <p>
            Vos données sont utilisées pour :
            - Générer votre analyse historique
            - Améliorer nos algorithmes
            - Vous contacter concernant le service
          </p>

          <h2>Protection des Données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données :
            - Chiffrement des données
            - Accès restreint
            - Suppression automatique après traitement
          </p>

          <h2>Vos Droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
            - Accès à vos données
            - Rectification
            - Suppression
            - Opposition au traitement
          </p>
        </section>
      </div>
    </div>
  );
} 