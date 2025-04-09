import React, { useState } from 'react';
import { Plus, User, LayoutGrid, BarChart3 } from 'lucide-react';
import AddHabitModal from '../components/dashboard/AddHabitModal';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const [showModal, setShowModal] = useState(false);
  const [habits, setHabits] = useState([
    { name: 'Daily Water', icon: '💧', progress: 63, goal: '8 glasses', current: '5', streak: 3, color: '#3B82F6' },
    { name: 'Sleep', icon: '🌙', progress: 88, goal: '8 hours', current: '7', streak: 6, color: '#8B5CF6' },
    { name: 'Exercise', icon: '🏋️‍♂️', progress: 50, goal: '30 minutes', current: '15', streak: 2, color: '#EF4444' },
    { name: 'Meditation', icon: '🧘‍♂️', progress: 50, goal: '20 minutes', current: '10', streak: 7, color: '#22C55E' },
    { name: 'Drink Water', icon: '💧', progress: 88, goal: '8 glasses', current: '7', streak: 6, color: '#3B82F6' },
  ]);  

  const handleAddHabit = (newHabit) => {
    const defaultColor = getDefaultColor(newHabit.name || '');
  
    setHabits([...habits, { ...newHabit, color: defaultColor }]);
    setShowModal(false);
  };
  

  const handleProgressChange = (index, change) => {
    setHabits((prevHabits) => {
      return prevHabits.map((habit, idx) => {
        if (idx === index) {
          const goalValue = parseFloat(habit.goal);
          let newCurrent = parseFloat(habit.current) + change;

          if (newCurrent < 0) newCurrent = 0;
          if (newCurrent > goalValue) newCurrent = goalValue;

          const newProgress = Math.round((newCurrent / goalValue) * 100);

          return {
            ...habit,
            current: newCurrent.toString(),
            progress: newProgress,
          };
        }
        return habit;
      });
    });
  };

  const getDefaultColor = (name) => {
    name = name.toLowerCase();
    if (name.includes('water')) return '#3B82F6'; // biru
    if (name.includes('sleep') || name.includes('tidur')) return '#8B5CF6'; // ungu
    if (name.includes('exercise') || name.includes('workout')) return '#EF4444'; // merah
    if (name.includes('meditation')) return '#22C55E'; // hijau
    return '#10B981'; // warna default hijau toska
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold text-green-500">Today</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-green-100"
          >
            <Plus size={16} /> Add Habit
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-1">Welcome to LivWell</h2>
      <p className="text-gray-500 mb-6">{today}</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Completion Rate</p>
          <p className="text-2xl font-bold">0%</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Total Streak Days</p>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Longest Streak</p>
          <p className="text-2xl font-bold">7 days</p>
        </div>
      </div>

      {/* Habit Control */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Your Habits</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border bg-white hover:bg-gray-100">
            <LayoutGrid size={16} /> Grid
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border bg-white hover:bg-gray-100">
            <BarChart3 size={16} /> Stats
          </button>
        </div>
      </div>

      {/* Habits List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {habits.map((habit, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 relative">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="text-xl">{habit.icon}</span>
                <h4 className="text-md font-semibold">{habit.name}</h4>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{habit.streak} day streak</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Progress: {habit.current} / {habit.goal}</p>

            {/* Progress Circle */}
            <div className="flex items-center justify-between mt-3">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={habit.color}
                    strokeWidth="6"
                    strokeDasharray={176}
                    strokeDashoffset={176 - (176 * habit.progress / 100)}
                    fill="none"
                    strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                  {habit.progress}%
                </div>
              </div>

              {/* Up & Down Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleProgressChange(idx, 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronUp size={16} />
                </button>

                <button
                  onClick={() => handleProgressChange(idx, -1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to Open Modal */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-center"
      >
        + Add New Habit
      </button>

      {/* Modal Component */}
      <AddHabitModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddHabit}
      />
    </div>
  );
};

export default Dashboard;