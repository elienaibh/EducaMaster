// src/pages/FlashcardPage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LightbulbIcon, Clock, Calendar, BookOpen } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const FlashcardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock de dados de decks de flashcards
  const flashcardDecks = [
    {
      id: 'deck-1',
      title: 'Biologia',
      description: 'Anatomia e fisiologia do corpo humano.',
      cards: 15,
      nextReview: 'Hoje',
      mastery: 85,
      lastStudied: '1 dia atrás',
      category: 'Ciências',
    },
    {
      id: 'deck-2',
      title: 'Vocabulário de Inglês',
      description: 'Palavras e frases essenciais do idioma inglês.',
      cards: 20,
      nextReview: 'Hoje',
      mastery: 70,
      lastStudied: '2 dias atrás',
      category: 'Idiomas',
    },
    {
      id: 'deck-3',
      title: 'Química Orgânica',
      description: 'Fundamentos de química orgânica e reações químicas.',
      cards: 25,
      nextReview: 'Amanhã',
      mastery: 60,
      lastStudied: '3 dias atrás',
      category: 'Ciências',
    },
    {
      id: 'deck-4',
      title: 'Fórmulas Matemáticas',
      description: 'Principais fórmulas matemáticas para o vestibular.',
      cards: 18,
      nextReview: 'Em 2 dias',
      mastery: 90,
      lastStudied: '1 semana atrás',
      category: 'Matemática',
    },
  ];
  
  // Função para navegar para a página de estudo
  const handleStudy = (deckId) => {
    navigate(`/flashcards/${deckId}`);
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
      
      {/* Lista de Decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flashcardDecks.map((deck) => (
          <Card key={deck.id} className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{deck.title}</h3>
                <Badge>{deck.category}</Badge>
              </div>
              <p className="text-neutral-600 text-sm mt-2 mb-4">{deck.description}</p>
              
              <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{deck.cards} cards</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Última revisão: {deck.lastStudied}</span>
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
                  <span>Próxima revisão: {deck.nextReview}</span>
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
              placeholder="Digite um título para o deck" 
              required 
            />
            <Input 
              label="Descrição" 
              name="description" 
              placeholder="Descreva brevemente o conteúdo do deck" 
              required 
            />
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Categoria
              </label>
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
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
              label="Texto base (opcional)" 
              name="content" 
              placeholder="Cole ou digite o texto para gerar flashcards automaticamente" 
              as="textarea"
              rows={5}
            />
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-neutral-700">
                Número de cartões
              </label>
              <select className="ml-2 rounded-lg border-neutral-300 focus:ring-primary-500 focus:border-primary-500">
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Criar
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FlashcardPage;