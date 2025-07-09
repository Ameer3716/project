import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, UserPlus, Settings, Users, Key, Eye } from 'lucide-react';

const AgentManagement = () => {
  const [selectedClient, setSelectedClient] = useState('all');
  const [activeTab, setActiveTab] = useState('agents');

  const clients = [
    { id: 'all', name: 'All Clients' },
    { id: 'client1', name: 'TechCorp Inc.' },
    { id: 'client2', name: 'HealthPlus' },
    { id: 'client3', name: 'RetailMax' }
  ];

  const agents = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@callease.com', role: 'Senior Agent', client: 'TechCorp Inc.', permissions: ['calls', 'reports', 'settings'], status: 'active' },
    { id: 2, name: 'Mike Wilson', email: 'mike@callease.com', role: 'Agent', client: 'HealthPlus', permissions: ['calls', 'reports'], status: 'active' },
    { id: 3, name: 'Emily Davis', email: 'emily@callease.com', role: 'Team Lead', client: 'RetailMax', permissions: ['calls', 'reports', 'settings', 'users'], status: 'active' },
    { id: 4, name: 'James Brown', email: 'james@callease.com', role: 'Agent', client: 'TechCorp Inc.', permissions: ['calls'], status: 'inactive' },
  ];

  const permissions = [
    { id: 'calls', name: 'Call Management', description: 'Make and receive calls' },
    { id: 'reports', name: 'View Reports', description: 'Access analytics and reports' },
    { id: 'settings', name: 'System Settings', description: 'Modify system configuration' },
    { id: 'users', name: 'User Management', description: 'Manage team members' },
    { id: 'billing', name: 'Billing Access', description: 'View billing information' },
  ];

  const subAccounts = [
    { id: 1, name: 'TechCorp Sales Team', agents: 5, calls: 1247, status: 'active' },
    { id: 2, name: 'HealthPlus Support', agents: 3, calls: 892, status: 'active' },
    { id: 3, name: 'RetailMax Customer Service', agents: 8, calls: 2156, status: 'active' },
  ];

  const filteredAgents = selectedClient === 'all' 
    ? agents 
    : agents.filter(agent => agent.client === clients.find(c => c.id === selectedClient)?.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#0C0A1D] mb-2">Agent Management</h1>
          <p className="text-gray-600">Manage agents, permissions, and client assignments</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
          >
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            Add Agent
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1">
        {['agents', 'permissions', 'sub-accounts'].map((tab) => (
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

      {activeTab === 'agents' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Permissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAgents.map((agent, index) => (
                  <motion.tr
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-white/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agent.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agent.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {agent.permissions.map(permission => (
                          <span
                            key={permission}
                            className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        agent.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-[#E42289] hover:text-[#00FFFF] transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'permissions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {permissions.map((permission, index) => (
            <motion.div
              key={permission.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0C0A1D]">{permission.name}</h3>
                  <p className="text-sm text-gray-600">{permission.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Agents with access:</span>
                  <span className="font-semibold text-[#0C0A1D]">
                    {agents.filter(agent => agent.permissions.includes(permission.id)).length}
                  </span>
                </div>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg hover:shadow-lg transition-all duration-200">
                  Manage Access
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'sub-accounts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0C0A1D]">{account.name}</h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Agents:</span>
                    <span className="font-semibold text-[#0C0A1D]">{account.agents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Calls:</span>
                    <span className="font-semibold text-[#0C0A1D]">{account.calls.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {account.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white text-sm rounded-lg hover:shadow-lg transition-all duration-200">
                    Manage
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AgentManagement;