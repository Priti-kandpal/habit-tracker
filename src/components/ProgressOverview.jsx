import { CalendarIcon, ChartBarIcon } from '../components/icons';

export default function ProgressOverview({ totalHabits, completedToday, totalStreaks }) {
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Today's Progress */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 dark:border-gray-700/50 group hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
            <CalendarIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedToday}/{totalHabits}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{completionRate}% completed</p>
      </div>

      {/* Total Streaks */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 dark:border-gray-700/50 group hover:shadow-2xl transition-all duration-300 md:col-span-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg">
            <ChartBarIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Streaks</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {totalStreaks} days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
