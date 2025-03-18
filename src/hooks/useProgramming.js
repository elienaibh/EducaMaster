// src/hooks/useProgramming.js
import  useContext  from 'react';
import ProgrammingContext from '../contexts/ProgrammingContext';

/**
 * Hook personalizado para acesso ao contexto de programação
 * @returns {Object} Funções e estados relacionados à programação
 */
const useProgramming = () => {
  const context = useContext(ProgrammingContext);
  
  if (!context) {
    throw new Error('useProgramming deve ser usado dentro de um ProgrammingProvider');
  }
  
  return context;
};

export default useProgramming;