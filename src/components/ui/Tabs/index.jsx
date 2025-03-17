// src/components/ui/Tabs/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Componente para o item de aba
export const TabItem = ({ 
  id, 
  title, 
  icon, 
  disabled = false, 
  badge,
  onClick,
  isActive,
  ...props 
}) => {
  const activeClasses = isActive 
    ? 'text-primary-600 border-primary-500' 
    : 'text-neutral-600 border-transparent hover:text-primary-500 hover:border-primary-200';
  
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      type="button"
      className={`flex items-center px-4 py-2 border-b-2 font-medium ${activeClasses} ${disabledClasses}`}
      onClick={() => !disabled && onClick(id)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
      {badge && (
        <span className="ml-2">
          {badge}
        </span>
      )}
    </button>
  );
};

// Componente principal de abas
const Tabs = ({ 
  tabs = [], 
  defaultTab,
  onChange,
  variant = 'default',
  className = '',
  tabClassName = '',
  contentClassName = '',
  animated = true,
  ...props 
}) => {
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs[0] && tabs[0].id));
  
  // Configurações de variantes
  const variantStyles = {
    default: 'border-b border-neutral-200',
    pills: 'flex gap-2',
    cards: 'flex gap-2',
  };
  
  // Classes para as variantes das abas
  const tabVariantStyles = {
    default: '',
    pills: activeId => `rounded-full px-4 py-2 ${activeId === activeTab ? 'bg-primary-100 text-primary-800' : 'hover:bg-neutral-100'}`,
    cards: activeId => `rounded-t-lg px-4 py-2 ${activeId === activeTab ? 'bg-white border border-b-0 border-neutral-200' : 'bg-neutral-50 hover:bg-neutral-100'}`,
  };
  
  // Animações para o conteúdo
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  
  // Efeito para notificar mudanças
  useEffect(() => {
    if (onChange) {
      onChange(activeTab);
    }
  }, [activeTab, onChange]);
  
  // Handler para mudar a aba
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  // Encontrar o conteúdo da aba ativa
  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className} {...props}>
      {/* Lista de abas */}
      <div className={`flex overflow-x-auto ${variantStyles[variant]} ${tabClassName}`}>
        {tabs.map((tab) => (
          variant === 'default' ? (
            <TabItem
              key={tab.id}
              id={tab.id}
              title={tab.title}
              icon={tab.icon}
              disabled={tab.disabled}
              badge={tab.badge}
              isActive={tab.id === activeTab}
              onClick={handleTabChange}
            />
          ) : (
            <button
              key={tab.id}
              type="button"
              className={`font-medium ${tabVariantStyles[variant](tab.id)} ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
            >
              <div className="flex items-center">
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.title}
                {tab.badge && <span className="ml-2">{tab.badge}</span>}
              </div>
            </button>
          )
        ))}
      </div>
      
      {/* Conteúdo da aba ativa */}
      <div className={`mt-4 ${contentClassName}`}>
        {animated ? (
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            transition={{ duration: 0.3 }}
          >
            {activeContent}
          </motion.div>
        ) : (
          activeContent
        )}
      </div>
    </div>
  );
};

export default Tabs;