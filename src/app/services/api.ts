import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Se o erro for 401 (não autorizado) e não for uma tentativa de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tentar renovar o token
        const response = await api.post('/api/auth/refresh');
        const { token } = response.data;

        localStorage.setItem('token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Se não conseguir renovar o token, fazer logout
        localStorage.removeItem('token');
        window.location.href = '/entrar';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export const apiService = {
  // GET request
  async get<T>(url: string, params?: unknown): Promise<T> {
    try {
      const response = await api.get<T>(url, { params });
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // POST request
  async post<T>(url: string, data?: unknown): Promise<T> {
    try {
      const response = await api.post<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // PUT request
  async put<T>(url: string, data?: unknown): Promise<T> {
    try {
      const response = await api.put<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // PATCH request
  async patch<T>(url: string, data?: unknown): Promise<T> {
    try {
      const response = await api.patch<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // DELETE request
  async delete<T>(url: string): Promise<T> {
    try {
      const response = await api.delete<T>(url);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // Tratamento de erros
  handleError(error: unknown): ApiError {
    const response = error.response;
    const errorCode = response?.data?.code || 'unknown';
    let message = 'Ocorreu um erro inesperado.';
    let details = response?.data?.details;

    switch (response?.status) {
      case 400:
        message = 'Requisição inválida.';
        break;
      case 401:
        message = 'Não autorizado.';
        break;
      case 403:
        message = 'Acesso negado.';
        break;
      case 404:
        message = 'Recurso não encontrado.';
        break;
      case 422:
        message = 'Dados inválidos.';
        break;
      case 429:
        message = 'Muitas requisições. Tente novamente mais tarde.';
        break;
      case 500:
        message = 'Erro interno do servidor.';
        break;
    }

    return {
      code: errorCode,
      message: response?.data?.message || message,
      details,
    };
  },
};
