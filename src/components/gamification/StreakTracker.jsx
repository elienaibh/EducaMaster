// src/components/gamification/StreakTracker.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, CheckCircle, Circle } from 'lucide-react';

const StreakTracker = ({ 
  currentStreak = 0, 
  bestStreak = 0,
  daysOfWeek = [true, true, true, false, false, true, false], // exemplo: últimos 7 dias, true = dia estudado
  className = '',
  ...props 
}) => {
  // Nomes dos dias da semana
  const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  
  // Obter os últimos 7 dias (incluindo hoje)
  const getLastSevenDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      days.push({
        date,
        dayName: dayNames[date.getDay()],
        dayNumber: date.getDate(),
        isToday: i === 0,
      });
    }
    
    return days;
  };
  
  const lastSevenDays = getLastSevenDays();
  
  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className={`p-4 border rounded-xl bg-white ${className}`} {...props}>
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Flame className="w-5 h-5 text-danger-500 mr-2" />
          <h3 className="font-bold text-lg">Sequência de Estudo</h3>
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-danger-500">{currentStreak}</span>
          <span className="text-neutral-600 ml-1">dias</span>
        </div>
      </div>
      
      {/* Calendário dos últimos 7 dias */}
      <motion.div 
        className="grid grid-cols-7 gap-1 mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {lastSevenDays.map((day, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <span className="text-xs text-neutral-500 mb-1">{day.dayName}</span>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center 
              ${day.isToday ? 'border-2 border-primary-500' : ''}
              ${daysOfWeek[6-index] ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-400'}
            `}>
              {day.dayNumber}
            </div>
            <div className="mt-1">
              {daysOfWeek[6-index] ? (
                <CheckCircle className="w-4 h-4 text-success-500" />
              ) : (
                <Circle className="w-4 h-4 text-neutral-300" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Estatísticas adicionais */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-neutral-500">Sequência atual</div>
          <div className="font-bold flex items-center">
            <Flame className="w-4 h-4 text-danger-500 mr-1" />
            {currentStreak} dias
          </div>
        </div>
        <div>
          <div className="text-sm text-neutral-500">Melhor sequência</div>
          <div className="font-bold flex items-center">
            <Calendar className="w-4 h-4 text-primary-500 mr-1" />
            {bestStreak} dias
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;