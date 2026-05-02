import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from '../components/explore/FilterBar';
import DestinationGrid from '../components/explore/DestinationGrid';
import DestinationModal from '../components/explore/DestinationModal';
import MapView from '../components/common/MapView';
import { SkeletonCard } from '../components/common/Loader';
import { destinationsData } from '../data/destinations';
import { Map, Grid, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBudget, setActiveBudget] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');
  const [selectedDest, setSelectedDest] = useState(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredDestinations = useMemo(() => {
    let result = destinationsData.filter(dest => {
      const q = debouncedQuery.toLowerCase();
      const matchesSearch = dest.name.toLowerCase().includes(q) || 
                           dest.country.toLowerCase().includes(q);
      const matchesCategory = activeCategory === 'All' || dest.category === activeCategory;
      const matchesBudget = activeBudget === 'All' || dest.budget === activeBudget;
      return matchesSearch && matchesCategory && matchesBudget;
    });

    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'Rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [debouncedQuery, activeCategory, activeBudget, sortBy]);

  const mapMarkers = useMemo(() => 
    filteredDestinations.map(dest => ({
      position: [dest.coordinates.lat, dest.coordinates.lng],
      title: dest.name,
      description: `${dest.country} • ${dest.category}`
    }))
  , [filteredDestinations]);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 pb-20 transition-colors">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <FilterBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeBudget={activeBudget}
            setActiveBudget={setActiveBudget}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <button
            onClick={() => {
              setShowMap(!showMap);
              toast.success(`Switched to ${!showMap ? 'Map' : 'Grid'} view`);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-dark dark:bg-primary text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-all whitespace-nowrap"
          >
            {showMap ? <Grid className="w-5 h-5" /> : <Map className="w-5 h-5" />}
            {showMap ? 'Show Grid' : 'Show Map'}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </motion.div>
          ) : showMap ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-[calc(100vh-250px)] min-h-[500px]"
            >
              <MapView 
                markers={mapMarkers} 
                center={mapMarkers.length > 0 ? mapMarkers[0].position : [20, 0]} 
                zoom={mapMarkers.length === 1 ? 12 : 3}
              />
            </motion.div>
          ) : filteredDestinations.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DestinationGrid 
                destinations={filteredDestinations} 
                onSelect={setSelectedDest}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Info className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-dark dark:text-white">No destinations found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedDest && (
        <DestinationModal 
          destination={selectedDest} 
          onClose={() => setSelectedDest(null)} 
        />
      )}
    </div>
  );
};

export default Explore;
