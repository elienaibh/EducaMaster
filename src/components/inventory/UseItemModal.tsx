import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface UseItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemDescription: string;
  itemIcon: string;
  itemType: 'boost' | 'consumable';
  itemRarity: 'comum' | 'raro' | 'épico' | 'lendário';
  itemQuantity: number;
  className?: string;
}

export const UseItemModal: React.FC<UseItemModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemDescription,
  itemIcon,
  itemType,
  itemRarity,
  itemQuantity,
  className = '',
}) => {
  // Obter cor baseada na raridade
  const getRarityColor = () => {
    switch (itemRarity) {
      case 'comum':
        return 'border-gray-200 bg-gray-50';
      case 'raro':
        return 'border-blue-200 bg-blue-50';
      case 'épico':
        return 'border-purple-200 bg-purple-50';
      case 'lendário':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  // Animações
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Cabeçalho */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-6">Usar Item</h2>

              {/* Item */}
              <div className={`border-2 rounded-lg p-4 ${getRarityColor()}`}>
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image src={itemIcon} alt={itemName} layout="fill" objectFit="contain" />
                  </div>

                  {/* Informações */}
                  <div>
                    <h3 className="font-semibold text-lg">{itemName}</h3>
                    <p className="text-gray-600 mb-2">{itemDescription}</p>
                    <div className="flex items-center gap-4">
                      {/* Tipo */}
                      <span
                        className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${
                          itemType === 'boost'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }
                      `}
                      >
                        {itemType.toUpperCase()}
                      </span>

                      {/* Quantidade */}
                      <span className="text-sm text-gray-500">Quantidade: {itemQuantity}</span>

                      {/* Raridade */}
                      <span className="text-sm text-gray-500 capitalize">{itemRarity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensagem de Confirmação */}
              <p className="text-center text-gray-600 mt-6">
                Tem certeza que deseja usar este item?
                {itemType === 'consumable' && ' Este item será consumido após o uso.'}
              </p>
            </div>

            {/* Botões */}
            <div className="border-t border-gray-200 p-4 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
              >
                Usar Item
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
