import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-full p-1 transition-all outline-none focus:ring-2 focus:ring-primary/50 hover:shadow-lg hover:shadow-primary/20"
    >
      <motion.div
        animate={{ x: isDarkMode ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-white dark:bg-primary rounded-full flex items-center justify-center shadow-md"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {isDarkMode ? (
            <Moon className="w-3.5 h-3.5 text-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-primary" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
