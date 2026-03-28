import { configureStore } from '@reduxjs/toolkit'

// We'll import slices here later — for now the store is empty
export const store = configureStore({
  reducer: {
    // cart: cartReducer      ← will add in Step 4
    // products: productsReducer  ← will add in Step 6
    // auth: authReducer      ← will add in Step 9
  },
})