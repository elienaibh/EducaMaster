import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

const Card = ({ 
  children, 
  className = '', 
  interactive = false,
  onClick,
  title,
  titleClassName = '',
  padding = 'p-6',
  shadow = 'shadow-card',
  ...props 
}) => {
  // Classe base para todos os cards
  const baseClasses = `bg-white rounded-xl ${shadow} ${padding} overflow-hidden`;
  
  // Classes combinadas
  const combinedClassName = `${baseClasses} ${className}`;
  
  // Renderização condicional baseada na propriedade interactive
  if (interactive) {
    return (
      <motion.div
        className={`${combinedClassName} cursor-pointer`}
        onClick={onClick}
        variants={cardVariants}
        whileHover="hover"
        {...props}
      >
        {title && <h3 className={`mb-4 font-medium ${titleClassName}`}>{title}</h3>}
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={combinedClassName} {...props}>
      {title && <h3 className={`mb-4 font-medium ${titleClassName}`}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;