import { createContext, useState, useContext, useEffect } from 'react';

const TripsContext = createContext();

export const useTrips = () => useContext(TripsContext);

// Helper function to generate days array from start and end dates
const generateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = [];
  
  let current = new Date(start);
  let dayNumber = 1;
  
  while (current <= end) {
    days.push({
      id: `day-${current.toISOString().split('T')[0]}`,
      date: current.toISOString().split('T')[0],
      dayNumber: dayNumber++,
      activities: []
    });
    current.setDate(current.getDate() + 1);
  }
  
  return days;
};

export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('travel_trips');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  
  const [activeTripId, setActiveTripId] = useState(null);

  useEffect(() => {
    localStorage.setItem('travel_trips', JSON.stringify(trips));
  }, [trips]);

  const activeTrip = trips.find(t => t.id === activeTripId) || null;

  const createTrip = (tripData) => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      ...tripData,
      budget: parseFloat(tripData.budget) || 0,
      days: generateDays(tripData.startDate, tripData.endDate),
      isPinned: false,
      createdAt: new Date().toISOString()
    };
    
    setTrips(prev => [...prev, newTrip]);
    setActiveTripId(newTrip.id);
  };

  const togglePinned = (tripId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, isPinned: !trip.isPinned };
      }
      return trip;
    }));
  };

  const deleteTrip = (tripId) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
    if (activeTripId === tripId) {
      setActiveTripId(null);
    }
  };

  const updateTripDays = (tripId, newDays) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, days: newDays };
      }
      return trip;
    }));
  };

  const addActivityToDay = (tripId, dayId, activity) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        const newDays = trip.days.map(day => {
          if (day.id === dayId) {
            return {
              ...day,
              activities: [...day.activities, {
                ...activity,
                id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                cost: parseFloat(activity.cost) || 0
              }]
            };
          }
          return day;
        });
        return { ...trip, days: newDays };
      }
      return trip;
    }));
  };

  const removeActivity = (tripId, dayId, activityId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        const newDays = trip.days.map(day => {
          if (day.id === dayId) {
            return {
              ...day,
              activities: day.activities.filter(a => a.id !== activityId)
            };
          }
          return day;
        });
        return { ...trip, days: newDays };
      }
      return trip;
    }));
  };

  return (
    <TripsContext.Provider value={{
      trips,
      activeTripId,
      activeTrip,
      setActiveTripId,
      createTrip,
      deleteTrip,
      togglePinned,
      updateTripDays,
      addActivityToDay,
      removeActivity
    }}>
      {children}
    </TripsContext.Provider>
  );
};
