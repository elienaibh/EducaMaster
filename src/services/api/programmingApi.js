// src/services/api/programmingApi.js

/**
 * Serviço de API para desafios de programação
 * Nota: Esta é uma implementação de placeholder para desenvolvimento local
 */
class ProgrammingApi {
    /**
     * Busca todos os desafios de programação
     * @returns {Promise<Array>} Lista de desafios
     */
    async getChallenges() {
      // Em uma implementação real, isto faria uma chamada à API
      return [
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
            hints: ['Use if para verificar uma condição', 'Use else para executar código quando a condição é falsa'],
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
            ]
          },
          completed: true,
          progress: 100,
        },
      ];
    }
  
    /**
     * Busca um desafio específico pelo ID
     * @param {string} challengeId - ID do desafio
     * @returns {Promise<Object>} Dados do desafio
     */
    async getChallengeById(challengeId) {
      // Em uma implementação real, isto faria uma chamada à API
      const challenges = await this.getChallenges();
      return challenges.find(challenge => challenge.id === challengeId) || null;
    }
  
    /**
     * Avalia a solução de uma tarefa
     * @param {string} challengeId - ID do desafio
     * @param {string} taskId - ID da tarefa
     * @param {string} code - Código submetido
     * @returns {Promise<Object>} Resultado da avaliação
     */
    async evaluateTask(challengeId, taskId, code) {
      // Em uma implementação real, isto faria uma chamada à API para avaliar o código
      
      // Simula uma avaliação básica
      const challenge = await this.getChallengeById(challengeId);
      if (!challenge) throw new Error(`Desafio não encontrado: ${challengeId}`);
      
      const task = challenge.content.tasks.find(t => t.id === taskId);
      if (!task) throw new Error(`Tarefa não encontrada: ${taskId}`);
      
      // Simplificação: verifica se o código contém os elementos essenciais da solução
      const solution = task.solution.replace(/\s+/g, '').toLowerCase();
      const userCode = code.replace(/\s+/g, '').toLowerCase();
      
      const isCorrect = userCode.includes(solution);
      
      return {
        taskId,
        isCorrect,
        points: isCorrect ? task.points : 0,
        feedback: isCorrect 
          ? 'Correto! Sua solução funciona conforme esperado.' 
          : 'Sua solução ainda não está correta. Tente novamente.',
      };
    }
  
    /**
     * Registra a conclusão de um desafio
     * @param {string} challengeId - ID do desafio
     * @param {number} score - Pontuação obtida
     * @returns {Promise<Object>} Resultado registrado
     */
    async completeChallenge(challengeId, score) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        challengeId,
        score,
        completedAt: new Date().toISOString(),
        xpGained: Math.round(score * 0.5),
      };
    }
  
    /**
     * Cria um novo desafio
     * @param {Object} challengeData - Dados do novo desafio
     * @returns {Promise<Object>} Desafio criado
     */
    async createChallenge(challengeData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: `challenge-${Date.now()}`,
        ...challengeData,
        completed: false,
        progress: 0,
        createdAt: new Date().toISOString(),
      };
    }
  }
  
  export default new ProgrammingApi();