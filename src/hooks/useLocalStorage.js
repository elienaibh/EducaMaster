// src/hooks/useLocalStorage.js

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para gerenciar estado com localStorage
 * @param {string} key - Chave para armazenar no localStorage
 * @param {any} initialValue - Valor inicial caso não exista no localStorage
 * @returns {Array} [storedValue, setValue] - Estado atual e função para atualizar
 */
const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obter do localStorage pelo key
      const item = window.localStorage.getItem(key);
      // Retornar item do localStorage ou initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler ${key} do localStorage:`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor no localStorage e no estado
  const setValue = (value) => {
    try {
      // Permitir que o valor seja uma função, como em setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salvar no estado
      setStoredValue(valueToStore);
      // Salvar no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  // Efeito para sincronizar com o localStorage em caso de mudanças externas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Erro ao sincronizar ${key} do localStorage:`, error);
        }
      }
    };

    // Adicionar listener para mudanças no localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup: remover listener ao desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;