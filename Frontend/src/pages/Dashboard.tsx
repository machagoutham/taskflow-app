import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import Analytics from '../components/Analytics';
import { Search, Filter } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        params: {
          search,
          status: statusFilter,
          priority: priorityFilter,
          page,
          limit: 9,
        },
      });
      setTasks(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/tasks/analytics');
      setAnalytics(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchAnalytics();
      setLoading(false);
    }
  }, [user, search, statusFilter, priorityFilter, page]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
      fetchAnalytics();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleToggleComplete = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Done' ? 'Todo' : 'Done';
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
      fetchAnalytics();
    } catch (err) {
      alert('Failed to update');
    }
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleTaskSaved = () => {
    fetchTasks();
    fetchAnalytics();
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onNewTask={() => { setEditingTask(null); setShowForm(true); }} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Analytics Section */}
        {analytics && <Analytics analytics={analytics} />}

        {/* Filters */}
        <div className="mt-10 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <option value="">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
            className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-medium ${
                  p === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No tasks found. Create your first task!
          </div>
        )}
      </div>

      {showForm && (
        <TaskForm
          onClose={() => { setShowForm(false); setEditingTask(null); }}
          onTaskSaved={handleTaskSaved}
          initialData={editingTask}
        />
      )}
    </div>
  );
}