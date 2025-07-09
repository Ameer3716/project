import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Terminal, Zap } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: 'Neural network initialized. CallEase AI assistant online. How may I assist you today?', timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response with typing effect
    setTimeout(() => {
      const responses = [
        'Processing your request through neural pathways...',
        'Analyzing CallEase system parameters for optimal response...',
        'I understand your query. Let me access the relevant data matrices...',
        'Scanning knowledge base for comprehensive solution protocols...',
        'Your request has been processed. Initiating response sequence...'
      ];
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
          <motion.h1 
            className="text-3xl font-bold text-[#00FFFF] mb-2"
            style={{
              textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            }}
            animate={{
              textShadow: [
                '0 0 10px rgba(0, 255, 255, 0.8)',
                '0 0 20px rgba(0, 255, 255, 1)',
                '0 0 10px rgba(0, 255, 255, 0.8)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            AI Terminal
          </motion.h1>
          <p className="text-gray-400">High-tech AI assistant interface</p>
        </div>
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/30 rounded-xl text-[#00FFFF] font-medium"
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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-4 h-4" />
          </motion.div>
          Neural Core Active
        </motion.div>
      </motion.div>

      {/* AI Terminal Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#E42289]/10 to-[#00FFFF]/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
        <motion.div 
          className="relative bg-rgba(22, 21, 48, 0.6) backdrop-blur-[10px] border border-[#00FFFF]/30 rounded-3xl shadow-2xl overflow-hidden h-[600px] flex flex-col"
          whileHover={{
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
            borderColor: 'rgba(0, 255, 255, 0.6)'
          }}
        >
          {/* Terminal Header */}
          <div className="p-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white relative overflow-hidden">
            {/* Animated Scanlines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 255, 255, 0.05) 2px,
                  rgba(255, 255, 255, 0.05) 4px
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
            
            <div className="relative z-10 flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 255, 255, 0.3)',
                    '0 0 30px rgba(255, 255, 255, 0.6)',
                    '0 0 20px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Terminal className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="font-semibold">CallEase Neural Interface</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span>System Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#0C0A1D] relative">
            {/* Terminal Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="terminalGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00FFFF" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#terminalGrid)" />
              </svg>
            </div>

            <div className="space-y-4 relative z-10">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <motion.div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white' 
                          : 'bg-rgba(22, 21, 48, 0.8) border border-[#00FFFF]/30 text-[#00FFFF]'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={message.type === 'bot' ? {
                        boxShadow: [
                          '0 0 10px rgba(0, 255, 255, 0.3)',
                          '0 0 20px rgba(0, 255, 255, 0.6)',
                          '0 0 10px rgba(0, 255, 255, 0.3)',
                        ],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {message.type === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </motion.div>
                    <div className={`p-3 rounded-lg font-mono text-sm relative ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white'
                        : 'bg-rgba(22, 21, 48, 0.8) border border-[#00FFFF]/30 text-[#00FFFF]'
                    }`}>
                      {message.type === 'bot' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFFF]/10 to-transparent rounded-lg"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            repeatDelay: 2,
                            ease: "linear" 
                          }}
                          style={{ width: '50%' }}
                        />
                      )}
                      <p className="relative z-10">{message.content}</p>
                      <div className={`text-xs mt-1 opacity-60 ${
                        message.type === 'user' ? 'text-white' : 'text-[#00FFFF]'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3">
                    <motion.div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold bg-rgba(22, 21, 48, 0.8) border border-[#00FFFF]/30 text-[#00FFFF]"
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(0, 255, 255, 0.3)',
                          '0 0 20px rgba(0, 255, 255, 0.6)',
                          '0 0 10px rgba(0, 255, 255, 0.3)',
                        ],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Bot className="w-4 h-4" />
                    </motion.div>
                    <div className="p-3 rounded-lg font-mono text-sm bg-rgba(22, 21, 48, 0.8) border border-[#00FFFF]/30 text-[#00FFFF]">
                      <div className="flex items-center gap-1">
                        <span>Processing</span>
                        <motion.div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 h-1 bg-[#00FFFF] rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#00FFFF]/30 bg-rgba(22, 21, 48, 0.8)">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <motion.textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter neural command..."
                  className="w-full px-4 py-3 bg-[#0C0A1D] border border-[#00FFFF]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E42289] text-[#00FFFF] placeholder-gray-400 font-mono text-sm resize-none"
                  rows="1"
                  style={{
                    textShadow: '0 0 5px rgba(0, 255, 255, 0.5)',
                  }}
                />
                {/* Blinking Cursor Effect */}
                <motion.div
                  className="absolute top-3 right-4 w-2 h-5 bg-[#00FFFF]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                animate={inputMessage.trim() ? {
                  boxShadow: [
                    '0 0 20px rgba(228, 34, 137, 0.3)',
                    '0 0 30px rgba(0, 255, 255, 0.3)',
                    '0 0 20px rgba(228, 34, 137, 0.3)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Send className="w-4 h-4" />
                Transmit
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChatbotPage;