import { motion } from 'framer-motion';

export const Loader = () => (
  <div className="flex items-center justify-center p-10">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 h-full animate-pulse">
    <div className="h-64 bg-gray-200 dark:bg-gray-700" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2" />
      <div className="space-y-2 pt-4">
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-full" />
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-5/6" />
      </div>
    </div>
  </div>
);
