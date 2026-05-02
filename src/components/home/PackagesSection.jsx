import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: 'Ultimate Bali Retreat',
    duration: '7 Days / 6 Nights',
    price: '$1,299',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    tag: 'Best Seller'
  },
  {
    id: 2,
    title: 'Classic Europe Tour',
    duration: '14 Days / 13 Nights',
    price: '$3,499',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800',
    tag: 'Premium'
  },
  {
    id: 3,
    title: 'Maldives Luxury',
    duration: '5 Days / 4 Nights',
    price: '$2,899',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    tag: 'Honeymoon'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const PackagesSection = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-background to-primary/5 dark:from-gray-950 dark:to-gray-900/50 transition-colors relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/10 dark:bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-5"
        >
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary dark:text-rose-400 text-[10px] font-black rounded-full uppercase tracking-[0.25em] border border-secondary/10 dark:border-secondary/30">
            ✦ Exclusive Offers
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
            Popular <span className="gradient-text">Packages</span>
          </h2>
          <p className="mt-6 text-gray-500 dark:text-gray-400 text-xl font-medium max-w-2xl mx-auto">
            All-inclusive trips curated by our travel experts. Just pack your bags.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariant}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col h-full border border-gray-100 dark:border-gray-800 group"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.div 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 text-dark dark:text-white shadow-xl">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  {pkg.rating}
                </div>
                <div className="absolute top-6 right-6 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-primary to-secondary shadow-xl">
                  {pkg.tag}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500 text-[10px] mb-4 font-black uppercase tracking-widest">
                  <Clock className="w-4 h-4 text-primary dark:text-indigo-400" />
                  {pkg.duration}
                </div>
                <h3 className="text-3xl font-black text-dark dark:text-white mb-6 tracking-tighter uppercase leading-none group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">{pkg.title}</h3>
                
                <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">From</p>
                    <p className="text-3xl font-black text-secondary tracking-tighter">{pkg.price}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-dark dark:bg-gray-800 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary dark:hover:bg-primary transition-all shadow-xl flex items-center gap-2 group/btn"
                  >
                    View Plan
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;
