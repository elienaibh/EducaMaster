// src/pages/QuizPage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Brain } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const QuizPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock de quizzes
  const quizzes = [
    {
      id: 'quiz-1',
      title: 'Matemática Básica',
      description: 'Revise conceitos fundamentais de matemática.',
      questions: 10,
      time: '15min',
      status: 'completed',
      score: 85,
    },
    {
      id: 'quiz-2',
      title: 'História do Brasil',
      description: 'Teste seus conhecimentos sobre a história brasileira.',
      questions: 8,
      time: '12min',
      status: 'in-progress',
      progress: 50,
    },
    {
      id: 'quiz-3',
      title: 'Geografia Mundial',
      description: 'Explore capitais, países e continentes.',
      questions: 12,
      time: '20min',
      status: 'not-started',
    },
    {
      id: 'quiz-4',
      title: 'Ciências Básicas',
      description: 'Fundamentos de física, química e biologia.',
      questions: 15,
      time: '25min',
      status: 'not-started',
    },
  ];
  
  // Função para navegar para os detalhes do quiz
  const handleQuizDetails = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };
  
  // Função para continuar ou iniciar um quiz
  const handlePlayQuiz = (quizId) => {
    navigate(`/quiz/${quizId}/play`);
  };
  
  // Renderizar status do quiz
  const renderStatus = (status, progress = 0, score = 0) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Concluído • {score}%</Badge>;
      case 'in-progress':
        return <Badge variant="warning">Em progresso • {progress}%</Badge>;
      default:
        return <Badge variant="neutral">Não iniciado</Badge>;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Quizzes</h1>
          <p className="text-neutral-600">
            Teste seu conhecimento com quizzes gerados por IA.
          </p>
        </div>
        <Button 
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Quiz
        </Button>
      </div>
      
      {/* Lista de Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{quiz.title}</h3>
                {renderStatus(quiz.status, quiz.progress, quiz.score)}
              </div>
              <p className="text-neutral-600 text-sm mt-2 mb-4">{quiz.description}</p>
              <div className="flex gap-4 items-center text-sm text-neutral-500 mb-4">
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-1" />
                  <span>{quiz.questions} questões</span>
                </div>
                <div>
                  <span>Tempo estimado: {quiz.time}</span>
                </div>
              </div>
              <div className="mt-auto pt-4 flex gap-2">
                {quiz.status === 'completed' || quiz.status === 'not-started' ? (
                  <Button onClick={() => handlePlayQuiz(quiz.id)}>
                    {quiz.status === 'completed' ? 'Refazer' : 'Iniciar'}
                  </Button>
                ) : (
                  <Button onClick={() => handlePlayQuiz(quiz.id)}>
                    Continuar
                  </Button>
                )}
                <Button variant="outline" onClick={() => handleQuizDetails(quiz.id)}>
                  Detalhes
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Modal para criar quiz */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          Criar novo quiz
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input 
              label="Título" 
              name="title" 
              placeholder="Digite um título para o quiz" 
              required 
            />
            <Input 
              label="Descrição" 
              name="description" 
              placeholder="Descreva brevemente o conteúdo do quiz" 
              required 
            />
            <Input 
              label="Texto base" 
              name="content" 
              placeholder="Cole ou digite o texto para gerar perguntas" 
              required 
              as="textarea"
              rows={5}
            />
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-neutral-700">
                Número de questões
              </label>
              <select className="ml-2 rounded-lg border-neutral-300 focus:ring-primary-500 focus:border-primary-500">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>
            </div>
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

export default QuizPage;