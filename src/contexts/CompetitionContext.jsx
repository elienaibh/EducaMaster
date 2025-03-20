// src/contexts/CompetitionContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import competitionService from '../services/api/competitionApi';
import { useAuth } from './AuthContext';

const CompetitionContext = createContext();

export const useCompetitionContext = () => {
  const context = useContext(CompetitionContext);
  if (!context) {
    throw new Error('useCompetitionContext deve ser usado dentro de um CompetitionProvider');
  }
  return context;
};

export const CompetitionProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Estado para rankings
  const [rankings, setRankings] = useState({
    global: [],
    friends: [],
    weekly: [],
    monthly: []
  });
  
  // Estado para desafios
  const [challenges, setChallenges] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  
  // Estado para grupos de estudo
  const [studyGroups, setStudyGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  
  // Estado para controlar carregamentos
  const [isLoading, setIsLoading] = useState(false);
  
  // Busca rankings
  const fetchRankings = useCallback(async (type = 'global') => {
    if (!user) return [];
    
    try {
      setIsLoading(true);
      const data = await competitionService.getRankings(type);
      
      setRankings(prev => ({
        ...prev,
        [type]: data
      }));
      
      return data;
    } catch (error) {
      console.error(`Erro ao buscar rankings ${type}:`, error);
      toast.error(`Não foi possível carregar o ranking ${type}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Busca desafios
  const fetchChallenges = useCallback(async () => {
    if (!user) return [];
    
    try {
      setIsLoading(true);
      const data = await competitionService.getChallenges();
      setChallenges(data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar desafios:', error);
      toast.error('Não foi possível carregar os desafios');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Busca um desafio específico
  const fetchChallengeById = useCallback(async (challengeId) => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      const data = await competitionService.getChallengeById(challengeId);
      setActiveChallenge(data);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar desafio ${challengeId}:`, error);
      toast.error('Não foi possível carregar os detalhes do desafio');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Ingressa em um desafio
  const joinChallenge = useCallback(async (challengeId) => {
    if (!user) return false;
    
    try {
      setIsLoading(true);
      const result = await competitionService.joinChallenge(challengeId);
      
      if (result.success) {
        // Atualiza a lista de desafios
        setChallenges(prev => 
          prev.map(c => 
            c.id === challengeId 
              ? { ...c, joined: true, participants: [...c.participants, user.id] }
              : c
          )
        );
        
        toast.success('Você entrou no desafio com sucesso!');
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erro ao entrar no desafio ${challengeId}:`, error);
      toast.error('Não foi possível entrar no desafio');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Sai de um desafio
  const leaveChallenge = useCallback(async (challengeId) => {
    if (!user) return false;
    
    try {
      setIsLoading(true);
      const result = await competitionService.leaveChallenge(challengeId);
      
      if (result.success) {
        // Atualiza a lista de desafios
        setChallenges(prev => 
          prev.map(c => 
            c.id === challengeId 
              ? { 
                  ...c, 
                  joined: false, 
                  participants: c.participants.filter(p => p !== user.id) 
                }
              : c
          )
        );
        
        toast.success('Você saiu do desafio');
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erro ao sair do desafio ${challengeId}:`, error);
      toast.error('Não foi possível sair do desafio');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Cria um novo desafio
  const createChallenge = useCallback(async (challengeData) => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      const newChallenge = await competitionService.createChallenge(challengeData);
      
      if (newChallenge) {
        // Adiciona o novo desafio à lista
        setChallenges(prev => [newChallenge, ...prev]);
        toast.success('Desafio criado com sucesso!');
      }
      
      return newChallenge;
    } catch (error) {
      console.error('Erro ao criar desafio:', error);
      toast.error('Não foi possível criar o desafio');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Busca grupos de estudo
  const fetchStudyGroups = useCallback(async () => {
    if (!user) return [];
    
    try {
      setIsLoading(true);
      const data = await competitionService.getStudyGroups();
      setStudyGroups(data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar grupos de estudo:', error);
      toast.error('Não foi possível carregar os grupos de estudo');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Busca grupos de estudo do usuário
  const fetchUserGroups = useCallback(async () => {
    if (!user) return [];
    
    try {
      setIsLoading(true);
      const data = await competitionService.getUserGroups();
      setUserGroups(data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar grupos do usuário:', error);
      toast.error('Não foi possível carregar seus grupos');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Cria um novo grupo de estudo
  const createStudyGroup = useCallback(async (groupData) => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      const newGroup = await competitionService.createStudyGroup(groupData);
      
      if (newGroup) {
        // Adiciona o novo grupo às listas
        setStudyGroups(prev => [newGroup, ...prev]);
        setUserGroups(prev => [newGroup, ...prev]);
        toast.success('Grupo de estudo criado com sucesso!');
      }
      
      return newGroup;
    } catch (error) {
      console.error('Erro ao criar grupo de estudo:', error);
      toast.error('Não foi possível criar o grupo de estudo');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Entra em um grupo de estudo
  const joinStudyGroup = useCallback(async (groupId) => {
    if (!user) return false;
    
    try {
      setIsLoading(true);
      const result = await competitionService.joinStudyGroup(groupId);
      
      if (result.success) {
        // Busca o grupo atualizado
        const updatedGroup = await competitionService.getStudyGroupById(groupId);
        
        // Atualiza as listas
        setStudyGroups(prev => 
          prev.map(g => g.id === groupId ? updatedGroup : g)
        );
        
        setUserGroups(prev => {
          // Verifica se o grupo já está na lista do usuário
          const exists = prev.some(g => g.id === groupId);
          return exists ? prev.map(g => g.id === groupId ? updatedGroup : g) : [updatedGroup, ...prev];
        });
        
        toast.success(`Você entrou no grupo ${updatedGroup.name}`);
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erro ao entrar no grupo ${groupId}:`, error);
      toast.error('Não foi possível entrar no grupo de estudo');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Sai de um grupo de estudo
  const leaveStudyGroup = useCallback(async (groupId) => {
    if (!user) return false;
    
    try {
      setIsLoading(true);
      const result = await competitionService.leaveStudyGroup(groupId);
      
      if (result.success) {
        // Atualiza as listas
        setStudyGroups(prev => 
          prev.map(g => {
            if (g.id === groupId) {
              return {
                ...g,
                members: g.members.filter(m => m.id !== user.id),
                memberCount: g.memberCount - 1
              };
            }
            return g;
          })
        );
        
        setUserGroups(prev => prev.filter(g => g.id !== groupId));
        
        toast.success('Você saiu do grupo de estudo');
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erro ao sair do grupo ${groupId}:`, error);
      toast.error('Não foi possível sair do grupo de estudo');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Busca posição do usuário no ranking
  const fetchUserRankingPosition = useCallback(async () => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      return await competitionService.getUserRankingPosition();
    } catch (error) {
      console.error('Erro ao buscar posição no ranking:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Carrega dados iniciais quando o usuário estiver autenticado
  useEffect(() => {
    if (user) {
      fetchRankings('global');
      fetchRankings('weekly');
      fetchChallenges();
      fetchUserGroups();
    }
  }, [user, fetchRankings, fetchChallenges, fetchUserGroups]);
  
  // Valor do contexto
  const value = {
    rankings,
    challenges,
    activeChallenge,
    studyGroups,
    userGroups,
    isLoading,
    fetchRankings,
    fetchChallenges,
    fetchChallengeById,
    joinChallenge,
    leaveChallenge,
    createChallenge,
    fetchStudyGroups,
    fetchUserGroups,
    createStudyGroup,
    joinStudyGroup,
    leaveStudyGroup,
    fetchUserRankingPosition
  };
  
  return (
    <CompetitionContext.Provider value={value}>
      {children}
    </CompetitionContext.Provider>
  );
};

export default CompetitionContext;