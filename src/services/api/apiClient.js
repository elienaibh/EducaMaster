// src/services/api/apiClient.js

/**
 * Cliente HTTP centralizado para chamadas à API
 */
const apiClient = {
    /**
     * Configuração padrão para requisições
     */
    defaultConfig: {
      baseURL: import.meta.env.VITE_API_URL || 'https://api.educamaster.ai',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    },
  
    /**
     * Adiciona o token de autenticação aos headers
     * @param {Object} config - Configuração da requisição
     * @returns {Object} Configuração com token
     */
    addAuthHeader(config = {}) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      }
      return config;
    },
  
    /**
     * Executa uma requisição GET
     * @param {string} url - URL da requisição
     * @param {Object} config - Configuração adicional
     * @returns {Promise<Object>} Resposta da requisição
     */
    async get(url, config = {}) {
      const fullConfig = this.addAuthHeader({
        ...this.defaultConfig,
        ...config,
        method: 'GET',
      });
      
      try {
        const response = await fetch(
          `${fullConfig.baseURL}${url}`, 
          fullConfig
        );
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erro na requisição GET:', error);
        throw error;
      }
    },
  
    /**
     * Executa uma requisição POST
     * @param {string} url - URL da requisição
     * @param {Object} data - Dados a serem enviados
     * @param {Object} config - Configuração adicional
     * @returns {Promise<Object>} Resposta da requisição
     */
    async post(url, data = {}, config = {}) {
      const fullConfig = this.addAuthHeader({
        ...this.defaultConfig,
        ...config,
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      try {
        const response = await fetch(
          `${fullConfig.baseURL}${url}`, 
          fullConfig
        );
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erro na requisição POST:', error);
        throw error;
      }
    },
  
    /**
     * Executa uma requisição PUT
     * @param {string} url - URL da requisição
     * @param {Object} data - Dados a serem enviados
     * @param {Object} config - Configuração adicional
     * @returns {Promise<Object>} Resposta da requisição
     */
    async put(url, data = {}, config = {}) {
      const fullConfig = this.addAuthHeader({
        ...this.defaultConfig,
        ...config,
        method: 'PUT',
        body: JSON.stringify(data),
      });
      
      try {
        const response = await fetch(
          `${fullConfig.baseURL}${url}`, 
          fullConfig
        );
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erro na requisição PUT:', error);
        throw error;
      }
    },
  
    /**
     * Executa uma requisição DELETE
     * @param {string} url - URL da requisição
     * @param {Object} config - Configuração adicional
     * @returns {Promise<Object>} Resposta da requisição
     */
    async delete(url, config = {}) {
      const fullConfig = this.addAuthHeader({
        ...this.defaultConfig,
        ...config,
        method: 'DELETE',
      });
      
      try {
        const response = await fetch(
          `${fullConfig.baseURL}${url}`, 
          fullConfig
        );
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erro na requisição DELETE:', error);
        throw error;
      }
    },
  };
  
  export { apiClient };
export default apiClient;