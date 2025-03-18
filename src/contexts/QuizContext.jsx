// src/contexts/QuizContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import aiService from '../services/ai/aiService';
import quizApi from '../services/api/quizApi';

// Criação do contexto de Quiz
const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  // Estado para quizzes do usuário
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  // Efeito para carregar os quizzes do usuário
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        // No projeto real, usaria: const data = await quizApi.getUserQuizzes();
        
        // Mock para desenvolvimento
        const data = [
          {
            id: 'quiz-1',
            title: 'Matemática Básica',
            description: 'Revise conceitos fundamentais de matemática.',
            questions: 10,
            time: '15min',
            status: 'completed',
            score: 85,
          },
          {
            id: 'quiz-2',
            title: 'História do Brasil',
            description: 'Teste seus conhecimentos sobre a história brasileira.',
            questions: 8,
            time: '12min',
            status: 'in-progress',
            progress: 50,
          },
          // Mais quizzes mockados
        ];
        
        setQuizzes(data);
      } catch (err) {
        setError(err.message || 'Erro ao carregar quizzes');
        console.error('Erro ao carregar quizzes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Buscar um quiz específico
  const getQuiz = async (quizId) => {
    try {
      setLoading(true);
      // No projeto real: const quiz = await quizApi.getQuizById(quizId);
      
      // Mock para desenvolvimento
      const quiz = {
        id: quizId,
        title: 'Matemática Básica',
        description: 'Revise conceitos fundamentais de matemática.',
        questions: [
          {
            id: 'q1',
            text: 'Qual é o resultado de 25 × 4?',
            options: [
              { id: 'a', text: '100' },
              { id: 'b', text: '125' },
              { id: 'c', text: '90' },
              { id: 'd', text: '110' },
            ],
            correctAnswer: 'a',
            explanation: '25 × 4 = 100, pois 25 × 4 = (20 + 5) × 4 = 80 + 20 = 100',
          },
          // Mais questões mockadas
        ],
        time: '15min',
      };
      
      setCurrentQuiz(quiz);
      setCurrentQuestion(0);
      setUserAnswers([]);
      return quiz;
    } catch (err) {
      setError(err.message || 'Erro ao carregar quiz');
      console.error('Erro ao carregar quiz:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Criar um novo quiz a partir de um texto
  const createQuiz = async (title, description, textContent, questionsCount = 5) => {
    try {
      setLoading(true);
      
      // Gerar questões usando IA
      const questions = await aiService.generateQuizQuestions(
        textContent,
        questionsCount,
        { level: 'médio' }
      );
      
      // No projeto real: const newQuiz = await quizApi.createQuiz({ title, description, questions });
      
      // Mock para desenvolvimento
      const newQuiz = {
        id: `quiz-${Date.now()}`,
        title,
        description,
        questions: questions,
        time: `${questionsCount * 1.5}min`,
        status: 'not-started',
        createdAt: new Date().toISOString(),
      };
      
      setQuizzes([newQuiz, ...quizzes]);
      return newQuiz;
    } catch (err) {
      setError(err.message || 'Erro ao criar quiz');
      console.error('Erro ao criar quiz:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Responder uma questão
  const answerQuestion = (questionId, answerId) => {
    if (!currentQuiz) return;
    
    // Registra a resposta do usuário
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = {
      questionId,
      answerId,
      isCorrect: currentQuiz.questions[currentQuestion].correctAnswer === answerId,
    };
    
    setUserAnswers(newUserAnswers);
  };

  // Ir para próxima questão
  const nextQuestion = () => {
    if (!currentQuiz || currentQuestion >= currentQuiz.questions.length - 1) {
      // Fim do quiz, calcular resultados
      finishQuiz();
      return false;
    }
    
    setCurrentQuestion(currentQuestion + 1);
    return true;
  };

  // Finalizar o quiz e calcular resultado
  const finishQuiz = () => {
    if (!currentQuiz || !userAnswers.length) return;
    
    // Calcular pontuação
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = currentQuiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    const result = {
      quizId: currentQuiz.id,
      score,
      correctAnswers,
      totalQuestions,
      answers: userAnswers,
      completedAt: new Date().toISOString(),
    };
    
    setQuizResult(result);
    
    // No projeto real: quizApi.saveQuizResult(result);
    
    // Atualizar lista de quizzes do usuário
    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.id === currentQuiz.id) {
        return { ...quiz, status: 'completed', score };
      }
      return quiz;
    });
    
    setQuizzes(updatedQuizzes);
    
    // Lógica para causar dano ao Boss baseado no score
    const damage = Math.round(score * 2); // Exemplo: 100% = 200 de dano
    
    return { result, damage };
  };

  // Valores disponibilizados pelo contexto
  const value = {
    quizzes,
    currentQuiz,
    currentQuestion,
    userAnswers,
    quizResult,
    loading,
    error,
    getQuiz,
    createQuiz,
    answerQuestion,
    nextQuestion,
    finishQuiz,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;