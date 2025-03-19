// src/components/gamification/Achievement.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Lock, Check } from 'lucide-react';

const Achievement = ({ 
  title, 
  description, 
  icon = 'trophy', 
  unlocked = false, 
  progress = 0, 
  maxProgress = 100,
  dateEarned = null,
  rarity = 'common', // common, uncommon, rare, epic, legendary
  size = 'md',
  onClick,
  className = '',
  ...props 
}) => {
  // Configurações de tamanho
  const sizes = {
    sm: {
      container: 'p-2',
      iconSize: 'w-8 h-8',
      title: 'text-sm',
      description: 'text-xs',
      date: 'text-xs',
    },
    md: {
      container: 'p-3',
      iconSize: 'w-12 h-12',
      title: 'text-base',
      description: 'text-sm',
      date: 'text-xs',
    },
    lg: {
      container: 'p-4',
      iconSize: 'w-16 h-16',
      title: 'text-lg',
      description: 'text-base',
      date: 'text-sm',
    },
  };
  
  // Configurações de raridade
  const rarityConfig = {
    common: {
      bg: 'bg-neutral-100',
      iconBg: 'bg-neutral-200',
      iconColor: 'text-neutral-500',
      borderColor: 'border-neutral-200',
    },
    uncommon: {
      bg: 'bg-primary-50',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-500',
      borderColor: 'border-primary-200',
    },
    rare: {
      bg: 'bg-secondary-50',
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-500',
      borderColor: 'border-secondary-200',
    },
    epic: {
      bg: 'bg-warning-50',
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning-500',
      borderColor: 'border-warning-200',
    },
    legendary: {
      bg: 'bg-danger-50',
      iconBg: 'bg-danger-100',
      iconColor: 'text-danger-500',
      borderColor: 'border-danger-200',
    },
  };
  
  const sizeConfig = sizes[size] || sizes.md;
  const raritySettings = rarityConfig[rarity] || rarityConfig.common;
  
  // Calcular progresso percentual
  const progressPercentage = Math.min(100, Math.round((progress / maxProgress) * 100));
  
  // Renderizar ícone apropriado
  const renderIcon = () => {
    if (icon === 'trophy') {
      return <Award className={`${sizeConfig.iconSize} ${raritySettings.iconColor}`} />;
    }
    // Adicionar mais ícones conforme necessário
    return <Award className={`${sizeConfig.iconSize} ${raritySettings.iconColor}`} />;
  };
  
  return (
    <motion.div
      className={`
        border rounded-xl ${raritySettings.bg} ${raritySettings.borderColor}
        ${unlocked ? 'opacity-100' : 'opacity-60'}
        ${onClick ? 'cursor-pointer' : ''}
        ${sizeConfig.container} ${className}
      `}
      whileHover={onClick ? { scale: 1.03 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <div className="flex flex-col items-center text-center">
        {/* Ícone */}
        <div className={`${raritySettings.iconBg} rounded-full p-3 mb-3 relative`}>
          {renderIcon()}
          
          {/* Status de desbloqueio */}
          {unlocked ? (
            <div className="absolute -bottom-1 -right-1 bg-success-500 rounded-full p-1">
              <Check className="w-3 h-3 text-white" />
            </div>
          ) : (
            <div className="absolute -bottom-1 -right-1 bg-neutral-400 rounded-full p-1">
              <Lock className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        {/* Título e descrição */}
        <h3 className={`font-bold ${sizeConfig.title} mb-1`}>{title}</h3>
        <p className={`${sizeConfig.description} text-neutral-600 mb-2`}>{description}</p>
        
        {/* Progresso ou data de conquista */}
        {unlocked ? (
          <div className="flex items-center mt-1">
            <Clock className="w-3 h-3 text-neutral-500 mr-1" />
            <span className={`${sizeConfig.date} text-neutral-500`}>
              {dateEarned ? new Date(dateEarned).toLocaleDateString() : 'Conquistado'}
            </span>
          </div>
        ) : (
          <>
            {maxProgress > 1 && (
              <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-primary-500 h-1.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}
            <span className={`${sizeConfig.date} text-neutral-500 mt-1`}>
              {maxProgress > 1 ? `${progress}/${maxProgress}` : 'Bloqueado'}
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Achievement;