// src/services/ai/aiService.js

import geminiService from './geminiService';
import claudeService from './claudeService';
import gptService from './gptService';
import config from '../../config/aiConfig';

/**
 * Serviço abstrato para interação com diferentes APIs de IA
 * Permite trocar facilmente entre diferentes provedores (Gemini, Claude, GPT)
 */
class AIService {
  constructor() {
    this.defaultProvider = config.defaultProvider.toLowerCase();
    this.services = {
      gemini: geminiService,
      claude: claudeService,
      gpt: gptService
    };
  }

  /**
   * Obtém o serviço de IA ativo baseado na configuração ou parâmetro
   * @param {string} provider - O provedor de IA a ser usado (opcional)
   * @returns {Object} O serviço de IA selecionado
   */
  getService(provider = null) {
    const selectedProvider = provider ? provider.toLowerCase() : this.defaultProvider;
    
    if (!this.services[selectedProvider]) {
      console.warn(`Provedor de IA "${selectedProvider}" não disponível. Usando ${this.defaultProvider}.`);
      return this.services[this.defaultProvider];
    }
    
    return this.services[selectedProvider];
  }

  /**
   * Gera questões de múltipla escolha a partir de um texto
   * @param {string} text - Texto base para gerar as questões
   * @param {number} count - Número de questões a serem geradas
   * @param {Object} options - Opções adicionais (como idioma, nível, etc.)
   * @param {string} provider - O provedor de IA a ser usado (opcional)
   * @returns {Promise<Array>} Lista de questões geradas
   */
  async generateQuizQuestions(text, count = 5, options = {}, provider = null) {
    const service = this.getService(provider);
    return service.generateQuizQuestions(text, count, options);
  }

  /**
   * Gera flashcards a partir de um texto
   * @param {string} text - Texto base para gerar os flashcards
   * @param {number} count - Número de flashcards a serem gerados
   * @param {Object} options - Opções adicionais (como idioma, nível, etc.)
   * @param {string} provider - O provedor de IA a ser usado (opcional)
   * @returns {Promise<Array>} Lista de flashcards gerados
   */
  async generateFlashcards(text, count = 10, options = {}, provider = null) {
    const service = this.getService(provider);
    return service.generateFlashcards(text, count, options);
  }

  /**
   * Gera exercícios de programação baseados em um tópico
   * @param {string} topic - Tópico para gerar os exercícios
   * @param {string} language - Linguagem de programação
   * @param {string} level - Nível de dificuldade
   * @param {string} provider - O provedor de IA a ser usado (opcional)
   * @returns {Promise<Array>} Lista de exercícios de programação
   */
  async generateProgrammingExercises(topic, language, level = 'iniciante', provider = null) {
    const service = this.getService(provider);
    return service.generateProgrammingExercises(topic, language, level);
  }

  /**
   * Gera exercícios de idioma a partir de um texto
   * @param {string} text - Texto base para gerar os exercícios
   * @param {string} language - Idioma-alvo
   * @param {string} level - Nível de dificuldade
   * @param {string} provider - O provedor de IA a ser usado (opcional)
   * @returns {Promise<Array>} Lista de exercícios de idioma
   */
  async generateLanguageExercises(text, language, level = 'iniciante', provider = null) {
    const service = this.getService(provider);
    return service.generateLanguageExercises(text, language, level);
  }
}

export default new AIService();