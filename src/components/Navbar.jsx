import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './common/ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Planner', path: '/planner' },
    { name: 'My Trips', path: '/my-trips' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg py-3 backdrop-blur-xl' 
          : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2 group">
          <Globe className="text-primary dark:text-secondary w-9 h-9 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-black text-primary dark:text-secondary tracking-tighter">TRAVEL</span>
        </NavLink>

        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative font-bold transition-all duration-200 text-sm uppercase tracking-widest ${
                  isActive ? 'text-secondary' : 'text-dark dark:text-gray-300 hover:text-primary dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-2 left-0 h-[3px] w-full bg-secondary rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          
          <div className="pl-6 border-l border-gray-200 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-dark dark:text-white hover:text-primary transition-colors"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-dark z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                <span className="text-xl font-black text-primary dark:text-secondary tracking-tighter">MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 transition-colors"
                >
                  <X className="w-7 h-7 text-dark dark:text-white" />
                </button>
              </div>
              <div className="flex flex-col p-8 space-y-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-2xl font-black transition-all ${
                        isActive ? 'text-secondary translate-x-2' : 'text-dark dark:text-gray-300 hover:text-primary'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
