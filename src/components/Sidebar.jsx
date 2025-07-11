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
import { AuthContext } from '../Contexts/AuthContext';

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path, isIndex = false) => {
    return isIndex ? location.pathname === path : location.pathname.startsWith(path);
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
      {/* New Multi-color Gradient Background */}
      <div className="absolute inset-0" style={{
        background: '#0C0A1D',
        opacity: 0.95
      }} />

      {/* Glowing Particles Effect */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(100, 255, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(180, 80, 255, 0.15) 0%, transparent 40%)'
      }} />

      {/* Sprinkle Effects */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-[#00FFFF] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="relative z-10 p-6 h-full">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-gradient-to-br from-[#E42289] to-[#00FFFF]/25 backdrop-blur-[8px] border border-[white]/30"
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br bg-gradient-to-br from-[#E42289]/60 to-[#00FFFF] rounded-lg flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 255, 255, 0.3)',
                '0 0 20px rgba(0, 255, 255, 0.5)',
                '0 0 10px rgba(0, 255, 255, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PhoneIncoming size={20} className="text-[#00FFFF]" />
          </motion.div>
          <div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-lg">
              CallEase
            </span>

            {user?.subscriptionPlan && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 mt-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF]  text-[white] font-bold rounded-full uppercase tracking-wider border border-[#E42289]/30 backdrop-blur-sm"
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
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-[#00FFFF]/10 backdrop-blur-sm' : 'hover:bg-[#00FFFF]/5 backdrop-blur-sm'}`}
                  style={{
                    color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                    border: active ? '1px solid rgba(0, 255, 255, 0.4)' : '1px solid transparent'
                  }}
                >
                  {/* Active Indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-br from-[#E42289] to-[#00FFFF] rounded-xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    style={{
                      color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'
                    }}
                    whileHover={{ scale: 1.1 }}
                    animate={active ? {
                      filter: [
                        'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))',
                        'drop-shadow(0 0 15px rgba(0, 255, 255, 0.9))',
                        'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <link.icon size={20} />
                  </motion.div>

                  {/* Text */}
                  <span
                    className="relative z-10 font-medium group-hover:from-[#E42289] to-[#00FFFF]"
                    style={{
                      color: active ? '#FFFFFF' : 'inherit'
                    }}
                  >
                    {link.name}
                  </span>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Active Glow */}
                  {active && (
                    <motion.div
                      className="absolute -inset-1 bg-[#00FFFF]/20 rounded-xl blur-[6px] -z-10"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
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
          className="mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-[8px] border border-[#00FFFF]/30"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-[#00FFFF]/10 backdrop-blur-sm rounded-lg flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Zap size={16} className="text-[#00FFFF]" />
            </motion.div>
            <div>
              <div className="text-sm font-medium text-white">Neural Network</div>
              <div className="text-xs text-[#00FFFF] flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-[#00FFFF] rounded-full"
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