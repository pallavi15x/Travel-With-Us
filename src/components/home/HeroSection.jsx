import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/src/assets/images/hero_travel_bg.webp')",
            backgroundColor: "#0F172A"
          }}
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-dark/60 to-secondary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Aurora Orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-aurora" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-aurora" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/15 rounded-full blur-[80px] animate-aurora" style={{ animationDelay: '-10s' }} />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-16">
        
        <motion.span 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block py-2 px-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-black tracking-[0.25em] uppercase mb-8 shadow-lg"
        >
          ✦ Your Adventure Awaits ✦
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] max-w-5xl drop-shadow-2xl mb-8"
        >
          TRAVEL <br className="hidden md:block" /> WITH US
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 text-xl md:text-2xl text-white/80 font-bold uppercase tracking-[0.3em] max-w-2xl drop-shadow-md"
        >
          Masterpiece Journeys
        </motion.p>

        {/* Search Bar Component */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full mt-12 md:mt-16"
        >
          <SearchBar />
        </motion.div>

      </div>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background dark:bg-gray-950 rounded-t-[5rem] z-20 transition-colors" />
    </section>
  );
};

export default HeroSection;
