// src/pages/FlashcardPage/FlashcardStudyPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Info, ArrowLeftCircle } from 'lucide-react';
import useFlashcards from '../../hooks/useFlashcards';
import { useBoss } from '../../contexts/BossContext';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import FlashcardDeck from '../../components/flashcard/FlashcardDeck';
import BossCard from '../../components/boss/BossCard';

const FlashcardStudyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados locais
  const [isFinished, setIsFinished] = useState(false);
  const [studyResults, setStudyResults] = useState(null);
  
  // Contextos
  const { 
    getDeck, 
    startStudySession, 
    recordCardResult, 
    finishStudySession 
  } = useFlashcards();
  
  const { currentBoss } = useBoss();
  
  // Estado para o deck atual
  const [deck, setDeck] = useState(null);
  
  // Carregar o deck e iniciar a sessão
  useEffect(() => {
    try {
      const loadedDeck = getDeck(id);
      setDeck(loadedDeck);
      startStudySession(id);
    } catch (error) {
      console.error('Erro ao carregar deck:', error);
      // Redirecionar em caso de erro
      navigate('/flashcards');
    }
  }, [id, getDeck, startStudySession, navigate]);
  
  // Função para marcar um card como conhecido
  const handleKnown = (cardId) => {
    recordCardResult(cardId, true);
  };
  
  // Função para marcar um card como desconhecido
  const handleUnknown = (cardId) => {
    recordCardResult(cardId, false);
  };
  
  // Função para finalizar a sessão de estudo
  const handleComplete = (results) => {
    const finalResults = finishStudySession();
    setStudyResults(finalResults);
    setIsFinished(true);
  };
  
  // Voltar para a página de flashcards
  const handleBack = () => {
    navigate('/flashcards');
  };
  
  // Função para atacar o Boss (como bônus)
  const handleAttackBoss = (damage) => {
    // Esta função é apenas para demonstração visual
    // O dano real já é aplicado pelo contexto
  };
  
  // Renderizar a tela de resultados
  if (isFinished && studyResults) {
    const { knownCards, unknownCards, totalCards, mastery } = studyResults;
    
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">Sessão de Estudo Concluída!</h2>
          <div className="mb-6">
            <div className="text-6xl font-bold text-secondary-600 mb-2">{mastery}%</div>
            <p className="text-neutral-600">Você acertou {knownCards} de {totalCards} flashcards</p>
          </div>
          
          {mastery >= 70 ? (
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
              <div className="text-2xl font-bold text-success-600">{knownCards}</div>
              <div className="text-sm text-neutral-600">Cards conhecidos</div>
            </div>
            <div className="p-3 bg-danger-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-danger-600">{unknownCards}</div>
              <div className="text-sm text-neutral-600">Cards para revisão</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setIsFinished(false);
                startStudySession(id);
              }}
            >
              Estudar novamente
            </Button>
            <Button 
              className="w-full"
              onClick={handleBack}
            >
              Voltar para Flashcards
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  // Se o deck não estiver carregado, mostrar mensagem de carregamento
  if (!deck) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-6">
          <p>Carregando flashcards...</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeftCircle className="w-4 h-4" />}
        onClick={handleBack}
      >
        Voltar para flashcards
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flashcards (coluna principal) */}
        <div className="lg:col-span-2">
          <FlashcardDeck 
            deck={deck}
            onKnown={handleKnown}
            onUnknown={handleUnknown}
            onComplete={handleComplete}
          />
        </div>
        
        {/* Boss (coluna lateral) */}
        <div className="lg:col-span-1">
          <BossCard 
            boss={currentBoss}
            onAttack={handleAttackBoss}
          />
          
          <Card className="mt-6">
            <h3 className="text-lg font-bold mb-3">Dicas de Estudo</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start">
                <span className="bg-primary-100 text-primary-700 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <span>Tente formular a resposta antes de virar o card.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-100 text-primary-700 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <span>Seja honesto ao marcar se você sabia ou não a resposta.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-100 text-primary-700 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <span>Sessões curtas e frequentes são mais eficazes do que longas e esporádicas.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary-100 text-primary-700 w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">4</span>
                <span>Revisar cards que você errou é fundamental para o aprendizado.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStudyPage;