// src/services/auth/tokenService.js

/**
 * Serviço para gerenciamento de tokens de autenticação
 */
class TokenService {
    constructor() {
      this.tokenKey = 'auth_token';
    }
  
    /**
     * Obtém o token armazenado
     * @returns {string|null} Token JWT ou null se não existir
     */
    getToken() {
      return localStorage.getItem(this.tokenKey);
    }
  
    /**
     * Armazena o token
     * @param {string} token - Token JWT
     */
    setToken(token) {
      localStorage.setItem(this.tokenKey, token);
    }
  
    /**
     * Remove o token armazenado
     */
    removeToken() {
      localStorage.removeItem(this.tokenKey);
    }
  
    /**
     * Verifica se o token JWT está expirado
     * @param {string} token - Token JWT
     * @returns {boolean} True se o token estiver expirado, false caso contrário
     */
    isTokenExpired(token) {
      if (!token) return true;
      
      try {
        // Decodifica o token (parte do meio)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Verifica a expiração
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
      } catch (error) {
        return true;
      }
    }
  }
  
  export default new TokenService();