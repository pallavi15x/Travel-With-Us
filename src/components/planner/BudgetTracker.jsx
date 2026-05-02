import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { useTrips } from '../../context/TripsContext';

import toast from 'react-hot-toast';

const BudgetTracker = () => {
  const { activeTrip } = useTrips();

  if (!activeTrip) return null;

  const totalBudget = activeTrip.budget;
  
  const totalSpent = useMemo(() => {
    let sum = 0;
    activeTrip.days.forEach(day => {
      day.activities.forEach(activity => {
        sum += parseFloat(activity.cost) || 0;
      });
    });
    return sum;
  }, [activeTrip.days]);

  const remaining = totalBudget - totalSpent;
  const percentageSpent = Math.min((totalSpent / totalBudget) * 100, 100) || 0;

  const isOverBudget = remaining < 0;
  
  useEffect(() => {
    if (isOverBudget) {
      toast.error('Budget Limit Exceeded!', {
        id: 'budget-warning',
        icon: '⚠️',
      });
    }
  }, [isOverBudget]);

  const progressColor = isOverBudget ? 'bg-rose-500' : percentageSpent > 85 ? 'bg-secondary' : 'bg-primary';

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 sticky top-28 transition-all">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-secondary/10 rounded-2xl">
          <PieChart className="w-6 h-6 text-secondary" />
        </div>
        <h3 className="text-2xl font-black text-dark dark:text-white tracking-tighter">Budget Insight</h3>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Target</span>
            <span className="text-dark dark:text-white font-black text-lg">${totalBudget.toLocaleString()}</span>
          </div>
          <DollarSign className="w-5 h-5 text-gray-300" />
        </div>

        <div className="flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Utilized</span>
            <span className="text-secondary font-black text-lg">${totalSpent.toLocaleString()}</span>
          </div>
          <TrendingUp className="w-5 h-5 text-secondary" />
        </div>

        <div className={`flex justify-between items-center p-5 rounded-2xl border-2 transition-all ${
          isOverBudget 
            ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800' 
            : 'bg-primary/5 dark:bg-primary/10 border-transparent'
        }`}>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Balance</span>
            <span className={`font-black text-2xl tracking-tighter ${isOverBudget ? 'text-rose-500' : 'text-primary dark:text-secondary'}`}>
              ${remaining.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 px-1">
        <div className="flex justify-between text-[10px] mb-3 font-black uppercase tracking-widest">
          <span className="text-gray-400">Budget Progress</span>
          <span className={isOverBudget ? 'text-rose-500' : 'text-gray-500'}>
            {percentageSpent.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-4 overflow-hidden p-1 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentageSpent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`} 
          />
        </div>
        {isOverBudget && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-500 text-[10px] mt-4 flex items-center gap-2 font-black uppercase tracking-widest"
          >
            <TrendingUp className="w-4 h-4" /> Warning: Limit Exceeded
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default BudgetTracker;
