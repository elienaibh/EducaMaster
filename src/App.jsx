// src/App.jsx
import React, { useState } from 'react';
import { PlusCircle, Bell, User, BookOpen, Settings, ChevronDown } from 'lucide-react';

// Importar componentes UI
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Input from './components/ui/Input';
import Badge from './components/ui/Badge';
import Avatar from './components/ui/Avatar';
import ProgressBar from './components/ui/ProgressBar';
import Tabs from './components/ui/Tabs';
import Toggle from './components/ui/Toggle';
import Dropdown, { DropdownItem, DropdownDivider, DropdownHeader } from './components/ui/Dropdown';
import useToast from './hooks/useToast';
import Modal, { ModalHeader, ModalBody, ModalFooter } from './components/ui/Modal';

function App() {
  // Estado para controlar os componentes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [tabIndex, setTabIndex] = useState('dashboard');
  
  // Toast
  const { ToastContainer, toast } = useToast();
  
  // Dados de exemplo para as abas
  const tabsData = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <BookOpen className="w-4 h-4" />,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Dashboard</h3>
          <p>Aqui você verá seu progresso e estatísticas de aprendizagem.</p>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Progresso semanal</h4>
            <ProgressBar value={65} showValue={true} label="Quizzes" className="mb-2" />
            <ProgressBar value={40} showValue={true} color="secondary" label="Flashcards" className="mb-2" />
            <ProgressBar value={80} showValue={true} color="success" label="Leitura" />
          </div>
        </div>
      ),
    },
    {
      id: 'quizzes',
      title: 'Quizzes',
      badge: <Badge variant="primary">3</Badge>,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Quizzes</h3>
          <p>Gerencie seus quizzes e desafios.</p>
        </div>
      ),
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Flashcards</h3>
          <p>Seus decks de flashcards para revisão espaçada.</p>
        </div>
      ),
    },
  ];
  
  // Função para mostrar um toast
  const showToast = (type) => {
    switch (type) {
      case 'success':
        toast.success({
          title: 'Operação concluída',
          message: 'Seu progresso foi salvo com sucesso!',
        });
        break;
      case 'error':
        toast.error({
          title: 'Erro',
          message: 'Não foi possível conectar ao servidor.',
        });
        break;
      case 'warning':
        toast.warning({
          title: 'Atenção',
          message: 'Você está prestes a perder seu progresso.',
        });
        break;
      default:
        toast.info({
          title: 'Informação',
          message: 'Nova atualização disponível para o sistema.',
        });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Barra de navegação */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-primary-600 text-xl font-bold">EducaMaster AI</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-primary-500 text-primary-600 border-b-2 px-1 pt-1 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-neutral-500 hover:text-primary-600 px-1 pt-1 text-sm font-medium">
                  Quizzes
                </a>
                <a href="#" className="text-neutral-500 hover:text-primary-600 px-1 pt-1 text-sm font-medium">
                  Flashcards
                </a>
                <a href="#" className="text-neutral-500 hover:text-primary-600 px-1 pt-1 text-sm font-medium">
                  Programação
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="primary" 
                size="sm" 
                icon={<PlusCircle className="w-4 h-4" />}
                onClick={() => setIsModalOpen(true)}
              >
                Novo
              </Button>
              <Dropdown
                align="right"
                trigger={
                  <button className="p-1 rounded-full text-neutral-500 hover:text-primary-600 focus:outline-none">
                    <Bell className="w-6 h-6" />
                  </button>
                }
              >
                <DropdownHeader>Notificações</DropdownHeader>
                <DropdownItem>Nova mensagem recebida</DropdownItem>
                <DropdownItem>Quiz concluído</DropdownItem>
                <DropdownDivider />
                <DropdownItem>Ver todas as notificações</DropdownItem>
              </Dropdown>
              <Dropdown
                align="right"
                trigger={
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar size="sm" alt="Maria Silva" />
                    <span className="hidden md:block text-sm font-medium text-neutral-700">Maria Silva</span>
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  </div>
                }
              >
                <DropdownItem icon={<User className="w-4 h-4" />}>Meu Perfil</DropdownItem>
                <DropdownItem icon={<Settings className="w-4 h-4" />}>Configurações</DropdownItem>
                <DropdownDivider />
                <DropdownItem>Sair</DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna de perfil */}
            <div className="col-span-1">
              <Card className="mb-6">
                <div className="flex flex-col items-center">
                  <Avatar size="2xl" alt="Maria Silva" src="" />
                  <h2 className="mt-4 font-bold text-lg">Maria Silva</h2>
                  <p className="text-neutral-500 text-sm">Nível 15 • 2850 XP</p>
                  
                  <div className="w-full mt-4">
                    <div className="flex justify-between text-sm text-neutral-500 mb-1">
                      <span>Nível 15</span>
                      <span>Nível 16</span>
                    </div>
                    <ProgressBar value={75} max={100} height="h-2" />
                  </div>
                  
                  <div className="flex space-x-2 mt-6">
                    <Badge variant="success">5 dias consecutivos</Badge>
                    <Badge variant="primary">Mestre em Quizzes</Badge>
                  </div>
                  
                  <Button className="mt-6 w-full">Ver perfil completo</Button>
                </div>
              </Card>
              
              <Card title="Configurações rápidas">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Modo noturno</span>
                    <Toggle checked={isToggleOn} onChange={setIsToggleOn} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Notificações</span>
                    <Toggle checked={true} onChange={() => {}} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Som</span>
                    <Toggle checked={false} onChange={() => {}} />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Coluna principal */}
            <div className="col-span-1 md:col-span-2">
              <Card>
                <Tabs 
                  tabs={tabsData} 
                  defaultTab="dashboard"
                  onChange={setTabIndex}
                />
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <Card title="Boss atual" className="h-full">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-lg">Mestre do Esquecimento</h3>
                      <Badge variant="danger">Boss</Badge>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">
                      Derrote o boss respondendo corretamente às questões e flashcards.
                    </p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">HP</span>
                        <span>650/1000</span>
                      </div>
                      <ProgressBar value={65} max={100} color="danger" />
                    </div>
                    <Button variant="danger" className="mt-2">Atacar boss</Button>
                  </div>
                </Card>
                
                <Card title="Atividades recentes" className="h-full">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Badge dot variant="success" className="relative top-0.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Quiz de História completado</p>
                        <p className="text-xs text-neutral-500">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Badge dot variant="primary" className="relative top-0.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">10 flashcards revisados</p>
                        <p className="text-xs text-neutral-500">Há 5 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Badge dot variant="warning" className="relative top-0.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Novo desafio desbloqueado</p>
                        <p className="text-xs text-neutral-500">Há 1 dia</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card title="Recomendações para você">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Quiz de Matemática</h4>
                      <p className="text-sm text-neutral-600 mb-4">Melhore suas habilidades com frações e equações.</p>
                      <Button variant="outline" size="sm">Iniciar quiz</Button>
                    </div>
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Flashcards de Biologia</h4>
                      <p className="text-sm text-neutral-600 mb-4">Revise conceitos importantes sobre células.</p>
                      <Button variant="outline" size="sm">Ver flashcards</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Toast Container */}
      <ToastContainer />
      
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
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
            <Button 
              onClick={() => {
                setIsModalOpen(false);
                showToast('success');
              }}
            >
              Criar
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      
      {/* Barra de ferramentas de toasts */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => showToast('success')}>Mostrar Success</Button>
            <Button size="sm" variant="danger" onClick={() => showToast('error')}>Mostrar Error</Button>
            <Button size="sm" variant="warning" onClick={() => showToast('warning')}>Mostrar Warning</Button>
            <Button size="sm" variant="secondary" onClick={() => showToast('info')}>Mostrar Info</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;