import { motion } from 'framer-motion';
import { ArrowRight, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative overflow-hidden transition-colors">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-dark/80 to-secondary/60 dark:from-gray-950/95 dark:via-gray-900/90 dark:to-primary/40 transition-colors" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] animate-aurora" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary/20 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto space-y-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl text-white text-[10px] font-black rounded-full uppercase tracking-[0.25em] border border-white/20 shadow-lg"
          >
            <Plane className="w-4 h-4" />
            Next Level Travel
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
            CRAFT YOUR <br /> <span className="text-accent">LEGACY</span> JOURNEY
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
            Join the elite circle of travelers who demand precision and style.
          </p>
          
          <motion.button 
            onClick={() => navigate('/planner')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shimmer-btn px-14 py-6 text-white rounded-[2rem] font-black uppercase tracking-widest text-lg hover:shadow-[0_20px_60px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-4 mx-auto group shadow-2xl"
          >
            Plan My Mission
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
