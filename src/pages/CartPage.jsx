import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  addItem,
  removeItem,
  deleteItem,
  clearCart,
} from '../store/cartSlice'

const CartPage = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const count = useSelector(selectCartCount)

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 flex flex-col items-center gap-4 sm:gap-6 text-center">
        <p className="text-5xl sm:text-6xl">🛒</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 text-sm">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="bg-gray-900 text-white px-6 sm:px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors mt-2"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Page header */}
      <div className="flex flex-row items-baseline justify-between mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Your Cart
          <span className="text-gray-400 font-normal ml-2 sm:ml-3 text-lg sm:text-2xl">({count} items)</span>
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-xs sm:text-sm text-gray-400 hover:text-red-500 transition-colors underline-offset-4 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

        {/* Cart items — left side */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(item => (
            <div
              key={item.id}
              // Changed to flex-col on mobile, flex-row on SM and up
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 bg-white border border-gray-100 hover:border-gray-200 transition-colors relative"
            >
              
              {/* Mobile Delete Button (Absolute positioned on top right) */}
              <button
                onClick={() => dispatch(deleteItem(item.id))}
                className="sm:hidden absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1"
                aria-label="Remove item"
              >
                ✕
              </button>

              {/* Product image */}
              <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-50 flex items-center justify-center flex-shrink-0 p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Product info */}
              <div className="flex-1 flex flex-col gap-2">
                {/* Adjusted line-clamp and right padding to avoid overlapping the mobile delete button */}
                <p className="text-sm font-medium sm:font-normal text-gray-900 sm:text-gray-700 leading-snug line-clamp-2 pr-6 sm:pr-0">
                  {item.title}
                </p>
                <p className="text-sm sm:text-xs text-gray-500">
                  ${item.price.toFixed(2)} <span className="hidden sm:inline">each</span>
                </p>

                {/* Bottom row: Quantity controls + Total Price (Mobile only) */}
                <div className="flex items-center justify-between sm:justify-start gap-3 mt-auto pt-2 sm:pt-0 border-t sm:border-0 border-gray-50">
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="w-8 h-8 sm:w-7 sm:h-7 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm flex items-center justify-center rounded-sm"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addItem({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        image: item.image,
                      }))}
                      className="w-8 h-8 sm:w-7 sm:h-7 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm flex items-center justify-center rounded-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Mobile Item Total */}
                  <p className="text-sm font-bold text-gray-900 sm:hidden">
                     ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Desktop: Item total + delete */}
              <div className="hidden sm:flex flex-col items-end justify-between min-w-[80px]">
                <button
                  onClick={() => dispatch(deleteItem(item.id))}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg"
                >
                  ✕
                </button>
                <p className="text-sm font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Order summary — right side */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-100 p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-base font-bold text-gray-900 mb-4 sm:mb-6">
              Order Summary
            </h2>

            {/* Line items - Hidden on mobile to save space, visible on tablet+ */}
            <div className="hidden sm:flex flex-col gap-3 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-500 line-clamp-1 flex-1 pr-2">
                    {item.title.slice(0, 22)}… <span className="text-gray-400 font-mono text-xs">x{item.quantity}</span>
                  </span>
                  <span className="text-gray-700 font-medium flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 sm:border-t-2 pt-4 mb-6">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-700 font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-4 sm:py-3 text-sm font-bold sm:font-medium hover:bg-black transition-all active:scale-[0.98] mb-4 shadow-sm">
              Checkout
            </button>
            <Link
              to="/"
              className="block text-center text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartPage