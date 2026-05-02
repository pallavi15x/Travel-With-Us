import DestinationCard from './DestinationCard';

const destinations = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    image: '/src/assets/images/dest_santorini.webp',
    description: 'Experience the magic of iconic blue domes, breathtaking sunsets, and crystal clear waters of the Aegean sea.'
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    image: '/src/assets/images/dest_kyoto.webp',
    description: 'Immerse yourself in traditional Japanese culture, ancient temples, and stunning cherry blossom gardens.'
  },
  {
    id: 3,
    name: 'Amalfi Coast',
    country: 'Italy',
    image: 'https://th.bing.com/th/id/OIP.WXbltfko1yFhGpRmFbdNwgHaE8?w=291&h=194&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3',
    description: 'Drive along dramatic coastlines, explore colorful cliffside villages, and savor authentic Italian cuisine.'
  },
  {
    id: 4,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    description: 'Find inner peace in lush tropical jungles, serene temples, and pristine surfing beaches.'
  },
  {
    id: 5,
    name: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800',
    description: 'Conquer majestic snowy peaks, ski down world-class resorts, and relax in cozy mountain chalets.'
  },
  {
    id: 6,
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    description: 'Escape to a private overwater bungalow in a tropical paradise surrounded by coral reefs.'
  }
];

const TrendingDestinations = () => {
  return (
    <section className="py-32 bg-background dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary text-[10px] font-black rounded-full uppercase tracking-widest shadow-inner">
              Global Hotspots
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">Trending Now</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xl font-medium leading-relaxed max-w-2xl">
              Discover the most popular places travelers are exploring right now. Your next masterpiece journey is just a click away.
            </p>
          </div>
          <button className="group relative px-10 py-5 bg-dark dark:bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:scale-105 transition-all active:scale-95 text-xs overflow-hidden">
            <span className="relative z-10">View Global Index</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {destinations.map((dest, index) => (
            <DestinationCard 
              key={dest.id} 
              {...dest} 
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;
