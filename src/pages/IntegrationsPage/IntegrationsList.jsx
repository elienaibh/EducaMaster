// src/pages/IntegrationsPage/IntegrationsList.jsx
import React from 'react';
import { ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { useIntegrationContext } from '../../contexts/IntegrationContext';

/**
 * Componente que exibe as integrações em formato de lista
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.integrations - Lista de integrações a serem exibidas
 * @param {boolean} props.isConnected - Se são integrações conectadas
 * @param {Function} props.onSelect - Função chamada ao selecionar uma integração
 */
const IntegrationsList = ({ integrations, isConnected = false, onSelect }) => {
  const { userIntegrations, syncingIntegrations } = useIntegrationContext();

  // Função para obter informações de sincronização
  const getSyncInfo = (integrationId) => {
    const userIntegration = userIntegrations.find(i => i.id === integrationId);
    if (!userIntegration) return null;
    
    const lastSync = userIntegration.lastSync ? new Date(userIntegration.lastSync) : null;
    return {
      lastSync,
      syncing: syncingIntegrations[integrationId] || false
    };
  };

  // Função para formatar a data da última sincronização
  const formatLastSync = (lastSync) => {
    if (!lastSync) return 'Nunca';
    
    const now = new Date();
    const diffMs = now - lastSync;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} minuto${diffMins !== 1 ? 's' : ''} atrás`;
    } else if (diffHours < 24) {
      return `${diffHours} hora${diffHours !== 1 ? 's' : ''} atrás`;
    } else if (diffDays < 30) {
      return `${diffDays} dia${diffDays !== 1 ? 's' : ''} atrás`;
    } else {
      return lastSync.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {integrations.map((integration) => {
          const syncInfo = getSyncInfo(integration.id);
          
          return (
            <li
              key={integration.id}
              className="group hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelect(integration.id)}
            >
              <div className="flex items-center px-4 py-4">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  {/* Aqui você poderia usar um componente para ícones de diferentes plataformas */}
                  <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                    {integration.name.substring(0, 2)}
                  </span>
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {integration.name}
                    </h3>
                    
                    {isConnected && (
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Conectado</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {integration.description}
                  </p>
                  
                  {isConnected && syncInfo && (
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>
                        Última sincronização: {syncInfo.syncing ? 'Sincronizando...' : formatLastSync(syncInfo.lastSync)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="ml-4">
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IntegrationsList;