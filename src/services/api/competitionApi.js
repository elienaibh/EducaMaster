// src/services/api/competitionApi.js
import api from './apiClient';

/**
 * Serviço para gerenciar funcionalidades de competição e colaboração
 */
const competitionService = {
  /**
   * Obtém rankings por tipo
   * @param {string} type - Tipo de ranking (global, friends, weekly, monthly)
   * @returns {Promise<Array>} Lista de rankings
   */
  getRankings: async (type = 'global') => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.get(`/rankings/${type}`);
      // return response.data;
      
      // Simulação para desenvolvimento
      return [
        {
          id: '1',
          position: 1,
          user: {
            id: 'user1',
            name: 'Ana Silva',
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          score: 12450,
          level: 32,
          streak: 15
        },
        {
          id: '2',
          position: 2,
          user: {
            id: 'user2',
            name: 'Carlos Oliveira',
            avatar: 'https://i.pravatar.cc/150?img=2'
          },
          score: 10870,
          level: 28,
          streak: 22
        },
        {
          id: '3',
          position: 3,
          user: {
            id: 'user3',
            name: 'Marina Souza',
            avatar: 'https://i.pravatar.cc/150?img=3'
          },
          score: 9860,
          level: 25,
          streak: 7
        },
        {
          id: '4',
          position: 4,
          user: {
            id: 'user4',
            name: 'Pedro Santos',
            avatar: 'https://i.pravatar.cc/150?img=4'
          },
          score: 8790,
          level: 22,
          streak: 5
        },
        {
          id: '5',
          position: 5,
          user: {
            id: 'current',
            name: 'Você',
            avatar: 'https://i.pravatar.cc/150?img=9'
          },
          score: 7650,
          level: 19,
          streak: 3,
          isCurrentUser: true
        }
      ];
    } catch (error) {
      console.error(`Erro ao buscar rankings ${type}:`, error);
      throw error;
    }
  },
  
  /**
   * Obtém a posição do usuário atual no ranking
   * @returns {Promise<Object>} Posição do usuário no ranking
   */
  getUserRankingPosition: async () => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.get('/rankings/me');
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        global: {
          position: 5,
          total: 250,
          percentile: 2,
          score: 7650
        },
        weekly: {
          position: 3,
          total: 180,
          percentile: 1.7,
          score: 1200
        },
        monthly: {
          position: 10,
          total: 220,
          percentile: 4.5,
          score: 5300
        }
      };
    } catch (error) {
      console.error('Erro ao buscar posição no ranking:', error);
      throw error;
    }
  },
  
  /**
   * Obtém a lista de desafios ativos
   * @returns {Promise<Array>} Lista de desafios
   */
  getChallenges: async () => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.get('/challenges');
      // return response.data;
      
      // Simulação para desenvolvimento
      return [
        {
          id: 'challenge1',
          title: 'Desafio de Programação Semanal',
          description: 'Resolva 5 exercícios de algoritmos em Python nesta semana',
          type: 'programming',
          startDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
          endDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 dias no futuro
          reward: {
            xp: 500,
            badges: ['algo_master']
          },
          difficulty: 'médio',
          participants: ['user1', 'user2', 'user3'],
          participantsCount: 3,
          creator: {
            id: 'admin',
            name: 'Administrador'
          },
          progress: 0,
          joined: false
        },
        {
          id: 'challenge2',
          title: 'Maratona de Flashcards',
          description: 'Estude 100 flashcards em 3 dias',
          type: 'flashcard',
          startDate: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
          endDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 dias no futuro
          reward: {
            xp: 300,
            badges: ['memory_master']
          },
          difficulty: 'fácil',
          participants: ['user2', 'user4', 'current'],
          participantsCount: 3,
          creator: {
            id: 'admin',
            name: 'Administrador'
          },
          progress: 35,
          joined: true
        },
        {
          id: 'challenge3',
          title: 'Quiz Challenge: História Mundial',
          description: 'Complete 10 quizzes sobre história mundial com pelo menos 80% de acerto',
          type: 'quiz',
          startDate: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 dias atrás
          endDate: new Date(Date.now() + 86400000 * 4).toISOString(), // 4 dias no futuro
          reward: {
            xp: 450,
            badges: ['history_buff']
          },
          difficulty: 'difícil',
          participants: ['user1', 'user3', 'user5'],
          participantsCount: 3,
          creator: {
            id: 'admin',
            name: 'Administrador'
          },
          progress: 0,
          joined: false
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar desafios:', error);
      throw error;
    }
  },
  
  /**
   * Obtém um desafio específico por ID
   * @param {string} challengeId - ID do desafio
   * @returns {Promise<Object>} Detalhes do desafio
   */
  getChallengeById: async (challengeId) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.get(`/challenges/${challengeId}`);
      // return response.data;
      
      // Simulação para desenvolvimento - faz uma pesquisa local
      const challenges = await competitionService.getChallenges();
      const challenge = challenges.find(c => c.id === challengeId);
      
      if (challenge) {
        // Adiciona mais detalhes ao desafio
        return {
          ...challenge,
          leaderboard: [
            {
              user: {
                id: 'user1',
                name: 'Ana Silva',
                avatar: 'https://i.pravatar.cc/150?img=1'
              },
              progress: 80,
              completedAt: challenge.progress === 100 ? new Date().toISOString() : null
            },
            {
              user: {
                id: 'user2',
                name: 'Carlos Oliveira',
                avatar: 'https://i.pravatar.cc/150?img=2'
              },
              progress: 65,
              completedAt: null
            },
            {
              user: {
                id: 'current',
                name: 'Você',
                avatar: 'https://i.pravatar.cc/150?img=9'
              },
              progress: challenge.progress,
              completedAt: null,
              isCurrentUser: true
            }
          ],
          steps: [
            {
              id: 'step1',
              title: 'Passo 1',
              description: 'Comece com os exercícios básicos',
              completed: challenge.progress >= 20
            },
            {
              id: 'step2',
              title: 'Passo 2',
              description: 'Complete os exercícios intermediários',
              completed: challenge.progress >= 50
            },
            {
              id: 'step3',
              title: 'Passo 3',
              description: 'Finalize com os exercícios avançados',
              completed: challenge.progress >= 100
            }
          ]
        };
      }
      
      throw new Error(`Desafio com ID ${challengeId} não encontrado`);
    } catch (error) {
      console.error(`Erro ao buscar desafio ${challengeId}:`, error);
      throw error;
    }
  },
  
  /**
   * Participa de um desafio
   * @param {string} challengeId - ID do desafio
   * @returns {Promise<Object>} Resultado da operação
   */
  joinChallenge: async (challengeId) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post(`/challenges/${challengeId}/join`);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        success: true,
        message: 'Você entrou no desafio com sucesso!'
      };
    } catch (error) {
      console.error(`Erro ao entrar no desafio ${challengeId}:`, error);
      throw error;
    }
  },
  
  /**
   * Sai de um desafio
   * @param {string} challengeId - ID do desafio
   * @returns {Promise<Object>} Resultado da operação
   */
  leaveChallenge: async (challengeId) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post(`/challenges/${challengeId}/leave`);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        success: true,
        message: 'Você saiu do desafio com sucesso'
      };
    } catch (error) {
      console.error(`Erro ao sair do desafio ${challengeId}:`, error);
      throw error;
    }
  },
  
  /**
   * Cria um novo desafio
   * @param {Object} challengeData - Dados do desafio
   * @returns {Promise<Object>} Novo desafio criado
   */
  createChallenge: async (challengeData) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post('/challenges', challengeData);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        id: `challenge-${Date.now()}`,
        ...challengeData,
        startDate: challengeData.startDate || new Date().toISOString(),
        endDate: challengeData.endDate || new Date(Date.now() + 86400000 * 7).toISOString(),
        participants: ['current'],
        participantsCount: 1,
        creator: {
          id: 'current',
          name: 'Você'
        },
        progress: 0,
        joined: true,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao criar desafio:', error);
      throw error;
    }
  },
  
  /**
   * Obtém a lista de grupos de estudo
   * @returns {Promise<Array>} Lista de grupos
   */
  getStudyGroups: async () => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.get('/study-groups');
      // return response.data;
      
      // Simulação para desenvolvimento
      return [
        {
          id: 'group1',
          name: 'Grupo de Estudos de Programação',
          description: 'Estudamos algoritmos, estruturas de dados e várias linguagens de programação',
          category: 'programming',
          memberCount: 15,
          members: [
            {
              id: 'user1',
              name: 'Ana Silva',
              avatar: 'https://i.pravatar.cc/150?img=1',
              role: 'admin'
            },
            {
              id: 'user2',
              name: 'Carlos Oliveira',
              avatar: 'https://i.pravatar.cc/150?img=2',
              role: 'member'
            }
          ],
          isPublic: true,
          createdAt: '2023-09-10T14:30:00Z',
          activities: [
            {
              id: 'act1',
              type: 'meeting',
              title: 'Sessão de estudos semanal',
              date: new Date(Date.now() + 86400000 * 2).toISOString() // 2 dias no futuro
            }
          ]
        },
        {
          id: 'group2',
          name: 'Grupo de Inglês Avançado',
          description: 'Para quem já tem um nível intermediário de inglês e quer aprimorar ainda mais',
          category: 'language',
          memberCount: 8,
          members: [
            {
              id: 'user3',
              name: 'Marina Souza',
              avatar: 'https://i.pravatar.cc/150?img=3',
              role: 'admin'
            }
          ],
          isPublic: true,
          createdAt: '2023-08-15T10:00:00Z',
          activities: []
        },
        {
          id: 'group3',
          name: 'Grupo de Matemática e Física',
          description: 'Estudamos conceitos avançados de matemática e física para vestibulares',
          category: 'science',
          memberCount: 12,
          members: [
            {
              id: 'user4',
              name: 'Pedro Santos',
              avatar: 'https://i.pravatar.cc/150?img=4',
              role: 'admin'
            }
          ],
          isPublic: true,
          createdAt: '2023-07-20T09:15:00Z',
          activities: []
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar grupos de estudo:', error);
      throw error;
    }
  },
  
  /**
   * Obtém a lista de grupos de estudo do usuário
   * @returns {Promise<Array>} Lista de grupos do usuário
   */
  getUserGroups: async () => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.get('/user/study-groups');
      // return response.data;
      
      // Simulação para desenvolvimento
      return [
        {
          id: 'group4',
          name: 'Meu Grupo de Estudos',
          description: 'Grupo criado por você para estudar juntos',
          category: 'general',
          memberCount: 5,
          members: [
            {
              id: 'current',
              name: 'Você',
              avatar: 'https://i.pravatar.cc/150?img=9',
              role: 'admin',
              isCurrentUser: true
            },
            {
              id: 'user5',
              name: 'Juliana Lima',
              avatar: 'https://i.pravatar.cc/150?img=5',
              role: 'member'
            }
          ],
          isPublic: false,
          createdAt: '2023-10-05T16:45:00Z',
          activities: [
            {
              id: 'act2',
              type: 'challenge',
              title: 'Desafio de grupo: Maratona de estudos',
              date: new Date(Date.now() + 86400000 * 3).toISOString() // 3 dias no futuro
            }
          ]
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar grupos do usuário:', error);
      throw error;
    }
  },
  
  /**
   * Obtém um grupo de estudo específico por ID
   * @param {string} groupId - ID do grupo
   * @returns {Promise<Object>} Detalhes do grupo
   */
  getStudyGroupById: async (groupId) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.get(`/study-groups/${groupId}`);
      // return response.data;
      
      // Simulação para desenvolvimento - faz uma pesquisa local
      const groups = await competitionService.getStudyGroups();
      const userGroups = await competitionService.getUserGroups();
      const allGroups = [...groups, ...userGroups];
      
      const group = allGroups.find(g => g.id === groupId);
      
      if (group) {
        // Adiciona mais detalhes ao grupo
        return {
          ...group,
          discussions: [
            {
              id: 'disc1',
              title: 'Planejamento de estudos',
              author: {
                id: group.members[0].id,
                name: group.members[0].name,
                avatar: group.members[0].avatar
              },
              createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
              messageCount: 12,
              lastActivity: new Date(Date.now() - 3600000).toISOString() // 1 hora atrás
            },
            {
              id: 'disc2',
              title: 'Material de estudo compartilhado',
              author: {
                id: group.members.length > 1 ? group.members[1].id : group.members[0].id,
                name: group.members.length > 1 ? group.members[1].name : group.members[0].name,
                avatar: group.members.length > 1 ? group.members[1].avatar : group.members[0].avatar
              },
              createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
              messageCount: 5,
              lastActivity: new Date(Date.now() - 43200000).toISOString() // 12 horas atrás
            }
          ],
          sharedContent: [
            {
              id: 'shared1',
              type: 'quiz',
              title: 'Quiz compartilhado',
              createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 dias atrás
              author: {
                id: group.members[0].id,
                name: group.members[0].name,
                avatar: group.members[0].avatar
              }
            },
            {
              id: 'shared2',
              type: 'flashcard',
              title: 'Flashcards compartilhados',
              createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
              author: {
                id: group.members.length > 1 ? group.members[1].id : group.members[0].id,
                name: group.members.length > 1 ? group.members[1].name : group.members[0].name,
                avatar: group.members.length > 1 ? group.members[1].avatar : group.members[0].avatar
              }
            }
          ]
        };
      }
      
      throw new Error(`Grupo de estudo com ID ${groupId} não encontrado`);
    } catch (error) {
      console.error(`Erro ao buscar grupo de estudo ${groupId}:`, error);
      throw error;
    }
  },
  
  /**
   * Cria um novo grupo de estudo
   * @param {Object} groupData - Dados do grupo
   * @returns {Promise<Object>} Novo grupo criado
   */
  createStudyGroup: async (groupData) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post('/study-groups', groupData);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        id: `group-${Date.now()}`,
        ...groupData,
        memberCount: 1,
        members: [
          {
            id: 'current',
            name: 'Você',
            avatar: 'https://i.pravatar.cc/150?img=9',
            role: 'admin',
            isCurrentUser: true
          }
        ],
        createdAt: new Date().toISOString(),
        activities: [],
        discussions: [],
        sharedContent: []
      };
    } catch (error) {
      console.error('Erro ao criar grupo de estudo:', error);
      throw error;
    }
  },
  
  /**
   * Participa de um grupo de estudo
   * @param {string} groupId - ID do grupo
   * @returns {Promise<Object>} Resultado da operação
   */
  joinStudyGroup: async (groupId) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post(`/study-groups/${groupId}/join`);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        success: true,
        message: 'Você entrou no grupo de estudo com sucesso!'
      };
    } catch (error) {
      console.error(`Erro ao entrar no grupo ${groupId}:`, error);
      throw error;
    }
  },
  
  /**
   * Sai de um grupo de estudo
   * @param {string} groupId - ID do grupo
   * @returns {Promise<Object>} Resultado da operação
   */
  leaveStudyGroup: async (groupId) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post(`/study-groups/${groupId}/leave`);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        success: true,
        message: 'Você saiu do grupo de estudo com sucesso'
      };
    } catch (error) {
      console.error(`Erro ao sair do grupo ${groupId}:`, error);
      throw error;
    }
  },
  
  /**
   * Adiciona uma atividade a um grupo de estudo
   * @param {string} groupId - ID do grupo
   * @param {Object} activityData - Dados da atividade
   * @returns {Promise<Object>} Nova atividade criada
   */
  addGroupActivity: async (groupId, activityData) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post(`/study-groups/${groupId}/activities`, activityData);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        id: `act-${Date.now()}`,
        ...activityData,
        createdAt: new Date().toISOString(),
        groupId
      };
    } catch (error) {
      console.error(`Erro ao adicionar atividade ao grupo ${groupId}:`, error);
      throw error;
    }
  },
  
  /**
   * Adiciona uma discussão a um grupo de estudo
   * @param {string} groupId - ID do grupo
   * @param {Object} discussionData - Dados da discussão
   * @returns {Promise<Object>} Nova discussão criada
   */
  addGroupDiscussion: async (groupId, discussionData) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post(`/study-groups/${groupId}/discussions`, discussionData);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        id: `disc-${Date.now()}`,
        ...discussionData,
        author: {
          id: 'current',
          name: 'Você',
          avatar: 'https://i.pravatar.cc/150?img=9'
        },
        createdAt: new Date().toISOString(),
        messageCount: 1,
        lastActivity: new Date().toISOString(),
        groupId
      };
    } catch (error) {
      console.error(`Erro ao adicionar discussão ao grupo ${groupId}:`, error);
      throw error;
    }
  },
  
  /**
   * Compartilha conteúdo em um grupo de estudo
   * @param {string} groupId - ID do grupo
   * @param {Object} contentData - Dados do conteúdo
   * @returns {Promise<Object>} Conteúdo compartilhado
   */
  shareGroupContent: async (groupId, contentData) => {
    try {
      // Em produção, isso seria uma chamada de API
      // const response = await api.post(`/study-groups/${groupId}/shared-content`, contentData);
      // return response.data;
      
      // Simulação para desenvolvimento
      return {
        id: `shared-${Date.now()}`,
        ...contentData,
        author: {
          id: 'current',
          name: 'Você',
          avatar: 'https://i.pravatar.cc/150?img=9'
        },
        createdAt: new Date().toISOString(),
        groupId
      };
    } catch (error) {
      console.error(`Erro ao compartilhar conteúdo no grupo ${groupId}:`, error);
      throw error;
    }
  }
};

export default competitionService;