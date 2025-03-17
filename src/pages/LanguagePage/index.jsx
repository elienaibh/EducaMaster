// src/pages/LanguagePage/index.jsx - linha inicial com importações corrigidas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Headphones, BookOpen, Volume2, Upload, Plus, Clock } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const LanguagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock de dados dos cursos de idiomas
  const languageCourses = [
    {
      id: 'lang-1',
      title: 'Inglês Básico',
      language: 'Inglês',
      level: 'Iniciante',
      description: 'Aprenda vocabulário e gramática básica do inglês.',
      lessons: 20,
      completedLessons: 8,
      progress: 40,
      lastStudied: '1 dia atrás',
    },
    {
      id: 'lang-2',
      title: 'Espanhol para Viagens',
      language: 'Espanhol',
      level: 'Iniciante',
      description: 'Aprenda frases e vocabulário essencial para viagens.',
      lessons: 15,
      completedLessons: 3,
      progress: 20,
      lastStudied: '3 dias atrás',
    },
    {
      id: 'lang-3',
      title: 'Francês Intermediário',
      language: 'Francês',
      level: 'Intermediário',
      description: 'Aprimore sua conversação e compreensão de textos em francês.',
      lessons: 25,
      completedLessons: 0,
      progress: 0,
      lastStudied: 'Nunca',
    },
    {
      id: 'lang-4',
      title: 'Japonês - Hiragana e Katakana',
      language: 'Japonês',
      level: 'Iniciante',
      description: 'Aprenda os sistemas de escrita básicos do japonês.',
      lessons: 18,
      completedLessons: 4,
      progress: 22,
      lastStudied: '5 dias atrás',
    },
  ];
  
  // Mock de dados de materiais de audiovisual
  const audioSyncMaterials = [
    {
      id: 'audio-1',
      title: 'Conversação em Inglês - Situações Cotidianas',
      language: 'Inglês',
      type: 'Diálogo',
      duration: '15min',
      description: 'Diálogos em inglês para situações do dia a dia com sincronização de texto e áudio.',
    },
    {
      id: 'audio-2',
      title: 'Música "La Vie en Rose" com Legendas',
      language: 'Francês',
      type: 'Música',
      duration: '3min',
      description: 'Música francesa com sincronização de letra e tradução.',
    },
    {
      id: 'audio-3',
      title: 'Notícias em Espanhol - Nível Intermediário',
      language: 'Espanhol',
      type: 'Notícia',
      duration: '8min',
      description: 'Notícias em espanhol com vocabulário de nível intermediário.',
    },
  ];
  
  // Função para acessar um curso de idioma
  const handleAccessCourse = (courseId) => {
    alert(`Acessando o curso ${courseId}`);
    // Em uma aplicação real, navegaríamos para a página do curso
    // navigate(`/language/course/${courseId}`);
  };
  
  // Função para acessar material de sincronização de áudio
  const handleAccessAudioSync = (materialId) => {
    navigate(`/language/audio-sync/${materialId}`);
  };
  
  // Renderizar badge de nível
  const renderLevelBadge = (level) => {
    switch (level) {
      case 'Iniciante':
        return <Badge variant="success">{level}</Badge>;
      case 'Intermediário':
        return <Badge variant="warning">{level}</Badge>;
      case 'Avançado':
        return <Badge variant="danger">{level}</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };
  
  // Renderizar badge de idioma
  const renderLanguageBadge = (language) => {
    switch (language) {
      case 'Inglês':
        return <Badge variant="primary">{language}</Badge>;
      case 'Espanhol':
        return <Badge variant="secondary">{language}</Badge>;
      case 'Francês':
        return <Badge variant="info">{language}</Badge>;
      case 'Japonês':
        return <Badge variant="danger">{language}</Badge>;
      default:
        return <Badge>{language}</Badge>;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Aprendizado de Idiomas</h1>
        <p className="text-neutral-600">
          Aprenda idiomas com materiais audiovisuais sincronizados e exercícios interativos.
        </p>
      </div>
      
      {/* Cursos de Idiomas */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-neutral-800">Seus Cursos</h2>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Novo Curso
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languageCourses.map(course => (
            <Card key={course.id} className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {renderLanguageBadge(course.language)}
                      {renderLevelBadge(course.level)}
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-600 text-sm mt-2 mb-4">{course.description}</p>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-primary-50 rounded-lg">
                    <div className="font-bold text-primary-600">{course.lessons}</div>
                    <div className="text-xs text-neutral-600">Lições</div>
                  </div>
                  <div className="text-center p-2 bg-primary-50 rounded-lg">
                    <div className="font-bold text-primary-600">{course.completedLessons}</div>
                    <div className="text-xs text-neutral-600">Concluídas</div>
                  </div>
                  <div className="text-center p-2 bg-primary-50 rounded-lg">
                    <div className="font-bold text-primary-600">{course.progress}%</div>
                    <div className="text-xs text-neutral-600">Progresso</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <ProgressBar value={course.progress} max={100} color="primary" />
                </div>
                
                <div className="mt-auto flex justify-between items-center">
                  <div className="text-sm text-neutral-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Último estudo: {course.lastStudied}</span>
                  </div>
                  <Button onClick={() => handleAccessCourse(course.id)}>
                    {course.progress > 0 ? 'Continuar' : 'Iniciar'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Card para criar novo curso */}
          <Card 
            className="h-full border-dashed border-2 border-neutral-300 bg-neutral-50 flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">Iniciar Novo Curso</h3>
              <p className="text-neutral-600 text-sm">
                Adicione um novo idioma ao seu aprendizado.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Materiais de Sincronização de Áudio */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-neutral-800">Materiais com Sincronização de Áudio</h2>
          <Button 
            variant="outline"
            icon={<Upload className="w-4 h-4" />}
          >
            Importar Material
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audioSyncMaterials.map(material => (
            <Card key={material.id} className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{material.title}</h3>
                  {renderLanguageBadge(material.language)}
                </div>
                
                <p className="text-neutral-600 text-sm mt-2 mb-4">{material.description}</p>
                
                <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                  <div className="flex items-center">
                    <Headphones className="w-4 h-4 mr-1" />
                    <span>{material.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{material.duration}</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    onClick={() => handleAccessAudioSync(material.id)}
                    icon={<VolumeUp className="w-4 h-4" />}
                  >
                    Iniciar Estudo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Card para adicionar novo material */}
          <Card 
            className="h-full border-dashed border-2 border-neutral-300 bg-neutral-50 flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors"
          >
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">Adicionar Material</h3>
              <p className="text-neutral-600 text-sm">
                Importe áudio e texto para sincronização.
              </p>
              <Button className="mt-4" variant="outline" icon={<Upload className="w-4 h-4" />}>
                Importar Arquivo
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Modal para criar novo curso */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          Iniciar novo curso de idioma
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Idioma
              </label>
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Selecione um idioma</option>
                <option value="Inglês">Inglês</option>
                <option value="Espanhol">Espanhol</option>
                <option value="Francês">Francês</option>
                <option value="Alemão">Alemão</option>
                <option value="Italiano">Italiano</option>
                <option value="Japonês">Japonês</option>
                <option value="Chinês">Chinês</option>
                <option value="Russo">Russo</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Nível
              </label>
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Selecione um nível</option>
                <option value="Iniciante">Iniciante (A1-A2)</option>
                <option value="Intermediário">Intermediário (B1-B2)</option>
                <option value="Avançado">Avançado (C1-C2)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Objetivo
              </label>
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Selecione um objetivo</option>
                <option value="Geral">Aprendizado Geral</option>
                <option value="Viagem">Viagens</option>
                <option value="Negócios">Negócios</option>
                <option value="Acadêmico">Acadêmico</option>
                <option value="Conversação">Conversação</option>
              </select>
            </div>
            
            <Input 
              label="Meta diária (minutos)" 
              name="dailyGoal" 
              type="number" 
              min="5"
              max="180"
              step="5"
              defaultValue="15"
              required 
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Iniciar Curso
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LanguagePage;