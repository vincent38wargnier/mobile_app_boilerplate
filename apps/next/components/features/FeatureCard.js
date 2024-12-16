export default function FeatureCard({ emoji, title, description }) {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg hover:bg-gray-700 transition-colors">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
} 