import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'boost' | 'cosmetic' | 'consumable';
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
  quantity: number;
  isEquipped?: boolean;
  isActive?: boolean;
  duration?: number;
}

interface UserInventoryProps {
  items: InventoryItem[];
  onUseItem: (itemId: string) => void;
  onEquipItem?: (itemId: string) => void;
  className?: string;
}

export const UserInventory: React.FC<UserInventoryProps> = ({
  items,
  onUseItem,
  onEquipItem,
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

  // Obter cor baseada na raridade
  const getRarityColor = (rarity: InventoryItem['rarity']) => {
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

  // Formatar duração
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Inventário</h2>

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
                    ${item.isActive && 'ring-2 ring-green-500'}
                  `}
                  variants={itemVariants}
                >
                  {/* Ícone e Nome */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-12 h-12 relative">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        layout="fill"
                        objectFit="contain"
                        className={item.isEquipped ? 'filter drop-shadow-lg' : ''}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center justify-between mt-4">
                    {/* Quantidade */}
                    <div className="flex items-center gap-1">
                      <span className="text-sm">📦</span>
                      <span className="font-semibold">x{item.quantity}</span>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-2">
                      {item.category === 'cosmetic' && onEquipItem && (
                        <button
                          onClick={() => onEquipItem(item.id)}
                          className={`
                            px-4 py-1 rounded-full text-sm font-semibold
                            ${
                              item.isEquipped
                                ? 'bg-gray-500 text-white'
                                : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                            }
                            transition-colors duration-200
                          `}
                        >
                          {item.isEquipped ? 'Equipado' : 'Equipar'}
                        </button>
                      )}

                      {(item.category === 'boost' || item.category === 'consumable') && (
                        <button
                          onClick={() => onUseItem(item.id)}
                          disabled={item.isActive || item.quantity === 0}
                          className={`
                            px-4 py-1 rounded-full text-sm font-semibold
                            ${
                              ( ?? (() => { throw new Error('Valor não pode ser nulo') })())item.isActive && item.quantity > 0
                                ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }
                            transition-colors duration-200
                          `}
                        >
                          {item.isActive ? 'Ativo' : 'Usar'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Duração Restante (se ativo) */}
                  {item.isActive && item.duration !== undefined && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {formatDuration(item.duration)}
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

            {categoryItems.length === 0 && (
              <div className="text-center text-gray-500 py-8">Nenhum item nesta categoria</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};