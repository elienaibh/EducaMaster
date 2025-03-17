// src/pages/ProfilePage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Award, Book, Calendar, Clock, TrendingUp, Edit, Camera } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock de dados do usuário
  const user = {
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    level: 5,
    xp: 2850,
    nextLevelXp: 5000,
    streakDays: 3,
    joinDate: '10/01/2025',
    totalStudyTime: '42h 30min',
    totalQuizzes: 25,
    totalFlashcards: 150,
    badges: [
      { id: 'badge-1', name: 'Iniciante', description: 'Completou o tutorial inicial' },
      { id: 'badge-2', name: '3 dias seguidos', description: 'Estudou por 3 dias consecutivos' },
      { id: 'badge-3', name: 'Quiz Master', description: 'Completou 20 quizzes' },
      { id: 'badge-4', name: 'Primeiro Boss', description: 'Derrotou o primeiro Boss' },
    ],
    stats: [
      { name: 'Quizzes completados', value: 25, icon: <Book className="w-5 h-5 text-primary-500" /> },
      { name: 'Flashcards estudados', value: 150, icon: <TrendingUp className="w-5 h-5 text-secondary-500" /> },
      { name: 'Dias consecutivos', value: 3, icon: <Calendar className="w-5 h-5 text-success-500" /> },
      { name: 'Horas de estudo', value: '42h 30min', icon: <Clock className="w-5 h-5 text-warning-500" /> },
    ],
    recentActivities: [
      { type: 'quiz', title: 'Quiz de História completado', time: '2h atrás', score: '85%' },
      { type: 'flashcard', title: '10 flashcards revisados', time: '5h atrás', mastery: '70%' },
      { type: 'boss', title: 'Dano causado ao Boss', time: '1 dia atrás', damage: '150 HP' },
      { type: 'streak', title: 'Sequência de 3 dias', time: '1 dia atrás', reward: '+50 XP' },
    ],
  };
  
  // Estado para o formulário de edição
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  
  // Atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Salvar as alterações
  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Perfil</h1>
        <p className="text-neutral-600">
          Gerencie seu perfil, veja suas conquistas e acompanhe seu progresso.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna lateral com informações do perfil */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card de perfil */}
          <Card>
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-4">
                <Avatar size="2xl" alt={user.name} />
                <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-1 rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              {isEditing ? (
                <div className="w-full space-y-4">
                  <Input 
                    label="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input 
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      className="w-full" 
                      onClick={handleSave}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-neutral-500">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="primary">Nível {user.level}</Badge>
                    <Badge variant="success">{user.streakDays} dias</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => setIsEditing(true)}
                    icon={<Edit className="w-4 h-4" />}
                  >
                    Editar Perfil
                  </Button>
                </>
              )}
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso para Nível {user.level + 1}</span>
                <span>{user.xp} / {user.nextLevelXp} XP</span>
              </div>
              <ProgressBar value={user.xp} max={user.nextLevelXp} />
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Membro desde</span>
                <span>{user.joinDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tempo total de estudo</span>
                <span>{user.totalStudyTime}</span>
              </div>
            </div>
          </Card>
          
          {/* Card de estatísticas */}
          <Card title="Estatísticas">
            <div className="grid grid-cols-2 gap-4">
              {user.stats.map((stat, index) => (
                <div key={index} className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {stat.icon}
                    <span className="font-medium text-sm">{stat.name}</span>
                  </div>
                  <div className="text-xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Conteúdo principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card de conquistas */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Conquistas</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/profile/achievements')}
              >
                Ver todas
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user.badges.map((badge) => (
                <div key={badge.id} className="p-4 bg-neutral-50 rounded-lg text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-neutral-500">{badge.description}</p>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Card de atividades recentes */}
          <Card title="Atividades Recentes">
            <div className="space-y-4">
              {user.recentActivities.map((activity, index) => (
                <div key={index} className="p-4 border rounded-lg border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-neutral-500">{activity.time}</p>
                    </div>
                    <Badge variant={
                      activity.type === 'quiz' ? 'primary' : 
                      activity.type === 'flashcard' ? 'secondary' : 
                      activity.type === 'boss' ? 'danger' : 
                      'success'
                    }>
                      {activity.score || activity.mastery || activity.damage || activity.reward}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Card de privacidade */}
          <Card title="Configurações de Privacidade">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg border-neutral-200">
                <div>
                  <h3 className="font-medium">Perfil Público</h3>
                  <p className="text-sm text-neutral-600">Permitir que outros usuários vejam seu perfil</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded-lg border-neutral-200">
                <div>
                  <h3 className="font-medium">Mostrar na Classificação</h3>
                  <p className="text-sm text-neutral-600">Permitir que seu progresso apareça nas classificações</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded-lg border-neutral-200">
                <div>
                  <h3 className="font-medium">Compartilhar Progresso</h3>
                  <p className="text-sm text-neutral-600">Compartilhar automaticamente conquistas nas redes sociais</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/settings')}
              >
                Mais Configurações
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;