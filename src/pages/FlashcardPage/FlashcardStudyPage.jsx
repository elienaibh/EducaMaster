// src/pages/FlashcardPage/FlashcardStudyPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, X, ThumbsUp, ThumbsDown, RotateCcw, Info, ArrowLeftCircle } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const FlashcardStudyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado para controlar os flashcards
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState([]);
  const [unknownCards, setUnknownCards] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  
  // Mock de dados do deck (em uma aplicação real, seria buscado da API)
  const deck = {
    id: id || 'deck-1',
    title: 'Biologia',
    description: 'Anatomia e fisiologia do corpo humano.',
    cards: [
      {
        id: 'card-1',
        front: 'O que é o sistema circulatório?',
        back: 'É o sistema responsável pelo transporte de sangue, nutrientes, oxigênio, dióxido de carbono e hormônios para as células do corpo.',
      },
      {
        id: 'card-2',
        front: 'Quais são as partes principais do coração humano?',
        back: 'O coração humano é dividido em quatro câmaras: dois átrios (esquerdo e direito) e dois ventrículos (esquerdo e direito).',
      },
      {
        id: 'card-3',
        front: 'O que é a fotossíntese?',
        back: 'Processo pelo qual as plantas, algas e algumas bactérias transformam a energia solar em energia química, produzindo glicose e oxigênio a partir de dióxido de carbono e água.',
      },
      {
        id: 'card-4',
        front: 'Qual é a função do DNA?',
        back: 'O DNA (ácido desoxirribonucleico) é o material genético que contém as instruções para o desenvolvimento, funcionamento, crescimento e reprodução de todos os seres vivos.',
      },
      {
        id: 'card-5',
        front: 'O que são células?',
        back: 'Células são as unidades estruturais e funcionais básicas de todos os organismos vivos. São estruturas microscópicas que contêm os elementos necessários para a vida.',
      },
    ],
    category: 'Ciências',
    mastery: 85,
  };
  
  // Virar o flashcard
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Marcar o flashcard como conhecido
  const markAsKnown = () => {
    if (!isFlipped) {
      flipCard();
      return;
    }
    
    const currentCardData = deck.cards[currentCard];
    setKnownCards([...knownCards, currentCardData.id]);
    moveToNextCard();
    setSessionScore(sessionScore + 1);
  };
  
  // Marcar o flashcard como não conhecido
  const markAsUnknown = () => {
    if (!isFlipped) {
      flipCard();
      return;
    }
    
    const currentCardData = deck.cards[currentCard];
    setUnknownCards([...unknownCards, currentCardData.id]);
    moveToNextCard();
  };
  
  // Ir para o próximo flashcard
  const moveToNextCard = () => {
    if (currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
    }
  };
  
  // Ir para o flashcard anterior
  const moveToPreviousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
      
      // Remover o card do estado conhecido/desconhecido se voltarmos
      const currentCardData = deck.cards[currentCard];
      if (knownCards.includes(currentCardData.id)) {
        setKnownCards(knownCards.filter(id => id !== currentCardData.id));
        setSessionScore(sessionScore - 1);
      } else if (unknownCards.includes(currentCardData.id)) {
        setUnknownCards(unknownCards.filter(id => id !== currentCardData.id));
      }
    }
  };
  
  // Reiniciar o estudo
  const restartStudy = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setIsFinished(false);
    setSessionScore(0);
  };
  
  // Voltar para a página de flashcards
  const goBack = () => {
    navigate('/flashcards');
  };
  
  // Calcular a pontuação da sessão
  const calculateSessionPercentage = () => {
    return Math.round((knownCards.length / deck.cards.length) * 100);
  };
  
  // Renderizar a tela de resultados
  if (isFinished) {
    const sessionPercentage = calculateSessionPercentage();
    
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sessão de Estudo Concluída!</h2>
          <div className="mb-6">
            <div className="text-6xl font-bold text-secondary-600 mb-2">{sessionPercentage}%</div>
            <p className="text-neutral-600">Você acertou {knownCards.length} de {deck.cards.length} flashcards</p>
          </div>
          
          {sessionPercentage >= 70 ? (
            <div className="bg-success-50 p-4 rounded-lg mb-6">
              <ThumbsUp className="w-8 h-8 text-success-500 mx-auto mb-2" />
              <p className="font-medium text-success-700">Excelente trabalho! Seu domínio do conteúdo está ótimo.</p>
            </div>
          ) : (
            <div className="bg-warning-50 p-4 rounded-lg mb-6">
              <Info className="w-8 h-8 text-warning-500 mx-auto mb-2" />
              <p className="font-medium text-warning-700">Continue praticando! Você pode melhorar seu domínio do conteúdo.</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-success-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-success-600">{knownCards.length}</div>
              <div className="text-sm text-neutral-600">Cards conhecidos</div>
            </div>
            <div className="p-3 bg-danger-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-danger-600">{unknownCards.length}</div>
              <div className="text-sm text-neutral-600">Cards para revisão</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={restartStudy}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Estudar novamente
            </Button>
            <Button 
              className="w-full"
              onClick={goBack}
            >
              Voltar para Flashcards
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  // Obter o flashcard atual
  const card = deck.cards[currentCard];
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          icon={<ArrowLeftCircle className="w-4 h-4" />}
          onClick={goBack}
        >
          Voltar para flashcards
        </Button>
        
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-xl font-bold text-neutral-800">{deck.title}</h1>
            <p className="text-neutral-600 text-sm">
              Clique no card para ver a resposta
            </p>
          </div>
          <Badge>{deck.category}</Badge>
        </div>
        <ProgressBar value={(currentCard / deck.cards.length) * 100} max={100} color="secondary" />
        <div className="flex justify-between text-sm text-neutral-500 mt-1">
          <span>Card {currentCard + 1} de {deck.cards.length}</span>
          <span>{Math.round((currentCard / deck.cards.length) * 100)}% concluído</span>
        </div>
      </div>
      
      {/* Flashcard */}
      <div 
        className={`w-full h-64 rounded-xl shadow-lg transition-all duration-500 cursor-pointer perspective-1000 mb-6 ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={flipCard}
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d' }}>
          {/* Frente do card */}
          <div 
            className={`absolute w-full h-full bg-white rounded-xl p-6 flex items-center justify-center backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-neutral-800">{card.front}</h2>
              <p className="text-sm text-neutral-500 mt-4">Clique para ver a resposta</p>
            </div>
          </div>
          
          {/* Verso do card */}
          <div 
            className={`absolute w-full h-full bg-secondary-50 rounded-xl p-6 flex items-center justify-center backface-hidden rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-center">
              <p className="text-lg text-neutral-800">{card.back}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ações */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={moveToPreviousCard}
          disabled={currentCard === 0}
        >
          Anterior
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-danger-500 text-danger-500 hover:bg-danger-50" 
            icon={<X className="w-4 h-4" />}
            onClick={markAsUnknown}
          >
            Não sei
          </Button>
          <Button 
            className="bg-success-500 hover:bg-success-600" 
            icon={<Check className="w-4 h-4" />}
            onClick={markAsKnown}
          >
            Sei
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={moveToNextCard}
        >
          Pular
        </Button>
      </div>
    </div>
  );
};

export default FlashcardStudyPage;