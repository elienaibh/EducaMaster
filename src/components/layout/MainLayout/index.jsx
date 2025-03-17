// src/components/layout/MainLayout/index.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Brain, LightbulbIcon, Code, Globe, User, Settings, LogOut } from 'lucide-react';

// Importar componentes UI
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock de dados do usuário (substituir por contexto real posteriormente)
  const user = {
    name: 'João Silva',
    level: 5,
    avatar: '',
    xp: 2850
  };
  
  // Itens da navegação
  const navItems = [
    { label: 'Início', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { label: 'Quizzes', icon: <Brain className="w-5 h-5" />, path: '/quiz' },
    { label: 'Flashcards', icon: <LightbulbIcon className="w-5 h-5" />, path: '/flashcards' },
    { label: 'Programação', icon: <Code className="w-5 h-5" />, path: '/programming' },
    { label: 'Idiomas', icon: <Globe className="w-5 h-5" />, path: '/language' },
  ];
  
  // Itens da parte inferior da navegação
  const bottomNavItems = [
    { label: 'Meu Perfil', icon: <User className="w-5 h-5" />, path: '/profile' },
    { label: 'Configurações', icon: <Settings className="w-5 h-5" />, path: '/settings' },
  ];
  
  // Mock de logout
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };
  
  // Alternar a visibilidade da sidebar em telas pequenas
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Fechar a sidebar em telas pequenas (após clicar em um item)
  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };
  
  // NavItem reutilizável
  const NavItem = ({ item, onClick }) => (
    <Link 
      to={item.path} 
      className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
      onClick={onClick}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );
  
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Overlay para fechar sidebar em telas pequenas */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 z-30 transition-transform duration-300 lg:translate-x-0 lg:static
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo e botão fechar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
            <Link to="/dashboard" className="text-xl font-bold text-primary-600">
              EducaMaster AI
            </Link>
            <button className="lg:hidden" onClick={toggleSidebar}>
              <X className="w-6 h-6 text-neutral-500" />
            </button>
          </div>
          
          {/* Informações do usuário */}
          <div className="px-4 py-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <Avatar size="md" alt={user.name} status="online" />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-neutral-500">Nível {user.level} • {user.xp} XP</p>
              </div>
            </div>
          </div>
          
          {/* Navegação principal */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <NavItem key={index} item={item} onClick={closeSidebar} />
              ))}
            </div>
            
            {/* Divider */}
            <div className="my-4 border-t border-neutral-200" />
            
            {/* Navegação inferior */}
            <div className="space-y-1">
              {bottomNavItems.map((item, index) => (
                <NavItem key={index} item={item} onClick={closeSidebar} />
              ))}
              
              {/* Botão de logout */}
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
      
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            {/* Botão de menu mobile */}
            <button 
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:text-primary-600 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Título da página (exemplo) */}
            <h1 className="text-lg font-medium text-neutral-800 lg:hidden">
              EducaMaster AI
            </h1>
            
            {/* Botões de ação */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/quiz/create')}
              >
                Criar conteúdo
              </Button>
              <Link to="/profile">
                <Avatar size="sm" alt={user.name} status="online" className="cursor-pointer" />
              </Link>
            </div>
          </div>
        </header>
        
        {/* Conteúdo da página */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;