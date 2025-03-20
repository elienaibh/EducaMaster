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
  const bossContext = useBoss();
const damageBoss = bossContext?.damageBoss || ((amount, source) => {
  console.log('Boss damage not available in ProgrammingContext:', amount, source);
});

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
                solution: `const soma = num1 + num2;`,
                points: 10
              },
              {
                id: 'task-3',
                description: 'Calcule e armazene a subtração das duas variáveis.',
                solution: `const subtracao = num1 - num2;`,
                points: 10
              },
              {
                id: 'task-4',
                description: 'Calcule e armazene a multiplicação das duas variáveis.',
                solution: `const multiplicacao = num1 * num2;`,
                points: 10
              },
              {
                id: 'task-5',
                description: 'Calcule e armazene a divisão das duas variáveis.',
                solution: `const divisao = num1 / num2;`,
                points: 10
              }
            ]
          },
          completed: true,
          progress: 100,
        },
        {
          id: 'challenge-2',
          title: 'Iniciante: Estruturas Condicionais',
          description: 'Aprenda a usar if/else para criar lógica condicional em seus programas.',
          level: 'Iniciante',
          points: 50,
          estimatedTime: '25min',
          language: 'JavaScript',
          content: {
            instructions: 'Use estruturas condicionais (if/else) para controlar o fluxo do seu programa com base em diferentes condições.',
            hints: ['Use if para verificar uma condição', 'Use else para executar código quando a condição é falsa', 'Você pode encadear condições com else if'],
            examples: [
              {
                code: `const idade = 18;\nif (idade >= 18) {\n  console.log('Maior de idade');\n} else {\n  console.log('Menor de idade');\n}`,
                explanation: 'Verificamos se a idade é maior ou igual a 18 e mostramos uma mensagem correspondente.'
              }
            ],
            tasks: [
              {
                id: 'task-1',
                description: 'Declare uma variável chamada "numero" com o valor 7.',
                solution: `const numero = 7;`,
                points: 10
              },
              {
                id: 'task-2',
                description: 'Crie uma condição que verifica se o número é par ou ímpar e armazene uma mensagem na variável "resultado".',
                solution: `let resultado;\nif (numero % 2 === 0) {\n  resultado = 'Par';\n} else {\n  resultado = 'Ímpar';\n}`,
                points: 20
              },
              {
                id: 'task-3',
                description: 'Crie uma condição que verifica se o número é positivo, negativo ou zero, e armazene uma mensagem na variável "sinal".',
                solution: `let sinal;\nif (numero > 0) {\n  sinal = 'Positivo';\n} else if (numero < 0) {\n  sinal = 'Negativo';\n} else {\n  sinal = 'Zero';\n}`,
                points: 20
              }
            ]
          },
          completed: true,
          progress: 100,
        },
        {
          id: 'challenge-3',
          title: 'Intermediário: Loops e Arrays',
          description: 'Trabalhe com loops e arrays para processar conjuntos de dados.',
          level: 'Intermediário',
          points: 100,
          estimatedTime: '30min',
          language: 'JavaScript',
          content: {
            instructions: 'Aprenda a usar loops (for, while) para iterar sobre arrays e processar múltiplos valores.',
            hints: ['Use um loop for para percorrer um array', 'Acesse elementos de um array com índices (array[0])', 'Use métodos como push, pop, shift, unshift para modificar arrays'],
            examples: [
              {
                code: `const numeros = [1, 2, 3, 4, 5];\nlet soma = 0;\nfor (let i = 0; i < numeros.length; i++) {\n  soma += numeros[i];\n}\nconsole.log(soma); // Output: 15`,
                explanation: 'Usamos um loop for para percorrer o array e somar todos os valores.'
              }
            ],
            tasks: [
              {
                id: 'task-1',
                description: 'Declare um array chamado "frutas" com 5 frutas diferentes.',
                solution: `const frutas = ['maçã', 'banana', 'laranja', 'uva', 'morango'];`,
                points: 10
              },
              {
                id: 'task-2',
                description: 'Use um loop for para imprimir cada fruta do array no console.',
                solution: `for (let i = 0; i < frutas.length; i++) {\n  console.log(frutas[i]);\n}`,
                points: 20
              },
              {
                id: 'task-3',
                description: 'Crie um array de números de 1 a 10 e use um loop para calcular a soma de todos os números.',
                solution: `const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nlet soma = 0;\nfor (let i = 0; i < numeros.length; i++) {\n  soma += numeros[i];\n}`,
                points: 20
              },
              {
                id: 'task-4',
                description: 'Use um loop para criar um novo array contendo apenas os números pares do array original.',
                solution: `const numerosPares = [];\nfor (let i = 0; i < numeros.length; i++) {\n  if (numeros[i] % 2 === 0) {\n    numerosPares.push(numeros[i]);\n  }\n}`,
                points: 30
              },
              {
                id: 'task-5',
                description: 'Use um loop while para encontrar o primeiro número no array que é divisível por 3.',
                solution: `let i = 0;\nlet primeiroDivisivelPor3 = null;\nwhile (i < numeros.length) {\n  if (numeros[i] % 3 === 0) {\n    primeiroDivisivelPor3 = numeros[i];\n    break;\n  }\n  i++;\n}`,
                points: 20
              }
            ]
          },
          completed: false,
          progress: 60,
        },
        // Mais desafios...
      ];
      
      setChallenges(mockChallenges);
    }
  }, []);

  // Buscar um desafio específico
  const getChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) {
      throw new Error(`Desafio não encontrado: ${challengeId}`);
    }
    
    setCurrentChallenge(challenge);
    return challenge;
  };

  // Iniciar um desafio
  const startChallenge = (challengeId) => {
    const challenge = getChallenge(challengeId);
    
    // Atualizar progresso do usuário
    setUserProgress({
      ...userProgress,
      currentChallenge: challengeId,
    });
    
    return challenge;
  };

  // Avaliar uma tarefa de programação
  const evaluateTask = (challengeId, taskId, code) => {
    try {
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) throw new Error(`Desafio não encontrado: ${challengeId}`);
      
      const task = challenge.content.tasks.find(t => t.id === taskId);
      if (!task) throw new Error(`Tarefa não encontrada: ${taskId}`);
      
      // Simplificação: verifica se o código contém os elementos essenciais da solução
      // Em uma implementação real, seria necessário um avaliador mais sofisticado
      const solution = task.solution.replace(/\s+/g, '').toLowerCase();
      const userCode = code.replace(/\s+/g, '').toLowerCase();
      
      const isCorrect = userCode.includes(solution);
      
      // Se correto, causar dano ao Boss baseado nos pontos da tarefa
      if (isCorrect) {
        damageBoss(task.points, 'programming_task');
      }
      
      return {
        taskId,
        isCorrect,
        points: isCorrect ? task.points : 0,
        feedback: isCorrect 
          ? 'Correto! Sua solução funciona conforme esperado.' 
          : 'Sua solução ainda não está correta. Tente novamente.',
      };
    } catch (err) {
      setError(err.message || 'Erro ao avaliar tarefa');
      console.error('Erro ao avaliar tarefa:', err);
      throw err;
    }
  };

  // Completar um desafio
  const completeChallenge = (challengeId, score) => {
    try {
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) throw new Error(`Desafio não encontrado: ${challengeId}`);
      
      // Verificar se o desafio já foi completado
      const alreadyCompleted = userProgress.completedChallenges.includes(challengeId);
      
      // Calcular pontos ganhos
      const earnedPoints = alreadyCompleted ? Math.round(challenge.points * 0.3) : challenge.points;
      const newXp = userProgress.xp + earnedPoints;
      
      // Verificar se subiu de nível (a cada 500 pontos)
      const currentLevel = userProgress.level;
      const newLevel = Math.floor(newXp / 500) + 1;
      const leveledUp = newLevel > currentLevel;
      
      // Atualizar progresso do usuário
      const updatedProgress = {
        ...userProgress,
        xp: newXp,
        level: newLevel,
        totalPoints: userProgress.totalPoints + earnedPoints,
        currentChallenge: null,
      };
      
      // Adicionar à lista de desafios completados (se ainda não estiver)
      if (!alreadyCompleted) {
        updatedProgress.completedChallenges = [
          ...userProgress.completedChallenges,
          challengeId,
        ];
      }
      
      setUserProgress(updatedProgress);
      
      // Atualizar o status do desafio
      const updatedChallenges = challenges.map(c => {
        if (c.id === challengeId) {
          return {
            ...c,
            completed: true,
            progress: 100,
          };
        }
        return c;
      });
      
      setChallenges(updatedChallenges);
      
      // Causar dano ao Boss baseado no score
      const damage = Math.round(score * 2); // Exemplo: 100% = 200 de dano
      damageBoss(damage, 'programming_challenge');
      
      return {
        challengeId,
        earnedPoints,
        newXp,
        leveledUp,
        newLevel,
        damage,
      };
    } catch (err) {
      setError(err.message || 'Erro ao completar desafio');
      console.error('Erro ao completar desafio:', err);
      throw err;
    }
  };

  // Criar um novo desafio
  const createChallenge = async (challengeData, generateTasks = false) => {
    try {
      setLoading(true);
      
      let content = challengeData.content || {};
      
      // Gerar conteúdo e tarefas usando IA, se solicitado
      if (generateTasks && challengeData.topic) {
        const generatedExercises = await aiService.generateProgrammingExercises(
          challengeData.topic,
          challengeData.language,
          challengeData.level
        );
        
        // Transformar o exercício gerado no formato adequado do sistema
        content = {
          instructions: generatedExercises[0].descricao,
          hints: generatedExercises[0].dicas,
          examples: [
            {
              code: generatedExercises[0].solucao,
              explanation: 'Exemplo de solução para este problema.'
            }
          ],
          tasks: generatedExercises[0].testes.map((teste, index) => ({
            id: `task-${index + 1}`,
            description: teste.descricao,
            solution: teste.solucao,
            points: 20,
          })),
        };
      }
      
      // Criar novo desafio
      const newChallenge = {
        id: `challenge-${Date.now()}`,
        title: challengeData.title,
        description: challengeData.description,
        level: challengeData.level || 'Iniciante',
        points: challengeData.points || 50,
        estimatedTime: challengeData.estimatedTime || '30min',
        language: challengeData.language || 'JavaScript',
        content,
        completed: false,
        progress: 0,
        createdAt: new Date().toISOString(),
      };
      
      setChallenges([newChallenge, ...challenges]);
      
      return newChallenge;
    } catch (err) {
      setError(err.message || 'Erro ao criar desafio');
      console.error('Erro ao criar desafio:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Valores disponibilizados pelo contexto
  const value = {
    challenges,
    userProgress,
    currentChallenge,
    loading,
    error,
    getChallenge,
    startChallenge,
    evaluateTask,
    completeChallenge,
    createChallenge,
  };

  return (
    <ProgrammingContext.Provider value={value}>
      {children}
    </ProgrammingContext.Provider>
  );
};

export default ProgrammingContext;