// src/hooks/useToast.js
import { useState, useEffect } from 'react';
import toastService from '../services/notifications/toastService';

const useToast = (position = 'top-right') => {
  const [toasts, setToasts] = useState([]);
  
  useEffect(() => {
    // Inscrever para receber atualizações de toasts
    const unsubscribe = toastService.subscribe(setToasts);
    
    // Cancelar inscrição ao desmontar
    return () => unsubscribe();
  }, []);
  
  // Função para remover um toast
  const handleClose = (id) => {
    toastService.removeToast(id);
  };
  
  // Componente de toast pronto para uso
  const ToastContainer = () => (
    <Toast toasts={toasts} position={position} onClose={handleClose} />
  );
  
  // Retornar o componente e os métodos do serviço
  return {
    ToastContainer,
    toast: {
      success: toastService.success,
      error: toastService.error,
      warning: toastService.warning,
      info: toastService.info,
      remove: toastService.removeToast,
      clear: toastService.clearToasts,
    },
  };
};

export default useToast;