// src/services/api/languageApi.js

/**
 * Serviço de API para aprendizado de idiomas
 * Nota: Esta é uma implementação de placeholder para desenvolvimento local
 */
class LanguageApi {
    /**
     * Busca todos os cursos de idiomas do usuário
     * @returns {Promise<Array>} Lista de cursos
     */
    async getUserCourses() {
      // Em uma implementação real, isto faria uma chamada à API
      return [
        {
          id: 'lang-1',
          title: 'Inglês Básico',
          language: 'Inglês',
          level: 'Iniciante',
          description: 'Aprenda vocabulário e gramática básica do inglês.',
          lessons: [
            {
              id: 'lesson-1',
              title: 'Saudações e Apresentações',
              completed: true,
              content: {
                vocabulary: [
                  { word: 'Hello', translation: 'Olá', pronunciation: '/həˈloʊ/' },
                  { word: 'Good morning', translation: 'Bom dia', pronunciation: '/ɡʊd ˈmɔrnɪŋ/' },
                ],
                grammar: [
                  { topic: 'Verb To Be', explanation: 'O verbo "to be" (ser/estar) é um dos mais importantes em inglês.' },
                ],
                exercises: [
                  { type: 'fill', question: 'My name ___ John.', answer: 'is' },
                ],
              },
              xp: 50,
            },
          ],
          totalLessons: 20,
          completedLessons: 8,
          progress: 40,
          lastStudied: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
        },
        {
          id: 'lang-2',
          title: 'Espanhol para Viagens',
          language: 'Espanhol',
          level: 'Iniciante',
          description: 'Aprenda frases e vocabulário essencial para viagens.',
          lessons: [
            {
              id: 'lesson-2',
              title: 'No aeroporto',
              completed: false,
              content: {
                vocabulary: [
                  { word: 'Aeropuerto', translation: 'Aeroporto', pronunciation: '/ae̯ɾoˈpweɾto/' },
                  { word: 'Vuelo', translation: 'Voo', pronunciation: '/ˈbwelo/' },
                ],
                grammar: [
                  { topic: 'Artículos', explanation: 'Os artigos em espanhol: el, la, los, las.' },
                ],
                exercises: [
                  { type: 'fill', question: '___ vuelo está retrasado.', answer: 'El' },
                ],
              },
              xp: 50,
            },
          ],
          totalLessons: 15,
          completedLessons: 3,
          progress: 20,
          lastStudied: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
        },
      ];
    }
  
    /**
     * Busca todos os materiais de áudio sincronizado
     * @returns {Promise<Array>} Lista de materiais
     */
    async getUserMaterials() {
      // Em uma implementação real, isto faria uma chamada à API
      return [
        {
          id: 'audio-1',
          title: 'Conversação em Inglês - Situações Cotidianas',
          language: 'Inglês',
          type: 'Diálogo',
          description: 'Diálogos em inglês para situações do dia a dia com sincronização de texto e áudio.',
          duration: '15min',
          audioUrl: 'https://example.com/audio.mp3', // URL fictícia
          transcript: [
            { start: 0, end: 4, text: "Hello! My name is Sarah. Nice to meet you.", translation: "Olá! Meu nome é Sarah. Prazer em conhecê-lo." },
            { start: 4, end: 8, text: "Hi Sarah, I'm John. Nice to meet you too.", translation: "Oi Sarah, eu sou John. Prazer em conhecê-la também." },
          ],
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
        },
        {
          id: 'audio-2',
          title: 'Música "La Vie en Rose" com Legendas',
          language: 'Francês',
          type: 'Música',
          description: 'Música francesa com sincronização de letra e tradução.',
          duration: '3min',
          audioUrl: 'https://example.com/audio2.mp3', // URL fictícia
          transcript: [
            { start: 0, end: 5, text: "Des yeux qui font baisser les miens", translation: "Olhos que fazem os meus baixar" },
            { start: 5, end: 10, text: "Un rire qui se perd sur sa bouche", translation: "Um riso que se perde em sua boca" },
          ],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias atrás
        },
      ];
    }
  
    /**
     * Busca um curso específico pelo ID
     * @param {string} courseId - ID do curso
     * @returns {Promise<Object>} Dados do curso
     */
    async getCourseById(courseId) {
      // Em uma implementação real, isto faria uma chamada à API
      const courses = await this.getUserCourses();
      return courses.find(course => course.id === courseId) || null;
    }
  
    /**
     * Busca um material específico pelo ID
     * @param {string} materialId - ID do material
     * @returns {Promise<Object>} Dados do material
     */
    async getMaterialById(materialId) {
      // Em uma implementação real, isto faria uma chamada à API
      const materials = await this.getUserMaterials();
      return materials.find(material => material.id === materialId) || null;
    }
  
    /**
     * Cria um novo curso de idioma
     * @param {Object} courseData - Dados do novo curso
     * @returns {Promise<Object>} Curso criado
     */
    async createCourse(courseData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: `lang-${Date.now()}`,
        ...courseData,
        lessons: [],
        totalLessons: 0,
        completedLessons: 0,
        progress: 0,
        lastStudied: null,
        createdAt: new Date().toISOString(),
      };
    }
  
    /**
     * Cria uma nova lição em um curso
     * @param {string} courseId - ID do curso
     * @param {Object} lessonData - Dados da nova lição
     * @returns {Promise<Object>} Lição criada
     */
    async createLesson(courseId, lessonData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: `lesson-${Date.now()}`,
        ...lessonData,
        completed: false,
        createdAt: new Date().toISOString(),
      };
    }
  
    /**
     * Registra progresso de uma lição
     * @param {string} courseId - ID do curso
     * @param {string} lessonId - ID da lição
     * @param {Object} progressData - Dados do progresso
     * @returns {Promise<Object>} Progresso atualizado
     */
    async recordLessonProgress(courseId, lessonId, progressData) {
      // Em uma implementação real, isto faria uma chamada à API
      console.log(`Progresso da lição ${lessonId} do curso ${courseId} atualizado:`, progressData);
      return progressData;
    }
  
    /**
     * Cria um novo material de áudio sincronizado
     * @param {Object} materialData - Dados do novo material
     * @returns {Promise<Object>} Material criado
     */
    async createAudioSyncMaterial(materialData) {
      // Em uma implementação real, isto faria uma chamada à API
      return {
        id: `audio-${Date.now()}`,
        ...materialData,
        createdAt: new Date().toISOString(),
      };
    }
  }
  
  export default new LanguageApi();