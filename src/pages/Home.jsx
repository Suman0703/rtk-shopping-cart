import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectFilteredProducts, selectProductStatus } from '../store/productsSlice'
import HeroBanner from '../components/HeroBanner'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const status = useSelector(selectProductStatus)

  // Fetch products once when Home mounts
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div>
      <HeroBanner />
      <CategoryFilter />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Loading state */}
        {status === 'loading' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-72 rounded" />
            ))}
          </div>
        )}

        {/* Error state */}
        {status === 'failed' && (
          <p className="text-center text-red-500 py-20">
            Failed to load products. Please try again.
          </p>
        )}

        {/* Products grid */}
        {status === 'succeeded' && (
          <>
            <p className="text-sm text-gray-400 mb-6">{products.length} products</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Home