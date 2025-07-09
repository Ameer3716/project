import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Phone, Clock, Activity, MessageCircle } from 'lucide-react';

const TeamHub = () => {
  const [activeTab, setActiveTab] = useState('members');

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Senior Agent', status: 'online', avatar: 'SJ', calls: 23, queue: 'Sales' },
    { id: 2, name: 'Mike Wilson', role: 'Agent', status: 'on-call', avatar: 'MW', calls: 18, queue: 'Support' },
    { id: 3, name: 'Emily Davis', role: 'Team Lead', status: 'online', avatar: 'ED', calls: 31, queue: 'Sales' },
    { id: 4, name: 'James Brown', role: 'Agent', status: 'offline', avatar: 'JB', calls: 12, queue: 'Support' },
  ];

  const callQueues = [
    { id: 1, name: 'Sales', agents: 3, waiting: 5, avgWait: '2:30' },
    { id: 2, name: 'Support', agents: 2, waiting: 2, avgWait: '1:45' },
    { id: 3, name: 'Follow-up', agents: 1, waiting: 8, avgWait: '4:15' },
  ];

  const activityFeed = [
    { id: 1, type: 'call', agent: 'Sarah Johnson', action: 'answered call from', target: '+1 (555) 010-1234', time: '2 min ago' },
    { id: 2, type: 'queue', agent: 'Mike Wilson', action: 'joined queue', target: 'Support', time: '5 min ago' },
    { id: 3, type: 'call', agent: 'Emily Davis', action: 'completed call with', target: '+1 (555) 020-5678', time: '8 min ago' },
    { id: 4, type: 'status', agent: 'James Brown', action: 'went offline', target: '', time: '12 min ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'on-call': return 'bg-[#E42289]';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'queue': return <Users className="w-4 h-4" />;
      case 'status': return <Activity className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#0C0A1D] mb-2">Team Hub</h1>
          <p className="text-gray-600">Manage your team and call queues</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
        >
          <UserPlus className="w-4 h-4" />
          Add Team Member
        </motion.button>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1">
        {['members', 'queues', 'activity'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 capitalize ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white shadow-lg'
                : 'text-gray-600 hover:text-[#0C0A1D]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'members' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center text-white font-bold">
                    {member.avatar}
                  </div>
                  <motion.div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}
                    animate={member.status === 'on-call' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0C0A1D]">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-xs text-gray-500 capitalize">{member.status}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Calls Today:</span>
                  <span className="font-semibold text-[#0C0A1D]">{member.calls}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Queue:</span>
                  <span className="px-2 py-1 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 text-[#0C0A1D] text-xs font-medium rounded-full">
                    {member.queue}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white text-sm rounded-lg hover:shadow-lg transition-all duration-200">
                  Message
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'queues' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {callQueues.map((queue, index) => (
              <motion.div
                key={queue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0C0A1D]">{queue.name}</h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Agents:</span>
                    <span className="font-semibold text-[#0C0A1D]">{queue.agents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Waiting Calls:</span>
                    <span className="font-semibold text-[#0C0A1D]">{queue.waiting}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Wait Time:</span>
                    <span className="font-semibold text-[#0C0A1D]">{queue.avgWait}</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg hover:shadow-lg transition-all duration-200">
                  Manage Queue
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'activity' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#0C0A1D] mb-6">Live Team Activity</h3>
          <div className="space-y-4">
            {activityFeed.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center text-white">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#0C0A1D]">
                    <span className="font-semibold">{activity.agent}</span>
                    {' '}{activity.action}{' '}
                    {activity.target && (
                      <span className="font-medium text-[#E42289]">{activity.target}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TeamHub;