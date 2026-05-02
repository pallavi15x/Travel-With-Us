import { AnimatePresence } from 'framer-motion';
import DestinationCard from './DestinationCard';

const DestinationGrid = ({ destinations, onCardClick }) => {
  if (destinations.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-black text-dark dark:text-white mb-2 tracking-tighter uppercase">No destinations found</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {destinations.map((dest, index) => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                onClick={onCardClick}
                delay={index * 0.05}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DestinationGrid;
