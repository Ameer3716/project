import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderSync as Sync, CheckCircle, AlertCircle, Settings, Plus, Search } from 'lucide-react';

const CRMSync = () => {
  const [syncStatus, setSyncStatus] = useState('connected');
  const [lastSync, setLastSync] = useState('2024-01-15 14:30:00');

  const crmIntegrations = [
    { id: 1, name: 'Salesforce', status: 'connected', contacts: 1247, lastSync: '2 minutes ago' },
    { id: 2, name: 'HubSpot', status: 'connected', contacts: 892, lastSync: '5 minutes ago' },
    { id: 3, name: 'Pipedrive', status: 'disconnected', contacts: 0, lastSync: 'Never' },
    { id: 4, name: 'Zoho CRM', status: 'error', contacts: 456, lastSync: '2 hours ago' },
  ];

  const recentContacts = [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1 (555) 010-1234', source: 'Salesforce', lastCall: '2024-01-15 14:30' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 (555) 020-5678', source: 'HubSpot', lastCall: '2024-01-15 13:45' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', phone: '+1 (555) 030-9012', source: 'Salesforce', lastCall: '2024-01-15 12:20' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 (555) 040-3456', source: 'HubSpot', lastCall: '2024-01-15 11:15' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
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
          <h1 className="text-3xl font-bold text-[#0C0A1D] mb-2">CRM Synchronization</h1>
          <p className="text-gray-600">Manage your CRM integrations and contact synchronization</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Integration
        </motion.button>
      </motion.div>

      {/* Sync Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Contacts</p>
              <p className="text-3xl font-bold text-[#0C0A1D] mt-1">2,595</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Integrations</p>
              <p className="text-3xl font-bold text-[#0C0A1D] mt-1">2</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
              <Sync className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Last Sync</p>
              <p className="text-lg font-bold text-[#0C0A1D] mt-1">2 min ago</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* CRM Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold text-[#0C0A1D] mb-6">CRM Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crmIntegrations.map((crm, index) => (
            <motion.div
              key={crm.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/80 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-[#0C0A1D]">{crm.name}</h4>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crm.status)}`}>
                  {getStatusIcon(crm.status)}
                  {crm.status}
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Contacts:</span>
                  <span className="font-medium">{crm.contacts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Sync:</span>
                  <span className="font-medium">{crm.lastSync}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white text-sm rounded-lg hover:shadow-lg transition-all duration-200">
                  Sync Now
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#0C0A1D]">Recent Contacts</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289] bg-white/80"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Call</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentContacts.map((contact, index) => (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="hover:bg-white/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {contact.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.lastCall}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#E42289] hover:text-[#00FFFF] transition-colors duration-200 mr-3">
                      Call
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      Edit
                    </button>
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

export default CRMSync;