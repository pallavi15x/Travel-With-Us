import { DragDropContext } from '@hello-pangea/dnd';
import { useTrips } from '../../context/TripsContext';
import DayCard from './DayCard';

import toast from 'react-hot-toast';

const Itinerary = () => {
  const { activeTrip, activeTripId, updateTripDays } = useTrips();

  if (!activeTrip) return null;

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newDays = Array.from(activeTrip.days);
    const sourceDayIndex = newDays.findIndex(d => d.id === source.droppableId);
    const destDayIndex = newDays.findIndex(d => d.id === destination.droppableId);

    const sourceDay = newDays[sourceDayIndex];
    const destDay = newDays[destDayIndex];

    const sourceActivities = Array.from(sourceDay.activities);
    const destActivities = source.droppableId === destination.droppableId ? sourceActivities : Array.from(destDay.activities);

    const [movedActivity] = sourceActivities.splice(source.index, 1);
    destActivities.splice(destination.index, 0, movedActivity);

    if (source.droppableId === destination.droppableId) {
      newDays[sourceDayIndex] = { ...sourceDay, activities: destActivities };
    } else {
      newDays[sourceDayIndex] = { ...sourceDay, activities: sourceActivities };
      newDays[destDayIndex] = { ...destDay, activities: destActivities };
    }

    updateTripDays(activeTripId, newDays);
    toast.success(`Moved "${movedActivity.name}"`, {
      id: 'drag-toast',
      icon: '🔄',
    });
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {activeTrip.days.map((day) => (
            <div key={day.id} className="h-full">
              <DayCard day={day} />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Itinerary;
