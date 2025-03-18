// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BookOpen, Brain, LightbulbIcon, Code, Plus } from 'lucide-react';

// Importar componentes
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Badge from './components/ui/Badge';
import ProgressBar from './components/ui/ProgressBar';
import Avatar from './components/ui/Avatar';
import Toggle from './components/ui/Toggle';
import Tabs from './components/ui/Tabs';
import Modal, { ModalHeader, ModalBody, ModalFooter } from './components/ui/Modal';
import Input from './components/ui/Input';
import AppRoutes from './routes/AppRoutes';

// Importar novos providers
import { AuthProvider } from './contexts/AuthContext';
import { BossProvider } from './contexts/BossContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados de exemplo para as abas
  const tabsData = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <BookOpen className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-3">Seu Progresso</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quizzes</span>
                  <span>80%</span>
                </div>
                <ProgressBar value={80} max={100} color="primary" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Flashcards</span>
                  <span>65%</span>
                </div>
                <ProgressBar value={65} max={100} color="secondary" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Programação</span>
                  <span>45%</span>
                </div>
                <ProgressBar value={45} max={100} color="success" />
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Mestre do Esquecimento</h3>
              <Badge variant="danger">Boss</Badge>
            </div>
            <p className="text-sm text-neutral-600 mb-4">
              Derrote o boss respondendo corretamente às questões e flashcards.
            </p>
            <ProgressBar value={65} max={100} color="boss" height="h-2.5" />
            <div className="mt-4">
              <Button variant="danger">Atacar boss</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-3">Quizzes Recomendados</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg border-neutral-200">
                  <h4 className="font-medium">Matemática Básica</h4>
                  <p className="text-sm text-neutral-600 my-1">10 questões • 15min</p>
                  <Button variant="outline" size="sm">Iniciar</Button>
                </div>
                <div className="p-3 border rounded-lg border-neutral-200">
                  <h4 className="font-medium">História do Brasil</h4>
                  <p className="text-sm text-neutral-600 my-1">8 questões • 12min</p>
                  <Button variant="outline" size="sm">Iniciar</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Flashcards para Revisar</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg border-neutral-200">
                  <h4 className="font-medium">Biologia</h4>
                  <p className="text-sm text-neutral-600 my-1">15 cartões • Revisão diária</p>
                  <Button variant="outline" size="sm">Revisar</Button>
                </div>
                <div className="p-3 border rounded-lg border-neutral-200">
                  <h4 className="font-medium">Vocabulário de Inglês</h4>
                  <p className="text-sm text-neutral-600 my-1">20 cartões • Revisão pendente</p>
                  <Button variant="outline" size="sm">Revisar</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'quizzes',
      title: 'Quizzes',
      icon: <Brain className="w-4 h-4" />,
      badge: <Badge variant="primary">3</Badge>,
      content: (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Seus Quizzes</h3>
            <Button 
              size="sm" 
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Novo Quiz
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg border-neutral-200">
              <div className="flex justify-between">
                <h4 className="font-medium">Matemática Básica</h4>
                <Badge variant="success">Concluído</Badge>
              </div>
              <p className="text-sm text-neutral-600 my-2">10 questões • Última pontuação: 85%</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Refazer</Button>
                <Button variant="outline" size="sm">Estatísticas</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg border-neutral-200">
              <div className="flex justify-between">
                <h4 className="font-medium">História do Brasil</h4>
                <Badge variant="warning">Em progresso</Badge>
              </div>
              <p className="text-sm text-neutral-600 my-2">8 questões • Progresso: 50%</p>
              <div className="flex gap-2">
                <Button size="sm">Continuar</Button>
                <Button variant="outline" size="sm">Reiniciar</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg border-neutral-200">
              <div className="flex justify-between">
                <h4 className="font-medium">Geografia Mundial</h4>
                <Badge variant="neutral">Não iniciado</Badge>
              </div>
              <p className="text-sm text-neutral-600 my-2">12 questões • Estimativa: 20min</p>
              <div className="flex gap-2">
                <Button size="sm">Iniciar</Button>
                <Button variant="outline" size="sm">Detalhes</Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      icon: <LightbulbIcon className="w-4 h-4" />,
      content: (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Seus Flashcards</h3>
            <Button 
              size="sm" 
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Novo Deck
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border rounded-lg border-neutral-200">
              <h4 className="font-medium">Biologia</h4>
              <p className="text-sm text-neutral-600 my-2">15 cartões • Próxima revisão: Hoje</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-600">Domínio: 85%</span>
                <Button size="sm">Revisar</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg border-neutral-200">
              <h4 className="font-medium">Vocabulário de Inglês</h4>
              <p className="text-sm text-neutral-600 my-2">20 cartões • Próxima revisão: Hoje</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-600">Domínio: 70%</span>
                <Button size="sm">Revisar</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg border-neutral-200">
              <h4 className="font-medium">Química Orgânica</h4>
              <p className="text-sm text-neutral-600 my-2">25 cartões • Próxima revisão: Amanhã</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-600">Domínio: 60%</span>
                <Button size="sm">Revisar</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg border-neutral-200">
              <h4 className="font-medium">Fórmulas Matemáticas</h4>
              <p className="text-sm text-neutral-600 my-2">18 cartões • Próxima revisão: Em 2 dias</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-600">Domínio: 90%</span>
                <Button size="sm">Revisar</Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'programming',
      title: 'Programação',
      icon: <Code className="w-4 h-4" />,
      content: (
        <div>
          <h3 className="text-lg font-bold mb-4">Aprendizado de Programação</h3>
          <p className="mb-6">
            Aprenda programação através de desafios práticos e interativos.
            Cada desafio concluído causa dano ao Boss e desbloqueia novas habilidades.
          </p>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">Seu progresso</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary-600">10</div>
                <div className="text-sm text-neutral-600">Desafios concluídos</div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary-600">3</div>
                <div className="text-sm text-neutral-600">Nível atual</div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary-600">850</div>
                <div className="text-sm text-neutral-600">Pontos totais</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Desafios disponíveis</h4>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg border-neutral-200">
                <div className="flex justify-between">
                  <h4 className="font-medium">Iniciante: Variáveis e Operações</h4>
                  <Badge variant="success">Nível 1</Badge>
                </div>
                <p className="text-sm text-neutral-600 my-2">
                  Aprenda os conceitos básicos de programação trabalhando com variáveis e operações simples.
                </p>
                <Button size="sm">Iniciar desafio</Button>
              </div>
              

              <div className="p-4 border rounded-lg border-neutral-200">
                <div className="flex justify-between">
                  <h4 className="font-medium">Iniciante: Estruturas Condicionais</h4>
                  <Badge variant="success">Nível 1</Badge>
                </div>
                <p className="text-sm text-neutral-600 my-2">
                  Aprenda a usar if/else para criar lógica condicional em seus programas.
                </p>
                <Button size="sm">Iniciar desafio</Button>
              </div>
              
              <div className="p-4 border rounded-lg border-neutral-200">
                <div className="flex justify-between">
                  <h4 className="font-medium">Intermediário: Loops e Arrays</h4>
                  <Badge variant="warning">Nível 2</Badge>
                </div>
                <p className="text-sm text-neutral-600 my-2">
                  Trabalhe com loops e arrays para processar conjuntos de dados.
                </p>
                <Button size="sm">Iniciar desafio</Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <AuthProvider>
      <BossProvider>
        <Router>
          <div className="min-h-screen bg-neutral-50 p-4 py-8">
            <div className="max-w-6xl mx-auto">
              <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold text-primary-600">EducaMaster AI</h1>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                    Criar conteúdo
                  </Button>
                  <Avatar size="md" alt="Usuário" status="online" />
                  <div>
                    <p className="font-medium">João Silva</p>
                    <p className="text-sm text-neutral-500">Nível 5</p>
                  </div>
                </div>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Coluna Lateral */}
                <div className="md:col-span-1">
                  <Card className="mb-6">
                    <div className="flex flex-col items-center">
                      <Avatar size="xl" alt="João Silva" status="online" />
                      <h2 className="mt-4 font-bold text-lg">João Silva</h2>
                      <p className="text-neutral-500 text-sm">Nível 5 • 2850 XP</p>
                      
                      <div className="w-full mt-4">
                        <div className="flex justify-between text-sm text-neutral-500 mb-1">
                          <span>Progresso para Nível 6</span>
                          <span>65%</span>
                        </div>
                        <ProgressBar value={65} max={100} />
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-6 justify-center">
                        <Badge variant="success">3 dias consecutivos</Badge>
                        <Badge variant="primary">10 quizzes</Badge>
                      </div>
                      
                      <Button className="mt-6 w-full">Ver perfil completo</Button>
                    </div>
                  </Card>
                  
                  <Card title="Configurações">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-700">Modo escuro</span>
                        <Toggle checked={isDarkMode} onChange={setIsDarkMode} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-700">Notificações</span>
                        <Toggle checked={showNotifications} onChange={setShowNotifications} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-700">Sons</span>
                        <Toggle checked={true} onChange={() => {}} />
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Conteúdo Principal */}
                <div className="md:col-span-3">
                  <Card>
                    <Tabs tabs={tabsData} defaultTab="dashboard" />
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Modal para criar conteúdo */}
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
        </Router>
      </BossProvider>
    </AuthProvider>
  );
}

export default App;