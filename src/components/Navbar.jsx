import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleCart, selectCartCount } from '../store/cartSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          REDUX<span className="font-light">SHOP</span>
        </Link>

        {/* Nav links + cart */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Login
          </Link>

          {/* Cart button with badge */}
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            {/* Cart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 2.25h1.5l1.95 9.75m0 0h11.1l1.5-7.5H5.7m1.5 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>

            {/* Badge — only shows when cart has items */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar