import { Calendar, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: any;
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, currentStatus: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

  return (
    <div className="task-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 text-xs font-medium rounded-full ${
          task.status === 'Done' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
          task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
          'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
        }`}>
          {task.status}
        </div>

        <div className={`px-3 py-1 text-xs font-medium rounded-full ${
          task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
          'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
        }`}>
          {task.priority}
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">{task.title}</h3>
      
      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}

      {task.dueDate && (
        <div className={`flex items-center gap-2 text-sm ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <Calendar size={16} />
          <span>{format(new Date(task.dueDate), 'dd MMM yyyy')}</span>
        </div>
      )}

      <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggleComplete(task._id, task.status)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <CheckCircle size={18} />
          {task.status === 'Done' ? 'Mark Pending' : 'Complete'}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="p-2.5 border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="p-2.5 border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-2xl"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}