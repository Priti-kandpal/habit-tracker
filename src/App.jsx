import { useState, useEffect } from 'react';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import ProgressOverview from './components/ProgressOverview';
import { SunIcon, MoonIcon } from './components/icons';

function App() {
  const [habits, setHabits] = useState([]); 

  // Validate habits: ensure each has id and name
  const validateHabits = (habitsArray) => 
    habitsArray.filter(h => h && typeof h === 'object' && h.id && typeof h.name === 'string');
  const [darkMode, setDarkMode] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('habits');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validHabits = validateHabits(Array.isArray(parsed) ? parsed : []);
        setHabits(validHabits);
        if (parsed.length !== validHabits.length) {
          console.warn('Cleared invalid habits from localStorage');
          localStorage.setItem('habits', JSON.stringify(validHabits));
        }
      } catch (e) {
        console.error('Invalid localStorage data, clearing:', e);
        localStorage.removeItem('habits');
        setHabits([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [habits, darkMode]);

  const addHabit = (newHabitData) => {
    const newHabit = {
      ...newHabitData,
      streak: 0,
      completedDates: [],
      lastCompleted: null
    };
    const updated = [...habits, newHabit].map(h => validateHabits([h])[0] || h);
    setHabits(updated);
    setShowForm(false);
  };

  const updateHabit = (newHabitData) => {
    setHabits(habits.map(h => h.id === newHabitData.id ? {...h, name: newHabitData.name} : h));
    setEditingHabit(null);
    setShowForm(false);
  };

  const toggleComplete = (id) => {
    const today = new Date().toDateString();
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        let newCompletedDates = [...habit.completedDates];
        let streak = habit.streak;
        const lastCompleted = habit.lastCompleted;

        if (newCompletedDates.includes(today)) {
          newCompletedDates = newCompletedDates.filter(date => date !== today);
          if (lastCompleted === today) {
            streak = Math.max(0, streak - 1);
          }
        } else {
          newCompletedDates.push(today);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastCompleted === yesterday.toDateString() || (streak > 0 && habit.completedDates.includes(yesterday.toDateString()))) {
            streak += 1;
          } else {
            streak = 1;
          }
        }

        return {
          ...habit,
          completedDates: newCompletedDates,
          streak,
          lastCompleted: today
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedDates.includes(new Date().toDateString())).length;
  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Habit Tracker
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl"
              title="Toggle dark mode"
            >
{darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingHabit(null);
              }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              + Add Habit
            </button>
          </div>
        </header>

        {/* Progress Overview */}
        <ProgressOverview 
          totalHabits={totalHabits}
          completedToday={completedToday}
          totalStreaks={totalStreaks}
        />

        {/* Habits List */}
        <HabitList 
          habits={habits}
          onToggle={toggleComplete}
          onEdit={setEditingHabit}
          onDelete={deleteHabit}
        />

        {/* Add/Edit Form Modal */}
{(showForm || editingHabit) && (
          <HabitForm
            editingHabit={editingHabit}
            onClose={() => {
              setShowForm(false);
              setEditingHabit(null);
            }}
            onSave={editingHabit ? updateHabit : addHabit}
          />

        )}
      </div>
    </div>
  );
}

export default App;
