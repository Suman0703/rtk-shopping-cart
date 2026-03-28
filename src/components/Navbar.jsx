import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { toggleCart, selectCartCount } from '../store/cartSlice'
import { selectIsLoggedIn, selectUser, logout } from '../store/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation() // Helpful to close mobile menu on route change
  const cartCount = useSelector(selectCartCount)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)

  // Local state for the mobile hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Helper to close the menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Container - Expanded max-w to match our Home page layout */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left side: Mobile Menu Button + Logo */}
        <div className="flex items-center gap-4">
          
          {/* Hamburger Icon (Mobile Only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="text-xl font-bold tracking-tight text-gray-900 flex-shrink-0">
            REDUX<span className="font-light">SHOP</span>
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Home
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">
                Hi, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={() => {
                  dispatch(logout())
                  closeMenu()
                }}
                className="text-sm font-medium text-gray-400 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Login
            </Link>
          )}
        </div>

        {/* Right side: Cart Button (Always Visible) */}
        <div className="flex items-center">
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 -mr-2 hover:bg-gray-50 rounded-md transition-colors group"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 2.25h1.5l1.95 9.75m0 0h11.1l1.5-7.5H5.7m1.5 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
            
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-gray-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown (Visible only when isMenuOpen is true on sm screens) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg pb-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          
          <Link 
            to="/" 
            onClick={closeMenu}
            className="block py-3 text-base font-medium text-gray-900 border-b border-gray-50"
          >
            Home
          </Link>

          {isLoggedIn ? (
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-sm text-gray-500 px-1">
                Signed in as <span className="font-semibold text-gray-900">{user?.name}</span>
              </span>
              <button
                onClick={() => {
                  dispatch(logout())
                  closeMenu()
                }}
                className="w-full text-left py-3 text-base font-medium text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              onClick={closeMenu}
              className="block py-3 text-base font-medium text-gray-900"
            >
              Login to your account
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar