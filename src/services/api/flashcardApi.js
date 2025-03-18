// src/services/api/flashcardApi.js

/**
 * Serviço de API para os flashcards
 * Nota: Esta é uma implementação de placeholder para desenvolvimento local
 */
class FlashcardApi {
    /**
     * Busca todos os decks de flashcards do usuário
     * @returns {Promise<Array>} Lista de decks
     */
    async getUserDecks() {
      // Em uma implementação real, isto faria uma chamada à API
      return [
        {
          id: 'deck-1',
          title: 'Biologia',
          description: 'Anatomia e fisiologia do corpo humano.',
          cards: [
            {
              id: 'card-1',
              front: 'O que é o sistema circulatório?',
              back: 'É o sistema responsável pelo transporte de sangue, nutrientes, oxigênio, dióxido de carbono e hormônios para as células do corpo.',
              difficulty: 3,
              nextReview: new Date().toISOString(),
              interval: 1, // em dias
            },
            {
              id: 'card-2',
              front: 'Quais são as partes principais do coração humano?',
              back: 'O coração humano é dividido em quatro câmaras: dois átrios (esquerdo e direito) e dois ventrículos (esquerdo e direito).',
              difficulty: 2,
              nextReview: new Date().toISOString(),
              interval: 1,
            },
          ],
          category: 'Ciências',
          mastery: 85,
          lastStudied: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semana atrás
        },
        {
          id: 'deck-2',
          title: 'Vocabulário de Inglês',
          description: 'Palavras e frases essenciais do idioma inglês.',
          cards: [
            {
              id: 'card-3',
              front: 'Hello',
              back: 'Olá',
              difficulty: 1,
              nextReview: new Date().toISOString(),
              interval: 1,
            },
            {
              id: 'card-4',
              front: 'Goodbye',
              back: 'Adeus',
              difficulty: 1,
              nextReview: new Date().toISOString(),
              interval: 1,
            },
          ],
          category: 'Idiomas',
          mastery: 70,
          lastStudied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 semanas atrás
        },
      ];
    }
  
    /**
     * Busca um deck específico pelo ID
     * @param {string} deckId - ID do deck
     * @returns {Promise<Object>} Dados do deck
     */
    async getDeckById(deckId) {
      // Em uma implementação real, isto faria uma chamada à API
      const decks = await this.getUserDecks();
      return decks.find(deck => deck.id === deckId) || null;
    }
  
    /**
     * Cria um novo deck de flashcards
     * @param {Object} deckData - Dados do novo deck
     * @returns {Promise<Object>} Deck criado
     */
    async createDeck(deckData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: `deck-${Date.now()}`,
        ...deckData,
        mastery: 0,
        lastStudied: null,
        createdAt: new Date().toISOString(),
      };
    }
  
    /**
     * Adiciona um card a um deck
     * @param {string} deckId - ID do deck
     * @param {Object} cardData - Dados do novo card
     * @returns {Promise<Object>} Card criado
     */
    async addCard(deckId, cardData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: `card-${Date.now()}`,
        ...cardData,
        nextReview: new Date().toISOString(),
        interval: 1,
        createdAt: new Date().toISOString(),
      };
    }
  
    /**
     * Atualiza o progresso de um deck
     * @param {string} deckId - ID do deck
     * @param {Object} progressData - Dados do progresso
     * @returns {Promise<Object>} Progresso atualizado
     */
    async updateDeckProgress(deckId, progressData) {
      // Em uma implementação real, isto faria uma chamada à API
      console.log(`Progresso do deck ${deckId} atualizado:`, progressData);
      return progressData;
    }
  
    /**
     * Exclui um deck
     * @param {string} deckId - ID do deck a ser excluído
     * @returns {Promise<boolean>} Confirmação de exclusão
     */
    async deleteDeck(deckId) {
      // Em uma implementação real, isto faria uma chamada à API
      console.log(`Deck ${deckId} excluído`);
      return true;
    }
  }
  
  export default new FlashcardApi();