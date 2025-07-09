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
    <div className="w-full h-full relative bg-[#111827] border-r border-[#00BFFF] border-opacity-30">
      {/* Energy Line */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-px bg-[#00BFFF]"
        animate={{
          boxShadow: [
            '0 0 5px rgba(0, 191, 255, 0.5)',
            '0 0 15px rgba(0, 191, 255, 0.8)',
            '0 0 5px rgba(0, 191, 255, 0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="p-6 h-full">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-rgba(31, 41, 55, 0.3) backdrop-blur-[12px] border border-[#00BFFF]/30"
        >
          <motion.div
            className="w-10 h-10 bg-rgba(31, 41, 55, 0.5) backdrop-blur-[12px] rounded-lg flex items-center justify-center border border-[#00BFFF]/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 191, 255, 0.3)',
                '0 0 20px rgba(0, 191, 255, 0.5)',
                '0 0 10px rgba(0, 191, 255, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PhoneIncoming size={20} className="text-[#00BFFF]" />
          </motion.div>
          <div>
            <span className="text-xl font-bold text-[#FFFFFF]">
              CallEase
            </span>
            {user?.subscriptionPlan && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 bg-rgba(31, 41, 55, 0.5) backdrop-blur-[12px] text-[#00BFFF] text-xs font-bold rounded-full uppercase tracking-wider border border-[#00BFFF]/30"
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
                      ? 'text-[#FFFFFF]'
                      : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
                  }`}
                >
                  {/* Active Indicator - Sharp Green Bar */}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#39FF14] rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      animate={{
                        boxShadow: [
                          '0 0 5px rgba(57, 255, 20, 0.5)',
                          '0 0 15px rgba(57, 255, 20, 0.8)',
                          '0 0 5px rgba(57, 255, 20, 0.5)',
                        ],
                      }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    className={`relative z-10 ${active ? 'text-[#FFFFFF]' : 'text-[#D1D5DB] group-hover:text-[#00BFFF]'}`}
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
                    active ? 'text-[#FFFFFF]' : 'group-hover:text-[#FFFFFF]'
                  }`}>
                    {link.name}
                  </span>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-rgba(31, 41, 55, 0.2) rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{
                      boxShadow: '0 0 15px rgba(0, 191, 255, 0.1)',
                    }}
                  />
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
          className="mt-6 p-4 rounded-xl bg-rgba(31, 41, 55, 0.3) backdrop-blur-[12px] border border-[#00BFFF]/30"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-rgba(31, 41, 55, 0.5) backdrop-blur-[12px] rounded-lg flex items-center justify-center border border-[#00BFFF]/30"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Zap size={16} className="text-[#00BFFF]" />
            </motion.div>
            <div>
              <div className="text-sm font-medium text-[#FFFFFF]">Quantum Core</div>
              <div className="text-xs text-[#00BFFF] flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-[#39FF14] rounded-full"
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