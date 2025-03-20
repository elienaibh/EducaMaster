// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  // Se não há usuário autenticado, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Se o usuário está autenticado, renderiza as rotas filhas
  return <Outlet />;
};

export default ProtectedRoute;