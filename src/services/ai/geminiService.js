// src/services/ai/geminiService.js

import config from '../../config/aiConfig';
import { systemPrompts } from '../../utils/constants/aiPrompts';

/**
 * Serviço para interação com a API do Google Gemini
 */
class GeminiService {
  constructor() {
    this.apiKey = config.apiKeys.gemini;
    this.endpoint = config.endpoints.gemini;
    this.model = config.models.gemini;
    this.defaultParams = config.defaultParams.gemini;
  }

  /**
   * Realiza uma chamada à API do Gemini
   * @param {string} prompt - O prompt a ser enviado para a IA
   * @param {Object} params - Parâmetros adicionais para a chamada
   * @returns {Promise<Object>} Resposta da API
   */
  async callAPI(prompt, params = {}) {
    try {
      const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: params.temperature || this.defaultParams.temperature,
            maxOutputTokens: params.maxOutputTokens || this.defaultParams.maxOutputTokens,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na chamada à API do Gemini: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      throw error;
    }
  }

  /**
   * Gera questões de múltipla escolha a partir de um texto
   * @param {string} text - Texto base para gerar as questões
   * @param {number} count - Número de questões a serem geradas
   * @param {Object} options - Opções adicionais (como idioma, nível, etc.)
   * @returns {Promise<Array>} Lista de questões geradas
   */
  async generateQuizQuestions(text, count = 5, options = {}) {
    const prompt = `${systemPrompts.quizGeneration}
    
    Número de questões: ${count}
    Nível de dificuldade: ${options.level || 'médio'}
    Formato: JSON
    
    Texto base:
    ${text}
    
    Gere ${count} questões de múltipla escolha no formato JSON, onde cada questão tem:
    1. Um campo "pergunta" com o texto da pergunta
    2. Um array "opcoes" com 4 alternativas
    3. Um campo "respostaCorreta" com o índice (0-3) da alternativa correta
    4. Um campo "explicacao" com uma explicação detalhada da resposta correta
    
    Responda apenas com o JSON, sem textos adicionais.`;

    try {
      const result = await this.callAPI(prompt);
      return JSON.parse(result);
    } catch (error) {
      console.error('Erro ao gerar questões de quiz:', error);
      throw error;
    }
  }

  /**
   * Gera flashcards a partir de um texto
   * @param {string} text - Texto base para gerar os flashcards
   * @param {number} count - Número de flashcards a serem gerados
   * @param {Object} options - Opções adicionais (como idioma, nível, etc.)
   * @returns {Promise<Array>} Lista de flashcards gerados
   */
  async generateFlashcards(text, count = 10, options = {}) {
    const prompt = `${systemPrompts.flashcardGeneration}
    
    Número de flashcards: ${count}
    Nível de dificuldade: ${options.level || 'médio'}
    Formato: JSON
    
    Texto base:
    ${text}
    
    Gere ${count} flashcards no formato JSON, onde cada flashcard tem:
    1. Um campo "frente" com a pergunta ou conceito
    2. Um campo "verso" com a resposta ou explicação
    3. Um campo "dificuldade" com um valor de 1 a 5
    
    Responda apenas com o JSON, sem textos adicionais.`;

    try {
      const result = await this.callAPI(prompt);
      return JSON.parse(result);
    } catch (error) {
      console.error('Erro ao gerar flashcards:', error);
      throw error;
    }
  }

  /**
   * Gera exercícios de programação baseados em um tópico
   * @param {string} topic - Tópico para gerar os exercícios
   * @param {string} language - Linguagem de programação
   * @param {string} level - Nível de dificuldade
   * @returns {Promise<Array>} Lista de exercícios de programação
   */
  async generateProgrammingExercises(topic, language, level = 'iniciante') {
    const prompt = `${systemPrompts.programmingExercise}
    
    Tópico: ${topic}
    Linguagem: ${language}
    Nível: ${level}
    Formato: JSON
    
    Gere 3 exercícios de programação em ${language} sobre ${topic} com nível ${level} no formato JSON, onde cada exercício tem:
    1. Um campo "titulo" com o título do exercício
    2. Um campo "descricao" com a descrição e requisitos do problema
    3. Um campo "dicas" com dicas para a solução
    4. Um campo "solucao" com o código de solução completo
    5. Um campo "testes" com exemplos de entrada e saída para testar a solução
    
    Responda apenas com o JSON, sem textos adicionais.`;

    try {
      const result = await this.callAPI(prompt);
      return JSON.parse(result);
    } catch (error) {
      console.error('Erro ao gerar exercícios de programação:', error);
      throw error;
    }
  }

  /**
   * Gera exercícios de idioma a partir de um texto
   * @param {string} text - Texto base para gerar os exercícios
   * @param {string} language - Idioma-alvo
   * @param {string} level - Nível de dificuldade
   * @returns {Promise<Array>} Lista de exercícios de idioma
   */
  async generateLanguageExercises(text, language, level = 'iniciante') {
    const prompt = `${systemPrompts.languageLearning}
    
    Texto base:
    ${text}
    
    Idioma: ${language}
    Nível: ${level}
    Formato: JSON
    
    Gere exercícios de ${language} baseados no texto acima, com nível ${level}, no formato JSON, incluindo:
    1. Um campo "vocabulario" com uma lista de palavras importantes do texto, suas definições e pronúncias
    2. Um campo "gramatica" com explicações dos pontos gramaticais do texto
    3. Um campo "compreensao" com 5 perguntas e respostas sobre o texto
    4. Um campo "pronúncia" com dicas de pronúncia para as palavras mais difíceis
    
    Responda apenas com o JSON, sem textos adicionais.`;

    try {
      const result = await this.callAPI(prompt);
      return JSON.parse(result);
    } catch (error) {
      console.error('Erro ao gerar exercícios de idioma:', error);
      throw error;
    }
  }
}

export default new GeminiService();