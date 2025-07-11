import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Phone, 
  Clock, 
  Target,
  Calendar,
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('7d');

  // Sample data
  const callVolumeData = [
    { date: 'Jan 8', totalCalls: 45, avgDuration: 4.2 },
    { date: 'Jan 9', totalCalls: 52, avgDuration: 3.8 },
    { date: 'Jan 10', totalCalls: 38, avgDuration: 5.1 },
    { date: 'Jan 11', totalCalls: 61, avgDuration: 4.7 },
    { date: 'Jan 12', totalCalls: 49, avgDuration: 3.9 },
    { date: 'Jan 13', totalCalls: 67, avgDuration: 4.3 },
    { date: 'Jan 14', totalCalls: 58, avgDuration: 4.8 },
  ];

  const callOutcomesData = [
    { name: 'Appointment Booked', value: 35, color: '#00FFFF' },
    { name: 'Lead Captured', value: 28, color: '#E42289' },
    { name: 'Query Resolved', value: 22, color: '#9333EA' },
    { name: 'Follow-up Required', value: 15, color: '#F59E0B' },
  ];

  const busiestHoursData = [
    { hour: '9 AM', calls: 12 },
    { hour: '10 AM', calls: 18 },
    { hour: '11 AM', calls: 25 },
    { hour: '12 PM', calls: 22 },
    { hour: '1 PM', calls: 15 },
    { hour: '2 PM', calls: 28 },
    { hour: '3 PM', calls: 32 },
    { hour: '4 PM', calls: 24 },
    { hour: '5 PM', calls: 16 },
  ];

  const kpiData = [
    {
      title: 'Total Calls Handled',
      value: '1,247',
      change: '+15%',
      trend: 'up',
      icon: Phone,
      color: '#00FFFF'
    },
    {
      title: 'Average Call Duration',
      value: '4.2 min',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: '#E42289'
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: '#9333EA'
    },
    {
      title: 'Appointments Booked',
      value: '342',
      change: '+23%',
      trend: 'up',
      icon: Calendar,
      color: '#F59E0B'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-[#00FFFF]/30 rounded-lg p-3">
          <p className="text-[#F0F0F0] font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-[#E42289] mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-[#00FFFF]/80">
            Performance Metrics & Intelligence Center
          </p>
        </div>
        
        {/* Date Range Picker */}
        <div className="flex items-center gap-2">
          <Filter className="text-white/60 " size={20} />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gradient-to-br from-[#E42289] to-[#00FFFF] backdrop-blur-sm border border-white/20 rounded-lg text-[#F0F0F0] focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
          >
            <option value="7d" className="bg-black/80">Last 7 Days</option>
            <option value="30d" className="bg-black/80">Last 30 Days</option>
            <option value="90d" className="bg-black/80">Last 90 Days</option>
          </select>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${kpi.color}20` }}
              >
                <kpi.icon className="text-white" size={24} style={{ color: kpi.color }} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {kpi.change}
              </div>
            </div>
            <div>
              <div 
                className="text-3xl font-bold mb-1"
                style={{ color: kpi.color }}
              >
                {kpi.value}
              </div>
              <div className="text-white/60 text-sm">
                {kpi.title}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-[#F0F0F0]">
            Call Volume & Duration Over Time
          </h2>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(240,240,240,0.8)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="calls"
                stroke="rgba(240,240,240,0.8)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="duration"
                orientation="right"
                stroke="rgba(240,240,240,0.8)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="calls"
                type="monotone"
                dataKey="totalCalls"
                stroke="#00FFFF"
                strokeWidth={3}
                dot={{ fill: '#00FFFF', strokeWidth: 2, r: 6 }}
                name="Total Calls"
                animationDuration={2000}
              />
              <Line
                yAxisId="duration"
                type="monotone"
                dataKey="avgDuration"
                stroke="#E42289"
                strokeWidth={3}
                dot={{ fill: '#E42289', strokeWidth: 2, r: 6 }}
                name="Avg Duration (min)"
                animationDuration={2000}
                animationDelay={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Donut Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Call Outcomes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-[#F0F0F0] mb-6">
            Call Outcomes
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={callOutcomesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {callOutcomesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {callOutcomesData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white/80 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Busiest Hours */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-[#F0F0F0] mb-6">
            Busiest Hours
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={busiestHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="hour" 
                  stroke="rgba(240,240,240,0.8)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(240,240,240,0.8)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="calls"
                  stroke="#9333EA"
                  fill="url(#colorGradient)"
                  strokeWidth={2}
                  animationDuration={2000}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333EA" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9333EA" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsPage;