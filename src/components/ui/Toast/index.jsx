// src/components/ui/Toast/index.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

// Componente individual de Toast
export const ToastItem = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = '',
}) => {
  // Estado para controlar a visibilidade
  const [visible, setVisible] = useState(true);
  
  // Fechar o toast após a duração especificada
  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose(id);
        }, 300); // Tempo para a animação de saída
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);
  
  // Fechar o toast manualmente
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };
  
  // Definir ícone e cores baseados no tipo de toast
  const typeConfig = {
    success: {
      icon: <CheckCircle className="w-5 h-5 text-success-500" />,
      colors: 'bg-success-50 border-success-500',
      titleColor: 'text-success-800',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-danger-500" />,
      colors: 'bg-danger-50 border-danger-500',
      titleColor: 'text-danger-800',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-warning-500" />,
      colors: 'bg-warning-50 border-warning-500',
      titleColor: 'text-warning-800',
    },
    info: {
      icon: <Info className="w-5 h-5 text-primary-500" />,
      colors: 'bg-primary-50 border-primary-500',
      titleColor: 'text-primary-800',
    },
  };
  
  const config = typeConfig[type] || typeConfig.info;
  
  // Animações
  const toastVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`max-w-sm w-full border-l-4 rounded-md shadow-md ${config.colors} ${className}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={toastVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 flex">
            <div className="flex-shrink-0 mr-3">
              {config.icon}
            </div>
            <div className="flex-1">
              {title && (
                <h3 className={`text-sm font-medium mb-1 ${config.titleColor}`}>
                  {title}
                </h3>
              )}
              {message && (
                <p className="text-sm text-neutral-600">
                  {message}
                </p>
              )}
            </div>
            <button
              type="button"
              className="ml-4 flex-shrink-0 text-neutral-400 hover:text-neutral-600 focus:outline-none"
              onClick={handleClose}
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Barra de progresso */}
          {duration !== Infinity && (
            <motion.div
              className={`h-1 bg-${type === 'info' ? 'primary' : type}-500 rounded-b-md`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente container de Toasts
const Toast = ({ toasts = [], position = 'top-right', onClose }) => {
  // Estilos de posição
  const positionStyles = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div className={`fixed z-50 m-4 space-y-2 ${positionStyles[position]}`}>
      {toasts.map(toast => (
        <ToastItem 
          key={toast.id} 
          {...toast} 
          onClose={onClose} 
        />
      ))}
    </div>
  );
};

export default Toast;

