import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemDescription: string;
  itemIcon: string;
  itemPrice: number;
  itemCategory: 'boost' | 'cosmetic' | 'consumable';
  itemRarity: 'comum' | 'raro' | 'épico' | 'lendário';
  userBalance: number;
  className?: string;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemDescription,
  itemIcon,
  itemPrice,
  itemCategory,
  itemRarity,
  userBalance,
  className = '',
}) => {
  // Verificar se o usuário tem saldo suficiente
  const canPurchase = userBalance >= itemPrice;

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

  // Formatar preço
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR');
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
              <h2 className="text-2xl font-bold text-center mb-6">Confirmar Compra</h2>

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
                      {/* Categoria */}
                      <span
                        className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${
                          itemCategory === 'boost'
                            ? 'bg-blue-100 text-blue-800'
                            : itemCategory === 'cosmetic'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                        }
                      `}
                      >
                        {itemCategory.toUpperCase()}
                      </span>

                      {/* Raridade */}
                      <span className="text-sm text-gray-500 capitalize">{itemRarity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preço e Saldo */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Preço:</span>
                  <span className="font-semibold">💰 {formatPrice(itemPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Seu Saldo:</span>
                  (<span className={`font-semibold ${ ?? (() => { throw new Error('Valor não pode ser nulo') })())canPurchase && 'text-red-500'}`}>
                    💰 {formatPrice(userBalance)}
                  </span>
                </div>
                ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())canPurchase && (
                  <p className="text-red-500 text-sm text-center">
                    Saldo insuficiente para realizar a compra
                  </p>
                )}
              </div>
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
                (disabled={ ?? (() => { throw new Error('Valor não pode ser nulo') })())canPurchase}
                className={`
                  px-6 py-2 rounded-full font-semibold
                  ${
                    canPurchase
                      ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                  transition-colors duration-200
                `}
              >
                Comprar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};