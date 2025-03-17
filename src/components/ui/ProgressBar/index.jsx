// src/components/ui/ProgressBar/index.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  value = 0, 
  max = 100,
  height = 'h-2',
  color = 'primary',
  showValue = false,
  valueFormat = 'percentage', // 'percentage' ou 'value'
  label,
  className = '',
  animated = true,
  ...props 
}) => {
  // Calcular a porcentagem
  const percentage = Math.round((value / max) * 100);
  
  // Cores disponíveis
  const colors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    danger: 'bg-danger-500',
    warning: 'bg-warning-500',
    boss: 'bg-boss-health',
  };
  
  // Formatar o valor exibido
  const formattedValue = valueFormat === 'percentage' 
    ? `${percentage}%` 
    : `${value}/${max}`;

  return (
    <div className={`w-full ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-neutral-700">{label}</span>}
          {showValue && <span className="text-sm font-medium text-neutral-500">{formattedValue}</span>}
        </div>
      )}
      
      <div className={`w-full bg-neutral-200 rounded-full ${height} overflow-hidden`}>
        {animated ? (
          <motion.div 
            className={`${colors[color]} rounded-full ${height}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ) : (
          <div 
            className={`${colors[color]} rounded-full ${height}`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressBar;