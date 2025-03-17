const aiConfig = {
    defaultProvider: import.meta.env.VITE_AI_DEFAULT_PROVIDER || 'Gemini',
    apiKeys: {
      gemini: import.meta.env.VITE_GEMINI_API_KEY,
      claude: import.meta.env.VITE_CLAUDE_API_KEY,
      gpt: import.meta.env.VITE_GPT_API_KEY,
      deepseek: import.meta.env.VITE_DEEPSEEK_API_KEY,
    },
    endpoints: {
      gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      claude: 'https://api.anthropic.com/v1/messages',
      gpt: 'https://api.openai.com/v1/chat/completions',
      deepseek: 'https://api.deepseek.com/v1/chat/completions',
    },
    models: {
      gemini: 'gemini-pro',
      claude: 'claude-3-sonnet-20240229',
      gpt: 'gpt-4-turbo',
      deepseek: 'deepseek-chat',
    },
    defaultParams: {
      gemini: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
      claude: {
        temperature: 0.7,
        max_tokens: 1024,
      },
      gpt: {
        temperature: 0.7,
        max_tokens: 1024,
      },
      deepseek: {
        temperature: 0.7,
        max_tokens: 1024,
      }
    },
    systemPrompts: {
      quizGeneration: "Gere questões de múltipla escolha a partir do seguinte texto, focando nos pontos-chave:",
      flashcardGeneration: "Crie flashcards com frente e verso a partir do seguinte texto:",
      programmingExercise: "Desenvolva um exercício de programação baseado no seguinte tópico:",
      languageLearning: "Crie exercícios de idioma a partir do seguinte texto, incluindo pronúncia e vocabulário:",
    }
  };
  
  export default aiConfig;