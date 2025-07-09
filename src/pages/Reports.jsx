import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'calls', name: 'Call Analytics', icon: FileText },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
  ];

  const metrics = [
    { name: 'Total Calls', value: '1,247', change: '+12%', trend: 'up' },
    { name: 'Success Rate', value: '87%', change: '+5%', trend: 'up' },
    { name: 'Avg Duration', value: '4:32', change: '-8%', trend: 'down' },
    { name: 'Conversion Rate', value: '23%', change: '+15%', trend: 'up' },
  ];

  const callData = [
    { time: '00:00', inbound: 12, outbound: 8 },
    { time: '04:00', inbound: 8, outbound: 5 },
    { time: '08:00', inbound: 45, outbound: 32 },
    { time: '12:00', inbound: 67, outbound: 41 },
    { time: '16:00', inbound: 52, outbound: 38 },
    { time: '20:00', inbound: 28, outbound: 15 },
  ];

  const maxCalls = Math.max(...callData.flatMap(d => [d.inbound, d.outbound]));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#00FFFF] mb-2">Reports</h1>
          <p className=" text-[#E42289]">Analyze your call performance and metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Report Type Tabs */}
      <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedReport(type.id)}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              selectedReport === type.id
                ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white shadow-lg'
                : 'text-gray-600 hover:text-[#0C0A1D]'
            }`}
          >
            <type.icon className="w-4 h-4" />
            {type.name}
          </button>
        ))}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{metric.name}</p>
                <p className="text-3xl font-bold text-[#0C0A1D] mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call Volume Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#0C0A1D]">Call Volume by Hour</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#E42289] rounded-full"></div>
              <span>Inbound</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00FFFF] rounded-full"></div>
              <span>Outbound</span>
            </div>
          </div>
        </div>

        <div className="h-64 flex items-end justify-between space-x-4">
          {callData.map((item, index) => (
            <div key={item.time} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end gap-1 h-48">
                <motion.div
                  className="flex-1 bg-[#E42289] rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.inbound / maxCalls) * 180}px` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                />
                <motion.div
                  className="flex-1 bg-[#00FFFF] rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.outbound / maxCalls) * 180}px` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2 font-medium">{item.time}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Detailed Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#0C0A1D]">Detailed Call Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Calls</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { date: '2024-01-15', calls: 187, success: '89%', duration: '4:32', revenue: '$2,340' },
                { date: '2024-01-14', calls: 156, success: '85%', duration: '4:18', revenue: '$1,980' },
                { date: '2024-01-13', calls: 203, success: '91%', duration: '4:45', revenue: '$2,670' },
                { date: '2024-01-12', calls: 142, success: '82%', duration: '4:12', revenue: '$1,750' },
                { date: '2024-01-11', calls: 178, success: '87%', duration: '4:28', revenue: '$2,230' },
              ].map((row, index) => (
                <motion.tr
                  key={row.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="hover:bg-white/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.calls}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.success}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    {row.revenue}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;