import { useSelector, useDispatch } from 'react-redux'
import { setCategory, selectCategories, selectActiveCategory } from '../store/productsSlice'

const CategoryFilter = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const activeCategory = useSelector(selectActiveCategory)

  return (
    <div className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`px-5 py-4 text-sm capitalize whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === cat
                  ? 'border-gray-900 text-gray-900 font-medium'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter