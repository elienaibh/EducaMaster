// serviceWorker.js
const CACHE_NAME = 'educamaster-v1';
const DYNAMIC_CACHE = 'dynamic-educamaster-v1';

// Arquivos a serem cacheados no momento da instalação
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html', // Página offline quando não há conexão
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico'
];

// Função para limitar o tamanho do cache dinâmico
const limitCacheSize = async (cacheName, size) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > size) {
    await cache.delete(keys[0]);
    limitCacheSize(cacheName, size);
  }
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return Promise.all(
          urlsToCache.map(url => 
            cache.add(url).catch(error => {
              console.warn(`Não foi possível adicionar ${url} ao cache:`, error);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE;
            })
            .map((cacheName) => {
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  // Skip para requisições de API ou cross-origin
  if (event.request.url.includes('/api/') || !(event.request.url.indexOf(self.location.origin) === 0)) {
    return;
  }

  // Estratégia Cache First com fallback para network e depois para offline page
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // Se não estiver no cache, busca na rede
        return fetch(event.request)
          .then((networkResponse) => {
            // Salva uma cópia da resposta no cache dinâmico
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                  // Limita o tamanho do cache dinâmico a 100 itens
                  limitCacheSize(DYNAMIC_CACHE, 100);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // Se a requisição era para um HTML, retorna a página offline
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // Para imagens, retorna uma imagem padrão
            if (event.request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
              return caches.match('/images/offline-image.png');
            }
            
            // Para outros recursos, retorna um erro
            return new Response('Recurso não disponível offline', {
              status: 503,
              statusText: 'Serviço Indisponível',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Sincronização em segundo plano quando a conexão é restabelecida
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-quizzes') {
    event.waitUntil(syncQuizzes());
  }
  if (event.tag === 'sync-flashcards') {
    event.waitUntil(syncFlashcards());
  }
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

// Função para sincronizar quizzes pendentes
const syncQuizzes = async () => {
  try {
    const db = await openIndexedDB();
    const pendingQuizzes = await db.getAll('pendingQuizzes');
    
    for (const quiz of pendingQuizzes) {
      try {
        const response = await fetch('/api/quizzes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${quiz.token}`
          },
          body: JSON.stringify(quiz.data)
        });
        
        if (response.ok) {
          // Remove do indexedDB após sucesso
          await db.delete('pendingQuizzes', quiz.id);
        }
      } catch (error) {
        console.error('Erro ao sincronizar quiz:', error);
      }
    }
  } catch (error) {
    console.error('Erro ao acessar IndexedDB:', error);
  }
};

// Função para sincronizar flashcards pendentes
const syncFlashcards = async () => {
  try {
    const db = await openIndexedDB();
    const pendingFlashcards = await db.getAll('pendingFlashcards');
    
    for (const flashcard of pendingFlashcards) {
      try {
        const response = await fetch('/api/flashcards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${flashcard.token}`
          },
          body: JSON.stringify(flashcard.data)
        });
        
        if (response.ok) {
          // Remove do indexedDB após sucesso
          await db.delete('pendingFlashcards', flashcard.id);
        }
      } catch (error) {
        console.error('Erro ao sincronizar flashcard:', error);
      }
    }
  } catch (error) {
    console.error('Erro ao acessar IndexedDB:', error);
  }
};

// Função para sincronizar progresso de estudo pendente
const syncProgress = async () => {
  try {
    const db = await openIndexedDB();
    const pendingProgress = await db.getAll('pendingProgress');
    
    for (const progress of pendingProgress) {
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${progress.token}`
          },
          body: JSON.stringify(progress.data)
        });
        
        if (response.ok) {
          // Remove do indexedDB após sucesso
          await db.delete('pendingProgress', progress.id);
        }
      } catch (error) {
        console.error('Erro ao sincronizar progresso:', error);
      }
    }
  } catch (error) {
    console.error('Erro ao acessar IndexedDB:', error);
  }
};

// Função auxiliar para abrir o IndexedDB
const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('educaMaster', 1);
    
    request.onerror = (event) => {
      reject('Erro ao abrir IndexedDB');
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      
      // Adaptar para uma API mais simples
      const simplifiedDB = {
        getAll: (storeName) => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
          });
        },
        delete: (storeName, key) => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
          });
        }
      };
      
      resolve(simplifiedDB);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Criar stores se eles não existirem
      if (!db.objectStoreNames.contains('pendingQuizzes')) {
        db.createObjectStore('pendingQuizzes', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('pendingFlashcards')) {
        db.createObjectStore('pendingFlashcards', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('pendingProgress')) {
        db.createObjectStore('pendingProgress', { keyPath: 'id' });
      }
    };
  });
};

// Notificação quando uma atualização está disponível
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});