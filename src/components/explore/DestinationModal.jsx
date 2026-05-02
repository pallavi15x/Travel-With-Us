import { motion } from 'framer-motion';
import { X, MapPin, Star, Calendar, Sun, Heart, Plus } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

import WeatherWidget from '../common/WeatherWidget';
import toast from 'react-hot-toast';

const DestinationModal = ({ destination, onClose }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (!destination) return null;
  
  const saved = isFavorite(destination.id);

  const handleToggleFavorite = () => {
    toggleFavorite(destination);
    toast.success(saved ? `Removed ${destination.name}` : `Saved ${destination.name}!`, {
      icon: saved ? '🗑️' : '❤️',
    });
  };

  const handleAddToTrip = () => {
    toast.success(`Opening planner for ${destination.name}...`);
    // Logic to set active destination could go here
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-[3rem] shadow-2xl relative scrollbar-hide border border-gray-100 dark:border-gray-800"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-white/20 dark:bg-black/20 hover:bg-white/40 text-white rounded-2xl backdrop-blur-xl transition-all hover:scale-110 active:scale-95"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${destination.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-white/90 font-black tracking-widest uppercase text-sm">
                <MapPin className="w-5 h-5 text-secondary" />
                <span>{destination.country}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">{destination.name}</h2>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="bg-white/20 backdrop-blur-xl px-4 py-2 rounded-2xl text-white font-black flex items-center gap-2 border border-white/30">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                {destination.rating}
              </div>
              <div className="text-white font-black text-5xl tracking-tighter">
                ${destination.price}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-10 bg-primary dark:bg-secondary rounded-full" />
                  <h3 className="text-3xl font-black text-dark dark:text-white tracking-tight uppercase">About Destination</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-xl font-medium">
                  {destination.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-primary/5 dark:bg-primary/10 text-primary dark:text-secondary font-black rounded-2xl text-xs uppercase tracking-widest border border-primary/10">
                  {destination.category}
                </span>
                <span className="px-6 py-3 bg-secondary/5 dark:bg-secondary/10 text-secondary font-black rounded-2xl text-xs uppercase tracking-widest border border-secondary/10">
                  {destination.budget} Budget
                </span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-dark dark:text-white font-black text-xs uppercase tracking-widest">
                    <Calendar className="w-5 h-5 text-primary dark:text-secondary" />
                    Best Time
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">{destination.bestTime}</p>
                </div>
                
                <WeatherWidget location={destination.name} />

                <div className="pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  <button 
                    onClick={handleAddToTrip}
                    className="w-full py-5 bg-dark dark:bg-primary text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95"
                  >
                    Start Planning
                  </button>
                  <button 
                    onClick={handleToggleFavorite}
                    className={`w-full py-5 border-4 rounded-[1.5rem] font-black uppercase tracking-widest transition-all flex justify-center items-center gap-3 ${
                      saved 
                        ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-900/10' 
                        : 'border-gray-100 dark:border-gray-800 text-dark dark:text-white hover:border-primary dark:hover:border-secondary'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${saved ? 'fill-rose-500' : ''}`} />
                    {saved ? 'Saved' : 'Save Item'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DestinationModal;
