import { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react';

const WeatherWidget = ({ location, compact = false }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy'];
      const icons = [Sun, Cloud, CloudRain, CloudSnow, Wind];
      const randomIndex = Math.floor(Math.random() * conditions.length);
      
      setWeather({
        temp: Math.floor(Math.random() * 30) + 5,
        condition: conditions[randomIndex],
        Icon: icons[randomIndex]
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return (
    <div className="flex items-center gap-2 animate-pulse">
      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="w-10 h-4 bg-gray-200 dark:bg-gray-700 rounded-md" />
    </div>
  );

  if (!weather) return null;

  const { Icon, temp, condition } = weather;

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-sm">
        <Icon className="w-4 h-4 text-secondary" />
        <span>{temp}°C</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
      <div className="p-3 bg-secondary/10 rounded-xl">
        <Icon className="w-6 h-6 text-secondary" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weather</p>
        <p className="text-lg font-bold text-dark dark:text-white">{temp}°C • {condition}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
