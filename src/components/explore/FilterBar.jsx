import { Search, SlidersHorizontal } from 'lucide-react';

const FilterBar = ({ 
  searchQuery, setSearchQuery, 
  activeCategory, setActiveCategory, 
  activeBudget, setActiveBudget, 
  sortBy, setSortBy 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center flex-1 w-full transition-all">
      {/* Search Input */}
      <div className="relative flex-1 w-full group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Where to next?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent dark:border-gray-800 rounded-2xl focus:bg-white dark:focus:bg-gray-800 focus:border-primary dark:focus:border-secondary outline-none transition-all dark:text-white font-bold placeholder:text-gray-400 shadow-sm"
        />
      </div>

      {/* Filters Container */}
      <div className="flex w-full md:w-auto gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide items-center">
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hidden lg:block border border-gray-100 dark:border-gray-800">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        {/* Category Filter */}
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent dark:border-gray-800 rounded-2xl focus:bg-white dark:focus:bg-gray-800 focus:border-primary dark:focus:border-secondary outline-none transition-all dark:text-white font-bold text-sm min-w-[140px] cursor-pointer appearance-none shadow-sm"
        >
          <option value="All">All Types</option>
          <option value="Beach">Beach</option>
          <option value="Mountains">Mountains</option>
          <option value="City">City</option>
          <option value="Adventure">Adventure</option>
          <option value="Culture">Culture</option>
        </select>

        {/* Budget Filter */}
        <select
          value={activeBudget}
          onChange={(e) => setActiveBudget(e.target.value)}
          className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent dark:border-gray-800 rounded-2xl focus:bg-white dark:focus:bg-gray-800 focus:border-primary dark:focus:border-secondary outline-none transition-all dark:text-white font-bold text-sm min-w-[140px] cursor-pointer appearance-none shadow-sm"
        >
          <option value="All">Any Budget</option>
          <option value="Low">Economy ($)</option>
          <option value="Medium">Standard ($$)</option>
          <option value="High">Luxury ($$$)</option>
        </select>

        {/* Sort Order */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent dark:border-gray-800 rounded-2xl focus:bg-white dark:focus:bg-gray-800 focus:border-primary dark:focus:border-secondary outline-none transition-all dark:text-white font-bold text-sm min-w-[160px] cursor-pointer appearance-none shadow-sm"
        >
          <option value="Popularity">Trending First</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
          <option value="Rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
