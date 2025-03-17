// src/components/ui/Toggle/index.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  labelPosition = 'right',
  color = 'primary',
  className = '',
  ...props
}) => {
  // Configurações de tamanho
  const sizes = {
    sm: {
      container: 'w-8 h-4',
      circle: 'w-3 h-3',
      translateX: 10,
      labelText: 'text-sm',
    },
    md: {
      container: 'w-11 h-6',
      circle: 'w-5 h-5',
      translateX: 12,
      labelText: 'text-base',
    },
    lg: {
      container: 'w-14 h-7',
      circle: 'w-6 h-6',
      translateX: 16,
      labelText: 'text-lg',
    },
  };
  
  // Configurações de cores
  const colors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    danger: 'bg-danger-500',
    warning: 'bg-warning-500',
  };
  
  const sizeConfig = sizes[size];
  const colorClass = colors[color];
  
  // Lidar com a mudança de estado
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };
  
  // Renderizar apenas o toggle
  const renderToggle = () => (
    <div
      className={`
        relative inline-flex flex-shrink-0 rounded-full cursor-pointer transition-colors ease-in-out duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${checked ? colorClass : 'bg-neutral-300'}
        ${sizeConfig.container}
      `}
      onClick={handleChange}
      {...props}
    >
      <span className="sr-only">Alternar</span>
      <motion.span 
        className={`
          absolute left-0.5 top-0.5 rounded-full bg-white shadow transform ring-0 transition-transform
          ${sizeConfig.circle}
        `}
        initial={false}
        animate={{ 
          x: checked ? sizeConfig.translateX : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  );
  
  // Se não tiver label, renderizar apenas o toggle
  if (!label) {
    return renderToggle();
  }
  
  // Com label, renderizar o toggle com o label
  return (
    <div className={`inline-flex items-center ${className}`}>
      {labelPosition === 'left' && (
        <span 
          className={`mr-3 ${sizeConfig.labelText} ${disabled ? 'text-neutral-400' : 'text-neutral-700'}`}
          onClick={!disabled ? handleChange : undefined}
        >
          {label}
        </span>
      )}
      
      {renderToggle()}
      
      {labelPosition === 'right' && (
        <span 
          className={`ml-3 ${sizeConfig.labelText} ${disabled ? 'text-neutral-400' : 'text-neutral-700'}`}
          onClick={!disabled ? handleChange : undefined}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;