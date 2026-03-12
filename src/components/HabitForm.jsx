import { useState, useEffect } from 'react';
import { XIcon } from '../components/icons';

export default function HabitForm({ editingHabit, onClose, onSave }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
    } else {
      setName('');
    }
    setError('');
  }, [editingHabit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }
    if (name.trim().length < 2) {
      setError('Habit name must be at least 2 characters');
      return;
    }
    onSave({
      id: editingHabit?.id || Date.now(),
      name: name.trim()
    });

  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in duration-200">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingHabit ? 'Edit Habit' : 'Add New Habit'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
{error && (
            <div className="p-4 bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800/50 rounded-xl text-red-800 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-lg font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 focus:border-indigo-400 transition-all duration-200"
              placeholder="e.g., Drink 2L water, Exercise 30min"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center"
            >
              {editingHabit ? 'Update Habit' : 'Add Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
