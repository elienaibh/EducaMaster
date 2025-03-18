// src/contexts/ProgrammingContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import aiService from '../services/ai/aiService';
import useLocalStorage from '../hooks/useLocalStorage';
import { useBoss } from './BossContext';

// Criação do contexto de Programação
const ProgrammingContext = createContext();

export const useProgramming = () => useContext(ProgrammingContext);

export const ProgrammingProvider = ({ children }) => {
  // Estado para desafios e progresso
  const [challenges, setChallenges] = useLocalStorage('programming_challenges', []);
  const [userProgress, setUserProgress] = useLocalStorage('programming_progress', {
    level: 1,
    xp: 0,
    completedChallenges: [],
    currentChallenge: null,
    totalPoints: 0,
  });
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { damageBoss } = useBoss();

  // Carregar desafios mockados para desenvolvimento
  useEffect(() => {
    // Se não existirem desafios salvos, criar alguns de exemplo
    if (challenges.length === 0) {
      const mockChallenges = [
        {
          id: 'challenge-1',
          title: 'Iniciante: Variáveis e Operações',
          description: 'Aprenda os conceitos básicos de programação trabalhando com variáveis e operações simples.',
          level: 'Iniciante',
          points: 50,
          estimatedTime: '20min',
          language: 'JavaScript',
          content: {
            instructions: 'Crie variáveis para armazenar números e realize operações básicas de soma, subtração, multiplicação e divisão.',
            hints: ['Use let ou const para declarar variáveis', 'Os operadores básicos são +, -, * e /'],
            examples: [
              {
                code: `const a = 5;\nconst b = 3;\nconst sum = a + b;\nconsole.log(sum); // Output: 8`,
                explanation: 'Criamos duas variáveis com valores numéricos e realizamos uma soma.'
              }
            ],
            tasks: [
              {
                id: 'task-1',
                description: 'Declare duas variáveis, uma com valor 10 e outra com valor 5.',
                solution: `const num1 = 10;\nconst num2 = 5;`,
                points: 10
              },
              {
                id: 'task-2',
                description: 'Calcule e armazene a soma das duas variáveis.',
                solution: `const soma = num1 + num2