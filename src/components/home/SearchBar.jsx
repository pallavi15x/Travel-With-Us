import { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { destination, date, budget });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl relative z-10 mt-8">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end md:items-center">
        
        {/* Destination Input */}
        <div className="flex-1 w-full">
          <label className="block text-white text-sm font-medium mb-1 ml-1 opacity-90">Destination</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-300" />
            </div>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/30 transition-all"
              required
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="flex-1 w-full">
          <label className="block text-white text-sm font-medium mb-1 ml-1 opacity-90">Travel Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-300" />
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/30 transition-all [&::-webkit-calendar-picker-indicator]:invert"
              required
            />
          </div>
        </div>

        {/* Budget Input */}
        <div className="flex-1 w-full">
          <label className="block text-white text-sm font-medium mb-1 ml-1 opacity-90">Budget (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-300" />
            </div>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 text-white border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/30 transition-all appearance-none"
            >
              <option value="" className="text-dark">Any Budget</option>
              <option value="budget" className="text-dark">$0 - $1000</option>
              <option value="moderate" className="text-dark">$1000 - $3000</option>
              <option value="luxury" className="text-dark">$3000+</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-secondary hover:bg-[#ff6b3d] text-white font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>Search Trips</span>
        </button>

      </form>
    </div>
  );
};

export default SearchBar;
