import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Mic, 
  BookOpen, 
  MessageSquare, 
  Upload, 
  Link, 
  Play, 
  Save,
  Settings,
  Volume2,
  FileText,
  Edit3,
  Plus,
  Trash2
} from 'lucide-react';

const AIStudioPage = () => {
  const [activeTab, setActiveTab] = useState('personality');
  const [personalityTraits, setPersonalityTraits] = useState({
    formality: 65,
    verbosity: 40,
    empathy: 80,
    assertiveness: 55,
    enthusiasm: 70
  });
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [knowledgeSources, setKnowledgeSources] = useState([
    { id: 1, name: 'Company FAQ.pdf', type: 'file', status: 'processed', size: '2.4 MB' },
    { id: 2, name: 'Product Catalog', type: 'url', status: 'processing', url: 'https://company.com/products' },
    { id: 3, name: 'Support Guidelines.docx', type: 'file', status: 'processed', size: '1.8 MB' }
  ]);
  const [responseTemplates, setResponseTemplates] = useState([
    { id: 1, scenario: 'Greeting', template: 'Hello! This is {ai_name} from {company_name}. How can I help you today?' },
    { id: 2, scenario: 'Voicemail Prompt', template: 'Hi, you\'ve reached {company_name}. Please leave your name and number, and we\'ll get back to you soon.' },
    { id: 3, scenario: 'Appointment Confirmation', template: 'Perfect! I\'ve scheduled your appointment for {date} at {time}. You\'ll receive a confirmation email shortly.' }
  ]);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Professional & Warm', accent: 'American' },
    { id: 'marcus', name: 'Marcus', description: 'Confident & Clear', accent: 'British' },
    { id: 'luna', name: 'Luna', description: 'Friendly & Energetic', accent: 'Australian' },
    { id: 'phoenix', name: 'Phoenix', description: 'Calm & Authoritative', accent: 'Canadian' }
  ];

  const tabs = [
    { id: 'personality', label: 'Personality & Voice', icon: Brain },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'templates', label: 'Response Templates', icon: MessageSquare }
  ];

  const handleTraitChange = (trait, value) => {
    setPersonalityTraits(prev => ({
      ...prev,
      [trait]: value
    }));
  };

  const TraitSlider = ({ label, value, onChange, leftLabel, rightLabel }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[#F0F0F0] font-medium">{label}</span>
        <span className="text-[#00FFFF] font-bold">{value}%</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #E42289 0%, #00FFFF 50%, #E42289 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-white/60 mt-1">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
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
          AI Studio
        </h1>
        <p className="text-[#00FFFF]/80">
          Advanced AI Personality & Behavior Workshop
        </p>
      </motion.div>

      {/* Main Studio Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl overflow-hidden hover:border-[#00FFFF]/40 transition-all duration-300"
      >
        {/* Tab Navigation */}
        <div className="flex border-b border-white/10">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white/10 text-[#F0F0F0] border-b-2 border-[#00FFFF]'
                  : 'text-white/60 hover:text-white/80 hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E42289] to-[#00FFFF]"
                  layoutId="activeTabIndicator"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Personality & Voice Tab */}
            {activeTab === 'personality' && (
              <motion.div
                key="personality"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personality Traits */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                        <Settings className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#F0F0F0]">
                        Personality Traits
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <TraitSlider
                        label="Communication Style"
                        value={personalityTraits.formality}
                        onChange={(value) => handleTraitChange('formality', value)}
                        leftLabel="Casual"
                        rightLabel="Formal"
                      />
                      <TraitSlider
                        label="Response Length"
                        value={personalityTraits.verbosity}
                        onChange={(value) => handleTraitChange('verbosity', value)}
                        leftLabel="Concise"
                        rightLabel="Detailed"
                      />
                      <TraitSlider
                        label="Empathy Level"
                        value={personalityTraits.empathy}
                        onChange={(value) => handleTraitChange('empathy', value)}
                        leftLabel="Direct"
                        rightLabel="Empathetic"
                      />
                      <TraitSlider
                        label="Assertiveness"
                        value={personalityTraits.assertiveness}
                        onChange={(value) => handleTraitChange('assertiveness', value)}
                        leftLabel="Gentle"
                        rightLabel="Assertive"
                      />
                      <TraitSlider
                        label="Enthusiasm"
                        value={personalityTraits.enthusiasm}
                        onChange={(value) => handleTraitChange('enthusiasm', value)}
                        leftLabel="Calm"
                        rightLabel="Energetic"
                      />
                    </div>
                  </div>

                  {/* Voice Selection */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                        <Mic className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#F0F0F0]">
                        Voice Selection
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {voices.map((voice) => (
                        <motion.div
                          key={voice.id}
                          onClick={() => setSelectedVoice(voice.id)}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedVoice === voice.id
                              ? 'bg-white/20 border-2 border-[#00FFFF] shadow-lg shadow-[#00FFFF]/20'
                              : 'bg-black/20 border border-white/10 hover:border-white/30'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-[#F0F0F0] font-medium">
                                {voice.name}
                              </div>
                              <div className="text-white/60 text-sm">
                                {voice.description} • {voice.accent}
                              </div>
                            </div>
                            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                              <Volume2 className="text-[#00FFFF]" size={16} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg text-white font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save size={20} />
                    Save Personality Profile
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Knowledge Base Tab */}
            {activeTab === 'knowledge' && (
              <motion.div
                key="knowledge"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                        <Upload className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#F0F0F0]">
                        Add Knowledge Sources
                      </h3>
                    </div>

                    {/* File Upload */}
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#00FFFF]/40 transition-colors">
                      <Upload className="mx-auto text-white/40 mb-4" size={48} />
                      <p className="text-[#F0F0F0] font-medium mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-white/60 text-sm">
                        Supports PDF, DOC, TXT files up to 10MB
                      </p>
                      <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.txt" />
                    </div>

                    {/* URL Input */}
                    <div className="space-y-3">
                      <label className="block text-white/80 font-medium">
                        Knowledge URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://company.com/faq"
                          className="flex-1 px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-[#F0F0F0] placeholder-white/50 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                        />
                        <button className="px-4 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg text-white font-medium hover:scale-105 transition-transform">
                          <Link size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Knowledge Sources List */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                        <BookOpen className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#F0F0F0]">
                        Current Sources
                      </h3>
                    </div>

                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {knowledgeSources.map((source) => (
                        <motion.div
                          key={source.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/20 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="text-[#00FFFF]" size={20} />
                              <div>
                                <div className="text-[#F0F0F0] font-medium">
                                  {source.name}
                                </div>
                                <div className="text-white/60 text-sm">
                                  {source.type === 'file' ? source.size : source.url}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`px-2 py-1 rounded text-xs font-medium ${
                                source.status === 'processed' 
                                  ? 'bg-green-400/20 text-green-400'
                                  : 'bg-yellow-400/20 text-yellow-400'
                              }`}>
                                {source.status}
                              </div>
                              <button className="p-1 text-white/40 hover:text-red-400 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          {source.status === 'processing' && (
                            <div className="mt-3">
                              <div className="w-full bg-black/40 rounded-full h-2">
                                <motion.div
                                  className="h-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: '60%' }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                              <p className="text-white/60 text-xs mt-1">Processing...</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Response Templates Tab */}
            {activeTab === 'templates' && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                      <MessageSquare className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-[#F0F0F0]">
                      Response Templates
                    </h3>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg text-white font-medium flex items-center gap-2 hover:scale-105 transition-transform">
                    <Plus size={16} />
                    Add Template
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {responseTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/20 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[#F0F0F0] font-medium text-lg">
                          {template.scenario}
                        </h4>
                        <button
                          onClick={() => setEditingTemplate(template.id)}
                          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <Edit3 className="text-[#00FFFF]" size={16} />
                        </button>
                      </div>
                      <div className="bg-white/40 rounded-lg p-4 font-mono text-sm">
                        <code className="text-white/80">
                          {template.template}
                        </code>
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-xs text-white/60">
                        <span>Variables:</span>
                        <span className="px-2 py-1 bg-[#00FFFF]/20 text-[#00FFFF] rounded">
                          {'{ai_name}'}
                        </span>
                        <span className="px-2 py-1 bg-[#E42289]/20 text-[#E42289] rounded">
                          {'{company_name}'}
                        </span>
                        <span className="px-2 py-1 bg-[#9333EA]/20 text-[#9333EA] rounded">
                          {'{customer_name}'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AIStudioPage;