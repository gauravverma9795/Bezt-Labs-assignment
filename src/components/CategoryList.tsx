export default function CategoryList({ 
  categories, 
  selected, 
  onSelect 
}: { 
  categories: (string | null | undefined)[], 
  selected: string, 
  onSelect: (category: string) => void 
}) {
  return (
    <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide pb-2">
      <button
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          selected === '' 
            ? 'bg-yellow-btn text-black' 
            : 'bg-card-bg text-gray-400'
        }`}
        onClick={() => onSelect('')}
      >
        All
      </button>
      {categories.map((category, index) => {
        if (typeof category !== 'string' || !category) {
          return null; // Skip rendering invalid categories
        }
        return (
          <button
            key={index}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selected === category 
                ? 'bg-yellow-btn text-black' 
                : 'bg-card-bg text-gray-400'
            }`}
            onClick={() => onSelect(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
