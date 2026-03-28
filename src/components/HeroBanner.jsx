import { Link } from 'react-router-dom'

const HeroBanner = () => {
  return (
    <div className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 pointer-events-none" />

      {/* Reduced padding: 
        Was py-16 sm:py-24 lg:py-28 
        Now py-10 sm:py-12 lg:py-16 
      */}
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 flex flex-col items-start gap-3 sm:gap-4">
        
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-400 uppercase mb-1">
          New Collection 2026
        </span>
        
        {/* Scaled down heading sizes from 6xl to 5xl max */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-sm sm:max-w-lg lg:max-w-2xl">
          Shop Everything.<br />
          <span className="font-light text-gray-400">All in one place.</span>
        </h1>
        
        {/* Kept text small and tightened the max-width */}
        <p className="text-sm text-gray-400 max-w-xs sm:max-w-md leading-relaxed mt-1">
          Discover thousands of products across all categories. 
          Fresh arrivals added daily.
        </p>
        
        <Link
          to="/"
          // Slimmed down the button slightly to match the compact vibe
          className="bg-white text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-bold sm:font-medium hover:bg-gray-100 active:scale-95 transition-all mt-3 shadow-sm rounded-sm"
        >
          Shop Now
        </Link>
        
      </div>
    </div>
  )
}

export default HeroBanner