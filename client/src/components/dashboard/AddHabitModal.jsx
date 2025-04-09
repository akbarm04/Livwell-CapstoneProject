import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AddHabitModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !target || !unit) return;

    const newHabit = {
      name,
      icon: category === 'health' ? '💧' : category === 'sleep' ? '🌙' : '🏁',
      progress: 0,
      goal: `${target} ${unit}`,
      current: '0',
      streak: 0,
    };

    onSave(newHabit);

    // Reset form
    setName('');
    setCategory('');
    setTarget('');
    setUnit('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
          <div className="absolute inset-0 bg-black/10" onClick={onClose}></div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative z-50 bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">Add New Habits</h2>
                <p className="text-sm text-gray-500">Create a new habit to track daily</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nama Habit</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Habit"
                  className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="health">Health</option>
                  <option value="sleep">Sleep</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Daily Target</label>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:outline-none"
                  >
                    <option value="">Select Unit</option>
                    <option value="glasses">glasses</option>
                    <option value="minutes">minutes</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-lime-500 hover:bg-lime-600 text-white font-semibold"
                >
                  Create
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
