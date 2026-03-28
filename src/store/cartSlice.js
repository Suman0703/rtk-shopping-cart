import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],      // each item: { id, title, price, image, quantity }
    isOpen: false,  // cart drawer open or closed
  },
  reducers: {

    // Add item — if already in cart, just increase quantity
    addItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.quantity += 1   // Immer lets us mutate directly!
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Remove one quantity, delete if reaches 0
    removeItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload)
      if (existing.quantity > 1) {
        existing.quantity -= 1
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
      }
    },

    // Delete item completely
    deleteItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },

    // Empty the cart
    clearCart(state) {
      state.items = []
    },

    // Toggle cart drawer open/close
    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
  },
})

// Export actions — used in components with dispatch()
export const { addItem, removeItem, deleteItem, clearCart, toggleCart } = cartSlice.actions

// Export selectors — used in components with useSelector()
export const selectCartItems = state => state.cart.items
export const selectCartIsOpen = state => state.cart.isOpen
export const selectCartCount = state => state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartTotal = state => state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

// Export reducer — used in store.js
export default cartSlice.reducer