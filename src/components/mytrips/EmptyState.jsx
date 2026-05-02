import { motion } from 'framer-motion';
import { Globe, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ message = "No trips planned yet 🌍" }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-20 bg-white dark:bg-gray-800 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-700 text-center shadow-sm transition-all"
    >
      <div className="w-24 h-24 bg-primary/5 dark:bg-primary/10 text-primary dark:text-secondary rounded-full flex items-center justify-center mb-6">
        <Globe className="w-12 h-12" />
      </div>
      <h3 className="text-2xl font-black text-dark dark:text-white mb-3 tracking-tighter uppercase">{message}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8 font-medium">
        Your next big adventure is just a few clicks away. Start planning your itinerary now!
      </p>
      <button 
        onClick={() => navigate('/planner')}
        className="px-8 py-4 bg-dark dark:bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl"
      >
        <Plus className="w-5 h-5" />
        Start Planning
      </button>
    </motion.div>
  );
};

export default EmptyState;
