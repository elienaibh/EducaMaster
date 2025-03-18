// src/utils/constants/aiPrompts.js

/**
 * Prompts de sistema para diferentes funcionalidades de IA
 */
export const systemPrompts = {
    quizGeneration: 
      "Gere questões de múltipla escolha a partir do seguinte texto, focando nos pontos-chave:",
    
    flashcardGeneration: 
      "Crie flashcards com frente e verso a partir do seguinte texto, identificando os conceitos mais importantes:",
    
    programmingExercise: 
      "Desenvolva um exercício de programação baseado no seguinte tópico, incluindo descrição detalhada e solução:",
    
    languageLearning: 
      "Crie exercícios de idioma a partir do seguinte texto, incluindo pronúncia, vocabulário e gramática:",
  };
  
  /**
   * Critérios de avaliação para diferentes tipos de conteúdo
   */
  export const evaluationCriteria = {
    quiz: {
      relevance: "As questões abordam os pontos-chave do texto",
      difficulty: "As questões têm nível de dificuldade adequado",
      clarity: "As questões são claras e bem formuladas",
      options: "As alternativas são plausíveis e bem distribuídas",
      explanation: "As explicações são claras e informativas"
    },
    
    flashcard: {
      relevance: "Os flashcards abordam os conceitos principais",
      clarity: "Os flashcards são claros e concisos",
      balance: "O conteúdo está bem distribuído entre os flashcards",
      difficulty: "Os flashcards têm níveis variados de dificuldade"
    },
    
    programming: {
      relevance: "Os exercícios abordam conceitos importantes do tópico",
      difficulty: "Os exercícios têm níveis adequados de dificuldade",
      clarity: "As instruções são claras e bem detalhadas",
      solution: "As soluções são corretas e bem explicadas"
    },
    
    language: {
      relevance: "Os exercícios abordam aspectos importantes do texto",
      variety: "Há uma boa variedade de tipos de exercícios",
      context: "Os exercícios estão contextualizados",
      progression: "Há uma progressão adequada de dificuldade"
    }
  };
  
  export default { systemPrompts, evaluationCriteria };