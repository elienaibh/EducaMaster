// src/components/flashcard/FlashcardItem.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import Button from '../ui/Button';

const FlashcardItem = ({ 
  card, 
  onKnown, 
  onUnknown, 
  showActions = true,
  className = '' 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Função para virar o flashcard
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Marcar como conhecido
  const handleKnown = (e) => {
    e.stopPropagation(); // Evitar que vire o card novamente
    onKnown(card.id);
  };
  
  // Marcar como desconhecido
  const handleUnknown = (e) => {
    e.stopPropagation(); // Evitar que vire o card novamente
    onUnknown(card.id);
  };
  
  // Animações do card
  const cardVariants = {
    front: { 
      rotateY: 0,
      transition: { duration: 0.4 }
    },
    back: { 
      rotateY: 180,
      transition: { duration: 0.4 }
    }
  };
  
  // Animação do conteúdo (para manter o texto legível)
  const contentVariants = {
    front: { 
      rotateY: 0,
      transition: { duration: 0.4 }
    },
    back: { 
      rotateY: 180,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className={`relative w-full h-64 ${className}`}>
      <motion.div 
        className="w-full h-full rounded-lg shadow-lg cursor-pointer perspective-1000"
        onClick={flipCard}
        animate={isFlipped ? "back" : "front"}
        variants={cardVariants}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Frente do card */}
        <motion.div 
          className="absolute w-full h-full bg-white rounded-lg p-6 flex items-center justify-center backface-hidden"
          animate={isFlipped ? "back" : "front"}
          variants={contentVariants}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-800">{card.front}</h3>
            <p className="text-sm text-neutral-500 mt-4">Clique para ver a resposta</p>
          </div>
        </motion.div>
        
        {/* Verso do card */}
        <motion.div 
          className="absolute w-full h-full bg-secondary-50 rounded-lg p-6 flex flex-col justify-between backface-hidden"
          initial={{ rotateY: 180 }}
          animate={isFlipped ? "front" : "back"}
          variants={contentVariants}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg text-neutral-800">{card.back}</p>
          </div>
          
          {showActions && (
            <div className="flex justify-center gap-3 mt-4">
              <Button 
                variant="outline" 
                className="border-danger-500 text-danger-500 hover:bg-danger-50" 
                icon={<X className="w-4 h-4" />}
                onClick={handleUnknown}
              >
                Não sei
              </Button>
              <Button 
                className="bg-success-500 hover:bg-success-600" 
                icon={<Check className="w-4 h-4" />}
                onClick={handleKnown}
              >
                Sei
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlashcardItem;