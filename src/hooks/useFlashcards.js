// src/hooks/useFlashcards.js
import { useContext } from 'react';
import FlashcardContext from '../contexts/FlashcardContext';

/**
 * Hook personalizado para acesso ao contexto de flashcards
 * @returns {Object} Funções e estados relacionados aos flashcards
 */
const useFlashcards = () => {
  const context = useContext(FlashcardContext);
  
  if (!context) {
    throw new Error('useFlashcards deve ser usado dentro de um FlashcardProvider');
  }
  
  return context;
};

export default useFlashcards;