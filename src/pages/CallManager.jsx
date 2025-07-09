import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Search, Filter, Play, Pause, Square, Zap, Radio, Volume2, Mic, MicOff, PhoneOff } from 'lucide-react';

const CallManager = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialing, setIsDialing] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  const [callSlots, setCallSlots] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      status: i < 3 ? 'active' : i < 5 ? 'ringing' : 'idle',
      caller: i < 3 ? `+1 (555) 0${i + 1}0-${i + 1}234` : i < 5 ? `+1 (555) 0${i + 1}0-${i + 1}234` : null,
      duration: i < 3 ? `${Math.floor(Math.random() * 10) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : null,
      agent: i < 3 ? `Agent ${i + 1}` : null
    }))
  );

  const callLogs = [
    { id: 1, direction: 'inbound', number: '+1 (555) 010-1234', duration: '4:32', status: 'completed', timestamp: '2024-01-15 14:30', agent: 'Agent 1' },
    { id: 2, direction: 'outbound', number: '+1 (555) 020-5678', duration: '2:15', status: 'completed', timestamp: '2024-01-15 14:25', agent: 'Agent 2' },
    { id: 3, direction: 'inbound', number: '+1 (555) 030-9012', duration: '6:45', status: 'completed', timestamp: '2024-01-15 14:20', agent: 'Agent 3' },
    { id: 4, direction: 'inbound', number: '+1 (555) 040-3456', duration: '1:23', status: 'missed', timestamp: '2024-01-15 14:15', agent: null },
    { id: 5, direction: 'outbound', number: '+1 (555) 050-7890', duration: '8:12', status: 'completed', timestamp: '2024-01-15 14:10', agent: 'Agent 1' },
  ];

  // Simulate incoming call
  useEffect(() => {
    const simulateIncomingCall = () => {
      if (Math.random() > 0.7 && !incomingCall && !activeCall) {
        const mockCall = {
          id: Date.now(),
          number: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          name: ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emily Davis'][Math.floor(Math.random() * 4)],
          company: ['TechCorp', 'HealthPlus', 'RetailMax', 'StartupXYZ'][Math.floor(Math.random() * 4)]
        };
        setIncomingCall(mockCall);
      }
    };

    const interval = setInterval(simulateIncomingCall, 15000);
    return () => clearInterval(interval);
  }, [incomingCall, activeCall]);

  // Call timer
  useEffect(() => {
    let interval;
    if (activeCall && !isOnHold) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall, isOnHold]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInitiateCall = () => {
    if (!phoneNumber.trim()) return;
    
    setIsDialing(true);
    
    // Find first idle slot
    const idleSlotIndex = callSlots.findIndex(slot => slot.status === 'idle');
    if (idleSlotIndex !== -1) {
      // Update slot to dialing
      setCallSlots(prev => prev.map((slot, index) => 
        index === idleSlotIndex 
          ? { ...slot, status: 'dialing', caller: phoneNumber, agent: 'Agent Auto' }
          : slot
      ));

      // After 2 seconds, change to ringing
      setTimeout(() => {
        setCallSlots(prev => prev.map((slot, index) => 
          index === idleSlotIndex 
            ? { ...slot, status: 'ringing' }
            : slot
        ));
        
        // After 3 more seconds, connect the call
        setTimeout(() => {
          setCallSlots(prev => prev.map((slot, index) => 
            index === idleSlotIndex 
              ? { ...slot, status: 'active' }
              : slot
          ));
          setActiveCall({
            id: Date.now(),
            number: phoneNumber,
            name: 'Unknown Contact',
            type: 'outbound'
          });
          setCallTimer(0);
          setIsDialing(false);
          setPhoneNumber('');
        }, 3000);
      }, 2000);
    }
  };

  const handleAnswerCall = () => {
    if (incomingCall) {
      setActiveCall({
        ...incomingCall,
        type: 'inbound'
      });
      setCallTimer(0);
      setIncomingCall(null);
      
      // Update call slot
      const idleSlotIndex = callSlots.findIndex(slot => slot.status === 'idle');
      if (idleSlotIndex !== -1) {
        setCallSlots(prev => prev.map((slot, index) => 
          index === idleSlotIndex 
            ? { ...slot, status: 'active', caller: incomingCall.number, agent: 'Agent 1' }
            : slot
        ));
      }
    }
  };

  const handleDeclineCall = () => {
    setIncomingCall(null);
  };

  const handleHangUp = () => {
    setActiveCall(null);
    setCallTimer(0);
    setIsMuted(false);
    setIsOnHold(false);
    
    // Update call slot
    setCallSlots(prev => prev.map(slot => 
      slot.status === 'active' && slot.caller === activeCall?.number
        ? { ...slot, status: 'idle', caller: null, agent: null, duration: null }
        : slot
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'from-emerald-400 to-green-600';
      case 'ringing': return 'from-yellow-400 to-orange-500';
      case 'dialing': return 'from-purple-400 to-[#E42289]';
      case 'idle': return 'from-slate-400 to-slate-600';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <PhoneCall className="w-4 h-4" />;
      case 'ringing': return <PhoneIncoming className="w-4 h-4" />;
      case 'dialing': return <PhoneOutgoing className="w-4 h-4" />;
      case 'idle': return <Phone className="w-4 h-4" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between items-center relative"
      >
        <div className="relative">
          <motion.h1 
            className="text-4xl font-bold text-[#F0F0F0]"
            animate={{
              textShadow: [
                '0 0 20px rgba(228, 34, 137, 0.5)',
                '0 0 30px rgba(0, 255, 255, 0.5)',
                '0 0 20px rgba(228, 34, 137, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Call Manager
          </motion.h1>
          <motion.p 
            className="text-[#F0F0F0]/70 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Advanced call control and monitoring system
          </motion.p>
          
          <motion.div
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="px-4 py-2 bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-[#00FFFF]/20 rounded-xl text-[#00FFFF] font-medium flex items-center gap-2"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 255, 255, 0.2)',
                '0 0 30px rgba(0, 255, 255, 0.4)',
                '0 0 20px rgba(0, 255, 255, 0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 bg-[#00FFFF] rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Neural Network Active
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Live Call Console */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-2xl p-6 shadow-2xl"
      >
        {/* Incoming Call State */}
        {incomingCall && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 20px rgba(228, 34, 137, 0.5)',
                  '0 0 40px rgba(0, 255, 255, 0.8)',
                  '0 0 20px rgba(228, 34, 137, 0.5)',
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <h2 className="text-3xl font-bold text-[#F0F0F0] mb-2">Incoming Call</h2>
            </motion.div>
            
            <div className="space-y-2">
              <p className="text-2xl font-bold text-[#00FFFF]">{incomingCall.name}</p>
              <p className="text-lg text-[#F0F0F0]/80">{incomingCall.number}</p>
              <p className="text-sm text-[#F0F0F0]/60">{incomingCall.company}</p>
            </div>

            <div className="flex justify-center gap-6">
              <motion.button
                onClick={handleAnswerCall}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.4)',
                    '0 0 40px rgba(34, 197, 94, 0.8)',
                    '0 0 20px rgba(34, 197, 94, 0.4)',
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <PhoneCall className="w-5 h-5" />
                Answer
              </motion.button>
              
              <motion.button
                onClick={handleDeclineCall}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneOff className="w-5 h-5" />
                Decline
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Active Call State */}
        {activeCall && !incomingCall && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#F0F0F0]">Active Call</h2>
              <p className="text-xl font-bold text-[#00FFFF]">{activeCall.name}</p>
              <p className="text-lg text-[#F0F0F0]/80">{activeCall.number}</p>
              <motion.p 
                className="text-2xl font-mono text-[#E42289]"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {formatTime(callTimer)}
              </motion.p>
            </div>

            <div className="flex justify-center gap-4">
              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-xl font-semibold flex items-center gap-2 ${
                  isMuted 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                    : 'bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) text-[#F0F0F0]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                {isMuted ? 'Unmute' : 'Mute'}
              </motion.button>

              <motion.button
                onClick={() => setIsOnHold(!isOnHold)}
                className={`p-4 rounded-xl font-semibold flex items-center gap-2 ${
                  isOnHold 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                    : 'bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) text-[#F0F0F0]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Pause className="w-5 h-5" />
                {isOnHold ? 'Resume' : 'Hold'}
              </motion.button>

              <motion.button
                onClick={handleHangUp}
                className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneOff className="w-5 h-5" />
                Hang Up
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Default Dialer State */}
        {!incomingCall && !activeCall && (
          <div>
            <motion.h3 
              className="text-2xl font-bold text-[#F0F0F0] mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <PhoneOutgoing className="w-5 h-5 text-white" />
              </motion.div>
              Outbound Dialer
            </motion.h3>
            
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-[#F0F0F0]/80 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <motion.input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-xl text-[#F0F0F0] placeholder-[#F0F0F0]/50 focus:outline-none focus:border-[#E42289] focus:ring-2 focus:ring-[#E42289]/20 transition-all duration-300"
                  whileFocus={{
                    boxShadow: '0 0 20px rgba(228, 34, 137, 0.3)',
                    borderColor: '#E42289',
                  }}
                />
              </div>
              
              <motion.button
                onClick={handleInitiateCall}
                disabled={!phoneNumber.trim() || isDialing}
                className="px-8 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={!isDialing && phoneNumber.trim() ? {
                  boxShadow: [
                    '0 0 20px rgba(228, 34, 137, 0.3)',
                    '0 0 30px rgba(0, 255, 255, 0.3)',
                    '0 0 20px rgba(228, 34, 137, 0.3)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isDialing ? (
                  <motion.div
                    className="flex items-center gap-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Dialing...
                  </motion.div>
                ) : (
                  'Initiate Call'
                )}
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex space-x-1 bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] rounded-2xl p-1 border border-rgba(255, 255, 255, 0.2) shadow-lg"
      >
        {['live', 'logs'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${
              activeTab === tab
                ? 'text-white shadow-lg'
                : 'text-[#F0F0F0]/60 hover:text-[#F0F0F0]'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 capitalize">
              {tab === 'live' ? 'Live Dashboard' : 'Call Logs'}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {activeTab === 'live' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* Live Call Grid */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E42289]/10 to-[#00FFFF]/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-3xl p-8 shadow-2xl">
              <motion.h3 
                className="text-2xl font-bold text-[#F0F0F0] mb-8 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Radio className="w-5 h-5 text-white" />
                </motion.div>
                Live Call Slots
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {callSlots.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group cursor-pointer ${
                      slot.status === 'active' 
                        ? 'border-[#00FFFF] bg-rgba(255, 255, 255, 0.05) shadow-lg shadow-[#00FFFF]/20' 
                        : slot.status === 'ringing'
                        ? 'border-[#E42289] bg-rgba(255, 255, 255, 0.05) shadow-lg shadow-[#E42289]/20'
                        : slot.status === 'dialing'
                        ? 'border-purple-400 bg-rgba(255, 255, 255, 0.05) shadow-lg shadow-purple-400/20'
                        : 'border-rgba(255, 255, 255, 0.2) bg-rgba(255, 255, 255, 0.05)'
                    }`}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    {/* Status Animations */}
                    {slot.status === 'active' && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FFFF]/10 to-green-500/10"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {slot.status === 'ringing' && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E42289]/10 to-orange-500/10"
                        animate={{ 
                          opacity: [0.3, 0.8, 0.3],
                          scale: [1, 1.02, 1],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}

                    {slot.status === 'dialing' && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-[#E42289]/10"
                        animate={{ 
                          opacity: [0.3, 0.8, 0.3],
                          rotate: [0, 1, -1, 0],
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-[#F0F0F0] bg-rgba(255, 255, 255, 0.05) backdrop-blur-sm px-3 py-1 rounded-full border border-rgba(255, 255, 255, 0.2)">
                          Slot {slot.id}
                        </span>
                        <motion.div 
                          className={`p-2 rounded-xl bg-gradient-to-r ${getStatusColor(slot.status)} shadow-lg`}
                          whileHover={{ scale: 1.1 }}
                          animate={slot.status === 'active' ? {
                            boxShadow: [
                              '0 0 20px rgba(0, 255, 255, 0.5)',
                              '0 0 30px rgba(0, 255, 255, 0.8)',
                              '0 0 20px rgba(0, 255, 255, 0.5)',
                            ],
                          } : slot.status === 'ringing' ? {
                            rotate: [0, 10, -10, 0],
                          } : slot.status === 'dialing' ? {
                            scale: [1, 1.1, 1],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="text-white">
                            {getStatusIcon(slot.status)}
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <motion.p 
                          className={`text-xs font-bold uppercase tracking-wider ${
                            slot.status === 'active' ? 'text-[#00FFFF]' : 
                            slot.status === 'ringing' ? 'text-[#E42289]' : 
                            slot.status === 'dialing' ? 'text-purple-400' : 'text-[#F0F0F0]/50'
                          }`}
                          animate={slot.status === 'active' ? {
                            opacity: [0.7, 1, 0.7],
                          } : slot.status === 'dialing' ? {
                            opacity: [0.5, 1, 0.5],
                          } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {slot.status}
                        </motion.p>
                        
                        {slot.caller && (
                          <p className="text-xs text-[#F0F0F0]/80 font-mono bg-rgba(255, 255, 255, 0.05) backdrop-blur-sm px-2 py-1 rounded-lg border border-rgba(255, 255, 255, 0.2)">
                            {slot.caller}
                          </p>
                        )}
                        
                        {slot.duration && (
                          <motion.p 
                            className="text-xs text-[#F0F0F0]/80 font-semibold"
                            key={slot.duration}
                          >
                            Duration: {slot.duration}
                          </motion.p>
                        )}
                        
                        {slot.agent && (
                          <p className="text-xs text-[#F0F0F0]/80 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 px-2 py-1 rounded-lg border border-rgba(255, 255, 255, 0.2)">
                            {slot.agent}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'logs' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* Search and Filter */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-[#E42289]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0F0F0]/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by phone number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-rgba(255, 255, 255, 0.2) rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E42289] bg-rgba(255, 255, 255, 0.05) backdrop-blur-sm transition-all duration-300 text-[#F0F0F0] placeholder-[#F0F0F0]/50"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0F0F0]/40 w-5 h-5" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-12 pr-8 py-3 border border-rgba(255, 255, 255, 0.2) rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E42289] bg-rgba(255, 255, 255, 0.05) backdrop-blur-sm text-[#F0F0F0]"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="missed">Missed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Call Logs Table */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-3xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Direction</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Number</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Time</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Agent</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rgba(255, 255, 255, 0.1)">
                    {callLogs.map((call, index) => (
                      <motion.tr
                        key={call.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="hover:bg-rgba(255, 255, 255, 0.05) transition-all duration-300 group"
                        whileHover={{ scale: 1.01 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <motion.div
                              className={`p-2 rounded-lg mr-3 ${
                                call.direction === 'inbound' 
                                  ? 'bg-gradient-to-r from-[#00FFFF]/20 to-green-500/20 border border-[#00FFFF]/30' 
                                  : 'bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 border border-[#E42289]/30'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {call.direction === 'inbound' ? (
                                <PhoneIncoming className="w-4 h-4 text-[#00FFFF]" />
                              ) : (
                                <PhoneOutgoing className="w-4 h-4 text-[#E42289]" />
                              )}
                            </motion.div>
                            <span className="text-sm text-[#F0F0F0] capitalize font-medium">{call.direction}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#F0F0F0] bg-rgba(255, 255, 255, 0.05) rounded-lg">
                          {call.number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F0F0F0] font-semibold">
                          {call.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <motion.span 
                            className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                              call.status === 'completed' 
                                ? 'bg-gradient-to-r from-[#00FFFF]/20 to-green-500/20 text-[#00FFFF] border border-[#00FFFF]/30' 
                                : 'bg-gradient-to-r from-red-500/20 to-[#E42289]/20 text-[#E42289] border border-[#E42289]/30'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {call.status}
                          </motion.span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F0F0F0]">
                          {call.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F0F0F0]">
                          {call.agent || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button 
                            className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent hover:from-[#E42289]/80 hover:to-[#00FFFF]/80 transition-all duration-300 font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Transcript
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CallManager;