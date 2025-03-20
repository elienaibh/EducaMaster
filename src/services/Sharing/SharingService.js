// src/services/sharing/sharingService.js
import { toast } from 'react-toastify';

/**
 * Serviço responsável pelo compartilhamento de conteúdo da plataforma
 */
const sharingService = {
  /**
   * Compartilha conteúdo via link direto
   * @param {Object} content - Conteúdo a ser compartilhado
   * @param {string} contentType - Tipo de conteúdo (quiz, flashcard, achievement, etc)
   * @returns {Promise<string>} - URL para compartilhamento
   */
  shareViaLink: async (content, contentType) => {
    try {
      // No futuro, isso pode ser uma requisição para uma API que gera links curtos
      const baseUrl = window.location.origin;
      const shareId = content.id || Math.random().toString(36).substring(2, 9);
      
      const shareUrl = `${baseUrl}/share/${contentType}/${shareId}`;
      
      // Copiar para a área de transferência
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copiado para a área de transferência!');
      
      return shareUrl;
    } catch (error) {
      console.error('Erro ao compartilhar via link:', error);
      toast.error('Não foi possível gerar o link de compartilhamento.');
      throw error;
    }
  },
  
  /**
   * Compartilha conteúdo no WhatsApp
   * @param {Object} content - Conteúdo a ser compartilhado
   * @param {string} contentType - Tipo de conteúdo
   * @returns {Promise<boolean>} - Sucesso do compartilhamento
   */
  shareViaWhatsApp: async (content, contentType) => {
    try {
      const shareUrl = await sharingService.shareViaLink(content, contentType);
      const contentTitle = content.title || 'conteúdo';
      const message = `Confira este ${contentType} "${contentTitle}" no EducaMaster AI: ${shareUrl}`;
      
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
      return true;
    } catch (error) {
      console.error('Erro ao compartilhar no WhatsApp:', error);
      toast.error('Não foi possível compartilhar no WhatsApp.');
      throw error;
    }
  },
  
  /**
   * Compartilha conteúdo no Facebook
   * @param {Object} content - Conteúdo a ser compartilhado
   * @param {string} contentType - Tipo de conteúdo
   * @returns {Promise<boolean>} - Sucesso do compartilhamento
   */
  shareViaFacebook: async (content, contentType) => {
    try {
      const shareUrl = await sharingService.shareViaLink(content, contentType);
      
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      return true;
    } catch (error) {
      console.error('Erro ao compartilhar no Facebook:', error);
      toast.error('Não foi possível compartilhar no Facebook.');
      throw error;
    }
  },
  
  /**
   * Compartilha conteúdo no Twitter/X
   * @param {Object} content - Conteúdo a ser compartilhado
   * @param {string} contentType - Tipo de conteúdo
   * @returns {Promise<boolean>} - Sucesso do compartilhamento
   */
  shareViaTwitter: async (content, contentType) => {
    try {
      const shareUrl = await sharingService.shareViaLink(content, contentType);
      const contentTitle = content.title || 'conteúdo';
      const message = `Confira este ${contentType} "${contentTitle}" no EducaMaster AI: ${shareUrl}`;
      
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
      return true;
    } catch (error) {
      console.error('Erro ao compartilhar no Twitter/X:', error);
      toast.error('Não foi possível compartilhar no Twitter/X.');
      throw error;
    }
  },
  
  /**
   * Compartilha conteúdo por e-mail
   * @param {Object} content - Conteúdo a ser compartilhado
   * @param {string} contentType - Tipo de conteúdo
   * @returns {Promise<boolean>} - Sucesso do compartilhamento
   */
  shareViaEmail: async (content, contentType) => {
    try {
      const shareUrl = await sharingService.shareViaLink(content, contentType);
      const contentTitle = content.title || 'conteúdo';
      const subject = `Compartilhamento de ${contentType} no EducaMaster AI`;
      const body = `Olá,\n\nGostaria de compartilhar este ${contentType} "${contentTitle}" no EducaMaster AI: ${shareUrl}\n\nAproveite!`;
      
      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
      return true;
    } catch (error) {
      console.error('Erro ao compartilhar por e-mail:', error);
      toast.error('Não foi possível compartilhar por e-mail.');
      throw error;
    }
  },
  
  /**
   * Importa conteúdo compartilhado por outro usuário
   * @param {string} shareId - ID do compartilhamento
   * @param {string} contentType - Tipo de conteúdo
   * @returns {Promise<Object>} - Conteúdo importado
   */
  importSharedContent: async (shareId, contentType) => {
    try {
      // Simulação - Isso seria uma requisição à API
      // return await api.get(`/share/${contentType}/${shareId}`);
      
      // Mock para desenvolvimento
      return {
        id: shareId,
        title: `${contentType} compartilhado`,
        imported: true,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao importar conteúdo compartilhado:', error);
      toast.error('Não foi possível importar o conteúdo compartilhado.');
      throw error;
    }
  }
};

export default sharingService;