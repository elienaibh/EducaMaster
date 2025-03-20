// src/components/offline/OfflineAlert.jsx
import React, { useState, useEffect } from 'react';
import { WifiOff, X } from 'lucide-react';
import { useOfflineContext } from '../../contexts/OfflineContext';

/**
 * Alerta que aparece quando o aplicativo está offline
 */
const OfflineAlert = () => {
  const { isOnline } = useOfflineContext();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  // Controla a visibilidade do alerta com base no status online/offline
  useEffect(() => {
    if (!isOnline) {
      // Quando fica offline, mostra o alerta com um pequeno delay
      const timer = setTimeout(() => {
        setVisible(true);
        setDismissed(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      // Quando fica online novamente, esconde o alerta
      setVisible(false);
    }
  }, [isOnline]);

  // Se estiver online ou o alerta foi dispensado, não mostra nada
  if (isOnline || dismissed || !visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg mx-2 md:mx-0 dark:bg-red-900/40 dark:text-red-200 dark:border-red-500">
        <div className="flex">
          <div className="flex-shrink-0">
            <WifiOff className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-medium">
              Você está offline
            </div>
            <div className="text-xs mt-1">
              Você ainda pode usar o aplicativo, mas algumas funcionalidades podem estar limitadas.
              Suas alterações serão sincronizadas quando a conexão for restabelecida.
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineAlert;