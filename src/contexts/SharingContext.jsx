// src/contexts/SharingContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import sharingService from '../services/sharing/sharingService';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const SharingContext = createContext();

export const useSharingContext = () => {
  const context = useContext(SharingContext);
  if (!context) {
    throw new Error('useSharingContext deve ser usado dentro de um SharingProvider');
  }
  return context;
};

export const SharingProvider = ({ children }) => {
  const { user } = useAuth();
  const [isSharing, setIsSharing] = useState(false);
  const [sharedItems, setSharedItems] = useState([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentContentToShare, setCurrentContentToShare] = useState(null);
  
  /**
   * Inicia o processo de compartilhamento
   * @param {Object} content - Conteúdo a ser compartilhado
   * @param {string} contentType - Tipo do conteúdo
   */
  const initiateSharing = useCallback((content, contentType) => {
    if (!user) {
      toast.warning('Você precisa estar logado para compartilhar conteúdo.');
      return;
    }
    
    setCurrentContentToShare({ content, contentType });
    setShareModalOpen(true);
  }, [user]);
  
  /**
   * Compartilha via plataforma específica
   * @param {string} platform - Plataforma de compartilhamento
   */
  const shareViaPlatform = useCallback(async (platform) => {
    if (!currentContentToShare) {
      toast.error('Nenhum conteúdo selecionado para compartilhar.');
      return;
    }
    
    const { content, contentType } = currentContentToShare;
    setIsSharing(true);
    
    try {
      let result;
      
      switch (platform) {
        case 'link':
          result = await sharingService.shareViaLink(content, contentType);
          break;
        case 'whatsapp':
          result = await sharingService.shareViaWhatsApp(content, contentType);
          break;
        case 'facebook':
          result = await sharingService.shareViaFacebook(content, contentType);
          break;
        case 'twitter':
          result = await sharingService.shareViaTwitter(content, contentType);
          break;
        case 'email':
          result = await sharingService.shareViaEmail(content, contentType);
          break;
        default:
          throw new Error(`Plataforma de compartilhamento inválida: ${platform}`);
      }
      
      // Adiciona à lista de itens compartilhados
      if (result) {
        const newSharedItem = {
          id: content.id,
          title: content.title || 'Conteúdo sem título',
          type: contentType,
          sharedAt: new Date().toISOString(),
          platform
        };
        
        setSharedItems(prev => [newSharedItem, ...prev]);
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      toast.error('Erro ao compartilhar o conteúdo.');
    } finally {
      setIsSharing(false);
    }
  }, [currentContentToShare]);
  
  /**
   * Importa conteúdo compartilhado por outro usuário
   * @param {string} shareId - ID do compartilhamento
   * @param {string} contentType - Tipo de conteúdo
   * @returns {Promise<Object>} - Conteúdo importado
   */
  const importContent = useCallback(async (shareId, contentType) => {
    if (!user) {
      toast.warning('Você precisa estar logado para importar conteúdo.');
      return null;
    }
    
    try {
      const importedContent = await sharingService.importSharedContent(shareId, contentType);
      toast.success('Conteúdo importado com sucesso!');
      return importedContent;
    } catch (error) {
      console.error('Erro ao importar conteúdo:', error);
      toast.error('Não foi possível importar o conteúdo.');
      return null;
    }
  }, [user]);
  
  /**
   * Fecha o modal de compartilhamento
   */
  const closeShareModal = useCallback(() => {
    setShareModalOpen(false);
    setCurrentContentToShare(null);
  }, []);
  
  const value = {
    isSharing,
    sharedItems,
    shareModalOpen,
    currentContentToShare,
    initiateSharing,
    shareViaPlatform,
    importContent,
    closeShareModal
  };
  
  return (
    <SharingContext.Provider value={value}>
      {children}
    </SharingContext.Provider>
  );
};

export default SharingContext;