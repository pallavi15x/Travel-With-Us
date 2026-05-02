import { motion } from 'framer-motion';
import { MapPin, Star, Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

import WeatherWidget from '../common/WeatherWidget';
import toast from 'react-hot-toast';

const DestinationCard = ({ destination, onClick, delay = 0 }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(destination.id);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    toggleFavorite(destination);
    toast.success(saved ? `Removed ${destination.name} from favorites` : `Added ${destination.name} to favorites!`, {
      icon: saved ? '🗑️' : '❤️',
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay }}
      onClick={() => onClick(destination)}
      className="group relative bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image})` }}
        />
        <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-dark dark:text-white flex items-center gap-2 shadow-xl">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {destination.rating}
        </div>
        
        <button 
          onClick={handleSaveClick}
          className="absolute top-6 right-6 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl hover:scale-110 transition-all z-10"
        >
          <Heart 
            className={`w-6 h-6 transition-colors ${saved ? 'text-rose-500 fill-rose-500' : 'text-gray-400 dark:text-gray-500 hover:text-rose-500'}`} 
          />
        </button>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-black text-dark dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors tracking-tight">{destination.name}</h3>
          <span className="text-secondary font-black text-xl">${destination.price}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-sm mb-4">
          <MapPin className="w-4 h-4 text-primary dark:text-secondary" />
          {destination.country}
        </div>

        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
          {destination.description}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</span>
            <span className="text-sm font-bold text-dark dark:text-gray-300">
              {destination.category}
            </span>
          </div>
          <WeatherWidget location={destination.name} compact />
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;

