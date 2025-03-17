// src/components/ui/Dropdown/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({
  trigger,
  children,
  className = '',
  menuClassName = '',
  align = 'left',
  width = 'w-48',
  closeOnClick = true,
  openOnHover = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Definir posição do menu
  const alignmentStyles = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2',
  };
  
  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Alternar o estado do dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Fechar o dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };
  
  // Lidar com clique em um item do dropdown
  const handleItemClick = () => {
    if (closeOnClick) {
      closeDropdown();
    }
  };
  
  // Adicionar eventos de hover se necessário
  const hoverProps = openOnHover
    ? {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      }
    : {};
  
  // Animações para o menu
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -5, scale: 0.95 },
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef} {...hoverProps} {...props}>
      {/* Trigger (botão ou elemento que abre o dropdown) */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger || (
          <button
            type="button"
            className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Selecione uma opção
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Menu do dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute z-50 mt-2 ${width} rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${alignmentStyles[align]} ${menuClassName}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1" onClick={handleItemClick}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Item de dropdown para uso com o componente Dropdown
export const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  const baseClasses = 'block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type="button"
      className={`${baseClasses} ${disabledClasses} ${className} w-full text-left`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </div>
    </button>
  );
};

// Divider para separar itens do dropdown
export const DropdownDivider = ({ className = '' }) => (
  <div className={`my-1 h-px bg-neutral-200 ${className}`} />
);

// Cabeçalho para seções do dropdown
export const DropdownHeader = ({ children, className = '' }) => (
  <div className={`px-4 py-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider ${className}`}>
    {children}
  </div>
);

export default Dropdown;