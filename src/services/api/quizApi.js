// src/services/api/quizApi.js

/**
 * Serviço de API para os quizzes
 * Nota: Esta é uma implementação de placeholder para desenvolvimento local
 */
class QuizApi {
    /**
     * Busca todos os quizzes do usuário
     * @returns {Promise<Array>} Lista de quizzes
     */
    async getUserQuizzes() {
      // Em uma implementação real, isto faria uma chamada à API
      return [
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
        {
          id: 'quiz-3',
          title: 'Geografia Mundial',
          description: 'Explore capitais, países e continentes.',
          questions: 12,
          time: '20min',
          status: 'not-started',
        },
      ];
    }
  
    /**
     * Busca um quiz específico pelo ID
     * @param {string} quizId - ID do quiz
     * @returns {Promise<Object>} Dados do quiz
     */
    async getQuizById(quizId) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
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
          {
            id: 'q2',
            text: 'Quanto é 1/4 + 1/2?',
            options: [
              { id: 'a', text: '1/6' },
              { id: 'b', text: '3/4' },
              { id: 'c', text: '1/8' },
              { id: 'd', text: '2/6' },
            ],
            correctAnswer: 'b',
            explanation: '1/4 + 1/2 = 1/4 + 2/4 = 3/4',
          },
          {
            id: 'q3',
            text: 'Se 30% de um número é 15, qual é o número?',
            options: [
              { id: 'a', text: '45' },
              { id: 'b', text: '50' },
              { id: 'c', text: '60' },
              { id: 'd', text: '75' },
            ],
            correctAnswer: 'b',
            explanation: 'Se 30% de x = 15, então 0,3 × x = 15, portanto x = 15 ÷ 0,3 = 50',
          },
        ],
        time: '15min',
      };
    }
  
    /**
     * Cria um novo quiz
     * @param {Object} quizData - Dados do novo quiz
     * @returns {Promise<Object>} Quiz criado
     */
    async createQuiz(quizData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: `quiz-${Date.now()}`,
        ...quizData,
        status: 'not-started',
        createdAt: new Date().toISOString(),
      };
    }
  
    /**
     * Salva o resultado de um quiz
     * @param {Object} resultData - Dados do resultado
     * @returns {Promise<Object>} Resultado salvo
     */
    async saveQuizResult(resultData) {
      // Em uma implementação real, isto faria uma chamada à API
      console.log('Salvando resultado do quiz:', resultData);
      return resultData;
    }
  
    /**
     * Atualiza um quiz existente
     * @param {string} quizId - ID do quiz
     * @param {Object} quizData - Novos dados do quiz
     * @returns {Promise<Object>} Quiz atualizado
     */
    async updateQuiz(quizId, quizData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: quizId,
        ...quizData,
        updatedAt: new Date().toISOString(),
      };
    }
  
    /**
     * Exclui um quiz
     * @param {string} quizId - ID do quiz a ser excluído
     * @returns {Promise<boolean>} Confirmação de exclusão
     */
    async deleteQuiz(quizId) {
      // Em uma implementação real, isto faria uma chamada à API
      console.log(`Quiz ${quizId} excluído`);
      return true;
    }
  }
  
  export default new QuizApi();