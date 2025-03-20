// src/contexts/IntegrationContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import integrationService from '../services/integrations/integrationService';
import { useAuth } from './AuthContext';

// Criar o contexto
const IntegrationContext = createContext();

// Hook para usar o contexto
export const useIntegrationContext = () => {
  const context = useContext(IntegrationContext);
  if (!context) {
    throw new Error('useIntegrationContext deve ser usado dentro de um IntegrationProvider');
  }
  return context;
};

// Provider do contexto
export const IntegrationProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Estado para armazenar as integrações disponíveis
  const [availableIntegrations, setAvailableIntegrations] = useState([]);
  
  // Estado para armazenar as integrações conectadas pelo usuário
  const [userIntegrations, setUserIntegrations] = useState([]);
  
  // Estado para controlar carregamentos
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para rastrear sincronizações em andamento
  const [syncingIntegrations, setSyncingIntegrations] = useState({});

  // Busca integrações disponíveis
  const fetchAvailableIntegrations = useCallback(async () => {
    try {
      setIsLoading(true);
      const integrations = await integrationService.getAvailableIntegrations();
      setAvailableIntegrations(integrations);
      return integrations;
    } catch (error) {
      console.error('Erro ao buscar integrações disponíveis:', error);
      toast.error('Não foi possível carregar as integrações disponíveis');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Busca integrações do usuário
  const fetchUserIntegrations = useCallback(async () => {
    if (!user) return [];
    
    try {
      setIsLoading(true);
      const integrations = await integrationService.getUserIntegrations();
      setUserIntegrations(integrations);
      return integrations;
    } catch (error) {
      console.error('Erro ao buscar integrações do usuário:', error);
      toast.error('Não foi possível carregar suas integrações conectadas');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Inicia o processo de autenticação
  const connectIntegration = useCallback(async (integrationId) => {
    if (!user) {
      toast.warning('Você precisa estar logado para conectar uma integração');
      return null;
    }
    
    try {
      setIsLoading(true);
      const authUrl = await integrationService.initiateAuth(integrationId);
      
      // Verifica se a autenticação é personalizada (como Moodle)
      const integration = availableIntegrations.find(i => i.id === integrationId);
      if (integration && integration.authUrl === 'custom') {
        // Implementar lógica para autenticação customizada
        toast.info('Esta integração requer configuração adicional.');
      }
      
      return authUrl;
    } catch (error) {
      console.error(`Erro ao conectar com ${integrationId}:`, error);
      toast.error(`Não foi possível iniciar a conexão com ${integrationId}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, availableIntegrations]);

  // Finaliza o processo de autenticação
  const completeIntegrationAuth = useCallback(async (integrationId, authCode) => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      const result = await integrationService.completeAuth(integrationId, authCode);
      
      // Atualiza a lista de integrações do usuário
      await fetchUserIntegrations();
      
      toast.success(`Integração com ${integrationId} conectada com sucesso!`);
      return result;
    } catch (error) {
      console.error(`Erro ao completar autenticação com ${integrationId}:`, error);
      toast.error(`Não foi possível concluir a conexão com ${integrationId}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, fetchUserIntegrations]);

  // Desconecta uma integração
  const disconnectIntegration = useCallback(async (integrationId) => {
    if (!user) return false;
    
    try {
      setIsLoading(true);
      await integrationService.disconnectIntegration(integrationId);
      
      // Atualiza a lista de integrações do usuário
      setUserIntegrations(prev => prev.filter(i => i.id !== integrationId));
      
      toast.success(`Integração com ${integrationId} desconectada com sucesso`);
      return true;
    } catch (error) {
      console.error(`Erro ao desconectar ${integrationId}:`, error);
      toast.error(`Não foi possível desconectar a integração com ${integrationId}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Importa dados de uma integração
  const importFromIntegration = useCallback(async (integrationId, dataType) => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      const result = await integrationService.importData(integrationId, dataType);
      
      if (result.imported) {
        toast.success(`${result.count} ${dataType} importados de ${integrationId}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Erro ao importar ${dataType} de ${integrationId}:`, error);
      toast.error(`Não foi possível importar ${dataType} de ${integrationId}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Exporta dados para uma integração
  const exportToIntegration = useCallback(async (integrationId, dataType, items) => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      const result = await integrationService.exportData(integrationId, dataType, items);
      
      if (result.exported) {
        toast.success(`${result.count} ${dataType} exportados para ${integrationId}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Erro ao exportar ${dataType} para ${integrationId}:`, error);
      toast.error(`Não foi possível exportar ${dataType} para ${integrationId}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Sincroniza dados com uma integração
  const syncIntegration = useCallback(async (integrationId) => {
    if (!user) return null;
    
    // Verifica se já está sincronizando
    if (syncingIntegrations[integrationId]) {
      toast.info(`Sincronização com ${integrationId} já está em andamento`);
      return null;
    }
    
    try {
      // Marca como sincronizando
      setSyncingIntegrations(prev => ({ ...prev, [integrationId]: true }));
      
      const result = await integrationService.syncIntegration(integrationId);
      
      if (result.success) {
        toast.success(`Sincronização com ${integrationId} concluída com sucesso`);
        
        // Atualiza a data da última sincronização
        setUserIntegrations(prev => 
          prev.map(i => 
            i.id === integrationId 
              ? { ...i, lastSync: result.lastSync } 
              : i
          )
        );
      }
      
      return result;
    } catch (error) {
      console.error(`Erro ao sincronizar com ${integrationId}:`, error);
      toast.error(`Não foi possível sincronizar com ${integrationId}`);
      return null;
    } finally {
      // Remove o status de sincronização
      setSyncingIntegrations(prev => ({ ...prev, [integrationId]: false }));
    }
  }, [user, syncingIntegrations]);

  // Verifica se uma integração está conectada
  const isIntegrationConnected = useCallback((integrationId) => {
    return userIntegrations.some(i => i.id === integrationId && i.status === 'connected');
  }, [userIntegrations]);

  // Busca informações de uma integração
  const getIntegrationInfo = useCallback((integrationId) => {
    const userIntegration = userIntegrations.find(i => i.id === integrationId);
    const availableIntegration = availableIntegrations.find(i => i.id === integrationId);
    
    return {
      ...availableIntegration,
      ...userIntegration
    };
  }, [userIntegrations, availableIntegrations]);

  // Busca integrações quando o componente é montado ou o usuário muda
  useEffect(() => {
    fetchAvailableIntegrations();
    
    if (user) {
      fetchUserIntegrations();
    } else {
      setUserIntegrations([]);
    }
  }, [user, fetchAvailableIntegrations, fetchUserIntegrations]);

  // Objeto com o valor do contexto
  const value = {
    availableIntegrations,
    userIntegrations,
    isLoading,
    syncingIntegrations,
    connectIntegration,
    completeIntegrationAuth,
    disconnectIntegration,
    importFromIntegration,
    exportToIntegration,
    syncIntegration,
    isIntegrationConnected,
    getIntegrationInfo,
    refreshIntegrations: fetchUserIntegrations
  };

  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
};

export default IntegrationContext;