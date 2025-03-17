// src/pages/DashboardPage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, LightbulbIcon, Code, Plus, Calendar, TrendingUp, Clock } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Avatar from '../../components/ui/Avatar';
import Tabs from '../../components/ui/Tabs';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock de dados do usuário
  const user = {
    name: 'João Silva',
    level: 5,
    xp: 2850,
    nextLevelXp: 5000,
    streakDays: 3,
    totalQuizzes: 25,
    totalFlashcards: 12,
  };
  
  // Mock de dados do Boss
  const boss = {
    name: 'Mestre do Esquecimento',
    maxHealth: 1000,
    currentHealth: 650,
    level: 1,
    rewards: ['badge-memory-master', 'theme-dark-scholar'],
  };
  
  // Mock de dados de atividades recentes
  const recentActivities = [
    { type: 'quiz', title: 'Quiz de História completado', time: '2h atrás', icon: <Brain className="w-4 h-4" /> },
    { type: 'flashcard', title: '10 flashcards revisados', time: '5h atrás', icon: <LightbulbIcon className="w-4 h-4" /> },
    { type: 'boss', title: 'Dano causado ao Boss', time: '1 dia atrás', icon: <TrendingUp className="w-4 h-4" /> },
    { type: 'streak', title: 'Sequência de 3 dias', time: '1 dia atrás', icon: <Calendar className="w-4 h-4" /> },
  ];
  
  // Mock de dados de progresso
  const progressData = [
    { label: 'Quizzes', value: 80, color: 'primary' },
    { label: 'Flashcards', value: 65, color: 'secondary' },
    { label: 'Programação', value: 45, color: 'success' },
    { label: 'Idiomas', value: 30, color: 'warning' },
  ];
  
  // Mock de dados de recomendações
  const recommendations = [
    { 
      type: 'quiz', 
      title: 'Quiz de Matemática', 
      description: 'Melhore suas habilidades com frações e equações.', 
      time: '10 questões • 15min' 
    },
    { 
      type: 'flashcard', 
      title: 'Flashcards de Biologia', 
      description: 'Revise conceitos importantes sobre células.', 
      time: '15 cartões • Revisão diária' 
    },
  ];
  
  // Mock de dados para os próximos eventos
  const upcomingEvents = [
    { 
      title: 'Revisão de Flashcards', 
      description: 'Biologia - Revisão programada', 
      time: 'Hoje', 
      icon: <Clock className="w-4 h-4 text-primary-500" /> 
    },
    { 
      title: 'Quiz pendente', 
      description: 'História - Continue de onde parou', 
      time: 'Amanhã', 
      icon: <Brain className="w-4 h-4 text-secondary-500" /> 
    },
  ];
  
  // Abrir o modal de criação de conteúdo
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  // Função para lidar com o ataque ao Boss
  const handleAttackBoss = () => {
    // Aqui você implementaria a lógica real para atacar o Boss
    alert('Atacando o Boss!');
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Dashboard</h1>
        <p className="text-neutral-600">
          Bem-vindo de volta, {user.name}! Continue seu progresso e derrote o Boss.
        </p>
      </div>
      
      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna lateral */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card de progresso do usuário */}
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <Avatar size="lg" alt={user.name} />
              <div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="primary">Nível {user.level}</Badge>
                  <Badge variant="success">{user.streakDays} dias</Badge>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso para Nível {user.level + 1}</span>
                <span>{user.xp} / {user.nextLevelXp} XP</span>
              </div>
              <ProgressBar 
                value={user.xp} 
                max={user.nextLevelXp}
                color="primary"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{user.totalQuizzes}</div>
                <div className="text-sm text-neutral-600">Quizzes</div>
              </div>
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-600">{user.totalFlashcards}</div>
                <div className="text-sm text-neutral-600">Flashcards</div>
              </div>
            </div>
          </Card>
          
          {/* Card do Boss atual */}
          <Card title="Boss Atual">
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{boss.name}</h3>
                <Badge variant="danger">Boss</Badge>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                Derrote o boss respondendo corretamente às questões e flashcards.
              </p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>HP</span>
                  <span>{boss.currentHealth} / {boss.maxHealth}</span>
                </div>
                <ProgressBar 
                  value={boss.currentHealth} 
                  max={boss.maxHealth}
                  color="boss"
                />
              </div>
              <Button variant="danger" onClick={handleAttackBoss}>
                Atacar boss
              </Button>
            </div>
          </Card>
          
          {/* Card de atividades recentes */}
          <Card title="Atividades Recentes">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center mr-3">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-neutral-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Conteúdo principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card de progresso */}
          <Card title="Seu Progresso">
            <div className="space-y-4">
              {progressData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <ProgressBar 
                    value={item.value} 
                    max={100}
                    color={item.color}
                  />
                </div>
              ))}
            </div>
          </Card>
          
          {/* Cards de recomendações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Recomendações */}
            <Card title="Recomendado para você">
              <div className="space-y-4">
                {recommendations.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg border-neutral-200">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-neutral-600 my-1">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-neutral-500">{item.time}</span>
                      <Button variant="outline" size="sm">
                        {item.type === 'quiz' ? 'Iniciar' : 'Revisar'}
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => openModal()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar novo conteúdo
                </Button>
              </div>
            </Card>
            
            {/* Próximos eventos */}
            <Card title="Próximos Eventos">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 border rounded-lg border-neutral-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        {event.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-neutral-600 my-1">{event.description}</p>
                        <div className="flex items-center gap-1 text-xs text-primary-600">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Estatísticas detalhadas */}
          <Card title="Estatísticas da Semana">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">12</div>
                <div className="text-sm text-neutral-600">Quizzes concluídos</div>
              </div>
              <div className="text-center p-4 bg-secondary-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-600">87</div>
                <div className="text-sm text-neutral-600">Flashcards revisados</div>
              </div>
              <div className="text-center p-4 bg-success-50 rounded-lg">
                <div className="text-2xl font-bold text-success-600">350</div>
                <div className="text-sm text-neutral-600">XP ganho</div>
              </div>
              <div className="text-center p-4 bg-warning-50 rounded-lg">
                <div className="text-2xl font-bold text-warning-600">3.5h</div>
                <div className="text-sm text-neutral-600">Tempo de estudo</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Modal de criação de conteúdo */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          Criar novo conteúdo
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input 
              label="Título" 
              name="title" 
              placeholder="Digite um título para o conteúdo" 
              required 
            />
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Tipo de conteúdo
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline"
                  className="justify-center py-3"
                >
                  Quiz
                </Button>
                <Button 
                  variant="outline"
                  className="justify-center py-3"
                >
                  Flashcards
                </Button>
              </div>
            </div>
            <Input 
              label="Texto base" 
              name="content" 
              placeholder="Cole ou digite o texto para gerar perguntas" 
              required 
              as="textarea"
              rows={5}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Criar
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DashboardPage;