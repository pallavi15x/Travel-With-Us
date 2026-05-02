import { motion } from 'framer-motion';
import { CalendarCheck, DollarSign, Sparkles, Heart } from 'lucide-react';

const features = [
  {
    icon: CalendarCheck,
    title: 'Smart Planning',
    description: 'Build your perfect itinerary with our intuitive drag-and-drop travel planner.',
    gradient: 'from-primary/20 to-primary/5',
    iconBg: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-400',
    border: 'hover:border-primary/30'
  },
  {
    icon: DollarSign,
    title: 'Budget Friendly',
    description: 'Set your budget and let us find the best deals that match your financial goals.',
    gradient: 'from-accent/20 to-accent/5',
    iconBg: 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-amber-400',
    border: 'hover:border-accent/30'
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Get smart suggestions for restaurants, activities, and hidden gems.',
    gradient: 'from-teal/20 to-teal/5',
    iconBg: 'bg-teal/10 text-teal dark:bg-teal/20 dark:text-teal-400',
    border: 'hover:border-teal/30'
  },
  {
    icon: Heart,
    title: 'Save & Share',
    description: 'Keep all your favorite destinations and planned trips in one secure place.',
    gradient: 'from-secondary/20 to-secondary/5',
    iconBg: 'bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-rose-400',
    border: 'hover:border-secondary/30'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const FeaturesSection = () => {
  return (
    <section className="py-32 bg-white dark:bg-gray-950 transition-colors relative overflow-hidden">
      {/* Subtle background orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20 space-y-5"
        >
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 text-primary dark:text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-[0.25em] border border-primary/10 dark:border-primary/30">
            ✦ Engineered Excellence
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
            Why Travel <span className="gradient-text">With Us?</span>
          </h2>
          <p className="mt-6 text-gray-500 dark:text-gray-400 text-xl font-medium max-w-2xl mx-auto">
            We simplify complex travel planning so you can focus on making masterpiece memories.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`p-10 rounded-[2.5rem] bg-gradient-to-b ${feature.gradient} dark:from-gray-800/50 dark:to-gray-900/50 border border-transparent ${feature.border} dark:hover:border-gray-700 hover:shadow-2xl transition-all text-center flex flex-col items-center group`}
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-lg ${feature.iconBg}`}
              >
                <feature.icon className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-black text-dark dark:text-white mb-4 tracking-tighter uppercase">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
