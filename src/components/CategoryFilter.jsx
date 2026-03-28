import { useSelector, useDispatch } from 'react-redux'
import { setCategory, selectCategories, selectActiveCategory } from '../store/productsSlice'

const CategoryFilter = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const activeCategory = useSelector(selectActiveCategory)

  return (
    // Added sticky positioning. top-16 ensures it sits exactly right below your 4rem (h-16) Navbar!
    <div className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-16 z-40">
      
      {/* Container aligned with Hero and Product Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* - scrollbar-hide (assuming you have the tailwind plugin, otherwise it just uses native scrolling)
          - snap-x added for a smoother mobile swiping experience
        */}
        <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide snap-x pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`snap-start px-3 sm:px-5 py-3 sm:py-4 text-sm capitalize whitespace-nowrap border-b-2 transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-gray-900 text-gray-900 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
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