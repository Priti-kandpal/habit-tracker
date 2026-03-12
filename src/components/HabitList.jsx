import HabitItem from './HabitItem';

export default function HabitList({ habits, onToggle, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      {habits.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 opacity-20">📝</div>
          <h3 className="text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
            No habits yet
          </h3>
          <p className="text-gray-400">
            Add your first habit to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {habits.map(habit => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={() => onToggle(habit.id)}
              onEdit={() => onEdit(habit)}
              onDelete={() => onDelete(habit.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
