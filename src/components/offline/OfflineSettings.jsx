// src/components/offline/OfflineSettings.jsx
import React, { useState, useEffect } from 'react';
import { Database, Download, RefreshCw, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useOfflineContext } from '../../contexts/OfflineContext';
import offlineService from '../../services/offline/offlineService';

/**
 * Componente para gerenciar configurações offline na página de configurações
 */
const OfflineSettings = () => {
  const { 
    isOnline,
    hasPendingItems,
    isSyncing,
    syncPendingData,
    offlineCapabilities,
    checkPendingItems,
  } = useOfflineContext();

  const [cacheSize, setCacheSize] = useState(0);
  const [downloadingResources, setDownloadingResources] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  const [offlineSettings, setOfflineSettings] = useState({
    enableOfflineMode: true,
    syncOnStartup: true,
    maxOfflineQuizzes: 10,
    maxOfflineFlashcards: 20,
    autoDownloadResources: true,
    savePendingChanges: true
  });

  // Carrega o tamanho do cache e as configurações
  useEffect(() => {
    const loadCacheSize = async () => {
      try {
        // Esta é uma forma simplificada de estimar o tamanho
        // Na implementação real, seria necessário calcular com base nos dados reais
        const quizzes = await offlineService.getAllItems('quizzes');
        const flashcards = await offlineService.getAllItems('flashcards');
        const pendingItems = await offlineService.getAllItems('pendingQuizzes')
          .concat(await offlineService.getAllItems('pendingFlashcards'))
          .concat(await offlineService.getAllItems('pendingProgress'));
  
        // Estimativa baseada no número de itens (apenas para demonstração)
        const estimatedSize = 
          quizzes.length * 15 + // ~15KB por quiz
          flashcards.length * 5 + // ~5KB por deck de flashcards
          pendingItems.length * 2; // ~2KB por item pendente
        
        setCacheSize(estimatedSize);
      } catch (error) {
        console.error('Erro ao calcular tamanho do cache:', error);
      }
    };

    const loadOfflineSettings = async () => {
      try {
        const settings = await offlineService.getItem('userSettings', 'offlineSettings');
        if (settings) {
          setOfflineSettings(settings);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações offline:', error);
      }
    };

    loadCacheSize();
    loadOfflineSettings();
  }, []);

  // Salva as configurações quando alteradas
  const saveSettings = async (newSettings) => {
    try {
      await offlineService.saveData('userSettings', {
        id: 'offlineSettings',
        ...newSettings
      });
      setOfflineSettings(newSettings);
    } catch (error) {
      console.error('Erro ao salvar configurações offline:', error);
    }
  };

  // Manipula alterações nas configurações
  const handleSettingChange = (setting, value) => {
    const newSettings = { ...offlineSettings, [setting]: value };
    saveSettings(newSettings);
  };

  // Baixa recursos para uso offline
  const handleDownloadResources = async () => {
    setDownloadingResources(true);
    try {
      // Simular o download de recursos (imagens, áudios, etc)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em uma implementação real, isso faria o download de recursos estáticos
      // e os armazenaria no cache do service worker
      
      // Atualiza o tamanho do cache após o download
      const newSize = cacheSize + 5; // Adiciona ~5MB ao cache
      setCacheSize(newSize);
    } catch (error) {
      console.error('Erro ao baixar recursos:', error);
    } finally {
      setDownloadingResources(false);
    }
  };

  // Limpa o cache offline
  const handleClearCache = async () => {
    setClearingCache(true);
    try {
      // Limpa os dados armazenados no IndexedDB
      const stores = ['quizzes', 'flashcards', 'progress'];
      
      for (const store of stores) {
        const items = await offlineService.getAllItems(store);
        for (const item of items) {
          await offlineService.removeItem(store, item.id);
        }
      }

      // Em uma implementação real, também limparia o cache do service worker
      // usando a Cache API

      setCacheSize(0);
      await checkPendingItems(); // Atualiza o estado de itens pendentes
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    } finally {
      setClearingCache(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Configurações Offline
      </h3>

      {/* Status dos recursos offline */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
          Status
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="flex items-center">
            <div className={`mr-2 ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
              {isOnline ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="flex items-center">
            <div className={`mr-2 ${hasPendingItems ? 'text-yellow-500' : 'text-green-500'}`}>
              {hasPendingItems ? <Database className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              {hasPendingItems ? 'Alterações pendentes' : 'Tudo sincronizado'}
            </span>
          </div>
          
          <div className="flex items-center">
            <div className={`mr-2 ${offlineCapabilities.serviceWorker ? 'text-green-500' : 'text-red-500'}`}>
              {offlineCapabilities.serviceWorker ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              Service Worker: {offlineCapabilities.serviceWorker ? 'Disponível' : 'Indisponível'}
            </span>
          </div>
          
          <div className="flex items-center">
            <div className="mr-2 text-blue-500">
              <Database className="h-5 w-5" />
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              Uso de armazenamento: {cacheSize > 0 ? `~${cacheSize}KB` : 'Vazio'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={syncPendingData}
            disabled={!isOnline || !hasPendingItems || isSyncing}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm ${
              !isOnline || !hasPendingItems || isSyncing
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Sincronizando...' : 'Sincronizar agora'}
          </button>
          
          <button
            onClick={handleDownloadResources}
            disabled={!isOnline || downloadingResources}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm ${
              !isOnline || downloadingResources
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <Download className={`h-4 w-4 mr-1.5 ${downloadingResources ? 'animate-pulse' : ''}`} />
            {downloadingResources ? 'Baixando...' : 'Baixar recursos'}
          </button>
          
          <button
            onClick={handleClearCache}
            disabled={cacheSize === 0 || clearingCache}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm ${
              cacheSize === 0 || clearingCache
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            {clearingCache ? 'Limpando...' : 'Limpar cache'}
          </button>
        </div>
      </div>

      {/* Opções de configuração */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="enableOfflineMode" className="text-gray-700 dark:text-gray-300 font-medium">
              Habilitar modo offline
            </label>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Permite usar o aplicativo mesmo sem internet
            </p>
          </div>
          <div className="relative inline-block w-12 align-middle select-none">
            <input
              type="checkbox"
              id="enableOfflineMode"
              checked={offlineSettings.enableOfflineMode}
              onChange={(e) => handleSettingChange('enableOfflineMode', e.target.checked)}
              className="sr-only"
            />
            <div className={`block w-12 h-6 rounded-full transition-colors ${
              offlineSettings.enableOfflineMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}></div>
            <div className={`absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform transform ${
              offlineSettings.enableOfflineMode ? 'translate-x-6' : ''
            }`}></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="syncOnStartup" className="text-gray-700 dark:text-gray-300 font-medium">
              Sincronizar ao iniciar
            </label>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Sincroniza alterações pendentes automaticamente
            </p>
          </div>
          <div className="relative inline-block w-12 align-middle select-none">
            <input
              type="checkbox"
              id="syncOnStartup"
              checked={offlineSettings.syncOnStartup}
              onChange={(e) => handleSettingChange('syncOnStartup', e.target.checked)}
              className="sr-only"
            />
            <div className={`block w-12 h-6 rounded-full transition-colors ${
              offlineSettings.syncOnStartup ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}></div>
            <div className={`absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform transform ${
              offlineSettings.syncOnStartup ? 'translate-x-6' : ''
            }`}></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="autoDownloadResources" className="text-gray-700 dark:text-gray-300 font-medium">
              Baixar recursos automaticamente
            </label>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Baixa arquivos necessários quando estiver online
            </p>
          </div>
          <div className="relative inline-block w-12 align-middle select-none">
            <input
              type="checkbox"
              id="autoDownloadResources"
              checked={offlineSettings.autoDownloadResources}
              onChange={(e) => handleSettingChange('autoDownloadResources', e.target.checked)}
              className="sr-only"
            />
            <div className={`block w-12 h-6 rounded-full transition-colors ${
              offlineSettings.autoDownloadResources ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}></div>
            <div className={`absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform transform ${
              offlineSettings.autoDownloadResources ? 'translate-x-6' : ''
            }`}></div>
          </div>
        </div>
        
        <div>
          <label htmlFor="maxOfflineQuizzes" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Número máximo de quizzes offline
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="maxOfflineQuizzes"
              min="5"
              max="50"
              step="5"
              value={offlineSettings.maxOfflineQuizzes}
              onChange={(e) => handleSettingChange('maxOfflineQuizzes', parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <span className="ml-3 text-gray-700 dark:text-gray-300 w-12 text-center">
              {offlineSettings.maxOfflineQuizzes}
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="maxOfflineFlashcards" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Número máximo de decks de flashcards offline
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="maxOfflineFlashcards"
              min="5"
              max="50"
              step="5"
              value={offlineSettings.maxOfflineFlashcards}
              onChange={(e) => handleSettingChange('maxOfflineFlashcards', parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <span className="ml-3 text-gray-700 dark:text-gray-300 w-12 text-center">
              {offlineSettings.maxOfflineFlashcards}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          O modo offline permite continuar estudando mesmo sem conexão com a internet.
          As alterações feitas offline serão sincronizadas automaticamente quando você
          estiver online novamente.
        </p>
      </div>
    </div>
  );
};

export default OfflineSettings;