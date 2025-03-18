// src/components/flashcard/FlashcardStats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Clock, Award } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const FlashcardStats = ({ deck, className = '' }) => {
  if (!deck) return null;
  
  // Calcular estatísticas
  const totalCards = deck.cards ? deck.cards.length : 0;
  const cardsToReview = deck.cards ? deck.cards.filter(card => {
    const nextReview = new Date(card.nextReview);
    return nextReview <= new Date();
  }).length : 0;
  
  // Formatação da data da última revisão
  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    
    const now = new Date();
    const date = new Date(dateString);
    
    // Se for hoje
    if (date.toDateString() === now.toDateString()) {
      return 'Hoje';
    }
    
    // Se for ontem
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    
    // Se for nos últimos 7 dias
    const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return `${daysDiff} dia${daysDiff !== 1 ? 's' : ''} atrás`;
    }
    
    // Formato padrão para datas mais antigas
    return date.toLocaleDateString();
  };
  
  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <Card className={className}>
      <h3 className="text-lg font-bold mb-4">Estatísticas do Deck</h3>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="p-3 bg-primary-50 rounded-lg text-center"
        >
          <div className="text-xl font-bold text-primary-600">{totalCards}</div>
          <div className="text-sm text-neutral-600">Total de cards</div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="p-3 bg-warning-50 rounded-lg text-center"
        >
          <div className="text-xl font-bold text-warning-600">{cardsToReview}</div>
          <div className="text-sm text-neutral-600">Para revisar hoje</div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="p-3 bg-success-50 rounded-lg text-center"
        >
          <div className="text-xl font-bold text-success-600">{deck.mastery}%</div>
          <div className="text-sm text-neutral-600">Domínio</div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="p-3 bg-secondary-50 rounded-lg text-center"
        >
          <div className="text-xl font-bold text-secondary-600">{formatDate(deck.lastStudied)}</div>
          <div className="text-sm text-neutral-600">Última revisão</div>
        </motion.div>
      </motion.div>
      
      {/* Progresso de domínio */}
      <motion.div 
        variants={itemVariants}
        className="mb-6"
      >
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="font-medium">Domínio</span>
          <span>{deck.mastery}%</span>
        </div>
        <ProgressBar 
          value={deck.mastery} 
          max={100} 
          color={
            deck.mastery < 30 ? 'danger' : 
            deck.mastery < 70 ? 'warning' : 'success'
          }
        />
      </motion.div>
      
      {/* Informações adicionais */}
      <motion.div 
        variants={itemVariants}
        className="space-y-3 text-sm"
      >
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-neutral-500 mr-2" />
          <span>Criado em: {new Date(deck.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <TrendingUp className="w-4 h-4 text-neutral-500 mr-2" />
          <span>
            Status: {
              deck.mastery < 30 ? 'Iniciando' : 
              deck.mastery < 70 ? 'Progredindo' : 
              deck.mastery < 90 ? 'Avançado' : 'Dominado'
            }
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-neutral-500 mr-2" />
          <span>Próxima revisão: {
            cardsToReview > 0 ? 'Hoje' : 'Em breve'
          }</span>
        </div>
      </motion.div>
    </Card>
  );
};

export default FlashcardStats;