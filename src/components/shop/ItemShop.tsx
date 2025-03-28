import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'boost' | 'cosmetic' | 'consumable';
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
  inStock: boolean;
  quantity?: number;
}

interface ItemShopProps {
  items: ShopItem[];
  userBalance: number;
  onPurchase: (itemId: string) => void;
  className?: string;
}

export const ItemShop: React.FC<ItemShopProps> = ({
  items,
  userBalance,
  onPurchase,
  className = '',
}) => {
  // Agrupar itens por categoria
  const categories = {
    boost: items.filter(item => item.category === 'boost'),
    cosmetic: items.filter(item => item.category === 'cosmetic'),
    consumable: items.filter(item => item.category === 'consumable'),
  };

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Formatar preço
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR');
  };

  // Obter cor baseada na raridade
  const getRarityColor = (rarity: ShopItem['rarity']) => {
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

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Saldo do Usuário */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Loja</h2>
        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
          <span className="text-xl">💰</span>
          <span className="font-semibold text-green-800">{formatPrice(userBalance)}</span>
        </div>
      </div>

      {/* Lista de Itens por Categoria */}
      <div className="space-y-8">
        {Object.entries(categories).map(([category, categoryItems]) => (
          <div key={category}>
            {/* Título da Categoria */}
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {category === 'boost' && '⚡'}
              {category === 'cosmetic' && '🎨'}
              {category === 'consumable' && '🧪'}
              {category.charAt(0).toUpperCase() + category.slice(1)}s
            </h3>

            {/* Grid de Itens */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {categoryItems.map(item => (
                <motion.div
                  key={item.id}
                  className={`
                    relative border-2 rounded-lg p-4
                    ${getRarityColor(item.rarity)}
                    (${ ?? (() => { throw new Error('Valor não pode ser nulo') })())item.inStock && 'opacity-50'}
                  `}
                  variants={itemVariants}
                >
                  {/* Ícone e Nome */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-12 h-12 relative">
                      <Image src={item.icon} alt={item.name} layout="fill" objectFit="contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Preço e Botão de Compra */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">💰</span>
                      <span className="font-semibold">{formatPrice(item.price)}</span>
                    </div>

                    <button
                      onClick={() => onPurchase(item.id)}
                      (disabled={ ?? (() => { throw new Error('Valor não pode ser nulo') })())item.inStock || userBalance < item.price}
                      className={`
                        px-4 py-1 rounded-full text-sm font-semibold
                        ${
                          item.inStock && userBalance >= item.price
                            ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                        transition-colors duration-200
                      `}
                    >
                      ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())item.inStock ? 'Esgotado' : 'Comprar'}
                    </button>
                  </div>

                  {/* Quantidade (se aplicável) */}
                  {item.quantity !== undefined && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        x{item.quantity}
                      </span>
                    </div>
                  )}

                  {/* Indicador de Raridade */}
                  <div className="absolute bottom-2 right-2">
                    <span className="text-xs font-medium text-gray-500 capitalize">
                      {item.rarity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};