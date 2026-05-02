import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Trash2, Star, Edit3, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../../context/TripsContext';
import { useMemo } from 'react';

import toast from 'react-hot-toast';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const { setActiveTripId, deleteTrip, togglePinned } = useTrips();

  const handleAction = (e, action) => {
    e.stopPropagation();
    if (action === 'delete') {
      toast((t) => (
        <div className="flex flex-col gap-3">
          <p className="font-bold text-dark">Delete trip to <span className="text-primary">{trip.destination}</span>?</p>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                deleteTrip(trip.id);
                toast.dismiss(t.id);
                toast.error('Trip deleted', { icon: '🗑️' });
              }}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg text-xs font-black uppercase"
            >
              Confirm
            </button>
            <button 
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-xs font-black uppercase"
            >
              Cancel
            </button>
          </div>
        </div>
      ), { duration: 5000, id: 'delete-confirm' });
    } else if (action === 'edit' || action === 'view') {
      setActiveTripId(trip.id);
      navigate('/planner');
      toast.success(`Entering ${trip.name} HQ`, { icon: '🏢' });
    } else if (action === 'pin') {
      togglePinned(trip.id);
      toast.success(trip.isPinned ? 'Unpinned' : 'Pinned to top!', {
        icon: trip.isPinned ? '📍' : '⭐',
      });
    }
  };

  const totalSpent = useMemo(() => {
    let sum = 0;
    trip.days?.forEach(day => {
      day.activities?.forEach(act => {
        sum += parseFloat(act.cost) || 0;
      });
    });
    return sum;
  }, [trip.days]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full"
    >
      <div className="p-10 flex-1">
        <div className="flex justify-between items-start mb-8">
          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-3xl flex items-center justify-center text-primary dark:text-secondary shadow-inner">
            <MapPin className="w-8 h-8" />
          </div>
          <button 
            onClick={(e) => handleAction(e, 'pin')}
            className={`p-4 rounded-2xl transition-all shadow-sm ${
              trip.isPinned 
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 scale-110' 
                : 'bg-gray-50 dark:bg-gray-900 text-gray-300 dark:text-gray-600 hover:text-yellow-500 hover:bg-yellow-50'
            }`}
          >
            <Star className={`w-6 h-6 ${trip.isPinned ? 'fill-yellow-500' : ''}`} />
          </button>
        </div>

        <h3 className="text-3xl font-black text-dark dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors truncate tracking-tighter uppercase">
          {trip.name}
        </h3>
        
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-black text-xs uppercase tracking-widest mb-10">
          <Calendar className="w-5 h-5 text-secondary" />
          <span>
            {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — 
            {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-transparent hover:border-gray-100 transition-all">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Cycle</p>
            <p className="text-dark dark:text-white font-black text-2xl tracking-tighter">{trip.days.length} Days</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-transparent hover:border-gray-100 transition-all">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Equity</p>
            <p className="text-dark dark:text-white font-black text-2xl tracking-tighter">${totalSpent} / ${trip.budget}</p>
          </div>
        </div>
      </div>

      <div className="px-10 py-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-6 transition-colors">
        <div className="flex gap-2">
          <button 
            onClick={(e) => handleAction(e, 'edit')}
            className="p-4 text-gray-300 dark:text-gray-600 hover:text-primary dark:hover:text-secondary hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all shadow-sm"
          >
            <Edit3 className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => handleAction(e, 'delete')}
            className="p-4 text-gray-300 dark:text-gray-600 hover:text-rose-500 hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all shadow-sm"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        <button 
          onClick={(e) => handleAction(e, 'view')}
          className="flex items-center gap-3 px-8 py-4 bg-dark dark:bg-gray-800 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 text-xs"
        >
          <Eye className="w-5 h-5" />
          Tactical View
        </button>
      </div>
    </motion.div>
  );
};

export default TripCard;
