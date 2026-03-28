import { Link } from 'react-router-dom'

const HeroBanner = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-start gap-6">
        <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
          New Collection 2024
        </span>
        <h1 className="text-5xl font-bold leading-tight max-w-lg">
          Shop Everything.<br />
          <span className="font-light text-gray-400">All in one place.</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
          Discover thousands of products across all categories. 
          Fresh arrivals added daily.
        </p>
        <Link
          to="/"
          className="bg-white text-gray-900 px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}

export default HeroBanner