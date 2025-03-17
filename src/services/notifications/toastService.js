// src/services/notifications/toastService.js
let toasts = [];
let listeners = [];
let counter = 0;

// Notificar todos os ouvintes sobre mudanças
const notifyListeners = () => {
  listeners.forEach(listener => listener(toasts));
};

// Adicionar um novo toast
const addToast = (toast) => {
  const id = `toast-${counter++}`;
  const newToast = { ...toast, id };
  toasts = [...toasts, newToast];
  notifyListeners();
  return id;
};

// Remover um toast
const removeToast = (id) => {
  toasts = toasts.filter(toast => toast.id !== id);
  notifyListeners();
};

// Limpar todos os toasts
const clearToasts = () => {
  toasts = [];
  notifyListeners();
};

// Adicionar um ouvinte para mudanças nos toasts
const subscribe = (listener) => {
  listeners.push(listener);
  listener(toasts); // Notificar imediatamente com o estado atual
  
  // Função para cancelar a inscrição
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

// Métodos de conveniência para diferentes tipos de toast
const success = (options) => {
  if (typeof options === 'string') {
    return addToast({ type: 'success', message: options });
  }
  return addToast({ ...options, type: 'success' });
};

const error = (options) => {
  if (typeof options === 'string') {
    return addToast({ type: 'error', message: options });
  }
  return addToast({ ...options, type: 'error' });
};

const warning = (options) => {
  if (typeof options === 'string') {
    return addToast({ type: 'warning', message: options });
  }
  return addToast({ ...options, type: 'warning' });
};

const info = (options) => {
  if (typeof options === 'string') {
    return addToast({ type: 'info', message: options });
  }
  return addToast({ ...options, type: 'info' });
};

// Serviço de toast
const toastService = {
  addToast,
  removeToast,
  clearToasts,
  subscribe,
  success,
  error,
  warning,
  info,
};

export default toastService;