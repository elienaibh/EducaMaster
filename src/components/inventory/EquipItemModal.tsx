import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface EquipItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemDescription: string;
  itemIcon: string;
  itemRarity: 'comum' | 'raro' | 'épico' | 'lendário';
  currentEquippedItem?: {
    name: string;
    icon: string;
    rarity: 'comum' | 'raro' | 'épico' | 'lendário';
  };
  className?: string;
}

export const EquipItemModal: React.FC<EquipItemModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemDescription,
  itemIcon,
  itemRarity,
  currentEquippedItem,
  className = '',
}) => {
  // Obter cor baseada na raridade
  const getRarityColor = (rarity: 'comum' | 'raro' | 'épico' | 'lendário') => {
    switch (rarity) {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
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
              <h2 className="text-2xl font-bold text-center mb-6">Equipar Item</h2>

              {/* Item a ser equipado */}
              <motion.div
                className={`border-2 rounded-lg p-4 ${getRarityColor(itemRarity)}`}
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image src={itemIcon} alt={itemName} layout="fill" objectFit="contain" />
                  </div>

                  {/* Informações */}
                  <div>
                    <h3 className="font-semibold text-lg">{itemName}</h3>
                    <p className="text-gray-600 mb-2">{itemDescription}</p>
                    <span className="text-sm text-gray-500 capitalize">{itemRarity}</span>
                  </div>
                </div>
              </motion.div>

              {/* Item atualmente equipado */}
              {currentEquippedItem && (
                <>
                  <div className="my-4 flex items-center">
                    <div className="flex-grow border-t border-gray-200" />
                    <span className="px-4 text-sm text-gray-500">Item Atualmente Equipado</span>
                    <div className="flex-grow border-t border-gray-200" />
                  </div>

                  <motion.div
                    className={`border-2 rounded-lg p-4 ${getRarityColor(currentEquippedItem.rarity)}`}
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-4">
                      {/* Ícone */}
                      <div className="flex-shrink-0 w-12 h-12 relative">
                        <Image
                          src={currentEquippedItem.icon}
                          alt={currentEquippedItem.name}
                          layout="fill"
                          objectFit="contain"
                          className="opacity-75"
                        />
                      </div>

                      {/* Informações */}
                      <div>
                        <h3 className="font-medium text-gray-600">{currentEquippedItem.name}</h3>
                        <span className="text-sm text-gray-500 capitalize">
                          {currentEquippedItem.rarity}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <p className="text-center text-gray-600 mt-4">
                    Este item será desequipado ao equipar o novo item
                  </p>
                </>
              )}
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
                Equipar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
