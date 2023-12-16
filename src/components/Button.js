export function Button({ onClick, disabled, size, scheme, children}) {
  const sizeClasses = { 
    'lg': 'px-4 py-2 text-lg', 
    'md': 'px-3 py-1.5 text-md', 
    'sm': 'px-2 py-1 text-sm' }
  
  const schemeClasses = { 
    'primary': 'bg-indigo-500 hover:bg-indigo-600 border-transparent text-white focus-visible:outline-indigo-600', 
    'secondary': 'bg-transparent text-gray-700 border-indigo-500 hover:bg-gray-50 focus-visible:outline-indigo-600',
    'muted': 'bg-transparent text-gray-600 border-gray-400 hover:bg-gray-50 focus-visible:outline-gray-600',
    'disabled': 'bg-indigo-100 text-gray-500 border-transparent cursor-not-allowed'
  }

  const sizeClass = sizeClasses[size] || sizeClasses['md']
  let schemeClass = schemeClasses[scheme] || schemeClasses['primary'];
  if(disabled) schemeClass = schemeClasses['disabled'];

  return (
    <button
      type="button"
      className={`rounded ${sizeClass} ${schemeClass} font-medium shadow-sm border`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}