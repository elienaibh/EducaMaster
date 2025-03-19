// src/pages/FlashcardPage/FlashcardEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Loader, Edit, X } from 'lucide-react';
import useFlashcards from '../../hooks/useFlashcards';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal';

const FlashcardEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDeck, editDeck, addCard, editCard, deleteCard, loading, error } = useFlashcards();
  
  // Estados
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({
    front: '',
    back: '',
    difficulty: 3,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  
  // Carregar o deck
  useEffect(() => {
    try {
      const loadedDeck = getDeck(id);
      setDeck(loadedDeck);
      setFormData({
        title: loadedDeck.title,
        description: loadedDeck.description,
        category: loadedDeck.category || '',
      });
    } catch (error) {
      console.error('Erro ao carregar deck:', error);
      navigate('/flashcards');
    }
  }, [id, getDeck, navigate]);
  
  // Função para lidar com mudanças no formulário do deck
  const handleDeckChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para lidar com mudanças no formulário do card
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (editingCard) {
      setEditingCard(prev => ({ ...prev, [name]: value }));
    } else {
      setNewCard(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Função para salvar as alterações no deck
  const handleSaveDeck = async () => {
    if (!deck) return;
    
    try {
      await editDeck(deck.id, formData);
      navigate('/flashcards');
    } catch (err) {
      console.error('Erro ao salvar deck:', err);
    }
  };
  
  // Função para adicionar um novo card
  const handleAddCard = async () => {
    if (!deck) return;
    
    try {
      await addCard(deck.id, newCard);
      setNewCard({
        front: '',
        back: '',
        difficulty: 3,
      });
      setIsModalOpen(false);
      
      // Recarregar o deck para obter o novo card
      const updatedDeck = getDeck(id);
      setDeck(updatedDeck);
    } catch (err) {
      console.error('Erro ao adicionar card:', err);
    }
  };
  
  // Função para salvar as alterações em um card existente
  const handleSaveCard = async () => {
    if (!deck || !editingCard) return;
    
    try {
      await editCard(deck.id, editingCard.id, editingCard);
      setEditingCard(null);
      setIsModalOpen(false);
      
      // Recarregar o deck para obter o card atualizado
      const updatedDeck = getDeck(id);
      setDeck(updatedDeck);
    } catch (err) {
      console.error('Erro ao salvar card:', err);
    }
  };
  
  // Função para excluir um card
  const handleDeleteCard = async () => {
    if (!deck || !cardToDelete) return;
    
    try {
      await deleteCard(deck.id, cardToDelete);
      setCardToDelete(null);
      setIsDeleteModalOpen(false);
      
      // Recarregar o deck para refletir a exclusão
      const updatedDeck = getDeck(id);
      setDeck(updatedDeck);
    } catch (err) {
      console.error('Erro ao excluir card:', err);
    }
  };
  
  // Abrir modal para editar um card existente
  const openEditCardModal = (card) => {
    setEditingCard({ ...card });
    setIsModalOpen(true);
  };
  
  // Abrir modal para adicionar um novo card
  const openAddCardModal = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };
  
  // Abrir modal de confirmação para excluir um card
  const openDeleteConfirmation = (cardId) => {
    setCardToDelete(cardId);
    setIsDeleteModalOpen(true);
  };
  
  // Verificar se o formulário do deck é válido
  const isDeckFormValid = () => {
    return formData.title && formData.description;
  };
  
  // Verificar se o formulário do card é válido
  const isCardFormValid = () => {
    const form = editingCard || newCard;
    return form.front && form.back;
  };
  
  if (!deck) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-500" />
          <p>Carregando deck...</p>
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
      
      <Card className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">
          Editar Deck de Flashcards
        </h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Título do Deck" 
              name="title" 
              value={formData.title}
              onChange={handleDeckChange}
              placeholder="Ex: Vocabulário de Inglês" 
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
                onChange={handleDeckChange}
                required
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
          </div>
          
          <Input 
            label="Descrição" 
            name="description" 
            value={formData.description}
            onChange={handleDeckChange}
            placeholder="Descreva brevemente o conteúdo deste deck" 
            required 
          />
          
          <div className="flex justify-end">
            <Button 
              icon={loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              onClick={handleSaveDeck}
              disabled={loading || !isDeckFormValid()}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-800">
            Flashcards ({deck.cards.length})
          </h2>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={openAddCardModal}
          >
            Adicionar Card
          </Button>
        </div>
        
        {deck.cards.length === 0 ? (
          <div className="p-8 text-center bg-neutral-50 rounded-lg">
            <p className="text-neutral-600">Este deck ainda não possui cards.</p>
            <Button 
              icon={<Plus className="w-4 h-4" />}
              className="mt-4"
              onClick={openAddCardModal}
            >
              Adicionar Primeiro Card
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {deck.cards.map((card, index) => (
              <div 
                key={card.id} 
                className="p-4 border rounded-lg border-neutral-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center mr-2">
                        {index + 1}
                      </div>
                      <h3 className="font-medium">{card.front}</h3>
                    </div>
                    <p className="text-sm text-neutral-600 ml-8">
                      {card.back}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-neutral-500"
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => openEditCardModal(card)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-danger-500"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => openDeleteConfirmation(card.id)}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-2 ml-8">
                  <Badge variant={
                    card.difficulty <= 2 ? 'success' :
                    card.difficulty <= 4 ? 'warning' :
                    'danger'
                  }>
                    Dificuldade: {card.difficulty}
                  </Badge>
                  <span className="text-xs text-neutral-500 ml-2">
                    Próxima revisão: {new Date(card.nextReview).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      {/* Modal para adicionar/editar card */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          {editingCard ? 'Editar Flashcard' : 'Adicionar Flashcard'}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-neutral-700">
                Frente do Card (Pergunta)
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                name="front"
                value={editingCard ? editingCard.front : newCard.front}
                onChange={handleCardChange}
                rows={3}
                placeholder="Digite a pergunta ou conceito aqui..."
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-neutral-700">
                Verso do Card (Resposta)
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                name="back"
                value={editingCard ? editingCard.back : newCard.back}
                onChange={handleCardChange}
                rows={4}
                placeholder="Digite a resposta ou explicação aqui..."
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-neutral-700">
                Dificuldade (1-5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    type="button"
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      (editingCard ? editingCard.difficulty : newCard.difficulty) === level
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    onClick={() => {
                      if (editingCard) {
                        setEditingCard(prev => ({ ...prev, difficulty: level }));
                      } else {
                        setNewCard(prev => ({ ...prev, difficulty: level }));
                      }
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                1 = Muito fácil, 5 = Muito difícil
              </p>
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
              onClick={editingCard ? handleSaveCard : handleAddCard}
              disabled={!isCardFormValid()}
            >
              {editingCard ? 'Salvar' : 'Adicionar'}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      
      {/* Modal de confirmação para excluir card */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        size="sm"
      >
        <ModalHeader onClose={() => setIsDeleteModalOpen(false)}>
          Excluir Flashcard
        </ModalHeader>
        <ModalBody>
          <p className="text-center">
            Tem certeza que deseja excluir este flashcard? Esta ação não pode ser desfeita.
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={handleDeleteCard}
            >
              Excluir
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FlashcardEditPage;