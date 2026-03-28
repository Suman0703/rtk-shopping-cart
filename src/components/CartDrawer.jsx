import { useSelector, useDispatch } from 'react-redux'
import { toggleCart, selectCartIsOpen, selectCartItems, selectCartTotal, deleteItem, clearCart } from '../store/cartSlice'

const CartDrawer = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectCartIsOpen)
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => dispatch(toggleCart())}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Your Cart</h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-12">Your cart is empty</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 py-4 border-b border-gray-50">
                <img src={item.image} alt={item.title} className="w-14 h-14 object-contain" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 line-clamp-2">{item.title}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <button
                  onClick={() => dispatch(deleteItem(item.id))}
                  className="text-gray-300 hover:text-gray-500 text-sm self-start"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-700 transition-colors">
              Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full text-gray-400 text-xs mt-2 hover:text-gray-600"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer