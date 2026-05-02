import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { FavoritesProvider } from './context/FavoritesContext';
import { TripsProvider } from './context/TripsContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import TripPlanner from './pages/TripPlanner';
import MyTrips from './pages/MyTrips';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <FavoritesProvider>
      <TripsProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '16px',
              background: '#333',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }
          }}
        />
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/planner" element={<TripPlanner />} />
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Layout>
      </TripsProvider>
    </FavoritesProvider>
  );
}

export default App;
