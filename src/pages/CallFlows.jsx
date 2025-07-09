import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Plus, Play, Save, Trash2, Settings } from 'lucide-react';

const CallFlows = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([
    { id: 1, type: 'start', x: 100, y: 100, title: 'Call Start' },
    { id: 2, type: 'audio', x: 300, y: 100, title: 'Welcome Message' },
    { id: 3, type: 'decision', x: 500, y: 100, title: 'Menu Choice' },
  ]);

  const nodeTypes = [
    { type: 'start', title: 'Call Start', color: 'from-green-400 to-green-600', icon: Play },
    { type: 'audio', title: 'Play Audio', color: 'from-blue-400 to-blue-600', icon: Play },
    { type: 'decision', title: 'If/Else Logic', color: 'from-yellow-400 to-yellow-600', icon: GitBranch },
    { type: 'transfer', title: 'Transfer to Human', color: 'from-purple-400 to-purple-600', icon: Settings },
    { type: 'ai', title: 'AI Agent', color: 'from-pink-400 to-pink-600', icon: Settings },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ];

  const addNode = (type) => {
    const newNode = {
      id: nodes.length + 1,
      type: type.type,
      x: 200 + Math.random() * 400,
      y: 200 + Math.random() * 200,
      title: type.title
    };
    setNodes([...nodes, newNode]);
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
          <h1 className="text-3xl font-bold text-[#0C0A1D] mb-2">Call Flows</h1>
          <p className="text-gray-600">Design advanced call routing and logic</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 text-[#0C0A1D] rounded-lg font-semibold flex items-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4" />
            Test Flow
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            Save Flow
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Node Library */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-[#0C0A1D] mb-4">Node Library</h3>
          <div className="space-y-3">
            {nodeTypes.map((nodeType, index) => (
              <motion.button
                key={nodeType.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => addNode(nodeType)}
                className={`w-full p-3 rounded-lg bg-gradient-to-r ${nodeType.color} text-white font-semibold flex items-center gap-3 hover:shadow-lg transition-all duration-200`}
              >
                <nodeType.icon className="w-4 h-4" />
                {nodeType.title}
              </motion.button>
            ))}
          </div>

          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-white/80 rounded-lg border border-gray-200"
            >
              <h4 className="font-semibold text-[#0C0A1D] mb-3">Node Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289] text-sm">
                    <option>{selectedNode.type}</option>
                  </select>
                </div>
                <button className="w-full px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Node
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-[#0C0A1D]">Flow Canvas</h3>
          </div>
          
          <div className="relative h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {connections.map((connection, index) => {
                const fromNode = nodes.find(n => n.id === connection.from);
                const toNode = nodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode) return null;

                return (
                  <motion.g key={index}>
                    <motion.line
                      x1={fromNode.x + 50}
                      y1={fromNode.y + 25}
                      x2={toNode.x}
                      y2={toNode.y + 25}
                      stroke="url(#connectionGradient)"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                    {/* Animated particles */}
                    <motion.circle
                      r="3"
                      fill="#E42289"
                      animate={{
                        cx: [fromNode.x + 50, toNode.x],
                        cy: [fromNode.y + 25, toNode.y + 25]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E42289" />
                        <stop offset="100%" stopColor="#00FFFF" />
                      </linearGradient>
                    </defs>
                  </motion.g>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => {
              const nodeType = nodeTypes.find(nt => nt.type === node.type);
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`absolute w-24 h-12 rounded-lg bg-gradient-to-r ${nodeType?.color} text-white text-xs font-semibold flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 ${
                    selectedNode?.id === node.id ? 'ring-2 ring-white ring-offset-2' : ''
                  }`}
                  style={{ left: node.x, top: node.y }}
                  onClick={() => setSelectedNode(node)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-white/20"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative z-10">{node.title}</span>
                </motion.div>
              );
            })}

            {/* Instructions */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <GitBranch className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium">Start Building Your Flow</p>
                  <p className="text-sm">Drag nodes from the library to create your call flow</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallFlows;