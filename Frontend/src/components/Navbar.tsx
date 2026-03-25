import { LogOut, Moon, Sun, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onNewTask: () => void;
}

export default function Navbar({ onNewTask }: NavbarProps) {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
    setIsDark(!isDark);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">TaskFlow</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Stay organized</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onNewTask}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95"
          >
            <Plus size={18} />
            New Task
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
            <div className="text-right">
              <div className="font-medium text-sm text-gray-900 dark:text-white">{user?.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}