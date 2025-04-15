import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, User, LayoutGrid, BarChart3, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddHabitModal from '../components/dashboard/AddHabitModal';
import HabitCard from '../components/dashboard/HabitCard';
import StatsView from '../components/dashboard/StatsView';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Main fixed habits (cannot be deleted)
const [mainHabits, setMainHabits] = useState([
  { id: 1, name: 'Daily Water', icon: '💧', progress: 0, goal: '8', current: '0', unit: 'glasses', streak: 0, color: '#3B82F6', isMain: true },
  { id: 2, name: 'Night Sleep', icon: '🌙', progress: 0, goal: '8', current: '0', unit: 'hours', streak: 0, color: '#8B5CF6', isMain: true },
  { id: 3, name: 'Exercise', icon: '🏋‍♂', progress: 0, goal: '30', current: '0', unit: 'minutes', streak: 0, color: '#EF4444', isMain: true }
]);

  // User-added habits
  const [userHabits, setUserHabits] = useState([]);

  // Combine habits for stats view
  const allHabits = useMemo(() => [...mainHabits, ...userHabits], [mainHabits, userHabits]);

  const getDefaultColorByCategory = (icon) => {
    switch (icon) {
      case '💧': return '#3B82F6';
      case '🌙': return '#8B5CF6';
      case '🏋':
      case '🏋‍♂': return '#EF4444';
      default: return '#10B981';
    }
  };

  const handleAddHabit = (newHabit) => {
    const defaultColor = getDefaultColorByCategory(newHabit.icon);
    const goalValue = parseFloat(newHabit.goal || '1');
    const currentValue = parseFloat(newHabit.current || '0');
    const progress = Math.round((currentValue / goalValue) * 100);

    const newId = Date.now();
    setUserHabits([
      ...userHabits,
      {
        ...newHabit,
        id: newId,
        color: defaultColor,
        progress,
        streak: 0,
        unit: newHabit.unit || 'times',
        isMain: false
      },
    ]);
    setShowModal(false);
  };

  const handleProgressChange = (habitId, change, isMain) => {
    const updateHabits = (habits) => 
      habits.map((habit) => {
        if (habit.id === habitId) {
          const goalValue = parseFloat(habit.goal);
          let newCurrent = parseFloat(habit.current) + change;
          if (newCurrent < 0) newCurrent = 0;
          if (newCurrent > goalValue) newCurrent = goalValue;

          const newProgress = Math.round((newCurrent / goalValue) * 100);
          const isCompleted = newCurrent >= goalValue;
          const newStreak = isCompleted ? habit.streak + 1 : 0;

          return {
            ...habit,
            current: newCurrent.toString(),
            progress: newProgress,
            streak: newStreak,
          };
        }
        return habit;
      });

    if (isMain) {
      setMainHabits(updateHabits(mainHabits));
    } else {
      setUserHabits(updateHabits(userHabits));
    }
  };

  const handleDeleteHabit = (habitId) => {
    setUserHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
  };

  const calculateCompletionRate = useMemo(() => {
    if (allHabits.length === 0) return 0;
    const completed = allHabits.filter((habit) => parseFloat(habit.current) >= parseFloat(habit.goal)).length;
    return Math.round((completed / allHabits.length) * 100);
  }, [allHabits]);

  const calculateTotalStreak = useMemo(() => {
    return allHabits.reduce((total, habit) => total + habit.streak, 0);
  }, [allHabits]);

  const calculateLongestStreak = useMemo(() => {
    if (allHabits.length === 0) return 0;
    return Math.max(...allHabits.map((habit) => habit.streak));
  }, [allHabits]);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold text-green-500">Today</h1>
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setShowModal(true)} 
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors"
          >
            <Plus size={16} /> Add Habit
          </button>

          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-green-100 transition-colors">
            <Bell size={16} />
          </div>

          {/* User Icon with Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <div 
              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-green-100 transition-colors" 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              title="User"
            >
              <User size={16} className="text-gray-800" />
            </div>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-1">Welcome to LivWell</h2>
      <p className="text-gray-500 mb-6">{today}</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500">Completion Rate</p>
          <p className="text-2xl font-bold">{calculateCompletionRate}%</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500">Total Streak Days</p>
          <p className="text-2xl font-bold">{calculateTotalStreak}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500">Longest Streak</p>
          <p className="text-2xl font-bold">{calculateLongestStreak} days</p>
        </div>
      </div>

      {/* View Mode Switch */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowStats(false)} 
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md border ${!showStats ? 'bg-green-100' : 'bg-white'} hover:bg-green-100 transition-colors`}
          >
            <LayoutGrid size={16} /> Grid
          </button>
          <button 
            onClick={() => setShowStats(true)} 
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md border ${showStats ? 'bg-green-100' : 'bg-white'} hover:bg-green-100 transition-colors`}
          >
            <BarChart3 size={16} /> Stats
          </button>
        </div>
      </div>

     {/* Habit Content */}
      {showStats ? (
        <StatsView habits={allHabits} />
      ) : (
        <>
          {/* Main Habits Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Core Habits</h4>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Main Habits
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mainHabits.map((habit) => (
                <HabitCard 
                  key={habit.id} 
                  habit={habit} 
                  onIncrease={() => handleProgressChange(habit.id, 1, true)} 
                  onDecrease={() => handleProgressChange(habit.id, -1, true)} 
                  onConfirmDelete={null}
                  isMainHabit={true}
                />
              ))}
            </div>
          </div>

          {/* User Habits Section */}
          {userHabits.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Your Custom Habits</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {userHabits.length} Added
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userHabits.map((habit) => (
                  <HabitCard 
                    key={habit.id} 
                    habit={habit} 
                    onIncrease={() => handleProgressChange(habit.id, 1, false)} 
                    onDecrease={() => handleProgressChange(habit.id, -1, false)} 
                    onConfirmDelete={() => handleDeleteHabit(habit.id)}
                    isMainHabit={false}
                  />
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => setShowModal(true)} 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-center transition-colors shadow-sm hover:shadow-md"
          >
            + Add New Habit
          </button>
        </>
      )}
      <AddHabitModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleAddHabit} />
    </div>
  );
};

export default Dashboard;