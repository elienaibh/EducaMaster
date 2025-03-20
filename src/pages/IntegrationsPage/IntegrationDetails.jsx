// src/pages/IntegrationsPage/IntegrationDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RefreshCw,
  Link2,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  User
} from 'lucide-react';
import { useIntegrationContext } from '../../contexts/IntegrationContext';

/**
 * Página de detalhes de uma integração
 */
const IntegrationDetails = () => {
  const { integrationId } = useParams();
  const navigate = useNavigate();
  const { 
    availableIntegrations,
    userIntegrations,
    syncingIntegrations,
    isLoading,
    connectIntegration,
    disconnectIntegration,
    syncIntegration,
    importFromIntegration,
    isIntegrationConnected
  } = useIntegrationContext();
  
  // Estados locais
  const [importingType, setImportingType] = useState(null);
  const [expandedSection, setExpandedSection] = useState('about');
  
  // Busca a integração selecionada
  const integration = availableIntegrations.find(i => i.id === integrationId);
  const userIntegration = userIntegrations.find(i => i.id === integrationId);
  const isConnected = isIntegrationConnected(integrationId);
  const isSyncing = syncingIntegrations[integrationId] || false;
  
  // Se não encontrar a integração, volta para a lista
  if (!integration && !isLoading) {
    return null;
  }
  
  // Formata a data da última sincronização
  const formatLastSync = (lastSyncDate) => {
    if (!lastSyncDate) return 'Nunca';
    
    const date = new Date(lastSyncDate);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Conecta com a integração
  const handleConnect = async () => {
    await connectIntegration(integrationId);
  };
  
  // Desconecta a integração
  const handleDisconnect = async () => {
    if (window.confirm(`Tem certeza que deseja desconectar ${integration.name}? Isso não afetará os dados já importados.`)) {
      await disconnectIntegration(integrationId);
      navigate('/integrations');
    }
  };
  
  // Sincroniza a integração
  const handleSync = async () => {
    await syncIntegration(integrationId);
  };
  
  // Importa dados da integração
  const handleImport = async (dataType) => {
    setImportingType(dataType);
    try {
      await importFromIntegration(integrationId, dataType);
    } finally {
      setImportingType(null);
    }
  };
  
  // Carregando
  if (isLoading || !integration) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <button
        onClick={() => navigate('/integrations')}
        className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Integrações
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-14 w-14 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300">
                {integration.name.substring(0, 2)}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {integration.name}
                </h1>
                <div className="flex items-center mt-1">
                  {isConnected ? (
                    <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Conectado
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Link2 className="w-4 h-4 mr-1" />
                      Não conectado
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              {isConnected ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      isSyncing
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
                  </button>
                  
                  <button
                    onClick={handleDisconnect}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Desconectar
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  disabled={integration.status !== 'available'}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    integration.status !== 'available'
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Conectar
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Corpo */}
        <div className="p-6">
          {/* Abas de navegação */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setExpandedSection('about')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  expandedSection === 'about'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Sobre
              </button>
              
              {isConnected && (
                <>
                  <button
                    onClick={() => setExpandedSection('account')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                      expandedSection === 'account'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Conta Conectada
                  </button>
                  
                  <button
                    onClick={() => setExpandedSection('data')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                      expandedSection === 'data'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Dados e Sincronização
                  </button>
                </>
              )}
            </nav>
          </div>
          
          {/* Seção: Sobre */}
          {expandedSection === 'about' && (
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {integration.description}
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Recursos
              </h3>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {integration.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {integration.status === 'coming-soon' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-md mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Esta integração estará disponível em breve. Estamos trabalhando para disponibilizá-la o mais rápido possível.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Seção: Conta Conectada */}
          {expandedSection === 'account' && isConnected && userIntegration && (
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {userIntegration.accountInfo?.name || 'Usuário Conectado'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {userIntegration.accountInfo?.email || ''}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Conectado em {new Date(userIntegration.connectedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Detalhes da Conexão
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status da conexão
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {userIntegration.status === 'connected' ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Última sincronização
                  </p>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatLastSync(userIntegration.lastSync)}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Seção: Dados e Sincronização */}
          {expandedSection === 'data' && isConnected && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Importar Dados
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {integration.features?.includes('Import Courses') && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">Cursos</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Importe seus cursos do {integration.name}
                    </p>
                    <button
                      onClick={() => handleImport('courses')}
                      disabled={importingType === 'courses'}
                      className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                        importingType === 'courses'
                          ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Download className={`w-4 h-4 mr-2 ${importingType === 'courses' ? 'animate-pulse' : ''}`} />
                      {importingType === 'courses' ? 'Importando...' : 'Importar Cursos'}
                    </button>
                  </div>
                )}
                
                {integration.features?.includes('Import Flashcards') && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">Flashcards</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Importe seus flashcards do {integration.name}
                    </p>
                    <button
                      onClick={() => handleImport('flashcards')}
                      disabled={importingType === 'flashcards'}
                      className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                        importingType === 'flashcards'
                          ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Download className={`w-4 h-4 mr-2 ${importingType === 'flashcards' ? 'animate-pulse' : ''}`} />
                      {importingType === 'flashcards' ? 'Importando...' : 'Importar Flashcards'}
                    </button>
                  </div>
                )}
                
                {integration.features?.includes('Import Progress') && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">Progresso</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Importe seu progresso do {integration.name}
                    </p>
                    <button
                      onClick={() => handleImport('progress')}
                      disabled={importingType === 'progress'}
                      className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                        importingType === 'progress'
                          ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Download className={`w-4 h-4 mr-2 ${importingType === 'progress' ? 'animate-pulse' : ''}`} />
                      {importingType === 'progress' ? 'Importando...' : 'Importar Progresso'}
                    </button>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Sincronização Automática
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Configure como e quando seus dados serão sincronizados automaticamente entre o EducaMaster AI e {integration.name}.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">Sincronização diária</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sincronize automaticamente uma vez por dia
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        name="autoSync"
                        id="autoSync"
                        className="sr-only"
                        defaultChecked={true}
                      />
                      <div className="block h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-12"></div>
                      <div className="dot absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition transform translate-x-6"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">Sincronização ao iniciar</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sincronize ao abrir o EducaMaster AI
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        name="startupSync"
                        id="startupSync"
                        className="sr-only"
                        defaultChecked={false}
                      />
                      <div className="block h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-12"></div>
                      <div className="dot absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationDetails;