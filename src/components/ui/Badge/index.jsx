// src/components/ui/Badge/index.jsx
import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  dot = false,
  ...props 
}) => {
  // Estilos de variantes
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-success-100 text-success-800',
    danger: 'bg-danger-100 text-danger-800',
    warning: 'bg-warning-100 text-warning-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-neutral-100 text-neutral-800',
    boss: 'bg-red-100 text-red-800 font-semibold',
  };

  // Estilos de tamanhos
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  // Classe base para todas as badges
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  // Combinar todas as classes
  const combinedClassName = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // Se for apenas um indicador de ponto
  if (dot) {
    const dotSizes = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };
    
    const dotClasses = `inline-block rounded-full ${dotSizes[size]} ${variantStyles[variant].split(' ')[0]}`;
    
    return (
      <span className={dotClasses} {...props}></span>
    );
  }

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};

export default Badge;