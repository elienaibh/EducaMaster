// src/pages/AuthPage/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Função para manipular mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Função para fazer login (mock)
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validação simples
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }
    
    // Simulação de login (mock)
    setTimeout(() => {
      // Em uma aplicação real, você faria uma requisição ao backend
      if (formData.email === 'teste@exemplo.com' && formData.password === 'senha123') {
        // Login bem-sucedido
        localStorage.setItem('auth', 'true');
        navigate('/dashboard');
      } else {
        // Login falhou
        setError('Email ou senha inválidos.');
      }
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">EducaMaster AI</h1>
          <p className="text-neutral-600">
            Entre na sua conta para continuar
          </p>
        </div>
        
        <Card className="mb-6">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input 
                label="Email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="seu@email.com" 
                required 
              />
              
              <Input 
                label="Senha" 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Sua senha" 
                required 
              />
              
              {error && (
                <div className="p-3 bg-danger-50 text-danger-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-primary-600" />
                  <span className="ml-2 text-sm text-neutral-600">Lembrar-me</span>
                </label>
                
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                  Esqueceu a senha?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </form>
        </Card>
        
        <div className="text-center">
          <p className="text-neutral-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
        
        {/* Login rápido para fins de demonstração */}
        <div className="mt-8 p-4 bg-neutral-100 rounded-lg">
          <h3 className="text-sm font-medium text-neutral-700 mb-2">
            Para fins de demonstração:
          </h3>
          <div className="text-sm text-neutral-600">
            <p>Email: teste@exemplo.com</p>
            <p>Senha: senha123</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => {
              setFormData({
                email: 'teste@exemplo.com',
                password: 'senha123',
              });
            }}
          >
            Preencher dados de teste
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;