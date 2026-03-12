import { CheckIcon, PencilIcon, TrashIcon, FireIcon } from '../components/icons';
import { useState } from 'react';

export default function HabitItem({ habit, onToggle, onEdit, onDelete }) {
  const today = new Date().toDateString();
  const isCompletedToday = habit.completedDates.includes(today);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] ${
        isCompletedToday ? 'ring-4 ring-green-200/50 dark:rng-green-900/30' : ''
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Streak Badge */}
      {habit.streak > 0 && (
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
          <FireIcon />
          {habit.streak}d streak
        </div>
      )}

      {/* Habit Content */}
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
            {habit.name}
          </h3>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
            isCompletedToday
              ? 'bg-gradient-to-r from-green-300 to-green-400 text-white shadow-green-200/50 hover:from-green-400 hover:to-green-500 hover:shadow-green-300/70'
              : 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-indigo-300/50 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-400/70'
          }`}
        >
          {isCompletedToday ? (
            <>
              <CheckIcon className="w-8 h-8 mr-3 inline" />
              Completed Today
            </>
          ) : (
            <>
              <CheckIcon className="w-8 h-8 mr-3 inline opacity-0 group-hover:opacity-100 transition-opacity" />
              Mark Complete
            </>
          )}
        </button>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={onEdit}
            className="flex-1 p-2 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors"
            title="Edit habit"
          >
            <PencilIcon className="w-5 h-5 mx-auto" />
          </button>
          <button
            onClick={onDelete}
            className="flex-1 p-2 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-700 dark:text-red-300 rounded-lg transition-colors"
            title="Delete habit"
          >
            <TrashIcon className="w-5 h-5 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
