import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrips } from '../context/TripsContext';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteCard from '../components/mytrips/FavoriteCard';
import TripList from '../components/mytrips/TripList';
import { Briefcase, Heart, Plus, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyTrips = () => {
  const { trips } = useTrips();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    toast.success('Welcome back, Traveler!', {
      id: 'dashboard-welcome',
      icon: '🏠',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-20 px-4 transition-colors">
      <div className="container mx-auto max-w-[1920px]">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-20 gap-10">
          <div className="text-center lg:text-left space-y-4">
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary text-[10px] font-black rounded-full uppercase tracking-widest shadow-inner">
              Command Center
            </span>
            <h1 className="text-7xl md:text-8xl font-black text-dark dark:text-white tracking-tighter leading-none">MY DASHBOARD</h1>
            <p className="text-gray-500 dark:text-gray-400 text-2xl font-black uppercase tracking-widest opacity-60">Global Itineraries • {favorites.length} Discoveries</p>
          </div>
          <button 
            onClick={() => navigate('/planner')}
            className="px-12 py-6 bg-dark dark:bg-primary text-white font-black uppercase tracking-widest rounded-3xl hover:scale-105 transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(15,76,92,0.3)] dark:shadow-[0_20px_50px_rgba(255,127,80,0.2)] active:scale-95"
          >
            <Plus className="w-6 h-6" />
            New Adventure
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          
          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Filters Bar */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-10 items-center">
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text"
                  placeholder="Filter your journey collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-primary dark:focus:border-secondary rounded-2xl outline-none transition-all font-black uppercase tracking-widest text-xs dark:text-white"
                />
              </div>
              
              <div className="flex bg-gray-50 dark:bg-gray-900/50 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 w-full md:w-auto shadow-inner">
                {['All', 'Upcoming', 'Past'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filterType === type 
                        ? 'bg-white dark:bg-gray-800 text-primary dark:text-secondary shadow-xl scale-105' 
                        : 'text-gray-400 dark:text-gray-500 hover:text-dark dark:hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Trips List Area */}
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-[1.5rem] shadow-inner">
                  <Briefcase className="w-8 h-8 text-primary dark:text-secondary" />
                </div>
                <h2 className="text-4xl font-black text-dark dark:text-white tracking-tighter uppercase">Itineraries</h2>
                <span className="ml-2 px-5 py-2 bg-gray-50 dark:bg-gray-800 text-gray-400 font-black rounded-full text-[10px] uppercase tracking-widest shadow-inner">
                  {trips.length} Total
                </span>
              </div>

              <TripList 
                trips={trips} 
                searchQuery={searchQuery} 
                filterType={filterType} 
              />
            </div>

          </div>

          {/* Favorites Sidebar */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
              <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-2xl shadow-inner">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <h2 className="text-3xl font-black text-dark dark:text-white tracking-tighter uppercase">SAVED</h2>
            </div>

            {favorites.length === 0 ? (
              <div className="p-12 text-center bg-gray-50 dark:bg-gray-800/30 rounded-[3rem] border-4 border-dashed border-gray-100 dark:border-gray-800">
                <p className="text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-[10px] italic mb-6">No discoveries yet.</p>
                <button 
                  onClick={() => navigate('/explore')}
                  className="px-6 py-3 bg-dark dark:bg-gray-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4 scrollbar-hide">
                <AnimatePresence>
                  {favorites.map(destination => (
                    <FavoriteCard key={destination.id} destination={destination} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default MyTrips;
