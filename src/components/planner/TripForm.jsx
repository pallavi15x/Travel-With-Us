import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useTrips } from '../../context/TripsContext';

import toast from 'react-hot-toast';

const TripForm = () => {
  const { createTrip } = useTrips();
  
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTrip(formData);
    toast.success(`Trip to ${formData.destination} created! Bon voyage!`, {
      icon: '✈️',
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 mt-12 transition-all">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
          <PlaneTakeoff className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black text-dark dark:text-white tracking-tighter">Create New Adventure</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Start planning your next masterpiece journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-dark dark:text-white text-xs font-black uppercase tracking-widest ml-1">Trip Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Summer in Japan"
            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-2xl focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-dark dark:text-white text-xs font-black uppercase tracking-widest ml-1">Main Destination</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="destination"
              required
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Tokyo, Japan"
              className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-2xl focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-dark dark:text-white text-xs font-black uppercase tracking-widest ml-1">Start Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-2xl focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white font-bold"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-dark dark:text-white text-xs font-black uppercase tracking-widest ml-1">End Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="endDate"
                required
                min={formData.startDate}
                value={formData.endDate}
                onChange={handleChange}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-2xl focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white font-bold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-dark dark:text-white text-xs font-black uppercase tracking-widest ml-1">Total Budget (USD)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="budget"
              min="0"
              required
              value={formData.budget}
              onChange={handleChange}
              placeholder="5000"
              className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-2xl focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white font-bold"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-5 bg-dark dark:bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
        >
          Generate Itinerary
        </motion.button>
      </form>
    </div>
  );
};

export default TripForm;
