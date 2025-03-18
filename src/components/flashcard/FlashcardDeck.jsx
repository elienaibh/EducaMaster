// src/components/flashcard/FlashcardDeck.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import FlashcardItem from './FlashcardItem';
import ProgressBar from '../ui/ProgressBar';

const FlashcardDeck = ({ 
  deck, 
  onComplete, 
  onKnown, 
  onUnknown 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCards, setKnownCards] = useState([]);
  const [unknownCards, setUnknownCards] = useState([]);
  
  // Verificar se existem cards para estudar
  if (!deck || !deck.cards || deck.cards.length === 0) {
    return (
      <div className="text-center p-8 bg-neutral-50 rounded-lg">
        <p className="text-lg text-neutral-600">Este deck não possui flashcards.</p>
        <Button className="mt-4">Voltar para decks</Button>
      </div>
    );
  }
  
  const totalCards = deck.cards.length;
  const currentCard = deck.cards[currentIndex];
  const progress = Math.round(((knownCards.length + unknownCards.length) / totalCards) * 100);
  
  // Ir para o card anterior
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Ir para o próximo card
  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (knownCards.length + unknownCards.length === totalCards) {
      // Se todos os cards foram vistos, finalizar o estudo
      handleComplete();
    }
  };
  
  // Marcar o card atual como conhecido
  const handleKnown = (cardId) => {
    if (!knownCards.includes(cardId)) {
      setKnownCards([...knownCards, cardId]);
    }
    
    if (onKnown) {
      onKnown(cardId);
    }
    
    // Avançar para o próximo card automaticamente
    setTimeout(handleNext, 500);
  };
  
  // Marcar o card atual como desconhecido
  const handleUnknown = (cardId) => {
    if (!unknownCards.includes(cardId)) {
      setUnknownCards([...unknownCards, cardId]);
    }
    
    if (onUnknown) {
      onUnknown(cardId);
    }
    
    // Avançar para o próximo card automaticamente
    setTimeout(handleNext, 500);
  };
  
  // Finalizar o estudo
  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        deckId: deck.id,
        totalCards,
        knownCards: knownCards.length,
        unknownCards: unknownCards.length,
        mastery: Math.round((knownCards.length / totalCards) * 100)
      });
    }
  };
  
  // Reiniciar o estudo
  const handleReset = () => {
    setCurrentIndex(0);
    setKnownCards([]);
    setUnknownCards([]);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-neutral-800">{deck.title}</h2>
          <div className="text-sm text-neutral-600">
            Card {currentIndex + 1} de {totalCards}
          </div>
        </div>
        
        <ProgressBar 
          value={progress} 
          max={100} 
          color="secondary"
          height="h-2"
          className="mb-2"
        />
        
        <div className="flex justify-between text-sm text-neutral-500">
          <span>Progresso: {progress}%</span>
          <span>
            <span className="text-success-600">{knownCards.length}</span> corretos / 
            <span className="text-danger-600"> {unknownCards.length}</span> incorretos
          </span>
        </div>
      </div>
      
      {/* Container do flashcard com AnimatePresence para transições */}
      <div className="relative mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FlashcardItem 
              card={currentCard} 
              onKnown={() => handleKnown(currentCard.id)} 
              onUnknown={() => handleUnknown(currentCard.id)} 
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Controles de navegação */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Anterior
        </Button>
        
        <Button 
          variant="outline" 
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={handleReset}
        >
          Reiniciar
        </Button>
        
        <Button 
          variant="outline" 
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1 && knownCards.length + unknownCards.length === totalCards}
        >
          {currentIndex < totalCards - 1 ? 'Próximo' : 'Finalizar'}
        </Button>
      </div>
    </div>
  );
};

export default FlashcardDeck;