import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOff, 
  Play, 
  Headphones, 
  UserCheck,
  Activity,
  Clock
} from 'lucide-react';

const CallManagerPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [liveCalls, setLiveCalls] = useState([
    {
      id: 1,
      type: 'incoming',
      number: '+1 (555) 123-4567',
      status: 'ringing',
      duration: null
    },
    {
      id: 2,
      type: 'active',
      number: '+1 (555) 987-6543',
      agent: 'Sarah AI',
      status: 'connected',
      duration: 245
    },
    {
      id: 3,
      type: 'active',
      number: '+1 (555) 456-7890',
      agent: 'Marcus AI',
      status: 'transcribing',
      duration: 128
    }
  ]);
  const [isDialing, setIsDialing] = useState(false);

  const agents = [
    'Sarah AI - Sales Specialist',
    'Marcus AI - Support Agent',
    'Luna AI - Appointment Setter',
    'Phoenix AI - Lead Qualifier'
  ];

  const handleInitiateCall = () => {
    if (!phoneNumber || !selectedAgent) return;
    
    setIsDialing(true);
    setTimeout(() => {
      setIsDialing(false);
      // Add new call to live calls
      const newCall = {
        id: Date.now(),
        type: 'active',
        number: phoneNumber,
        agent: selectedAgent.split(' - ')[0],
        status: 'connecting',
        duration: 0
      };
      setLiveCalls(prev => [...prev, newCall]);
      setPhoneNumber('');
    }, 2000);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const SoundWave = () => (
    <div className="flex items-center gap-1 h-6">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-[#E42289] to-[#00FFFF] rounded-full"
          animate={{
            height: [4, Math.random() * 20 + 8, 4],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[#E42289] mb-2">
          Call Manager
        </h1>
        <p className="text-[#00FFFF]/80">
          Mission Control for All Voice Communications
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Outbound Dialer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#E42289] to-[#00FFFF] backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                <PhoneCall className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#F0F0F0]">
                Launch Outbound Call
              </h2>
            </div>

            <div className="space-y-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg text-[white] placeholder-black/20 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                  style={{
                    boxShadow: phoneNumber ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
                  }}
                />
              </div>

              {/* Agent Selection */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  AI Agent / Campaign
                </label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-lg text-[#F0F0F0] focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                >
                  <option value="">Select AI Agent</option>
                  {agents.map((agent, index) => (
                    <option key={index} value={agent} className="bg-white/10">
                      {agent}
                    </option>
                  ))}
                </select>
              </div>

              {/* Initiate Call Button */}
              <motion.button
                onClick={handleInitiateCall}
                disabled={!phoneNumber || !selectedAgent || isDialing}
                className="w-full py-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg text-white font-extrabold text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={isDialing ? {
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.5)',
                    '0 0 40px rgba(0, 255, 255, 0.8)',
                    '0 0 20px rgba(0, 255, 255, 0.5)',
                  ],
                } : {}}
                transition={{ duration: 0.5, repeat: isDialing ? Infinity : 0 }}
              >
                {isDialing && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.5, 0],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
                <div className="flex items-center justify-center gap-2">
                  <Phone size={20} />
                  {isDialing ? 'Initiating Call...' : 'Initiate Call'}
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live Call Monitoring */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#E42289] to-[#00FFFF] backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#F0F0F0]">
                Live Connections
              </h2>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {liveCalls.map((call) => (
                  <motion.div
                    key={call.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-300"
                  >
                    {call.type === 'incoming' ? (
                      // Incoming Call Card
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-3 h-3 bg-[#00FFFF] rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <span className="text-[#00FFFF] font-medium">Ringing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIncoming className="text-white/80" size={16} />
                          <span className="text-[#F0F0F0]">
                            Incoming Call From: {call.number}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg text-white font-medium text-sm hover:scale-105 transition-transform">
                            Accept with AI
                          </button>
                          <button className="px-4 py-2 bg-gradient-to-br from-[#E42289] to-[#00FFFF] border border-white/20 rounded-lg text-white/80 font-medium text-sm hover:bg-white/20 transition-colors">
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Active Call Card
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full" />
                            <span className="text-green-400 font-medium capitalize">
                              {call.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-white/60 text-sm">
                            <Clock size={14} />
                            <span>{formatDuration(call.duration)}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[#F0F0F0] font-medium">
                            {call.number}
                          </div>
                          <div className="text-[#00FFFF] text-sm">
                            Agent: {call.agent}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <SoundWave />
                          <span className="text-white/60 text-xs">AI Active</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-gradient-to-br from-[#E42289] to-[#00FFFF] border border-white/20 rounded-lg text-white/80 font-medium text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-1">
                            <Headphones size={14} />
                            Listen In
                          </button>
                          <button className="flex-1 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg text-white font-medium text-sm hover:scale-105 transition-transform flex items-center justify-center gap-1">
                            <UserCheck size={14} />
                            Take Over
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallManagerPage;