// src/components/gamification/LevelProgress.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Award } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const LevelProgress = ({ 
  currentLevel = 1, 
  currentXp = 0, 
  xpForNextLevel = 100, 
  showDetails = true,
  size = 'md',
  className = '',
  ...props 
}) => {
  // Calcular progresso para o próximo nível
  const progress = Math.min(100, Math.round((currentXp / xpForNextLevel) * 100));
  const remainingXp = xpForNextLevel - currentXp;
  
  // Configurações de tamanho
  const sizes = {
    sm: {
      icon: 'w-4 h-4',
      levelBadge: 'text-xs p-1 min-w-[1.5rem]',
      levelText: 'text-sm',
      progressDetails: 'text-xs',
    },
    md: {
      icon: 'w-5 h-5',
      levelBadge: 'text-sm p-1.5 min-w-[2rem]',
      levelText: 'text-base',
      progressDetails: 'text-sm',
    },
    lg: {
      icon: 'w-6 h-6',
      levelBadge: 'text-base p-2 min-w-[2.5rem]',
      levelText: 'text-lg',
      progressDetails: 'text-base',
    },
  };
  
  const sizeConfig = sizes[size] || sizes.md;
  
  return (
    <div className={`${className}`} {...props}>
      {/* Cabeçalho com nível atual */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-center rounded-full bg-primary-500 text-white font-bold ${sizeConfig.levelBadge} mr-2`}
          >
            {currentLevel}
          </motion.div>
          <span className={`${sizeConfig.levelText} font-medium text-neutral-800`}>
            Nível {currentLevel}
          </span>
        </div>
        <div className="flex items-center">
          <Star className={`${sizeConfig.icon} text-warning-500 mr-1`} />
          <span className={`${sizeConfig.levelText} font-medium text-neutral-600`}>
            {currentXp} XP
          </span>
        </div>
      </div>
      
      {/* Barra de progresso */}
      <div className="mb-1">
        <ProgressBar 
          value={progress} 
          max={100} 
          color="primary"
          height={size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2'}
          animated
        />
      </div>
      
      {/* Detalhes do progresso */}
      {showDetails && (
        <div className="flex justify-between items-center">
          <span className={`${sizeConfig.progressDetails} text-neutral-500`}>
            Progresso para Nível {currentLevel + 1}
          </span>
          <span className={`${sizeConfig.progressDetails} text-neutral-500`}>
            Faltam {remainingXp} XP
          </span>
        </div>
      )}
    </div>
  );
};

export default LevelProgress;