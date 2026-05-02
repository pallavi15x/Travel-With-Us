import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, X } from 'lucide-react';
import { useTrips } from '../../context/TripsContext';
import ActivityItem from './ActivityItem';

import WeatherWidget from '../common/WeatherWidget';
import toast from 'react-hot-toast';

const DayCard = ({ day }) => {
  const { activeTripId, addActivityToDay, activeTrip } = useTrips();
  const [isAdding, setIsAdding] = useState(false);
  
  const [newActivity, setNewActivity] = useState({
    name: '',
    time: '',
    cost: '',
    notes: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newActivity.name.trim()) return;
    
    addActivityToDay(activeTripId, day.id, newActivity);
    setIsAdding(false);
    setNewActivity({ name: '', time: '', cost: '', notes: '' });
    toast.success(`Added "${newActivity.name}" to Day ${day.dayNumber}`, {
      icon: '✨',
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/40 rounded-[2rem] border border-gray-200 dark:border-gray-800 p-6 flex flex-col h-full transition-all">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-black text-dark dark:text-white tracking-tighter">Day {day.dayNumber}</h3>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <WeatherWidget location={activeTrip?.destination} compact />
          </div>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          {day.activities.length} items
        </div>
      </div>

      <Droppable droppableId={day.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[200px] transition-all rounded-2xl ${
              snapshot.isDraggingOver ? 'bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30' : ''
            }`}
          >
            {day.activities.map((activity, index) => (
              <ActivityItem 
                key={activity.id} 
                activity={activity} 
                index={index} 
                dayId={day.id} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Activity Form */}
      {isAdding ? (
        <form onSubmit={handleAdd} className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xs font-black text-dark dark:text-white uppercase tracking-widest">New Event</h4>
            <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-dark dark:hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Event Name (e.g. Dinner at Cliffside)"
            required
            autoFocus
            value={newActivity.name}
            onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
            className="w-full text-sm font-bold px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-xl mb-3 focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white"
          />
          <div className="flex gap-3 mb-3">
            <input
              type="time"
              value={newActivity.time}
              onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
              className="w-1/2 text-sm font-bold px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-xl focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white"
            />
            <input
              type="number"
              placeholder="Cost $"
              min="0"
              value={newActivity.cost}
              onChange={(e) => setNewActivity({...newActivity, cost: e.target.value})}
              className="w-1/2 text-sm font-bold px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-xl focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>
          <input
            type="text"
            placeholder="Notes (optional)"
            value={newActivity.notes}
            onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
            className="w-full text-sm font-bold px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-xl mb-4 focus:bg-white dark:focus:bg-gray-900 focus:border-primary outline-none transition-all dark:text-white"
          />
          <button type="submit" className="w-full py-4 bg-dark dark:bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg">
            Add to Day
          </button>
        </form>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-gray-500 dark:text-gray-500 font-black text-xs uppercase tracking-widest hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Activity
        </button>
      )}
    </div>
  );
};

export default DayCard;
