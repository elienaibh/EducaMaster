// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth/authService';
import tokenService from '../services/auth/tokenService';

// Criação do contexto de autenticação
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const token = tokenService.getToken();
        
        if (token) {
          // Verifica se o token é válido e obtém os dados do usuário
          const userData = await authService.validateToken(token);
          setCurrentUser(userData);
        }
      } catch (err) {
        // Se o token for inválido, remove-o do armazenamento
        tokenService.removeToken();
        setError(err.message);
        console.error('Erro de autenticação:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  // Função para realizar login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { token, user } = await authService.login(email, password);
      
      // Salva o token e atualiza o estado do usuário
      tokenService.setToken(token);
      setCurrentUser(user);
      
      return user;
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para realizar registro
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const { token, user } = await authService.register(userData);
      
      // Salva o token e atualiza o estado do usuário
      tokenService.setToken(token);
      setCurrentUser(user);
      
      return user;
    } catch (err) {
      setError(err.message || 'Erro ao registrar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para realizar logout
  const logout = async () => {
    try {
      setLoading(true);
      
      await authService.logout();
      
      // Remove o token e limpa o estado do usuário
      tokenService.removeToken();
      setCurrentUser(null);
    } catch (err) {
      setError(err.message || 'Erro ao fazer logout');
      console.error('Erro ao fazer logout:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar dados do usuário
  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedUser = await authService.updateProfile(userData);
      setCurrentUser(updatedUser);
      
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Valores disponibilizados pelo contexto
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;