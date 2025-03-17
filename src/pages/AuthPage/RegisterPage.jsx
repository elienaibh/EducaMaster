// src/pages/AuthPage/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Função para manipular mudanças nos inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  // Função para fazer registro (mock)
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validação simples
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }
    
    if (!formData.termsAccepted) {
      setError('Você precisa aceitar os termos de uso.');
      setLoading(false);
      return;
    }
    
    // Simulação de registro (mock)
    setTimeout(() => {
      // Em uma aplicação real, você faria uma requisição ao backend
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">EducaMaster AI</h1>
          <p className="text-neutral-600">
            Crie sua conta para começar a aprender
          </p>
        </div>
        
        <Card className="mb-6">
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <Input 
                label="Nome completo" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Seu nome" 
                required 
              />
              
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
              
              <Input 
                label="Confirmar senha" 
                name="confirmPassword" 
                type="password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Confirme sua senha" 
                required 
              />
              
              {error && (
                <div className="p-3 bg-danger-50 text-danger-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex items-center">
                <input 
                  id="termsAccepted" 
                  name="termsAccepted"
                  type="checkbox" 
                  className="w-4 h-4 text-primary-600 rounded" 
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required 
                />
                <label htmlFor="termsAccepted" className="ml-2 text-sm text-neutral-600">
                  Eu concordo com os <a href="#" className="text-primary-600 hover:text-primary-700">Termos de Serviço</a> e <a href="#" className="text-primary-600 hover:text-primary-700">Política de Privacidade</a>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </Card>
        
        <div className="text-center">
          <p className="text-neutral-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;