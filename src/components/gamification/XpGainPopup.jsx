// src/components/gamification/XpGainPopup.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, TrendingUp, Award } from 'lucide-react';

const XpGainPopup = ({ 
  xp = 0, 
  message = '', 
  duration = 3000, 
  onClose, 
  position = 'bottom-right',
  showLevelUp = false,
  newLevel = 0,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Remover automaticamente após duração
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 300); // Tempo para a animação de saída
      }
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  // Posições
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };
  
  // Variantes de animação
  const variants = {
    hidden: { 
      opacity: 0, 
      y: position.includes('top') ? -50 : 50,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };
  
  // Variantes para a animação de número
  const numberVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 500,
        damping: 15,
        delay: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 ${positions[position]}`}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          {...props}
        >
          {/* Pop-up principal de XP */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
            <div className="bg-primary-500 px-4 py-2 text-white font-bold flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-1" />
                <span>XP Ganho!</span>
              </div>
              {showLevelUp && (
                <div className="bg-warning-500 px-2 py-0.5 rounded text-xs font-bold">
                  LEVEL UP!
                </div>
              )}
            </div>
            
            <div className="p-4">
              {/* Mensagem */}
              {message && (
                <p className="text-neutral-600 text-sm mb-2">{message}</p>
              )}
              
              {/* XP ganho */}
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Experiência ganha:</span>
                <motion.div 
                  className="flex items-center font-bold text-primary-600"
                  variants={numberVariants}
                  initial="initial"
                  animate="animate"
                >
                  <span>+{xp}</span>
                  <Star className="w-4 h-4 ml-1 text-warning-500" />
                </motion.div>
              </div>
              
              {/* Level up (se aplicável) */}
              {showLevelUp && (
                <div className="mt-3 bg-warning-50 p-2 rounded-lg">
                  <div className="flex items-center justify-between text-warning-800">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 mr-1" />
                      <span className="font-bold">Nível alcançado!</span>
                    </div>
                    <span className="text-xl font-bold">{newLevel}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default XpGainPopup;