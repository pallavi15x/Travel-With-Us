import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TripCard from './TripCard';
import EmptyState from './EmptyState';

const TripList = ({ trips, searchQuery, filterType }) => {
  const filteredAndSortedTrips = useMemo(() => {
    let result = [...trips];

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.destination.toLowerCase().includes(q)
      );
    }

    // Filter by Past/Upcoming
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (filterType === 'Upcoming') {
      result = result.filter(t => new Date(t.startDate) >= now);
    } else if (filterType === 'Past') {
      result = result.filter(t => new Date(t.startDate) < now);
    }

    // Sort: Pinned first, then by date (soonest first)
    result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(a.startDate) - new Date(b.startDate);
    });

    return result;
  }, [trips, searchQuery, filterType]);

  if (filteredAndSortedTrips.length === 0) {
    const message = searchQuery 
      ? `No trips matching "${searchQuery}"`
      : filterType === 'All' 
        ? "No trips planned yet 🌍" 
        : `No ${filterType.toLowerCase()} trips found`;
        
    return <EmptyState message={message} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {filteredAndSortedTrips.map((trip) => (
          <motion.div
            key={trip.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <TripCard trip={trip} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TripList;
