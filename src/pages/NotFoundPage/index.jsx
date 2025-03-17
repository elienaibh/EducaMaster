// src/pages/NotFoundPage/index.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-2xl font-bold text-neutral-800 mt-4 mb-2">Página não encontrada</h2>
          <p className="text-neutral-600">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => navigate('/')}
            icon={<Home className="w-5 h-5" />}
          >
            Voltar para a página inicial
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Voltar para a página anterior
          </Button>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-neutral-500">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;