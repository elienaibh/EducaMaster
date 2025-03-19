// src/pages/FlashcardPage/FlashcardCreatePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Save, Loader } from 'lucide-react';
import useFlashcards from '../../hooks/useFlashcards';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const FlashcardCreatePage = () => {
  const navigate = useNavigate();
  const { createDeck, loading, error } = useFlashcards();
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    textContent: '',
    cardCount: 10
  });
  const [processingStatus, setProcessingStatus] = useState('');
  
  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para criar um novo deck
  const handleCreateDeck = async () => {
    try {
      setProcessingStatus('Gerando flashcards com IA...');
      
      const newDeck = await createDeck(
        formData.title,
        formData.description,
        formData.textContent,
        formData.category,
        parseInt(formData.cardCount, 10)
      );
      
      setProcessingStatus('Flashcards criados com sucesso!');
      setTimeout(() => {
        navigate(`/flashcards/${newDeck.id}`);
      }, 1000);
    } catch (err) {
      setProcessingStatus(`Erro: ${err.message}`);
    }
  };
  
  // Validar formulário
  const isFormValid = () => {
    return formData.title && 
           formData.description && 
           formData.category && 
           formData.textContent.length > 50;
  };
  
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
      
      <Card>
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">
          Criar Novo Deck de Flashcards
        </h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Título do Deck" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
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
                onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Descreva brevemente o conteúdo deste deck" 
            required 
          />
          
          <div>
            <label className="block mb-2 font-medium text-neutral-700">
              Texto Base (para geração automática)
            </label>
            <div className="mb-2 text-sm text-neutral-600">
              Cole ou digite um texto sobre o assunto para que a IA gere automaticamente os flashcards.
            </div>
            <textarea 
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              name="textContent"
              value={formData.textContent}
              onChange={handleChange}
              rows={10}
              placeholder="Cole aqui um texto sobre o assunto dos flashcards..."
              required
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>{formData.textContent.length} caracteres</span>
              <span>{formData.textContent.length < 50 ? 'Mínimo de 50 caracteres' : 'Texto suficiente'}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Número de flashcards
              </label>
              <select 
                className="mt-1 rounded-lg border-neutral-300 focus:ring-primary-500 focus:border-primary-500"
                name="cardCount"
                value={formData.cardCount}
                onChange={handleChange}
              >
                <option value="5">5 cartões</option>
                <option value="10">10 cartões</option>
                <option value="15">15 cartões</option>
                <option value="20">20 cartões</option>
                <option value="25">25 cartões</option>
              </select>
            </div>
            <div>
              {processingStatus && (
                <Badge variant={
                  processingStatus.includes('Erro') ? 'danger' : 
                  processingStatus.includes('sucesso') ? 'success' : 'primary'
                }>
                  {processingStatus}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={() => navigate('/flashcards')}
            >
              Cancelar
            </Button>
            <Button 
              icon={loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              onClick={handleCreateDeck}
              disabled={loading || !isFormValid()}
            >
              {loading ? 'Criando...' : 'Criar Deck'}
            </Button>
          </div>
          
          {error && (
            <div className="p-3 bg-danger-50 text-danger-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FlashcardCreatePage;