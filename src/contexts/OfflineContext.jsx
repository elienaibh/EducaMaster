// src/contexts/OfflineContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import offlineService from '../services/offline/offlineService';

// Contexto para gerenciar o estado offline
const OfflineContext = createContext();

export const useOfflineContext = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOfflineContext deve ser usado dentro de um OfflineProvider');
  }
  return context;
};

export const OfflineProvider = ({ children }) => {
  // Estado para rastrear se está online/offline
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Estado para rastrear se o service worker está registrado
  const [swRegistered, setSwRegistered] = useState(false);
  // Estado para rastrear se há itens pendentes para sincronização
  const [hasPendingItems, setHasPendingItems] = useState(false);
  // Estado para rastrear se está sincronizando
  const [isSyncing, setIsSyncing] = useState(false);
  // Estado para rastrear as capacidades offline
  const [offlineCapabilities, setOfflineCapabilities] = useState({
    serviceWorker: false,
    indexedDB: false,
    syncAPI: false
  });

  // Verifica o status offline/online
  const checkOnlineStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
    if (navigator.onLine) {
      toast.success('Você está online novamente!');
    } else {
      toast.warning('Você está offline. Alguns recursos podem não estar disponíveis.');
    }
  }, []);

  // Registra o service worker
  const registerServiceWorker = useCallback(async () => {
    if (!offlineService.isServiceWorkerSupported()) {
      console.warn('Service Worker não é suportado neste navegador.');
      return false;
    }

    try {
      const registration = await offlineService.registerServiceWorker();
      setSwRegistered(!!registration);
      return !!registration;
    } catch (error) {
      console.error('Erro ao registrar Service Worker:', error);
      return false;
    }
  }, []);

  // Verifica se há itens pendentes para sincronização
  const checkPendingItems = useCallback(async () => {
    try {
      const pendingQuizzes = await offlineService.getAllItems('pendingQuizzes');
      const pendingFlashcards = await offlineService.getAllItems('pendingFlashcards');
      const pendingProgress = await offlineService.getAllItems('pendingProgress');
      
      const hasPending = pendingQuizzes.length > 0 || 
                         pendingFlashcards.length > 0 || 
                         pendingProgress.length > 0;
      
      setHasPendingItems(hasPending);
      return hasPending;
    } catch (error) {
      console.error('Erro ao verificar itens pendentes:', error);
      return false;
    }
  }, []);

  // Sincroniza dados pendentes
  const syncPendingData = useCallback(async () => {
    if (!isOnline) {
      toast.warning('Não é possível sincronizar sem conexão com a internet.');
      return false;
    }

    setIsSyncing(true);
    try {
      const result = await offlineService.syncPendingData();
      
      if (result.success) {
        toast.success('Dados sincronizados com sucesso!');
        await checkPendingItems();
        return true;
      } else {
        toast.error('Erro ao sincronizar alguns dados.');
        return false;
      }
    } catch (error) {
      console.error('Erro na sincronização:', error);
      toast.error('Falha na sincronização de dados.');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, checkPendingItems]);

  // Verifica as capacidades offline do navegador
  const checkOfflineCapabilities = useCallback(() => {
    const capabilities = {
      serviceWorker: 'serviceWorker' in navigator,
      indexedDB: 'indexedDB' in window,
      syncAPI: 'serviceWorker' in navigator && 'SyncManager' in window
    };
    
    setOfflineCapabilities(capabilities);
    return capabilities;
  }, []);

  // Efeito para configurar o estado offline inicial
  useEffect(() => {
    // Verifica capacidades do navegador
    checkOfflineCapabilities();
    
    // Registra Service Worker
    registerServiceWorker();
    
    // Verifica itens pendentes
    checkPendingItems();
    
    // Adiciona listeners para online/offline
    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);
    
    // Cleanup
    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, [checkOfflineCapabilities, registerServiceWorker, checkPendingItems, checkOnlineStatus]);

  // Objeto de valor do contexto
  const value = {
    isOnline,
    swRegistered,
    hasPendingItems,
    isSyncing,
    offlineCapabilities,
    syncPendingData,
    checkPendingItems,
    createOfflineProxy: offlineService.createOfflineProxy,
    saveOfflineData: offlineService.saveData,
    getOfflineData: offlineService.getItem,
    getAllOfflineData: offlineService.getAllItems,
    removeOfflineData: offlineService.removeItem
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};

export default OfflineContext;