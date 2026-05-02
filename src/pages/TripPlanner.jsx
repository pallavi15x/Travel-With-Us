import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrips } from '../context/TripsContext';
import TripForm from '../components/planner/TripForm';
import Itinerary from '../components/planner/Itinerary';
import BudgetTracker from '../components/planner/BudgetTracker';
import MapView from '../components/common/MapView';
import { destinationsData } from '../data/destinations';
import { Map, List, Cloud } from 'lucide-react';
import toast from 'react-hot-toast';

const TripPlanner = () => {
  const { activeTrip } = useTrips();
  const [showMap, setShowMap] = useState(false);

  const destinationData = useMemo(() => {
    if (!activeTrip) return null;
    return destinationsData.find(d => d.name === activeTrip.destination);
  }, [activeTrip]);

  const mapMarkers = useMemo(() => {
    if (!destinationData) return [];
    return [{
      position: [destinationData.coordinates.lat, destinationData.coordinates.lng],
      title: activeTrip.destination,
      description: `Target destination for ${activeTrip.name}`
    }];
  }, [activeTrip, destinationData]);

  const handleToggleView = () => {
    setShowMap(!showMap);
    toast.success(`Switched to ${!showMap ? 'Map' : 'Itinerary'} view`, {
      id: 'view-toggle',
      icon: !showMap ? '🗺️' : '📋',
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors pb-20">
      <AnimatePresence mode="wait">
        {!activeTrip ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="container mx-auto px-4 py-20"
          >
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary text-xs font-black rounded-full uppercase tracking-widest mb-6">
                Travel Planner Pro
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-dark dark:text-white mb-6 tracking-tighter leading-none">CRAFT YOUR <br /> MASTERPIECE</h1>
              <p className="text-gray-500 dark:text-gray-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto">Generate precision itineraries with real-time intelligence.</p>
            </div>
            <TripForm />
          </motion.div>
        ) : (
          <motion.div
            key="itinerary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-12"
          >
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1.5 bg-secondary text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl">
                    Active Mission
                  </div>
                  <div className="flex items-center gap-2 text-primary dark:text-secondary font-black text-xs uppercase tracking-widest">
                    <Cloud className="w-5 h-5 animate-pulse" />
                    <span>Live Weather Intelligence</span>
                  </div>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-dark dark:text-white tracking-tighter leading-[0.8]">{activeTrip.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-2xl md:text-3xl font-black uppercase tracking-widest opacity-60">to {activeTrip.destination}</p>
              </div>

              <div className="w-full lg:w-auto">
                <button
                  onClick={handleToggleView}
                  className="w-full lg:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-dark dark:bg-primary text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  {showMap ? <List className="w-6 h-6" /> : <Map className="w-6 h-6" />}
                  {showMap ? 'Itinerary Mode' : 'Tactical Map'}
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {showMap ? (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="h-[calc(100vh-350px)] min-h-[600px] rounded-[3rem] overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl"
                    >
                      <MapView 
                        markers={mapMarkers} 
                        center={mapMarkers[0]?.position || [20, 0]} 
                        zoom={12} 
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                    >
                      <Itinerary />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-1">
                <BudgetTracker />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripPlanner;
