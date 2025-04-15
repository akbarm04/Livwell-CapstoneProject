import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Trash, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getCategoryColor = (habitName) => {
  const name = habitName.toLowerCase();
  if (name.includes('water') || name.includes('minum')) return '#3B82F6';
  if (name.includes('sleep') || name.includes('tidur')) return '#8B5CF6';
  if (name.includes('exercise') || name.includes('olahraga')) return '#EF4444';
  return '#10B981';
};

// Helper function for box shadow
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const HabitCard = ({ habit, onIncrease, onDecrease, onConfirmDelete, isMainHabit }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const habitColor = habit.color || getCategoryColor(habit.name);
  const isGoalAchieved = parseFloat(habit.current) >= parseFloat(habit.goal);

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => onConfirmDelete(), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl p-5 transition-all duration-300 relative ${
            isMainHabit
              ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'
              : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200'
          }`}
          style={{
            boxShadow: isGoalAchieved
              ? `0 4px 6px -1px rgba(${hexToRgb(habitColor)}, 0.1)`
              : '0 2px 4px rgba(0,0,0,0.05)',
            borderColor: isGoalAchieved ? habitColor : undefined,
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <span
                className={`text-2xl p-2 rounded-full ${
                  isMainHabit ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {habit.icon}
              </span>
              <div>
                <h4
                  className={`text-lg font-semibold ${
                    isMainHabit ? 'text-green-800' : 'text-gray-800'
                  }`}
                >
                  {habit.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {isMainHabit ? 'Essential Habit' : 'Personal Habit'}
                </p>
              </div>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                isMainHabit ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {habit.streak} day streak
            </span>
          </div>

          {/* Progress */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600">
              Progress:{' '}
              <span
                className={`font-medium ${
                  parseFloat(habit.current) === 0
                    ? 'text-gray-400'
                    : isMainHabit
                    ? 'text-green-700'
                    : 'text-gray-700'
                }`}
              >
                {parseFloat(habit.current) || 0} / {parseFloat(habit.goal) || 1} {habit.unit}
              </span>
            </p>
            {isGoalAchieved && (
              <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                <CheckCircle size={14} />
                Goal Achieved
              </div>
            )}
          </div>

          {/* Progress Circle */}
          <div className="flex items-center justify-between mt-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="34" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke={habitColor}
                  strokeWidth="6"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 - (213.6 * habit.progress) / 100}
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div
                className={`absolute inset-0 flex items-center justify-center text-[14px] font-semibold ${
                  isMainHabit ? 'text-green-700' : 'text-gray-700'
                }`}
              >
                {habit.progress}%
              </div>
            </div>

            {/* Increment & Decrement */}
            <div className="flex flex-col gap-2">
              <button
                onClick={onIncrease}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  isMainHabit
                    ? 'bg-green-100 hover:bg-green-200 text-green-700'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                aria-label="Increase"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={onDecrease}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  isMainHabit
                    ? 'bg-green-100 hover:bg-green-200 text-green-700'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                aria-label="Decrease"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Delete button */}
          {!isMainHabit && (
            <div className="mt-5 flex justify-end relative group">
              {!showConfirm ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-white hover:bg-red-400 hover:shadow-sm px-3 py-1.5 rounded-full transition-all duration-200"
                >
                  <Trash size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              ) : (
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleDelete}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="text-sm border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 transition"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HabitCard;
