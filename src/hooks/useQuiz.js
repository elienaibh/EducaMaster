// src/hooks/useQuiz.js
import { useContext } from 'react';
import QuizContext from '../contexts/QuizContext';

/**
 * Hook personalizado para acesso ao contexto de quizzes
 * @returns {Object} Funções e estados relacionados aos quizzes
 */
const useQuiz = () => {
  const context = useContext(QuizContext);
  
  if (!context) {
    throw new Error('useQuiz deve ser usado dentro de um QuizProvider');
  }
  
  return context;
};

export default useQuiz;