// src/pages/FlashcardPage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LightbulbIcon, Book, BookOpen, Clock, Calendar } from 'lucide-react';
import useFlashcards from '../../hooks/useFlashcards';
import { useBoss } from '../../contexts/BossContext';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import FlashcardStats from '../../components/flashcard/FlashcardStats';

const FlashcardPage = () => {
  const navigate = useNavigate();
  const { decks, createDeck, loading, error } = useFlashcards();
  const { currentBoss } = useBoss();
  
  // Estados locais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    textContent: '',
    cardCount: 10
  });
  
  // Obter a data atual
  const now = new Date();
  
  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para criar um novo deck
  const handleCreateDeck = async () => {
    try {
      await createDeck(
        formData.title,
        formData.description,
        formData.textContent,
        formData.category,
        parseInt(formData.cardCount, 10)
      );
      
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        textContent: '',
        cardCount: 10
      });
    } catch (err) {
      console.error('Erro ao criar deck:', err);
    }
  };
  
  // Navegar para a página de estudo
  const handleStudy = (deckId) => {
    navigate(`/flashcards/${deckId}`);
  };
  
  // Calcular quando um deck precisa ser revisado
  const needsReview = (deck) => {
    if (!deck || !deck.cards) return false;
    
    return deck.cards.some(card => {
      const nextReview = new Date(card.nextReview);
      return nextReview <= now;
    });
  };
  
  // Renderizar o badge de prioridade
  const renderPriorityBadge = (deck) => {
    if (!deck) return null;
    
    if (needsReview(deck)) {
      return <Badge variant="warning">Revisar hoje</Badge>;
    }
    
    if (deck.mastery < 50) {
      return <Badge variant="danger">Prioridade alta</Badge>;
    }
    
    if (deck.mastery < 80) {
      return <Badge variant="primary">Prioridade média</Badge>;
    }
    
    return <Badge variant="success">Dominado</Badge>;
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Flashcards</h1>
          <p className="text-neutral-600">
            Reforce seu aprendizado com flashcards e repetição espaçada.
          </p>
        </div>
        <Button 
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Deck
        </Button>
      </div>
      
      {/* Mostrar o Boss atual (pequeno) */}
      <Card className="mb-6 p-4 bg-primary-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Boss Atual: {currentBoss.name}</h3>
            <p className="text-sm text-neutral-600">
              Acerte os flashcards para causar dano ao Boss!
            </p>
          </div>
          <div className="w-32">
            <ProgressBar 
              value={Math.round((currentBoss.currentHealth / currentBoss.maxHealth) * 100)}
              max={100}
              color="boss"
            />
          </div>
        </div>
      </Card>
      
      {/* Grid de decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {decks.map((deck) => (
          <Card key={deck.id} className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{deck.title}</h3>
                {renderPriorityBadge(deck)}
              </div>
              <p className="text-neutral-600 text-sm mt-2 mb-4">{deck.description}</p>
              
              <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{deck.cards.length} cards</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Última revisão: {
                    deck.lastStudied 
                      ? new Date(deck.lastStudied).toLocaleDateString()
                      : 'Nunca'
                  }</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Domínio</span>
                  <span>{deck.mastery}%</span>
                </div>
                <ProgressBar value={deck.mastery} max={100} color="secondary" />
              </div>
              
              <div className="mt-auto pt-4 flex justify-between items-center">
                <div className="flex items-center text-primary-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Próxima revisão: {
                    needsReview(deck) ? 'Hoje' : 'Em breve'
                  }</span>
                </div>
                <Button onClick={() => handleStudy(deck.id)}>
                  Estudar
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {/* Card para criar novo deck */}
        <Card 
          className="h-full border-dashed border-2 border-neutral-300 bg-neutral-50 flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-2">Criar Novo Deck</h3>
            <p className="text-neutral-600 text-sm">
              Adicione um novo conjunto de flashcards para estudo.
            </p>
          </div>
        </Card>
      </div>
      
      {/* Modal para criar deck */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          Criar novo deck de flashcards
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input 
              label="Título" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
              placeholder="Digite um título para o deck" 
              required 
            />
            <Input 
              label="Descrição" 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva brevemente o conteúdo do deck" 
              required 
            />
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Categoria
              </label>
              <select 
                className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Selecione uma categoria</option>
                <option value="Matemática">Matemática</option>
                <option value="Ciências">Ciências</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Idiomas">Idiomas</option>
                <option value="Programação">Programação</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <Input 
              label="Texto base (para gerar flashcards)" 
              name="textContent" 
              value={formData.textContent}
              onChange={handleChange}
              placeholder="Cole ou digite o texto para gerar flashcards automaticamente" 
              as="textarea"
              rows={5}
              required
            />
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-neutral-700">
                Número de cartões
              </label>
              <select 
                className="ml-2 rounded-lg border-neutral-300 focus:ring-primary-500 focus:border-primary-500"
                name="cardCount"
                value={formData.cardCount}
                onChange={handleChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateDeck}
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar'}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FlashcardPage;