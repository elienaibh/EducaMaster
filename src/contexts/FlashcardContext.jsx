// src/contexts/FlashcardContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import aiService from '../services/ai/aiService';
import useLocalStorage from '../hooks/useLocalStorage';
import { useBoss } from './BossContext';

// Criação do contexto de Flashcards
const FlashcardContext = createContext();

export const useFlashcards = () => useContext(FlashcardContext);

export const FlashcardProvider = ({ children }) => {
  // Estado para decks e cards do usuário
  const [decks, setDecks] = useLocalStorage('flashcard_decks', []);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [studySession, setStudySession] = useState({
    knownCards: [],
    unknownCards: [],
    reviewOrder: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { damageBoss } = useBoss();

  // Carregar decks mockados para desenvolvimento
  useEffect(() => {
    // Se não existirem decks salvos, criar alguns de exemplo
    if (decks.length === 0) {
      const mockDecks = [
        {
          id: 'deck-1',
          title: 'Biologia',
          description: 'Anatomia e fisiologia do corpo humano.',
          cards: [
            {
              id: 'card-1',
              front: 'O que é o sistema circulatório?',
              back: 'É o sistema responsável pelo transporte de sangue, nutrientes, oxigênio, dióxido de carbono e hormônios para as células do corpo.',
              difficulty: 3,
              nextReview: new Date().toISOString(),
              interval: 1, // em dias
            },
            {
              id: 'card-2',
              front: 'Quais são as partes principais do coração humano?',
              back: 'O coração humano é dividido em quatro câmaras: dois átrios (esquerdo e direito) e dois ventrículos (esquerdo e direito).',
              difficulty: 2,
              nextReview: new Date().toISOString(),
              interval: 1,
            },
            // Mais cards...
          ],
          category: 'Ciências',
          mastery: 85,
          lastStudied: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semana atrás
        },
        // Mais decks...
      ];
      
      setDecks(mockDecks);
    }
  }, []);

  // Buscar um deck específico
  const getDeck = (deckId) => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck) {
      throw new Error(`Deck não encontrado: ${deckId}`);
    }
    
    setCurrentDeck(deck);
    return deck;
  };

  // Iniciar uma sessão de estudo
  const startStudySession = (deckId) => {
    const deck = getDeck(deckId);
    
    // Ordenar cards por data de revisão (primeiro os que precisam ser revisados)
    const orderedCards = [...deck.cards].sort((a, b) => {
      const dateA = new Date(a.nextReview);
      const dateB = new Date(b.nextReview);
      return dateA - dateB;
    });
    
    const reviewOrder = orderedCards.map(card => card.id);
    
    setStudySession({
      knownCards: [],
      unknownCards: [],
      reviewOrder,
    });
    
    setCurrentCard(0);
    
    return { deck, reviewOrder };
  };

  // Registrar resultado de revisão de um card
  const recordCardResult = (cardId, isKnown) => {
    if (!currentDeck) return false;
    
    const card = currentDeck.cards.find(c => c.id === cardId);
    if (!card) return false;
    
    // Atualizar listas de cards conhecidos/desconhecidos
    const newSession = { ...studySession };
    
    if (isKnown) {
      newSession.knownCards.push(cardId);
      
      // Ajustar intervalo de revisão (sistema de repetição espaçada)
      const now = new Date();
      let newInterval = card.interval;
      
      // Se acertou, aumenta o intervalo
      if (card.interval < 1) {
        newInterval = 1; // Primeiro acerto: 1 dia
      } else if (card.interval < 3) {
        newInterval = 3; // Segundo acerto: 3 dias
      } else if (card.interval < 7) {
        newInterval = 7; // Terceiro acerto: 1 semana
      } else if (card.interval < 14) {
        newInterval = 14; // Quarto acerto: 2 semanas
      } else if (card.interval < 30) {
        newInterval = 30; // Quinto acerto: 1 mês
      } else {
        newInterval = card.interval * 1.5; // Continua aumentando
      }
      
      // Atualizar o card
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + newInterval);
      
      // Causar dano ao Boss baseado na dificuldade do card
      const damage = 20 + (card.difficulty * 10); // Mais difícil = mais dano
      damageBoss(damage, 'flashcard');
      
      // Atualizar o card no deck
      const updatedCards = currentDeck.cards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            interval: newInterval,
            nextReview: newDate.toISOString(),
          };
        }
        return c;
      });
      
      // Atualizar o deck
      const updatedDeck = {
        ...currentDeck,
        cards: updatedCards,
        lastStudied: new Date().toISOString(),
      };
      
      setCurrentDeck(updatedDeck);
      
      // Atualizar decks no localStorage
      const updatedDecks = decks.map(d => {
        if (d.id === updatedDeck.id) {
          return updatedDeck;
        }
        return d;
      });
      
      setDecks(updatedDecks);
    } else {
      // Se errou, adiciona à lista de desconhecidos e reseta o intervalo
      newSession.unknownCards.push(cardId);
      
      // Atualizar para revisão em breve
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 1); // Revisão no dia seguinte
      
      // Atualizar o card no deck
      const updatedCards = currentDeck.cards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            interval: 1, // Resetar intervalo
            nextReview: newDate.toISOString(),
          };
        }
        return c;
      });
      
      // Atualizar o deck
      const updatedDeck = {
        ...currentDeck,
        cards: updatedCards,
        lastStudied: new Date().toISOString(),
      };
      
      setCurrentDeck(updatedDeck);
      
      // Atualizar decks no localStorage
      const updatedDecks = decks.map(d => {
        if (d.id === updatedDeck.id) {
          return updatedDeck;
        }
        return d;
      });
      
      setDecks(updatedDecks);
    }
    
    setStudySession(newSession);
    
    // Avançar para o próximo card
    if (currentCard < studySession.reviewOrder.length - 1) {
      setCurrentCard(currentCard + 1);
      return true;
    } else {
      // Sessão concluída
      finishStudySession();
      return false;
    }
  };

  // Finalizar sessão de estudo
  const finishStudySession = () => {
    if (!currentDeck) return null;
    
    // Calcular masteria (porcentagem de cards conhecidos)
    const totalCards = studySession.knownCards.length + studySession.unknownCards.length;
    const knownPercentage = totalCards > 0 
      ? Math.round((studySession.knownCards.length / totalCards) * 100)
      : 0;
    
    // Atualizar masteria do deck
    const updatedDeck = {
      ...currentDeck,
      mastery: knownPercentage,
    };
    
    // Atualizar decks no localStorage
    const updatedDecks = decks.map(d => {
      if (d.id === updatedDeck.id) {
        return updatedDeck;
      }
      return d;
    });
    
    setDecks(updatedDecks);
    
    // Dano final ao Boss baseado na masteria
    const finalDamage = Math.round(knownPercentage * 1.5);
    damageBoss(finalDamage, 'flashcard_session');
    
    return {
      deckId: currentDeck.id,
      knownCards: studySession.knownCards.length,
      unknownCards: studySession.unknownCards.length,
      totalCards,
      mastery: knownPercentage,
    };
  };

  // Criar um novo deck a partir de um texto
  const createDeck = async (title, description, textContent, category, cardCount = 10) => {
    try {
      setLoading(true);
      
      // Gerar flashcards usando IA
      const flashcards = await aiService.generateFlashcards(
        textContent,
        cardCount,
        { level: 'médio' }
      );
      
      // Formatar cards para o formato do sistema
      const cards = flashcards.map((card, index) => {
        const now = new Date();
        return {
          id: `card-${Date.now()}-${index}`,
          front: card.frente,
          back: card.verso,
          difficulty: card.dificuldade || 3,
          nextReview: now.toISOString(),
          interval: 1, // Começar com intervalo de 1 dia
        };
      });
      
      // Criar novo deck
      const newDeck = {
        id: `deck-${Date.now()}`,
        title,
        description,
        cards,
        category,
        mastery: 0, // Começa sem masteria
        lastStudied: null,
        createdAt: new Date().toISOString(),
      };
      
      // Atualizar decks
      setDecks([newDeck, ...decks]);
      
      return newDeck;
    } catch (err) {
      setError(err.message || 'Erro ao criar deck');
      console.error('Erro ao criar deck:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Editar um deck existente
  const editDeck = (deckId, updatedData) => {
    const updatedDecks = decks.map(deck => {
      if (deck.id === deckId) {
        return { ...deck, ...updatedData };
      }
      return deck;
    });
    
    setDecks(updatedDecks);
    
    // Se o deck atual for o editado, atualizar também o currentDeck
    if (currentDeck && currentDeck.id === deckId) {
      setCurrentDeck({ ...currentDeck, ...updatedData });
    }
    
    return updatedDecks.find(deck => deck.id === deckId);
  };

  // Deletar um deck
  const deleteDeck = (deckId) => {
    const updatedDecks = decks.filter(deck => deck.id !== deckId);
    setDecks(updatedDecks);
    
    // Se o deck atual for o deletado, limpar currentDeck
    if (currentDeck && currentDeck.id === deckId) {
      setCurrentDeck(null);
    }
    
    return true;
  };

  // Adicionar um card a um deck
  const addCard = (deckId, cardData) => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck) return false;
    
    const newCard = {
      id: `card-${Date.now()}`,
      front: cardData.front,
      back: cardData.back,
      difficulty: cardData.difficulty || 3,
      nextReview: new Date().toISOString(),
      interval: 1,
    };
    
    const updatedDeck = {
      ...deck,
      cards: [...deck.cards, newCard],
    };
    
    // Atualizar decks
    const updatedDecks = decks.map(d => {
      if (d.id === deckId) {
        return updatedDeck;
      }
      return d;
    });
    
    setDecks(updatedDecks);
    
    // Se o deck atual for o editado, atualizar também o currentDeck
    if (currentDeck && currentDeck.id === deckId) {
      setCurrentDeck(updatedDeck);
    }
    
    return newCard;
  };

  // Editar um card
  const editCard = (deckId, cardId, cardData) => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck) return false;
    
    const updatedCards = deck.cards.map(card => {
      if (card.id === cardId) {
        return { ...card, ...cardData };
      }
      return card;
    });
    
    const updatedDeck = {
      ...deck,
      cards: updatedCards,
    };
    
    // Atualizar decks
    const updatedDecks = decks.map(d => {
      if (d.id === deckId) {
        return updatedDeck;
      }
      return d;
    });
    
    setDecks(updatedDecks);
    
    // Se o deck atual for o editado, atualizar também o currentDeck
    if (currentDeck && currentDeck.id === deckId) {
      setCurrentDeck(updatedDeck);
    }
    
    return updatedCards.find(card => card.id === cardId);
  };

  // Deletar um card
  const deleteCard = (deckId, cardId) => {
    const deck = decks.find(d => d.id === deckId);
    if (!deck) return false;
    
    const updatedCards = deck.cards.filter(card => card.id !== cardId);
    
    const updatedDeck = {
      ...deck,
      cards: updatedCards,
    };
    
    // Atualizar decks
    const updatedDecks = decks.map(d => {
      if (d.id === deckId) {
        return updatedDeck;
      }
      return d;
    });
    
    setDecks(updatedDecks);
    
    // Se o deck atual for o editado, atualizar também o currentDeck
    if (currentDeck && currentDeck.id === deckId) {
      setCurrentDeck(updatedDeck);
    }
    
    return true;
  };

  // Valores disponibilizados pelo contexto
  const value = {
    decks,
    currentDeck,
    currentCard,
    studySession,
    loading,
    error,
    getDeck,
    startStudySession,
    recordCardResult,
    finishStudySession,
    createDeck,
    editDeck,
    deleteDeck,
    addCard,
    editCard,
    deleteCard,
  };

  return (
    <FlashcardContext.Provider value={value}>
      {children}
    </FlashcardContext.Provider>
  );
};

export default FlashcardContext;