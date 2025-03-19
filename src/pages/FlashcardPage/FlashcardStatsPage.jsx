// src/pages/FlashcardPage/FlashcardStatsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, Clock, Star, Brain, Award } from 'lucide-react';
import useFlashcards from '../../hooks/useFlashcards';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const FlashcardStatsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDeck } = useFlashcards();
  
  // Estados
  const [deck, setDeck] = useState(null);
  const [stats, setStats] = useState({
    totalCards: 0,
    cardsToReview: 0,
    masteryLevel: 0,
    averageDifficulty: 0,
    studyTime: 0,
    lastStudied: null,
    studyHistory: [],
  });
  
  // Carregar o deck
  useEffect(() => {
    try {
      const loadedDeck = getDeck(id);
      setDeck(loadedDeck);
      
      // Calcular estatísticas
      const totalCards = loadedDeck.cards.length;
      const cardsToReview = loadedDeck.cards.filter(card => {
        const nextReview = new Date(card.nextReview);
        return nextReview <= new Date();
      }).length;
      
      const masteryLevel = loadedDeck.mastery || 0;
      
      const totalDifficulty = loadedDeck.cards.reduce((sum, card) => sum + card.difficulty, 0);
      const averageDifficulty = totalCards > 0 ? (totalDifficulty / totalCards).toFixed(1) : 0;
      
      // Gerar dados fictícios para o histórico de estudo (em uma aplicação real, viriam do banco de dados)
      const studyHistory = generateMockStudyHistory();
      
      setStats({
        totalCards,
        cardsToReview,
        masteryLevel,
        averageDifficulty,
        studyTime: 120, // Tempo total em minutos (fictício)
        lastStudied: loadedDeck.lastStudied,
        studyHistory,
      });
    } catch (error) {
      console.error('Erro ao carregar deck:', error);
      navigate('/flashcards');
    }
  }, [id, getDeck, navigate]);
  
  // Função para gerar dados fictícios para o histórico de estudo
  const generateMockStudyHistory = () => {
    const history = [];
    const today = new Date();
    
    // Gerar dados para os últimos 7 dias
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      history.push({
        date: date.toISOString(),
        cardsReviewed: Math.floor(Math.random() * 20),
        correctAnswers: Math.floor(Math.random() * 15),
        studyTime: Math.floor(Math.random() * 30) + 5, // 5-35 minutos
      });
    }
    
    return history;
  };
  
  // Formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Formatar dia da semana
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    return days[date.getDay()];
  };
  
  if (!deck) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <p>Carregando estatísticas...</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/flashcards')}
      >
        Voltar para Flashcards
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Informações gerais */}
        <Card className="md:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-800 mb-1">
                {deck.title} - Estatísticas
              </h1>
              <p className="text-neutral-600">{deck.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="primary">{deck.category}</Badge>
            </div>
          </div>
        </Card>
        
        {/* Cards informativos */}
        <Card className="bg-primary-50 border border-primary-100">
          <div className="flex items-center mb-3">
            <Brain className="w-5 h-5 text-primary-500 mr-2" />
            <h3 className="font-bold">Progresso</h3>
          </div>
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {stats.masteryLevel}%
          </div>
          <ProgressBar 
            value={stats.masteryLevel} 
            max={100} 
            color="primary"
            className="mb-3"
          />
          <p className="text-sm text-neutral-600">
            Nível de domínio do conteúdo baseado na sua performance
          </p>
        </Card>
        
        <Card className="bg-secondary-50 border border-secondary-100">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-secondary-500 mr-2" />
            <h3 className="font-bold">Estatísticas</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-600">Total de cards:</span>
              <span className="font-bold">{stats.totalCards}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Para revisar hoje:</span>
              <span className="font-bold">{stats.cardsToReview}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Dificuldade média:</span>
              <span className="font-bold">{stats.averageDifficulty}/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Tempo total de estudo:</span>
              <span className="font-bold">{stats.studyTime} min</span>
            </div>
          </div>
        </Card>
        
        <Card className="bg-success-50 border border-success-100">
          <div className="flex items-center mb-3">
            <Award className="w-5 h-5 text-success-500 mr-2" />
            <h3 className="font-bold">Conquistas</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center mr-2">
                <Star className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <div className="font-medium">Primeiro Estudo</div>
                <div className="text-xs text-neutral-500">Estude este deck pela primeira vez</div>
              </div>
              <Badge variant="success" className="ml-auto">Concluído</Badge>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center mr-2">
                <Calendar className="w-4 h-4 text-neutral-500" />
              </div>
              <div>
                <div className="font-medium">Consistência</div>
                <div className="text-xs text-neutral-500">Estude 7 dias seguidos</div>
              </div>
              <Badge variant="neutral" className="ml-auto">3/7</Badge>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center mr-2">
                <Brain className="w-4 h-4 text-neutral-500" />
              </div>
              <div>
                <div className="font-medium">Maestria</div>
                <div className="text-xs text-neutral-500">Atinja 100% de domínio</div>
              </div>
              <Badge variant="neutral" className="ml-auto">{stats.masteryLevel}%</Badge>
            </div>
          </div>
        </Card>
        
        {/* Histórico de estudo */}
        <Card className="md:col-span-3">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">
            Histórico de Estudo
          </h2>
          
          <div className="grid grid-cols-7 gap-2 mb-6">
            {stats.studyHistory.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-neutral-500 mb-1">{getDayOfWeek(day.date)}</div>
                <div className={`
                  h-24 bg-primary-50 rounded-lg flex flex-col items-center justify-end p-2
                  ${day.cardsReviewed === 0 ? 'opacity-30' : ''}
                `}>
                  <div 
                    className="w-full bg-primary-200 rounded-t-sm" 
                    style={{ height: `${(day.cardsReviewed / 20) * 100}%` }}
                  ></div>
                  <div className="mt-1 text-xs font-bold">{day.cardsReviewed}</div>
                </div>
                <div className="text-xs text-neutral-500 mt-1">{new Date(day.date).getDate()}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">Cards mais difíceis</h3>
              <div className="space-y-2">
                {deck.cards
                  .sort((a, b) => b.difficulty - a.difficulty)
                  .slice(0, 3)
                  .map((card, index) => (
                    <div key={card.id} className="p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-neutral-500 mr-2">{index + 1}.</span>
                        <span className="font-medium">{card.front}</span>
                        <Badge 
                          variant="danger" 
                          className="ml-auto"
                        >
                          Dificuldade: {card.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 ml-6">{card.back}</p>
                    </div>
                  ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Próximas Revisões</h3>
              <div className="space-y-2">
                {deck.cards
                  .sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview))
                  .slice(0, 3)
                  .map((card, index) => (
                    <div key={card.id} className="p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center mb-1">
                        <span className="font-medium">{card.front}</span>
                        <span className="ml-auto text-sm text-neutral-500">
                          {formatDate(card.nextReview)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Botões de ação */}
        <div className="md:col-span-3 flex justify-end">
          <Button 
            variant="outline" 
            className="mr-2"
            onClick={() => navigate(`/flashcards/${id}/edit`)}
          >
            Editar Deck
          </Button>
          <Button 
            onClick={() => navigate(`/flashcards/${id}`)}
          >
            Iniciar Estudo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStatsPage;