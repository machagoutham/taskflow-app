import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  analytics: any;
}

const COLORS = ['#3b82f6', '#eab308', '#22c55e'];

export default function Analytics({ analytics }: AnalyticsProps) {
  const statusData = analytics.statusCounts.map((item: any) => ({
    name: item._id,
    value: item.count,
  }));

  const priorityData = analytics.priorityCounts.map((item: any) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
          <p className="text-4xl font-semibold mt-2 text-gray-900 dark:text-white">{analytics.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-4xl font-semibold mt-2 text-green-600">{analytics.completed}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-4xl font-semibold mt-2 text-orange-600">{analytics.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completion</p>
          <p className="text-4xl font-semibold mt-2 text-blue-600">{analytics.completionPercentage}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 lg:col-span-2">
        <h3 className="font-semibold mb-4">Tasks by Status</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
        <h3 className="font-semibold mb-4">Priority Distribution</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
            >
              {priorityData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}