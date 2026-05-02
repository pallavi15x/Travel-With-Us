import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const DestinationCard = ({ image, name, country, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -12 }}
      className="group relative bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-72 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary dark:text-secondary flex items-center gap-2 shadow-xl border border-white/20">
          <MapPin className="w-4 h-4" />
          {country}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-black text-dark dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors tracking-tighter uppercase">{name}</h3>
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
