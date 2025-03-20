// src/components/sharing/ShareModal.jsx
import React from 'react';
import { X, Link, Send, Facebook, Twitter, Mail } from 'lucide-react';
import { useSharingContext } from '../../contexts/SharingContext';

const ShareModal = () => {
  const { 
    shareModalOpen, 
    closeShareModal, 
    currentContentToShare, 
    shareViaPlatform,
    isSharing
  } = useSharingContext();
  
  if (!shareModalOpen || !currentContentToShare) {
    return null;
  }
  
  const { content, contentType } = currentContentToShare;
  const contentTitle = content.title || 'Conteúdo sem título';
  
  // Array com as opções de compartilhamento
  const shareOptions = [
    { 
      id: 'link', 
      label: 'Copiar Link', 
      icon: <Link className="w-5 h-5" />, 
      className: 'bg-gray-600 hover:bg-gray-700'
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>, 
      className: 'bg-green-500 hover:bg-green-600'
    },
    { 
      id: 'facebook', 
      label: 'Facebook', 
      icon: <Facebook className="w-5 h-5" />, 
      className: 'bg-blue-600 hover:bg-blue-700' 
    },
    { 
      id: 'twitter', 
      label: 'Twitter/X', 
      icon: <Twitter className="w-5 h-5" />, 
      className: 'bg-black hover:bg-gray-800' 
    },
    { 
      id: 'email', 
      label: 'E-mail', 
      icon: <Mail className="w-5 h-5" />, 
      className: 'bg-purple-600 hover:bg-purple-700' 
    }
  ];
  
  const handleShare = (platform) => {
    shareViaPlatform(platform);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Compartilhar {contentType}
          </h3>
          <button
            onClick={closeShareModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            Compartilhar "{contentTitle}"
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4 sm:grid-cols-3">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleShare(option.id)}
              disabled={isSharing}
              className={`flex flex-col items-center justify-center p-4 text-white rounded-lg transition-colors ${option.className} disabled:opacity-50`}
            >
              {option.icon}
              <span className="mt-2 text-sm">{option.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Compartilhe este conteúdo com amigos para estudarem juntos!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;