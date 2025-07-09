import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Phone, 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare,
  Cpu,
  GitBranch,
  Shield,
  BarChart3,
  Palette,
  LifeBuoy,
  PhoneIncoming,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path, isIndex = false) => {
    if (isIndex) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleClick = () => {
    if (onNavigate) onNavigate();
  };

  let navLinks = [];

  switch (user?.subscriptionPlan) {
    case 'pro':
      navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, isIndex: true },
        { name: 'Call Manager', path: '/dashboard/call-manager', icon: Phone },
        { name: 'Scheduler', path: '/dashboard/scheduler', icon: Calendar },
        { name: 'CRM Sync', path: '/dashboard/crm-sync', icon: Users },
        { name: 'Reports', path: '/dashboard/reports', icon: FileText },
        { name: 'Chat Assistant', path: '/dashboard/chatbot', icon: MessageSquare },
      ];
      break;
    case 'growth':
      navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, isIndex: true },
        { name: 'Call Manager', path: '/dashboard/call-manager', icon: Phone },
        { name: 'Scheduler', path: '/dashboard/scheduler', icon: Calendar },
        { name: 'Team Hub', path: '/dashboard/team-hub', icon: Users },
        { name: 'Reports', path: '/dashboard/reports', icon: FileText },
        { name: 'AI Studio', path: '/dashboard/ai-studio', icon: Cpu },
        { name: 'Call Flows', path: '/dashboard/call-flows', icon: GitBranch },
        { name: 'Chat Assistant', path: '/dashboard/chatbot', icon: MessageSquare },
      ];
      break;
    case 'agency':
      navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, isIndex: true },
        { name: 'Call Manager', path: '/dashboard/call-manager', icon: Phone },
        { name: 'Scheduler', path: '/dashboard/scheduler', icon: Calendar },
        { name: 'Agent Management', path: '/dashboard/agent-management', icon: Shield },
        { name: 'Advanced Analytics', path: '/dashboard/advanced-analytics', icon: BarChart3 },
        { name: 'AI Studio', path: '/dashboard/ai-studio', icon: Cpu },
        { name: 'Call Flows', path: '/dashboard/call-flows', icon: GitBranch },
        { name: 'White-Label', path: '/dashboard/white-label', icon: Palette },
        { name: 'Support Center', path: '/dashboard/support-center', icon: LifeBuoy },
        { name: 'Chat Assistant', path: '/dashboard/chatbot', icon: MessageSquare },
      ];
      break;
    default:
      navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, isIndex: true },
        { name: 'Chat Assistant', path: '/dashboard/chatbot', icon: MessageSquare },
      ];
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Holographic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E42289] to-[#00FFFF] opacity-90" />
      
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
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Shimmering Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear"
        }}
        style={{ width: '50%' }}
      />

      <div className="relative z-10 p-6 h-full">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-black/20 backdrop-blur-sm border border-white/20"
        >
          <motion.div
            className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 255, 255, 0.3)',
                '0 0 30px rgba(255, 255, 255, 0.5)',
                '0 0 20px rgba(255, 255, 255, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PhoneIncoming size={20} className="text-white" />
          </motion.div>
          <div>
            <span className="text-xl font-bold text-white drop-shadow-lg">
              CallEase
            </span>
            {user?.subscriptionPlan && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/30"
              >
                {user.subscriptionPlan}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navLinks.map((link, index) => {
            const active = isActive(link.path, link.isIndex);
            return (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  onClick={handleClick}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-black/20 backdrop-blur-sm text-white border border-white'
                      : 'text-white/80 hover:text-white hover:bg-black/10 backdrop-blur-sm'
                  }`}
                >
                  {/* Active Indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/50"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    className={`relative z-10 ${active ? 'text-white' : 'text-white/80 group-hover:text-white'}`}
                    whileHover={{ scale: 1.1 }}
                    animate={active ? {
                      filter: [
                        'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))',
                        'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
                        'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <link.icon size={20} />
                  </motion.div>

                  {/* Text */}
                  <span className={`relative z-10 font-medium ${
                    active ? 'text-white' : 'group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                    }}
                  />

                  {/* Active Glow */}
                  {active && (
                    <motion.div
                      className="absolute -inset-1 bg-white/20 rounded-xl blur-sm -z-10"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-black/20 backdrop-blur-sm border border-white/20"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Zap size={16} className="text-white" />
            </motion.div>
            <div>
              <div className="text-sm font-medium text-white">Neural Network</div>
              <div className="text-xs text-white/80 flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Systems Online
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;