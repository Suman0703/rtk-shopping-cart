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

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div>
      <HeroBanner />
      <CategoryFilter />

      {/* Balanced 1600px Wrapper */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12">

        {/* Loading state */}
        {status === 'loading' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-64 sm:h-72 rounded-md" />
            ))}
          </div>
        )}

        {/* Error state */}
        {status === 'failed' && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-500 font-medium bg-red-50 px-6 py-4 rounded-md">
              Failed to load products. Please try again.
            </p>
          </div>
        )}

        {/* Products grid */}
        {status === 'succeeded' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-medium text-gray-500">{products.length} products</p>
            </div>
            
            {/* Capped at 5 columns with larger gaps */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
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