export default function Button({ children, variant = 'primary', ...props }) {
  const baseStyles = "px-6 py-3 rounded-lg transition-colors"
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
} 