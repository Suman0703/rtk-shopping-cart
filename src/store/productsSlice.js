import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// createAsyncThunk takes 2 arguments:
// 1. action name string
// 2. async function that returns the data
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return data  // this becomes action.payload in fulfilled
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    activeCategory: 'all',
  },
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload
    },
  },

  // extraReducers handles the 3 async states
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload  // the products array from API
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setCategory } = productsSlice.actions

// Selectors
export const selectAllProducts = state => state.products.items
export const selectProductStatus = state => state.products.status
export const selectActiveCategory = state => state.products.activeCategory
export const selectCategories = state => {
  const cats = state.products.items.map(p => p.category)
  return ['all', ...new Set(cats)]
}
export const selectFilteredProducts = state => {
  const { items, activeCategory } = state.products
  if (activeCategory === 'all') return items
  return items.filter(p => p.category === activeCategory)
}

export default productsSlice.reducer