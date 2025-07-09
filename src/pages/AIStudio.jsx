import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, Save, Volume2, Sliders, Code, Zap, Brain } from 'lucide-react';

const AIStudio = () => {
  const [selectedPersona, setSelectedPersona] = useState('sales');
  const [prompt, setPrompt] = useState('You are a professional sales assistant for CallEase. Your goal is to help potential customers understand our voice AI solutions...');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [formality, setFormality] = useState(70);
  const [enthusiasm, setEnthusiasm] = useState(80);
  const [isTyping, setIsTyping] = useState(false);

  const personas = [
    { id: 'sales', name: 'Sales Assistant', description: 'Focused on converting leads and closing deals', color: 'from-[#E42289] to-[#00FFFF]' },
    { id: 'support', name: 'Customer Support', description: 'Helpful and patient for customer inquiries', color: 'from-blue-500 to-cyan-500' },
    { id: 'appointment', name: 'Appointment Setter', description: 'Efficient at scheduling meetings', color: 'from-purple-500 to-pink-500' },
    { id: 'survey', name: 'Survey Collector', description: 'Engaging for gathering feedback', color: 'from-green-500 to-emerald-500' },
  ];

  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Professional female voice', accent: 'American', color: '#E42289' },
    { id: 'james', name: 'James', description: 'Confident male voice', accent: 'British', color: '#00FFFF' },
    { id: 'maria', name: 'Maria', description: 'Warm female voice', accent: 'Spanish', color: '#9333EA' },
    { id: 'alex', name: 'Alex', description: 'Neutral voice', accent: 'Canadian', color: '#10B981' },
  ];

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
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
          <motion.h1 
            className="text-3xl font-bold text-[#F0F0F0] mb-2"
            animate={{
              textShadow: [
                '0 0 20px rgba(228, 34, 137, 0.5)',
                '0 0 30px rgba(0, 255, 255, 0.5)',
                '0 0 20px rgba(228, 34, 137, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            AI Studio
          </motion.h1>
          <p className="text-[#F0F0F0]/70">Customize your AI personas and voice responses</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Personas List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-[#F0F0F0] mb-4 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-5 h-5 text-[#00FFFF]" />
            </motion.div>
            AI Personas
          </h3>
          <div className="space-y-3">
            {personas.map((persona, index) => (
              <motion.button
                key={persona.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPersona(persona.id)}
                className={`w-full p-4 text-left rounded-lg transition-all duration-300 relative overflow-hidden ${
                  selectedPersona === persona.id
                    ? 'text-white shadow-lg border border-rgba(255, 255, 255, 0.2)'
                    : 'bg-rgba(255, 255, 255, 0.05) hover:bg-rgba(255, 255, 255, 0.1) text-[#F0F0F0]/80'
                }`}
              >
                {selectedPersona === persona.id && (
                  <motion.div
                    layoutId="selectedPersona"
                    className={`absolute inset-0 bg-gradient-to-r ${persona.color} opacity-20 rounded-lg`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10">
                  <div className="font-semibold text-sm">{persona.name}</div>
                  <div className={`text-xs mt-1 ${
                    selectedPersona === persona.id ? 'text-white/80' : 'text-[#F0F0F0]/60'
                  }`}>
                    {persona.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Prompt Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-6 bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-[#F0F0F0] mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-[#E42289]" />
            Neural Prompt Editor
          </h3>
          <div className="relative">
            {/* Terminal-style editor */}
            <div className="bg-[#0a0a0a] rounded-lg border border-[#00FFFF]/30 overflow-hidden">
              {/* Terminal header */}
              <div className="bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 px-4 py-2 border-b border-[#00FFFF]/30 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-[#00FFFF] text-sm font-mono">neural_prompt.ai</span>
              </div>
              
              {/* Editor content */}
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  className="w-full h-80 p-4 bg-transparent text-[#00FFFF] font-mono text-sm resize-none focus:outline-none"
                  placeholder="Enter your AI persona prompt..."
                  style={{
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                  }}
                />
                
                {/* Animated scanlines */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0, 255, 255, 0.03) 2px,
                      rgba(0, 255, 255, 0.03) 4px
                    )`
                  }}
                  animate={{
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Blinking cursor */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-4 bg-[#00FFFF]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    className="absolute bottom-4 right-4 flex items-center gap-2 text-[#00FFFF] text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-1 h-1 bg-[#00FFFF] rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <span>Neural processing...</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-[#F0F0F0]/60">{prompt.length} characters</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg text-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Test Neural Response
            </motion.button>
          </div>
        </motion.div>

        {/* Voice & Style Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Voice Selection */}
          <div className="bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#F0F0F0] mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#E42289]" />
              Voice Matrix
            </h3>
            <div className="space-y-3">
              {voices.map((voice, index) => (
                <motion.div
                  key={voice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    selectedVoice === voice.id
                      ? 'border-[#E42289] bg-rgba(255, 255, 255, 0.05)'
                      : 'border-rgba(255, 255, 255, 0.2) hover:border-rgba(255, 255, 255, 0.3)'
                  }`}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  {selectedVoice === voice.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#E42289]/10 to-[#00FFFF]/10 rounded-lg"
                      layoutId="selectedVoice"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="font-semibold text-sm text-[#F0F0F0]">{voice.name}</div>
                      <div className="text-xs text-[#F0F0F0]/60 mt-1">{voice.description}</div>
                      <div className="text-xs text-[#F0F0F0]/40">{voice.accent}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white"
                    >
                      <Play className="w-3 h-3" />
                    </motion.button>
                  </div>
                  
                  {selectedVoice === voice.id && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="mt-3 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-white text-xs font-medium relative z-10">Neural synthesis active...</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Style Controls */}
          <div className="bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#F0F0F0] mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#00FFFF]" />
              Response Matrix
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#F0F0F0] mb-3">
                  Formality Level: {formality}%
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formality}
                    onChange={(e) => setFormality(e.target.value)}
                    className="w-full h-2 bg-rgba(255, 255, 255, 0.1) rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #E42289 0%, #00FFFF ${formality}%, rgba(255, 255, 255, 0.1) ${formality}%)`,
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 w-4 h-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full transform -translate-y-1/2 shadow-lg"
                    style={{ left: `calc(${formality}% - 8px)` }}
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(228, 34, 137, 0.5)',
                        '0 0 20px rgba(0, 255, 255, 0.5)',
                        '0 0 10px rgba(228, 34, 137, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#F0F0F0]/60 mt-2">
                  <span>Casual</span>
                  <span>Professional</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F0F0F0] mb-3">
                  Enthusiasm Level: {enthusiasm}%
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={enthusiasm}
                    onChange={(e) => setEnthusiasm(e.target.value)}
                    className="w-full h-2 bg-rgba(255, 255, 255, 0.1) rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #E42289 0%, #00FFFF ${enthusiasm}%, rgba(255, 255, 255, 0.1) ${enthusiasm}%)`,
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 w-4 h-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full transform -translate-y-1/2 shadow-lg"
                    style={{ left: `calc(${enthusiasm}% - 8px)` }}
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(228, 34, 137, 0.5)',
                        '0 0 20px rgba(0, 255, 255, 0.5)',
                        '0 0 10px rgba(228, 34, 137, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#F0F0F0]/60 mt-2">
                  <span>Calm</span>
                  <span>Energetic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Neural Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap size={16} className="text-white" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-[#F0F0F0]">Neural Status</div>
                <div className="text-xs text-[#00FFFF] flex items-center gap-1">
                  <motion.div
                    className="w-2 h-2 bg-[#00FFFF] rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  AI Training Active
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIStudio;