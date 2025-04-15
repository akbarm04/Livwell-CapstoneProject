import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const getCategoryColor = (category) => {
  switch (category) {
    case 'health': return '#3B82F6';    // Water
    case 'sleep': return '#8B5CF6';     // Sleep
    case 'exercise': return '#EF4444';  // Exercise
    default: return '#10B981';          // Default
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'health': return '💧';
    case 'sleep': return '🌙';
    case 'exercise': return '🏋️';
    default: return '✨';
  }
};

const AddHabitModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');
  const [errors, setErrors] = useState({});

  const handleCategoryChange = (value) => {
    setCategory(value);
    setErrors({...errors, category: null});
    
    switch (value) {
      case 'health':
        setUnit('glasses');
        break;
      case 'sleep':
        setUnit('hours');
        break;
      case 'exercise':
        setUnit('minutes');
        break;
      default:
        setUnit('');
    }
  };

  const getDefaultColorByCategory = (category) => {
    switch (category) {
      case 'health': return '#3B82F6';    // Water
      case 'sleep': return '#8B5CF6';     // Sleep
      case 'exercise': return '#EF4444';  // Exercise
      default: return '#10B981';          // Default
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Habit name is required';
    if (!category) newErrors.category = 'Please select a category';
    if (!target || isNaN(target) || target <= 0) {
      newErrors.target = 'Please enter a valid positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTargetChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 1000)) {
      setTarget(value);
      setErrors({...errors, target: null});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newHabit = {
      name,
      icon: getCategoryIcon(category),
      progress: 0,
      goal: `${target} ${unit}`,
      current: '0',
      streak: 0,
      color: getCategoryColor(category),
      unit
    };

    onSave(newHabit);

    setName('');
    setCategory('');
    setTarget('');
    setUnit('');
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div 
            className="absolute inset-0 bg-black/30 transition-opacity duration-300"
            onClick={onClose}
          ></div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-50 bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Create New Habit</h2>
                <p className="text-sm text-gray-500 mt-1">Track your daily progress towards better habits</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Habit Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({...errors, name: null});
                  }}
                  placeholder="e.g. Morning Jog, Water Intake"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-300 focus:ring-red-200 bg-red-50' : 
                    'border-gray-300 focus:ring-blue-200 bg-gray-50'
                  }`}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.category ? 'border-red-300 focus:ring-red-200 bg-red-50' : 
                    'border-gray-300 focus:ring-blue-200 bg-gray-50'
                  }`}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="health">💧 Water</option>
                  <option value="sleep">🌙 Sleep</option>
                  <option value="exercise">🏋️ Exercise</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Target</label>
                  <input
                    type="number"
                    value={target}
                    onChange={handleTargetChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.target ? 'border-red-300 focus:ring-red-200 bg-red-50' : 
                      'border-gray-300 focus:ring-blue-200 bg-gray-50'
                    }`}
                    placeholder="0"
                    required
                    min="1"
                    step="1"
                  />
                  {errors.target && (
                    <p className="mt-1 text-sm text-red-500">{errors.target}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={unit}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-colors shadow-sm"
                >
                  Create Habit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddHabitModal;