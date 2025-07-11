import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Clock, Users, TrendingUp, Activity, Zap, Brain } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [selectedClient, setSelectedClient] = useState('all');
  const [animatedNumbers, setAnimatedNumbers] = useState({
    totalCalls: 0,
    appointments: 0,
    avgDuration: 0,
    activeConnections: 0,
    teamScore: 0,
    aiLevel: 0
  });

  const clients = [
    { id: 'all', name: 'All Clients' },
    { id: 'client1', name: 'TechCorp Inc.' },
    { id: 'client2', name: 'HealthPlus' },
    { id: 'client3', name: 'RetailMax' }
  ];

  const getKPIData = () => {
    const baseData = {
      pro: {
        totalCalls: 1247,
        appointments: 89,
        avgDuration: 4.2,
        activeConnections: 8,
        maxConnections: 10
      },
      growth: {
        totalCalls: 3456,
        appointments: 234,
        avgDuration: 5.1,
        activeConnections: 18,
        maxConnections: 25,
        teamScore: 87,
        aiLevel: 92
      },
      agency: {
        totalCalls: 12847,
        appointments: 1089,
        avgDuration: 6.3,
        activeConnections: 156,
        maxConnections: 'Unlimited',
        teamScore: 94,
        aiLevel: 98
      }
    };
    return baseData[user?.subscriptionPlan] || baseData.pro;
  };

  const data = getKPIData();

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedNumbers({
          totalCalls: Math.floor(data.totalCalls * easeOut),
          appointments: Math.floor(data.appointments * easeOut),
          avgDuration: (data.avgDuration * easeOut).toFixed(1),
          activeConnections: Math.floor(data.activeConnections * easeOut),
          teamScore: Math.floor((data.teamScore || 0) * easeOut),
          aiLevel: Math.floor((data.aiLevel || 0) * easeOut)
        });

        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    animateNumbers();
  }, [user?.subscriptionPlan, selectedClient]);

  const chartData = [
    { day: 'Mon', calls: 45 },
    { day: 'Tue', calls: 52 },
    { day: 'Wed', calls: 38 },
    { day: 'Thu', calls: 61 },
    { day: 'Fri', calls: 55 },
    { day: 'Sat', calls: 28 },
    { day: 'Sun', calls: 33 }
  ];

  const maxCalls = Math.max(...chartData.map(d => d.calls));

  return (
    <div className="space-y-8 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-between items-center relative"
      >
        <div className="relative">
          <motion.h1 
            className="text-4xl font-bold text-[#00FFFF]"
            animate={{
              textShadow: [
                '0 0 20px rgba(228, 34, 137, 0.5)',
                '0 0 30px rgba(0, 255, 255, 0.5)',
                '0 0 20px rgba(228, 34, 137, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Dashboard Overview
          </motion.h1>
          <motion.p 
            className="text-white/90 font-medium mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome back, {user?.name?.split(' ')[0]}! Here's your{' '}
            <span className="font-semibold bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">
              {user?.subscriptionPlan}
            </span>{' '}
            dashboard.
          </motion.p>
          
          {/* Decorative Line */}
          <motion.div
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
        
        {user?.subscriptionPlan === 'agency' && (
          <motion.select
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="px-6 py-3 bg-gradient-to-br from-[#E42289] to-[#00FFFF] backdrop-blur-sm border border-white/30 text-[#F0F0F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E42289] font-semibold shadow-lg"
          >
            {clients.map(client => (
              <option key={client.id} value={client.id} className="bg-black text-white">
                {client.name}
              </option>
            ))}
          </motion.select>
        )}
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Calls */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F0F0F0]/80 text-sm font-bold">Total Calls</p>
                <motion.p 
                  className="text-3xl font-bold text-[#F0F0F0] mt-1"
                  key={animatedNumbers.totalCalls}
                >
                  {animatedNumbers.totalCalls.toLocaleString()}
                </motion.p>
              </div>
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(228, 34, 137, 0.3)',
                    '0 0 30px rgba(0, 255, 255, 0.3)',
                    '0 0 20px rgba(228, 34, 137, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Appointments Set */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F0F0F0]/80 text-sm font-bold">Appointments Set</p>
                <motion.p 
                  className="text-3xl font-bold text-[#F0F0F0] mt-1"
                  key={animatedNumbers.appointments}
                >
                  {animatedNumbers.appointments}
                </motion.p>
              </div>
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-[#00FFFF] to-purple-500 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: -5 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                    '0 0 30px rgba(147, 51, 234, 0.3)',
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Calendar className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Avg Call Duration */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-[#E42289]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F0F0F0]/80 text-sm font-bold">Avg Call Duration</p>
                <motion.p 
                  className="text-3xl font-bold text-[#F0F0F0] mt-1"
                  key={animatedNumbers.avgDuration}
                >
                  {animatedNumbers.avgDuration}m
                </motion.p>
              </div>
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-[#E42289] rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Active Connections */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-[#00FFFF]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F0F0F0]/80 text-sm font-bold">Active Connections</p>
                <motion.p 
                  className="text-3xl font-bold text-[#F0F0F0] mt-1"
                  key={animatedNumbers.activeConnections}
                >
                  {animatedNumbers.activeConnections}
                  {data.maxConnections !== 'Unlimited' && `/${data.maxConnections}`}
                </motion.p>
                {data.maxConnections === 'Unlimited' && (
                  <motion.p 
                    className="text-sm font-semibold bg-gradient-to-r from-emerald-500 to-[#00FFFF] bg-clip-text text-transparent"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Unlimited
                  </motion.p>
                )}
              </div>
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-[#00FFFF] rounded-xl flex items-center justify-center relative"
                whileHover={{ scale: 1.1 }}
              >
                <Activity className="w-7 h-7 text-white" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-[#00FFFF]/30 rounded-xl"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Growth and Agency additional KPIs */}
        {(user?.subscriptionPlan === 'growth' || user?.subscriptionPlan === 'agency') && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#F0F0F0]/80 text-sm font-bold">Team Productivity</p>
                    <motion.p 
                      className="text-3xl font-bold text-[#F0F0F0] mt-1"
                      key={animatedNumbers.teamScore}
                    >
                      {animatedNumbers.teamScore}%
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#F0F0F0]/80 text-sm font-bold">AI Customization</p>
                    <motion.p 
                      className="text-3xl font-bold text-[#F0F0F0] mt-1"
                      key={animatedNumbers.aiLevel}
                    >
                      {animatedNumbers.aiLevel}%
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      filter: [
                        'hue-rotate(0deg)',
                        'hue-rotate(360deg)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Brain className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#E42289]/10 to-[#00FFFF]/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
        <div className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-3xl p-8 shadow-2xl">
          <motion.h3 
            className="text-2xl font-bold text-[#F0F0F0] mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>
            Call Volume - Last 7 Days
          </motion.h3>
          
          <div className="h-80 flex items-end justify-between space-x-4">
            {chartData.map((item, index) => (
              <motion.div
                key={item.day}
                className="flex flex-col items-center flex-1"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className="w-full bg-gradient-to-t from-[#E42289] via-purple-500 to-[#00FFFF] rounded-t-xl relative overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.calls / maxCalls) * 250}px` }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Animated Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: 1.5 + index * 0.2,
                      repeatDelay: 3 
                    }}
                    style={{ width: '50%' }}
                  />
                  
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm font-bold text-[#F0F0F0] bg-rgba(22, 21, 48, 0.8) backdrop-blur-sm px-3 py-1 rounded-full border border-[#E42289]/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                  >
                    {item.calls}
                  </motion.div>
                </motion.div>
                <motion.p 
                  className="text-sm text-[#F0F0F0] mt-4 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  {item.day}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;