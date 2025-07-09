import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Plus, TrendingUp, Brain, Lightbulb, Download } from 'lucide-react';

const AdvancedAnalytics = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, type: 'call-outcome', title: 'Call Outcome Analysis', size: 'large' },
    { id: 2, type: 'sentiment', title: 'Sentiment Trends', size: 'medium' },
    { id: 3, type: 'leaderboard', title: 'Agent Performance', size: 'medium' },
    { id: 4, type: 'ai-insights', title: 'AI Insights Engine', size: 'large' },
  ]);

  const [aiInsight, setAiInsight] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const availableWidgets = [
    { type: 'call-volume', title: 'Call Volume Trends', icon: BarChart3 },
    { type: 'conversion', title: 'Conversion Funnel', icon: TrendingUp },
    { type: 'geographic', title: 'Geographic Distribution', icon: BarChart3 },
    { type: 'time-analysis', title: 'Time-based Analysis', icon: BarChart3 },
  ];

  const callOutcomes = [
    { outcome: 'Sale Completed', count: 156, percentage: 23 },
    { outcome: 'Follow-up Scheduled', count: 298, percentage: 44 },
    { outcome: 'Not Interested', count: 89, percentage: 13 },
    { outcome: 'Callback Requested', count: 134, percentage: 20 },
  ];

  const sentimentData = [
    { day: 'Mon', positive: 78, neutral: 15, negative: 7 },
    { day: 'Tue', positive: 82, neutral: 12, negative: 6 },
    { day: 'Wed', positive: 75, neutral: 18, negative: 7 },
    { day: 'Thu', positive: 88, neutral: 8, negative: 4 },
    { day: 'Fri', positive: 85, neutral: 10, negative: 5 },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', calls: 89, conversion: 34, score: 94 },
    { rank: 2, name: 'Mike Wilson', calls: 76, conversion: 28, score: 91 },
    { rank: 3, name: 'Emily Davis', calls: 82, conversion: 30, score: 89 },
    { rank: 4, name: 'James Brown', calls: 65, conversion: 22, score: 85 },
  ];

  const generateAIInsight = () => {
    setIsScanning(true);
    setTimeout(() => {
      const insights = [
        "Inbound calls from London have increased 30% this week, suggesting successful regional marketing campaign.",
        "Conversion rates are 15% higher on Tuesday afternoons - consider scheduling more agents during this time.",
        "Customers mentioning 'competitor pricing' have 40% lower conversion - update pricing objection scripts.",
        "Follow-up calls within 24 hours show 60% higher success rate than delayed callbacks."
      ];
      setAiInsight(insights[Math.floor(Math.random() * insights.length)]);
      setIsScanning(false);
    }, 3000);
  };

  const addWidget = (widgetType) => {
    const newWidget = {
      id: widgets.length + 1,
      type: widgetType.type,
      title: widgetType.title,
      size: 'medium'
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (widgetId) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
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
          <h1 className="text-3xl font-bold text-[#00FFFF] mb-2">Advanced Analytics</h1>
          <p className="text-[#E42289]">Customizable dashboard with AI-powered insights</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 text-[#0C0A1D] rounded-lg font-semibold flex items-center gap-2 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Widget
          </motion.button>
        </div>
      </motion.div>

      {/* Widget Library */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-bold text-[#0C0A1D] mb-4">Widget Library</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableWidgets.map((widget, index) => (
            <motion.button
              key={widget.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => addWidget(widget)}
              className="p-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg hover:shadow-lg transition-all duration-200 flex flex-col items-center gap-2"
            >
              <widget.icon className="w-6 h-6" />
              <span className="text-sm font-medium text-center">{widget.title}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Outcome Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0C0A1D]">Call Outcome Analysis</h3>
            <button
              onClick={() => removeWidget(1)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            {callOutcomes.map((outcome, index) => (
              <motion.div
                key={outcome.outcome}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{outcome.outcome}</span>
                    <span className="text-sm text-gray-600">{outcome.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${outcome.percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sentiment Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0C0A1D]">Sentiment Trends</h3>
            <button
              onClick={() => removeWidget(2)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              ×
            </button>
          </div>

          <div className="h-48 flex items-end justify-between space-x-2">
            {sentimentData.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col h-32 justify-end">
                  <motion.div
                    className="w-full bg-green-400 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${day.positive}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                  <motion.div
                    className="w-full bg-yellow-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${day.neutral}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                  <motion.div
                    className="w-full bg-red-400 rounded-b-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${day.negative}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">{day.day}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Positive</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>Neutral</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Negative</span>
            </div>
          </div>
        </motion.div>

        {/* Agent Performance Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0C0A1D]">Agent Performance Leaderboard</h3>
            <button
              onClick={() => removeWidget(3)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {leaderboard.map((agent, index) => (
              <motion.div
                key={agent.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    agent.rank === 1 ? 'bg-yellow-500' : 
                    agent.rank === 2 ? 'bg-gray-400' : 
                    agent.rank === 3 ? 'bg-orange-500' : 'bg-gray-300'
                  }`}>
                    {agent.rank}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0C0A1D]">{agent.name}</div>
                    <div className="text-xs text-gray-600">{agent.calls} calls • {agent.conversion} conversions</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#0C0A1D]">{agent.score}</div>
                  <div className="text-xs text-gray-600">Score</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights Engine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0C0A1D] flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Insights Engine
            </h3>
            <button
              onClick={() => removeWidget(4)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              ×
            </button>
          </div>

          <div className="text-center">
            {isScanning ? (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-16 h-16 border-4 border-[#E42289] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-gray-600">Analyzing data patterns...</p>
              </motion.div>
            ) : aiInsight ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <p className="text-[#0C0A1D] font-medium">{aiInsight}</p>
                <button
                  onClick={generateAIInsight}
                  className="px-4 py-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg text-sm hover:shadow-lg transition-all duration-200"
                >
                  Generate New Insight
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">Click to generate AI-powered insights from your data</p>
                <button
                  onClick={generateAIInsight}
                  className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Generate Insights
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;