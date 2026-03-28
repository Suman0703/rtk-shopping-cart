import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col">

      {/* Image */}
      <div className="relative p-6 bg-gray-50 flex items-center justify-center h-52">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 text-xs font-mono text-gray-400 capitalize bg-white px-2 py-1 border border-gray-100">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-sm text-gray-700 line-clamp-2 leading-snug flex-1">
          {product.title}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(product.rating.rate))}</span>
          <span className="text-xs text-gray-400">({product.rating.count})</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-base font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch(addItem({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            }))}
            className="text-xs bg-gray-900 text-white px-4 py-2 hover:bg-gray-700 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard