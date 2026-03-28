import { useSelector, useDispatch } from 'react-redux'
import { toggleCart, selectCartIsOpen, selectCartItems, selectCartTotal, deleteItem, clearCart } from '../store/cartSlice'

const CartDrawer = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectCartIsOpen)
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  // Notice we removed `if (!isOpen) return null`. 
  // We need the HTML to always exist so we can animate it sliding in and out!

  return (
    // An invisible wrapper that blocks interactions when closed
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
      
      {/* Backdrop - Fades in */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => dispatch(toggleCart())}
        aria-hidden="true"
      />

      {/* Drawer - Slides in from the right
          - Mobile: Takes up 90% of the screen width (w-[90vw])
          - Desktop: Caps out at a nice readable size (max-w-md or sm:w-96)
      */}
      <div 
        className={`absolute top-0 right-0 h-full w-[90vw] sm:w-96 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="text-gray-400 hover:text-red-500 text-2xl leading-none p-2 -mr-2 transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <span className="text-4xl">🛒</span>
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center group">
                  
                  {/* Image container with background */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 p-2 flex-shrink-0 border border-gray-100 rounded-md">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p className="text-xs sm:text-sm text-gray-800 line-clamp-2 font-medium leading-snug">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-gray-900 mt-auto">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => dispatch(deleteItem(item.id))}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 pb-8 sm:pb-6">
            <div className="flex justify-between items-end mb-4 sm:mb-6">
              <span className="text-sm text-gray-500">Estimated Total</span>
              <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-gray-900 text-white py-4 sm:py-3 text-sm font-bold shadow-md hover:bg-black active:scale-[0.98] transition-all rounded-sm">
              Proceed to Checkout
            </button>
            
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full text-gray-400 text-xs mt-3 sm:mt-4 hover:text-gray-600 underline underline-offset-2 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default CartDrawer