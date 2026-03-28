import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  // Safe fallbacks in case the API data is missing fields
  const ratingRate = product?.rating?.rate || 0;
  const ratingCount = product?.rating?.count || 0;
  const price = product?.price || 0;

  return (
    <div className="group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full rounded-md overflow-hidden">

      {/* Image Container */}
      <div className="relative p-4 sm:p-6 bg-gray-50/50 flex items-center justify-center h-40 sm:h-48 md:h-56">
        <img
          src={product?.image}
          alt={product?.title || 'Product Image'}
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        
        {product?.category && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[10px] sm:text-xs font-mono text-gray-500 capitalize bg-white/90 backdrop-blur-sm px-2 py-1 border border-gray-100 shadow-sm rounded-sm">
            {product.category}
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-snug flex-1">
          {product?.title}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-auto pt-1">
          <span className="text-yellow-400 text-[10px] sm:text-xs tracking-tighter">
            {'★'.repeat(Math.round(ratingRate))}
            <span className="text-gray-200">
              {'★'.repeat(Math.max(0, 5 - Math.round(ratingRate)))}
            </span>
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 ml-1">({ratingCount})</span>
        </div>

        {/* Price + Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1 pt-3 border-t border-gray-50">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          
          <button
            onClick={() => dispatch(addItem({
              id: product.id,
              title: product.title,
              price: price,
              image: product.image,
            }))}
            className="w-full sm:w-auto text-xs font-bold bg-gray-900 text-white px-4 py-2.5 sm:py-2 rounded-sm hover:bg-gray-800 active:scale-95 transition-all shadow-sm"
          >
            Add <span className="hidden sm:inline">to cart</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard