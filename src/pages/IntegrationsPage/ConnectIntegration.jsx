// src/pages/IntegrationsPage/ConnectIntegration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ExternalLink, AlertTriangle } from 'lucide-react';
import { useIntegrationContext } from '../../contexts/IntegrationContext';
import IntegrationCard from '../../components/integrations/IntegrationCard';

/**
 * Componente para conectar novas integrações
 */
const ConnectIntegration = () => {
  const navigate = useNavigate();
  const { availableIntegrations, userIntegrations, isLoading, connectIntegration } = useIntegrationContext();
  
  // Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para rastrear conexões em andamento
  const [connecting, setConnecting] = useState({});
  
  // Filtra integrações já conectadas
  const unconnectedIntegrations = availableIntegrations.filter(
    integration => !userIntegrations.some(ui => ui.id === integration.id)
  );
  
  // Filtra integrações com base no termo de busca
  const filteredIntegrations = unconnectedIntegrations.filter(
    integration => integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   integration.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Manipula a conexão de uma integração
  const handleConnect = async (integrationId) => {
    setConnecting(prev => ({ ...prev, [integrationId]: true }));
    try {
      await connectIntegration(integrationId);
      navigate(`/integrations/${integrationId}`);
    } finally {
      setConnecting(prev => ({ ...prev, [integrationId]: false }));
    }
  };
  
  return (
    <div>
      <button
        onClick={() => navigate('/integrations')}
        className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Integrações
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Adicionar Integração
        </h1>
        
        {/* Caixa de busca */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Buscar integrações..."
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredIntegrations.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Nenhuma integração encontrada.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Tente outro termo de busca ou verifique se já conectou todas as integrações disponíveis.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                isConnected={false}
                isConnecting={connecting[integration.id]}
                onConnect={() => handleConnect(integration.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
              Sobre permissões de integração
            </h3>
            <div className="mt-2 text-blue-700 dark:text-blue-400">
              <p className="text-sm">
                Ao conectar uma integração, você concederá ao EducaMaster AI acesso limitado à sua conta nessa plataforma.
                Revisamos nossos processos regularmente para garantir que apenas os dados necessários sejam acessados.
              </p>
              <p className="text-sm mt-2">
                Você pode remover o acesso a qualquer momento desconectando a integração.
              </p>
              <div className="mt-3">
                <a
                  href="https://educamaster.example.com/privacy/integrations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center text-blue-800 dark:text-blue-300 hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Saiba mais sobre nossas políticas de privacidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectIntegration;