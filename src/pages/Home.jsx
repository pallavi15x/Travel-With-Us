import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import TrendingDestinations from '../components/home/TrendingDestinations';
import FeaturesSection from '../components/home/FeaturesSection';
import PackagesSection from '../components/home/PackagesSection';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen"
    >
      <HeroSection />
      <TrendingDestinations />
      <FeaturesSection />
      <PackagesSection />
      <CallToAction />
    </motion.div>
  );
};

export default Home;
