// src/components/offline/OfflineStatus.jsx
import React from 'react';
import { Wifi, WifiOff, Database, RefreshCw } from 'lucide-react';
import { useOfflineContext } from '../../contexts/OfflineContext';

/**
 * Componente que exibe o status offline e permite sincronização
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {boolean} [props.showSyncButton=true] - Se deve mostrar o botão de sincronização
 * @param {boolean} [props.showPendingIndicator=true] - Se deve mostrar o indicador de itens pendentes
 * @param {boolean} [props.expanded=false] - Se o componente deve ser expandido com mais detalhes
 */
const OfflineStatus = ({
  className = '',
  showSyncButton = true,
  showPendingIndicator = true,
  expanded = false
}) => {
  const {
    isOnline,
    hasPendingItems,
    isSyncing,
    syncPendingData,
    offlineCapabilities
  } = useOfflineContext();

  const handleSync = (e) => {
    e.preventDefault();
    syncPendingData();
  };

  // Versão compacta do componente
  if (!expanded) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className={`flex items-center ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          <span className="ml-1 text-sm font-medium">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {showPendingIndicator && hasPendingItems && (
          <div className="flex items-center ml-3 text-yellow-500">
            <Database className="w-4 h-4" />
            <span className="ml-1 text-sm font-medium">Pendente</span>
          </div>
        )}

        {showSyncButton && isOnline && hasPendingItems && (
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="ml-3 flex items-center text-blue-500 hover:text-blue-700 disabled:text-gray-400"
            aria-label="Sincronizar dados"
            title="Sincronizar dados"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="ml-1 text-sm font-medium">Sincronizar</span>
          </button>
        )}
      </div>
    );
  }

  // Versão expandida com mais detalhes
  return (
    <div className={`p-4 rounded-lg border ${isOnline ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center ${isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
          <span className="ml-2 font-medium">
            {isOnline ? 'Você está online' : 'Você está offline'}
          </span>
        </div>

        {showSyncButton && isOnline && hasPendingItems && (
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`px-3 py-1.5 rounded-md flex items-center text-white ${isSyncing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Sincronizando...' : 'Sincronizar dados'}
          </button>
        )}
      </div>

      {!isOnline && (
        <div className="mb-3 text-sm text-gray-600 dark:text-gray-300">
          <p>Você está trabalhando no modo offline. Algumas funcionalidades podem estar limitadas, mas suas alterações serão sincronizadas quando você ficar online novamente.</p>
        </div>
      )}

      {showPendingIndicator && hasPendingItems && (
        <div className="flex items-center text-yellow-600 dark:text-yellow-400 mb-2">
          <Database className="w-4 h-4" />
          <span className="ml-2 text-sm">
            Você tem dados pendentes para sincronização.
          </span>
        </div>
      )}

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className={`text-xs ${offlineCapabilities.serviceWorker ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          Service Worker: {offlineCapabilities.serviceWorker ? 'Suportado' : 'Não suportado'}
        </div>
        <div className={`text-xs ${offlineCapabilities.indexedDB ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          IndexedDB: {offlineCapabilities.indexedDB ? 'Suportado' : 'Não suportado'}
        </div>
        <div className={`text-xs ${offlineCapabilities.syncAPI ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          Background Sync: {offlineCapabilities.syncAPI ? 'Suportado' : 'Não suportado'}
        </div>
      </div>
    </div>
  );
};

export default OfflineStatus;