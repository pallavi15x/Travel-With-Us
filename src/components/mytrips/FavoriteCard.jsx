import { motion } from 'framer-motion';
import { MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const FavoriteCard = ({ destination }) => {
  const { toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 flex items-center group p-4 gap-6 transition-all hover:scale-[1.02]"
    >
      <div 
        className="w-24 h-24 rounded-2xl bg-cover bg-center flex-shrink-0 shadow-lg border-2 border-white dark:border-gray-700"
        style={{ backgroundImage: `url(${destination.image})` }}
      />
      
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="font-black text-dark dark:text-white truncate uppercase tracking-tighter text-lg">{destination.name}</h4>
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 font-black text-[10px] uppercase tracking-widest">
          <MapPin className="w-3 h-3 text-secondary" />
          {destination.country}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button 
          onClick={() => {
            toggleFavorite(destination);
            toast.error('Removed from collection', { icon: '💔' });
          }}
          className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
        <button 
          onClick={() => navigate('/explore')}
          className="p-3 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default FavoriteCard;
