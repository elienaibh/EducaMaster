// src/services/offline/offlineService.js

/**
 * Serviço para gerenciar o comportamento offline da aplicação
 */
const offlineService = {
    /**
     * Verifica se a aplicação está registrando o service worker
     * @returns {boolean} true se suportado
     */
    isServiceWorkerSupported: () => {
      return 'serviceWorker' in navigator;
    },
  
    /**
     * Registra o service worker
     * @returns {Promise<ServiceWorkerRegistration>} registro do service worker
     */
    registerServiceWorker: async () => {
      if (!offlineService.isServiceWorkerSupported()) {
        console.warn('Service Worker não é suportado neste navegador.');
        return null;
      }
  
      try {
        const registration = await navigator.serviceWorker.register('/serviceWorker.js');
        console.log('Service Worker registrado com sucesso:', registration.scope);
        return registration;
      } catch (error) {
        console.error('Erro ao registrar o Service Worker:', error);
        return null;
      }
    },
  
    /**
     * Verifica o status da conexão
     * @returns {boolean} true se online
     */
    isOnline: () => {
      return navigator.onLine;
    },
  
    /**
     * Verifica se o IndexedDB é suportado
     * @returns {boolean} true se suportado
     */
    isIndexedDBSupported: () => {
      return 'indexedDB' in window;
    },
  
    /**
     * Abre uma conexão com o banco IndexedDB
     * @returns {Promise<IDBDatabase>} conexão com o banco
     */
    openDatabase: () => {
      return new Promise((resolve, reject) => {
        if (!offlineService.isIndexedDBSupported()) {
          reject(new Error('IndexedDB não é suportado neste navegador.'));
          return;
        }
  
        const request = indexedDB.open('educaMaster', 1);
  
        request.onerror = (event) => {
          console.error('Erro ao abrir o banco de dados:', event.target.error);
          reject(event.target.error);
        };
  
        request.onsuccess = (event) => {
          const db = event.target.result;
          resolve(db);
        };
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
  
          // Cria os objectStores necessários para armazenamento offline
          if (!db.objectStoreNames.contains('quizzes')) {
            db.createObjectStore('quizzes', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('flashcards')) {
            db.createObjectStore('flashcards', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('progress')) {
            db.createObjectStore('progress', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('pendingQuizzes')) {
            db.createObjectStore('pendingQuizzes', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('pendingFlashcards')) {
            db.createObjectStore('pendingFlashcards', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('pendingProgress')) {
            db.createObjectStore('pendingProgress', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('userSettings')) {
            db.createObjectStore('userSettings', { keyPath: 'id' });
          }
        };
      });
    },
  
    /**
     * Salva dados no IndexedDB
     * @param {string} storeName - Nome do store
     * @param {Object} data - Dados a serem salvos
     * @returns {Promise<any>} - Resultado da operação
     */
    saveData: async (storeName, data) => {
      try {
        const db = await offlineService.openDatabase();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.put(data);
  
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
  
          transaction.oncomplete = () => {
            db.close();
          };
        });
      } catch (error) {
        console.error(`Erro ao salvar dados em ${storeName}:`, error);
        throw error;
      }
    },
  
    /**
     * Busca um item no IndexedDB pelo id
     * @param {string} storeName - Nome do store
     * @param {string|number} id - ID do item
     * @returns {Promise<any>} - Item encontrado ou null
     */
    getItem: async (storeName, id) => {
      try {
        const db = await offlineService.openDatabase();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const request = store.get(id);
  
          request.onsuccess = () => resolve(request.result || null);
          request.onerror = () => reject(request.error);
  
          transaction.oncomplete = () => {
            db.close();
          };
        });
      } catch (error) {
        console.error(`Erro ao buscar item em ${storeName}:`, error);
        return null;
      }
    },
  
    /**
     * Busca todos os itens de um store
     * @param {string} storeName - Nome do store
     * @returns {Promise<Array>} - Array de itens
     */
    getAllItems: async (storeName) => {
      try {
        const db = await offlineService.openDatabase();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const request = store.getAll();
  
          request.onsuccess = () => resolve(request.result || []);
          request.onerror = () => reject(request.error);
  
          transaction.oncomplete = () => {
            db.close();
          };
        });
      } catch (error) {
        console.error(`Erro ao buscar itens em ${storeName}:`, error);
        return [];
      }
    },
  
    /**
     * Remove um item do IndexedDB
     * @param {string} storeName - Nome do store
     * @param {string|number} id - ID do item
     * @returns {Promise<boolean>} - Sucesso da operação
     */
    removeItem: async (storeName, id) => {
      try {
        const db = await offlineService.openDatabase();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.delete(id);
  
          request.onsuccess = () => resolve(true);
          request.onerror = () => reject(request.error);
  
          transaction.oncomplete = () => {
            db.close();
          };
        });
      } catch (error) {
        console.error(`Erro ao remover item em ${storeName}:`, error);
        return false;
      }
    },
  
    /**
     * Adiciona um item à fila de sincronização
     * @param {string} type - Tipo de item (quiz, flashcard, progress)
     * @param {Object} data - Dados do item
     * @param {string} token - Token de autenticação
     * @returns {Promise<boolean>} - Sucesso da operação
     */
    addToSyncQueue: async (type, data, token) => {
      try {
        const storeName = `pending${type.charAt(0).toUpperCase() + type.slice(1)}s`;
        const syncItem = {
          id: data.id || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          data,
          token,
          createdAt: new Date().toISOString()
        };
  
        await offlineService.saveData(storeName, syncItem);
  
        // Registra uma sincronização em segundo plano se possível
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          await registration.sync.register(`sync-${type}s`);
        }
  
        return true;
      } catch (error) {
        console.error(`Erro ao adicionar item à fila de sincronização:`, error);
        return false;
      }
    },
  
    /**
     * Inicia a sincronização manual
     * @returns {Promise<{success: boolean, synced: number, failed: number}>} - Resultado da sincronização
     */
    syncPendingData: async () => {
      if (!offlineService.isOnline()) {
        console.warn('Não é possível sincronizar sem conexão com a internet.');
        return { success: false, synced: 0, failed: 0 };
      }
  
      try {
        // Chama a sincronização no service worker
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          await registration.sync.register('sync-quizzes');
          await registration.sync.register('sync-flashcards');
          await registration.sync.register('sync-progress');
        }
  
        return { success: true, synced: -1, failed: 0 }; // -1 indica que a sincronização foi delegada ao service worker
      } catch (error) {
        console.error('Erro ao sincronizar dados pendentes:', error);
        return { success: false, synced: 0, failed: -1 };
      }
    },
  
    /**
     * Cria um proxy para serviços da API que suporte funcionamento offline
     * @param {Object} apiService - Serviço da API original
     * @param {string} type - Tipo de recurso (quiz, flashcard, progress)
     * @returns {Object} - Serviço com suporte offline
     */
    createOfflineProxy: (apiService, type) => {
      return {
        // Mantém referência para o serviço original
        _originalService: apiService,
  
        // Método para buscar todos os itens
        getAll: async (...args) => {
          try {
            if (offlineService.isOnline()) {
              // Se estiver online, usa o serviço da API
              const response = await apiService.getAll(...args);
              
              // Salva os dados no IndexedDB para uso offline
              if (response && Array.isArray(response)) {
                for (const item of response) {
                  await offlineService.saveData(`${type}s`, item);
                }
              }
              
              return response;
            } else {
              // Se estiver offline, busca do IndexedDB
              return await offlineService.getAllItems(`${type}s`);
            }
          } catch (error) {
            console.error(`Erro no getAll de ${type}:`, error);
            
            // Em caso de erro, tenta buscar do IndexedDB como fallback
            return await offlineService.getAllItems(`${type}s`);
          }
        },
  
        // Método para buscar um item pelo ID
        getById: async (id, ...args) => {
          try {
            if (offlineService.isOnline()) {
              // Se estiver online, usa o serviço da API
              const response = await apiService.getById(id, ...args);
              
              // Salva no IndexedDB para uso offline
              if (response) {
                await offlineService.saveData(`${type}s`, response);
              }
              
              return response;
            } else {
              // Se estiver offline, busca do IndexedDB
              return await offlineService.getItem(`${type}s`, id);
            }
          } catch (error) {
            console.error(`Erro no getById de ${type}:`, error);
            
            // Em caso de erro, tenta buscar do IndexedDB como fallback
            return await offlineService.getItem(`${type}s`, id);
          }
        },
  
        // Método para criar um novo item
        create: async (data, ...args) => {
          try {
            // Gera um ID temporário se não existir
            if (!data.id) {
              data.id = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            }
            
            // Salva no IndexedDB primeiro
            await offlineService.saveData(`${type}s`, data);
            
            if (offlineService.isOnline()) {
              // Se estiver online, tenta enviar para a API
              const response = await apiService.create(data, ...args);
              
              // Se a API retornou um ID diferente, atualiza no IndexedDB
              if (response && response.id !== data.id) {
                await offlineService.removeItem(`${type}s`, data.id);
                await offlineService.saveData(`${type}s`, response);
              }
              
              return response;
            } else {
              // Se estiver offline, adiciona à fila de sincronização
              const token = localStorage.getItem('token'); // Assume que o token está no localStorage
              await offlineService.addToSyncQueue(type, data, token);
              
              // Retorna os dados locais
              return data;
            }
          } catch (error) {
            console.error(`Erro no create de ${type}:`, error);
            
            // Em caso de erro, adiciona à fila de sincronização
            const token = localStorage.getItem('token');
            await offlineService.addToSyncQueue(type, data, token);
            
            // Retorna os dados locais
            return data;
          }
        },
  
        // Método para atualizar um item
        update: async (id, data, ...args) => {
          try {
            // Garante que o ID está nos dados
            data.id = id;
            
            // Salva no IndexedDB primeiro
            await offlineService.saveData(`${type}s`, data);
            
            if (offlineService.isOnline()) {
              // Se estiver online, tenta enviar para a API
              const response = await apiService.update(id, data, ...args);
              
              // Atualiza no IndexedDB
              if (response) {
                await offlineService.saveData(`${type}s`, response);
              }
              
              return response;
            } else {
              // Se estiver offline, adiciona à fila de sincronização
              const token = localStorage.getItem('token');
              await offlineService.addToSyncQueue(type, data, token);
              
              // Retorna os dados locais
              return data;
            }
          } catch (error) {
            console.error(`Erro no update de ${type}:`, error);
            
            // Em caso de erro, adiciona à fila de sincronização
            const token = localStorage.getItem('token');
            await offlineService.addToSyncQueue(type, data, token);
            
            // Retorna os dados locais
            return data;
          }
        },
  
        // Método para deletar um item
        delete: async (id, ...args) => {
          try {
            // Remove do IndexedDB primeiro
            await offlineService.removeItem(`${type}s`, id);
            
            if (offlineService.isOnline()) {
              // Se estiver online, tenta enviar para a API
              return await apiService.delete(id, ...args);
            } else {
              // Se estiver offline, adiciona à fila de sincronização
              const token = localStorage.getItem('token');
              await offlineService.addToSyncQueue(type, { id, _deleted: true }, token);
              
              // Retorna sucesso
              return true;
            }
          } catch (error) {
            console.error(`Erro no delete de ${type}:`, error);
            
            // Em caso de erro, adiciona à fila de sincronização
            const token = localStorage.getItem('token');
            await offlineService.addToSyncQueue(type, { id, _deleted: true }, token);
            
            // Assume que foi deletado localmente
            return true;
          }
        }
      };
    }
  };

   export default offlineService;