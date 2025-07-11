import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Settings, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const SchedulerPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [operatingHours, setOperatingHours] = useState({
    start: '09:00',
    end: '17:00'
  });
  const [bufferTime, setBufferTime] = useState(15);
  const [availableDays, setAvailableDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });

  const [appointments] = useState([
    {
      id: 1,
      date: new Date(2025, 0, 15),
      time: '10:00',
      client: 'John Smith',
      purpose: 'Product Demo',
      duration: 30
    },
    {
      id: 2,
      date: new Date(2025, 0, 15),
      time: '14:30',
      client: 'Sarah Johnson',
      purpose: 'Consultation',
      duration: 45
    },
    {
      id: 3,
      date: new Date(2025, 0, 16),
      time: '11:00',
      client: 'Mike Davis',
      purpose: 'Follow-up Call',
      duration: 20
    }
  ]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[#E42289] mb-2">
          AI Scheduler
        </h1>
        <p className="text-[#00FFFF]/80">
          Automated Appointment Management Matrix
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-3"
        >
          <div className="bg-gradient-to-br from-[#E42289] to-[#00FFFF] backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-[#F0F0F0]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 hover:border-[#00FFFF]/40 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 hover:border-[#00FFFF]/40 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {dayNames.map((day) => (
                <div key={day} className="p-3 text-center text-white/60 font-medium text-sm">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {getDaysInMonth(currentDate).map((date, index) => {
                const dayAppointments = getAppointmentsForDate(date);
                const isCurrentDay = isToday(date);
                
                return (
                  <motion.div
                    key={index}
                    className={`
                      relative p-3 min-h-[80px] rounded-lg cursor-pointer transition-all duration-300
                      ${date ? 'bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/30' : ''}
                      ${isCurrentDay ? 'border-[#00FFFF] shadow-lg shadow-[#00FFFF]/20' : ''}
                      ${selectedDate?.toDateString() === date?.toDateString() ? 'bg-white/20' : ''}
                    `}
                    onClick={() => date && setSelectedDate(date)}
                    whileHover={date ? { scale: 1.02 } : {}}
                    animate={isCurrentDay ? {
                      boxShadow: [
                        '0 0 20px rgba(0, 255, 255, 0.3)',
                        '0 0 30px rgba(0, 255, 255, 0.5)',
                        '0 0 20px rgba(0, 255, 255, 0.3)',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {date && (
                      <>
                        <div className={`text-sm font-medium ${isCurrentDay ? 'text-[#00FFFF]' : 'text-[#F0F0F0]'}`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayAppointments.map((apt) => (
                            <motion.div
                              key={apt.id}
                              className="text-xs p-1 rounded bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white font-medium truncate"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              title={`${apt.time} - ${apt.client}`}
                            >
                              {apt.time}
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Configuration Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Scheduling Rules */}
          <div className="bg-gradient-to-br from-[#E42289] to-[#00FFFF] backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                <Settings className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-[#F0F0F0]">
                Scheduling Rules
              </h3>
            </div>

            <div className="space-y-4">
              {/* Available Days */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Available Days
                </label>
                <div className="space-y-2">
                  {Object.entries(availableDays).map(([day, enabled]) => (
                    <label key={day} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setAvailableDays(prev => ({
                          ...prev,
                          [day]: e.target.checked
                        }))}
                        className="w-4 h-4 rounded border-white/20 bg-black/20 text-[#00FFFF] focus:ring-[#00FFFF]/20"
                      />
                      <span className="text-white/80 capitalize text-sm">
                        {day}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Operating Hours */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Operating Hours
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-white/60 text-xs mb-1">Start</label>
                    <input
                      type="time"
                      value={operatingHours.start}
                      onChange={(e) => setOperatingHours(prev => ({
                        ...prev,
                        start: e.target.value
                      }))}
                      className="w-full px-3 py-2 bg-white/80 border border-white/20 rounded-lg text-[#F0F0F0] text-sm focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs mb-1">End</label>
                    <input
                      type="time"
                      value={operatingHours.end}
                      onChange={(e) => setOperatingHours(prev => ({
                        ...prev,
                        end: e.target.value
                      }))}
                      className="w-full px-3 py-2 bg-white/80 border border-white/20 rounded-lg text-[#F0F0F0] text-sm focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Buffer Time */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Buffer Time (minutes)
                </label>
                <input
                  type="number"
                  value={bufferTime}
                  onChange={(e) => setBufferTime(parseInt(e.target.value))}
                  min="0"
                  max="60"
                  className="w-full px-3 py-2 bg-white/80 border border-white/20 rounded-lg text-[#F0F0F0] focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                  <Clock className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#F0F0F0]">
                  {selectedDate.toLocaleDateString()}
                </h3>
              </div>

              <div className="space-y-3">
                {getAppointmentsForDate(selectedDate).map((apt) => (
                  <div key={apt.id} className="bg-black/20 rounded-lg p-3">
                    <div className="text-[#00FFFF] font-medium text-sm">
                      {apt.time} - {apt.client}
                    </div>
                    <div className="text-white/60 text-xs">
                      {apt.purpose} ({apt.duration}min)
                    </div>
                  </div>
                ))}
                
                {getAppointmentsForDate(selectedDate).length === 0 && (
                  <div className="text-white/60 text-sm text-center py-4">
                    No appointments scheduled
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SchedulerPage;