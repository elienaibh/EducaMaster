// src/components/ui/Modal/index.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Componente de cabeçalho do modal
export const ModalHeader = ({ children, onClose, showCloseButton = true, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-neutral-200 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-neutral-800">{children}</h3>
        {showCloseButton && (
          <button
            type="button"
            className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// Componente de corpo do modal
export const ModalBody = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

// Componente de rodapé do modal
export const ModalFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-neutral-200 ${className}`}>
      {children}
    </div>
  );
};

// Componente principal de Modal
const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  className = '',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  preventScroll = true,
  ...props
}) => {
  const modalRef = useRef(null);
  
  // Definir tamanhos do modal
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    full: 'max-w-full',
  };
  
  // Fechar o modal quando pressionar ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);
  
  // Prevenir rolagem do corpo quando o modal estiver aberto
  useEffect(() => {
    if (preventScroll) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      if (preventScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, preventScroll]);
  
  // Clicar fora do modal para fechá-lo
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };
  
  // Animações
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.95 },
  };
  
  // Renderizar o modal através de um portal para que fique no topo da hierarquia DOM
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
        >
          <div
            className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
            onClick={handleOverlayClick}
          >
            {/* Overlay escuro */}
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
            
            {/* Truque para centralizar verticalmente em telas pequenas */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal */}
            <motion.div
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full ${sizeClasses[size]} ${className}`}
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              variants={modalVariants}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
              {...props}
            >
              {/* Conteúdo do modal */}
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;