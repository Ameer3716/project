import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, Save, Volume2, Sliders, Code } from 'lucide-react';

const AIStudio = () => {
  const [selectedPersona, setSelectedPersona] = useState('sales');
  const [prompt, setPrompt] = useState('You are a professional sales assistant for CallEase. Your goal is to help potential customers understand our voice AI solutions...');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [formality, setFormality] = useState(70);
  const [enthusiasm, setEnthusiasm] = useState(80);

  const personas = [
    { id: 'sales', name: 'Sales Assistant', description: 'Focused on converting leads and closing deals' },
    { id: 'support', name: 'Customer Support', description: 'Helpful and patient for customer inquiries' },
    { id: 'appointment', name: 'Appointment Setter', description: 'Efficient at scheduling meetings' },
    { id: 'survey', name: 'Survey Collector', description: 'Engaging for gathering feedback' },
  ];

  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Professional female voice', accent: 'American' },
    { id: 'james', name: 'James', description: 'Confident male voice', accent: 'British' },
    { id: 'maria', name: 'Maria', description: 'Warm female voice', accent: 'Spanish' },
    { id: 'alex', name: 'Alex', description: 'Neutral voice', accent: 'Canadian' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#00FFFF] mb-2">AI Studio</h1>
          <p className="text-[#E42289]">Customize your AI personas and voice responses</p>
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
          className="lg:col-span-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg "
        >
          <h3 className="text-lg font-bold text-[#0C0A1D] mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 " />
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
                className={`w-full p-3 text-left rounded-lg transition-all duration-200  ${
                  selectedPersona === persona.id
                    ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white shadow-lg '
                    : 'bg-white/50 hover:bg-white/80 text-gray-700'
                }`}
              >
                <div className="font-semibold text-sm">{persona.name}</div>
                <div className={`text-xs mt-1 ${
                  selectedPersona === persona.id ? 'text-white/80' : 'text-gray-500 '
                }`}>
                  {persona.description}
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
          className="lg:col-span-6 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-[#0C0A1D] mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Prompt Editor
          </h3>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289] bg-gray-900 text-green-400 font-mono text-sm resize-none"
              placeholder="Enter your AI persona prompt..."
            />
            <motion.div
              className="absolute top-4 right-4 w-2 h-4 bg-green-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">{prompt.length} characters</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg text-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Test Prompt
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
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#0C0A1D] mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Voice Selection
            </h3>
            <div className="space-y-3">
              {voices.map((voice, index) => (
                <motion.div
                  key={voice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    selectedVoice === voice.id
                      ? 'border-[#E42289] bg-gradient-to-r from-[#E42289]/10 to-[#00FFFF]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-[#0C0A1D]">{voice.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{voice.description}</div>
                      <div className="text-xs text-gray-400">{voice.accent}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 rounded-full bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white"
                    >
                      <Play className="w-3 h-3" />
                    </motion.button>
                  </div>
                  {selectedVoice === voice.id && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="mt-2 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-white text-xs font-medium relative z-10">Playing preview...</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Style Controls */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#0C0A1D] mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              Response Style
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formality: {formality}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formality}
                  onChange={(e) => setFormality(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Casual</span>
                  <span>Professional</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enthusiasm: {enthusiasm}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={enthusiasm}
                  onChange={(e) => setEnthusiasm(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Calm</span>
                  <span>Energetic</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIStudio;