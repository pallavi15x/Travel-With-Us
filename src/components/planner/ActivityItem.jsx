import { Draggable } from '@hello-pangea/dnd';
import { MapPin, Clock, GripVertical, Trash2 } from 'lucide-react';
import { useTrips } from '../../context/TripsContext';

import toast from 'react-hot-toast';

const ActivityItem = ({ activity, index, dayId }) => {
  const { activeTripId, removeActivity } = useTrips();

  const handleRemove = () => {
    removeActivity(activeTripId, dayId, activity.id);
    toast.error(`Removed "${activity.name}"`, {
      icon: '🗑️',
    });
  };

  return (
    <Draggable draggableId={activity.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`mb-4 p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center gap-4 transition-all ${
            snapshot.isDragging 
              ? 'shadow-2xl ring-2 ring-primary dark:ring-secondary border-transparent scale-105 z-50' 
              : 'shadow-sm hover:shadow-lg'
          }`}
        >
          <div 
            {...provided.dragHandleProps} 
            className="text-gray-300 dark:text-gray-600 hover:text-primary dark:hover:text-secondary transition-colors cursor-grab active:cursor-grabbing p-1"
          >
            <GripVertical className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h4 className="text-lg font-black text-dark dark:text-white tracking-tight">{activity.name}</h4>
            <div className="flex items-center gap-6 mt-1 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary dark:text-secondary" /> {activity.time || 'Flexible'}
              </span>
              {activity.cost > 0 && (
                <span className="flex items-center gap-2 text-secondary">
                  ${activity.cost}
                </span>
              )}
            </div>
            {activity.notes && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic border-l-4 border-primary/20 dark:border-secondary/20 pl-3 py-1 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                {activity.notes}
              </p>
            )}
          </div>

          <button 
            onClick={handleRemove}
            className="p-3 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default ActivityItem;
