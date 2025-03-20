// src/components/integrations/IntegrationCard.jsx
import React from 'react';
import { CheckCircle, Link2, Clock, AlertTriangle } from 'lucide-react';
import { useIntegrationContext } from '../../contexts/IntegrationContext';

/**
 * Componente de cartão para exibir uma integração
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.integration - Dados da integração
 * @param {boolean} props.isConnected - Se a integração está conectada
 * @param {boolean} props.isConnecting - Se está em processo de conexão
 * @param {Function} props.onClick - Função chamada ao clicar no cartão
 * @param {Function} props.onConnect - Função chamada ao conectar (opcional)
 */
const IntegrationCard = ({ 
  integration, 
  isConnected = false, 
  isConnecting = false, 
  onClick, 
  onConnect
}) => {
  const { userIntegrations } = useIntegrationContext();
  
  // Busca informações adicionais da integração conectada
  const userIntegration = isConnected 
    ? userIntegrations.find(ui => ui.id === integration.id) 
    : null;
  
  // Formata a data da última sincronização
  const formatLastSync = (lastSyncDate) => {
    if (!lastSyncDate) return 'Nunca';
    
    const date = new Date(lastSyncDate);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
      return 'Hoje';
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };
  
  // Manipula o clique no botão de conectar
  const handleConnectClick = (e) => {
    e.stopPropagation();
    onConnect && onConnect(integration.id);
  };
  
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow-sm transition-shadow
        hover:shadow-md cursor-pointer
        ${isConnected ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-700'}
      `}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
            {/* Aqui poderia usar um componente para exibir ícones específicos de cada plataforma */}
            <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
              {integration.name.substring(0, 2)}
            </span>
          </div>
          
          {isConnected && (
            <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Conectado</span>
            </div>
          )}
          
          {!isConnected && integration.status === 'coming-soon' && (
            <div className="flex items-center text-yellow-600 dark:text-yellow-400 text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>Em breve</span>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {integration.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {integration.description}
        </p>
        
        {isConnected && userIntegration?.lastSync && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>
              Última sincronização: {formatLastSync(userIntegration.lastSync)}
            </span>
          </div>
        )}
        
        {onConnect && !isConnected && (
          <button
            onClick={handleConnectClick}
            disabled={integration.status === 'coming-soon' || isConnecting}
            className={`
              w-full flex items-center justify-center px-4 py-2 rounded-md text-sm
              ${integration.status === 'coming-soon' || isConnecting
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            <Link2 className={`w-4 h-4 mr-2 ${isConnecting ? 'animate-pulse' : ''}`} />
            {isConnecting ? 'Conectando...' : 'Conectar'}
          </button>
        )}
      </div>
    </div>
  );
};

export default IntegrationCard;