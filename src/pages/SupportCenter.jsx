import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, MessageCircle, Phone, Mail, Clock, CheckCircle, AlertCircle, Star } from 'lucide-react';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [newTicket, setNewTicket] = useState({ subject: '', priority: 'medium', description: '' });

  const supportTickets = [
    { id: 1, subject: 'API Integration Issue', priority: 'high', status: 'open', created: '2024-01-15 10:30', agent: 'Sarah Johnson' },
    { id: 2, subject: 'Call Quality Concerns', priority: 'medium', status: 'in-progress', created: '2024-01-14 15:45', agent: 'Mike Wilson' },
    { id: 3, subject: 'Billing Question', priority: 'low', status: 'resolved', created: '2024-01-13 09:20', agent: 'Emily Davis' },
    { id: 4, subject: 'Feature Request', priority: 'medium', status: 'open', created: '2024-01-12 14:10', agent: 'James Brown' },
  ];

  const supportChannels = [
    { 
      type: 'priority', 
      title: 'Priority Phone Support', 
      description: '24/7 dedicated phone line for urgent issues',
      contact: '+1 (800) 555-CALL',
      icon: Phone,
      available: true
    },
    { 
      type: 'chat', 
      title: 'Live Chat Support', 
      description: 'Real-time chat with our support team',
      contact: 'Start Chat',
      icon: MessageCircle,
      available: true
    },
    { 
      type: 'email', 
      title: 'Email Support', 
      description: 'Detailed support via email',
      contact: 'agency@callease.com',
      icon: Mail,
      available: true
    },
  ];

  const knowledgeBase = [
    { id: 1, title: 'Getting Started with CallEase Agency', category: 'Setup', views: 1247 },
    { id: 2, title: 'Managing Multiple Client Accounts', category: 'Account Management', views: 892 },
    { id: 3, title: 'White-Label Configuration Guide', category: 'Branding', views: 756 },
    { id: 4, title: 'Advanced Analytics Setup', category: 'Analytics', views: 634 },
    { id: 5, title: 'API Documentation', category: 'Development', views: 523 },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
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
          <h1 className="text-3xl font-bold text-[#00FFFF] mb-2">Support Center</h1>
          <p className="text-[#E42289]">Priority support for agency partners</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg">
          <Star className="w-4 h-4" />
          <span className="font-semibold">Agency Priority</span>
        </div>
      </motion.div>

      {/* Support Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {supportChannels.map((channel, index) => (
          <motion.div
            key={channel.type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                <channel.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0C0A1D]">{channel.title}</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-600">Available</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{channel.description}</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              {channel.contact}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1">
        {['tickets', 'knowledge-base', 'new-ticket'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 capitalize ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white shadow-lg'
                : 'text-gray-600 hover:text-[#0C0A1D]'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {activeTab === 'tickets' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-[#0C0A1D]">Support Tickets</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {supportTickets.map((ticket, index) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-white/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                        <div className="text-sm text-gray-500">{ticket.subject}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.created}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.agent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-[#E42289] hover:text-[#00FFFF] transition-colors duration-200">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'knowledge-base' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#0C0A1D] mb-6">Knowledge Base</h3>
          <div className="space-y-4">
            {knowledgeBase.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-all duration-200 cursor-pointer"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-[#0C0A1D] mb-1">{article.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {article.category}
                    </span>
                    <span>{article.views} views</span>
                  </div>
                </div>
                <div className="text-[#E42289] hover:text-[#00FFFF] transition-colors duration-200">
                  →
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'new-ticket' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#0C0A1D] mb-6">Create New Support Ticket</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289] resize-none"
                placeholder="Please provide detailed information about your issue..."
              />
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Submit Ticket
              </motion.button>
              <button
                onClick={() => setNewTicket({ subject: '', priority: 'medium', description: '' })}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SupportCenter;