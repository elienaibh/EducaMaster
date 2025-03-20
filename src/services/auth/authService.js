// src/services/auth/authService.js

import  apiClient  from '../api/apiClient';

/**
 * Serviço para autenticação e gerenciamento de usuários
 */
class AuthService {
  /**
   * Realiza o login do usuário
   * @param {string} email - E-mail do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Dados do usuário e token
   */
  async login(email, password) {
    try {
      // No projeto final, esta seria uma chamada à API real
      // const response = await apiClient.post('/auth/login', { email, password });
      // return response.data;
      
      // Mock para fins de desenvolvimento
      if (email === 'teste@exemplo.com' && password === 'senha123') {
        return {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: 'João Silva',
            email: 'teste@exemplo.com',
            level: 5,
            xp: 2850,
            streakDays: 3,
            joinDate: '10/01/2025',
          }
        };
      } else {
        throw new Error('E-mail ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Dados do usuário e token
   */
  async register(userData) {
    try {
      // No projeto final, esta seria uma chamada à API real
      // const response = await apiClient.post('/auth/register', userData);
      // return response.data;
      
      // Mock para fins de desenvolvimento
      return {
        token: 'mock-jwt-token',
        user: {
          id: '2',
          name: userData.name,
          email: userData.email,
          level: 1,
          xp: 0,
          streakDays: 0,
          joinDate: new Date().toLocaleDateString(),
        }
      };
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

  /**
   * Realiza o logout do usuário
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // No projeto final, esta seria uma chamada à API real
      // await apiClient.post('/auth/logout');
      
      // Por enquanto, apenas simulamos o logout
      return true;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  /**
   * Valida o token do usuário e obtém os dados
   * @param {string} token - Token JWT
   * @returns {Promise<Object>} Dados do usuário
   */
  async validateToken(token) {
    try {
      // No projeto final, esta seria uma chamada à API real
      // const response = await apiClient.get('/auth/validate-token');
      // return response.data;
      
      // Mock para fins de desenvolvimento
      if (token === 'mock-jwt-token') {
        return {
          id: '1',
          name: 'João Silva',
          email: 'teste@exemplo.com',
          level: 5,
          xp: 2850,
          streakDays: 3,
          joinDate: '10/01/2025',
        };
      } else {
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error('Erro ao validar token:', error);
      throw error;
    }
  }

  /**
   * Atualiza o perfil do usuário
   * @param {Object} userData - Novos dados do usuário
   * @returns {Promise<Object>} Dados atualizados do usuário
   */
  async updateProfile(userData) {
    try {
      // No projeto final, esta seria uma chamada à API real
      // const response = await apiClient.put('/auth/profile', userData);
      // return response.data;
      
      // Mock para fins de desenvolvimento
      return {
        id: '1',
        ...userData,
        level: 5,
        xp: 2850,
        streakDays: 3,
        joinDate: '10/01/2025',
      };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;