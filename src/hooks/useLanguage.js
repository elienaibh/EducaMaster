// src/hooks/useLanguage.js
import { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';

/**
 * Hook personalizado para acesso ao contexto de aprendizado de idiomas
 * @returns {Object} Funções e estados relacionados ao aprendizado de idiomas
 */
const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  }
  
  return context;
};

export default useLanguage;