// src/contexts/BossContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Criação do contexto do Boss
const BossContext = createContext();

export const useBoss = () => useContext(BossContext);

export const BossProvider = ({ children }) => {
  // Estado local para o Boss atual usando localStorage
  const [currentBoss, setCurrentBoss] = useLocalStorage('current_boss', {
    id: 'boss-1',
    name: 'Mestre do Esquecimento',
    level: 1,
    maxHealth: 1000,
    currentHealth: 800,
    image: '/assets/images/boss/forgetting-master.png',
    description: 'Um Boss poderoso que representa o esquecimento. Derrote-o respondendo corretamente às questões!',
    rewards: [
      { id: 'reward-1', type: 'badge', name: 'Mestre da Memória', icon: 'memory' },
      { id: 'reward-2', type: 'xp', value: 500, icon: 'star' },
    ],
  });

  // Estado para histórico de dano
  const [damageHistory, setDamageHistory] = useState([]);

  // Função para causar dano ao Boss
  const damageBoss = (amount, source) => {
    if (currentBoss.currentHealth <= 0) {
      return false; // Boss já derrotado
    }

    const damage = Math.min(amount, currentBoss.currentHealth);
    const newHealth = currentBoss.currentHealth - damage;
    
    // Registra o dano no histórico
    const damageRecord = {
      id: `damage-${Date.now()}`,
      amount: damage,
      timestamp: new Date().toISOString(),
      source: source, // quiz, flashcard, etc.
    };
    
    setDamageHistory(prev => [...prev, damageRecord]);
    
    // Atualiza a saúde do Boss
    setCurrentBoss({
      ...currentBoss,
      currentHealth: newHealth,
    });
    
    // Verifica se o Boss foi derrotado
    if (newHealth <= 0) {
      handleBossDefeated();
    }
    
    return true;
  };

  // Função para lidar com a derrota do Boss
  const handleBossDefeated = () => {
    // Lógica para recompensas, progresso, etc.
    console.log('Boss derrotado! Parabéns!');
    
    // Implementação futura: atribuir recompensas, atualizar nível, etc.
  };

  // Função para resetar o Boss (para testes ou novos ciclos)
  const resetBoss = () => {
    setCurrentBoss({
      ...currentBoss,
      currentHealth: currentBoss.maxHealth,
    });
    setDamageHistory([]);
  };

  // Função para avançar para o próximo Boss
  const advanceToBoss = (bossId) => {
    // Implementação futura: buscar dados do próximo Boss
    // Por enquanto, usamos um mock simples
    const nextBoss = {
      id: bossId || 'boss-2',
      name: 'Senhor da Distração',
      level: 2,
      maxHealth: 1500,
      currentHealth: 1500,
      image: '/assets/images/boss/distraction-lord.png',
      description: 'Um Boss que representa a distração. Mantenha o foco para derrotá-lo!',
      rewards: [
        { id: 'reward-3', type: 'badge', name: 'Mestre do Foco', icon: 'target' },
        { id: 'reward-4', type: 'xp', value: 800, icon: 'star' },
      ],
    };
    
    setCurrentBoss(nextBoss);
    setDamageHistory([]);
  };

  // Valores disponibilizados pelo contexto
  const value = {
    currentBoss,
    damageHistory,
    damageBoss,
    resetBoss,
    advanceToBoss,
    healthPercentage: Math.max(0, Math.round((currentBoss.currentHealth / currentBoss.maxHealth) * 100)),
    isBossDefeated: currentBoss.currentHealth <= 0,
  };

  return (
    <BossContext.Provider value={value}>
      {children}
    </BossContext.Provider>
  );
};

export default BossContext;