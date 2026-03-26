import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface AnalyticsProps {
  analytics: any;
}

const STATUS_COLORS: { [key: string]: string } = {
  'Todo': '#64748b',
  'In Progress': '#3b82f6',
  'Done': '#22c55e',
};

const PRIORITY_COLORS = ['#22c55e', '#eab308', '#ef4444']; // Low → Medium → High

export default function Analytics({ analytics }: AnalyticsProps) {
  const statusData = Array.isArray(analytics?.statusCounts) ? analytics.statusCounts : [];
  const priorityData = Array.isArray(analytics?.priorityCounts) ? analytics.priorityCounts : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
          <p className="text-4xl font-semibold mt-2 text-gray-900 dark:text-white">{analytics?.total || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-4xl font-semibold mt-2 text-green-600">{analytics?.completed || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-4xl font-semibold mt-2 text-orange-600">{analytics?.pending || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completion</p>
          <p className="text-4xl font-semibold mt-2 text-blue-600">{analytics?.completionPercentage || 0}%</p>
        </div>
      </div>

      {/* Bar Chart - Tasks by Status */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 lg:col-span-2">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Tasks by Status</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={statusData}>
            <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 13 }} />
            <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 13 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '12px', 
                color: '#fff' 
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {statusData.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={STATUS_COLORS[entry._id] || '#3b82f6'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Priority Distribution */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Priority Distribution</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              dataKey="count"
              nameKey="_id"
            >
              {priorityData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '12px', 
                color: '#fff' 
              }} 
            />
            <Legend verticalAlign="bottom" height={40} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}