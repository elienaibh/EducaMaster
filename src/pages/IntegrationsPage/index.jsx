// src/pages/IntegrationsPage/index.jsx
import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid, ExternalLink, List, Plus } from 'lucide-react';
import { useIntegrationContext } from '../../contexts/IntegrationContext';
import IntegrationsList from './IntegrationsList';
import IntegrationDetails from './IntegrationDetails';
import ConnectIntegration from './ConnectIntegration';
import IntegrationCard from '../../components/integrations/IntegrationCard';

/**
 * Página principal de integrações
 */
const IntegrationsPage = () => {
  const { availableIntegrations, userIntegrations, isLoading } = useIntegrationContext();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const navigate = useNavigate();

  // Filtra as integrações conectadas pelo usuário
  const connectedIntegrations = availableIntegrations.filter(integration => 
    userIntegrations.some(ui => ui.id === integration.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Integrações
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Conecte-se a outras plataformas educacionais e traga seu conteúdo
                </p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mr-4">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-700 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400'}`}
                    aria-label="Visualização em grade"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-700 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400'}`}
                    aria-label="Visualização em lista"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                
                <Link
                  to="/integrations/connect"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar
                </Link>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* Integrações conectadas */}
                {connectedIntegrations.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Integrações Conectadas
                    </h2>
                    
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {connectedIntegrations.map((integration) => (
                          <IntegrationCard
                            key={integration.id}
                            integration={integration}
                            isConnected={true}
                            onClick={() => navigate(`/integrations/${integration.id}`)}
                          />
                        ))}
                      </div>
                    ) : (
                      <IntegrationsList 
                        integrations={connectedIntegrations} 
                        isConnected={true}
                        onSelect={(id) => navigate(`/integrations/${id}`)}
                      />
                    )}
                  </div>
                )}
                
                {/* Integrações disponíveis */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Integrações Disponíveis
                  </h2>
                  
                  {availableIntegrations.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                      <p className="text-gray-600 dark:text-gray-400">
                        Nenhuma integração disponível no momento.
                      </p>
                    </div>
                  ) : (
                    viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableIntegrations
                          .filter(integration => !connectedIntegrations.some(ci => ci.id === integration.id))
                          .map((integration) => (
                            <IntegrationCard
                              key={integration.id}
                              integration={integration}
                              isConnected={false}
                              onClick={() => navigate(`/integrations/${integration.id}`)}
                            />
                          ))
                        }
                      </div>
                    ) : (
                      <IntegrationsList 
                        integrations={availableIntegrations.filter(
                          integration => !connectedIntegrations.some(ci => ci.id === integration.id)
                        )} 
                        isConnected={false}
                        onSelect={(id) => navigate(`/integrations/${id}`)}
                      />
                    )
                  )}
                </div>
              </>
            )}
            
            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
                Sobre Integrações
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Conecte-se a outras plataformas educacionais para importar seu conteúdo e progresso.
                Isso permite que você centralize seus estudos no EducaMaster AI.
              </p>
              <div className="flex items-center text-blue-700 dark:text-blue-300">
                <ExternalLink className="w-5 h-5 mr-2" />
                <a 
                  href="https://educamaster.example.com/help/integrations" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Saiba mais sobre integrações
                </a>
              </div>
            </div>
          </>
        } />
        
        <Route path="/connect" element={<ConnectIntegration />} />
        <Route path="/:integrationId" element={<IntegrationDetails />} />
      </Routes>
    </div>
  );
};

export default IntegrationsPage;