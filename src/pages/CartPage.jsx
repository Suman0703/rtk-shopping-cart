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
      <div className="max-w-6xl mx-auto px-6 py-32 flex flex-col items-center gap-6">
        <p className="text-6xl">🛒</p>
        <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-400 text-sm">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="bg-gray-900 text-white px-8 py-3 text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Page header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Cart
          <span className="text-gray-300 font-light ml-3 text-2xl">({count} items)</span>
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Cart items — left side */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex gap-5 p-5 bg-white border border-gray-100 hover:border-gray-200 transition-colors"
            >
              {/* Product image */}
              <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0 p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product info */}
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-sm text-gray-700 leading-snug line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">
                  ${item.price.toFixed(2)} each
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="w-7 h-7 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm flex items-center justify-center"
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
                    className="w-7 h-7 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Item total + delete */}
              <div className="flex flex-col items-end justify-between">
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
          <div className="bg-gray-50 border border-gray-100 p-6 sticky top-24">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Line items */}
            <div className="flex flex-col gap-3 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-500 line-clamp-1 flex-1 pr-2">
                    {item.title.slice(0, 22)}… ×{item.quantity}
                  </span>
                  <span className="text-gray-700 font-medium flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-700">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-base mt-4">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-700 transition-colors mb-3">
              Checkout
            </button>
            <Link
              to="/"
              className="block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
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