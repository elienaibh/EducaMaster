// src/pages/QuizPage/QuizDetailsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, Clock, TrendingUp, BarChart, Edit, Trash2, ArrowLeft } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const QuizDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock de dados do quiz (em uma aplicação real, seria buscado da API)
  const quiz = {
    id: id || 'quiz-1',
    title: 'Matemática Básica',
    description: 'Revise conceitos fundamentais de matemática, incluindo operações básicas, frações, decimais e porcentagens. Ideal para estudantes do ensino fundamental e para revisão no ensino médio.',
    questions: 10,
    time: '15min',
    status: 'completed',
    score: 85,
    created: '10/03/2025',
    lastPlayed: '15/03/2025',
    timesPlayed: 3,
    categories: ['Matemática', 'Ensino Fundamental'],
    questionsPreview: [
      'Qual é o resultado de 25 × 4?',
      'Quanto é 1/4 + 1/2?',
      'Se 30% de um número é 15, qual é o número?'
    ],
    historyScores: [70, 75, 85]
  };
  
  // Renderizar status do quiz
  const renderStatus = (status, score = 0) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Concluído • {score}%</Badge>;
      case 'in-progress':
        return <Badge variant="warning">Em progresso</Badge>;
      default:
        return <Badge variant="neutral">Não iniciado</Badge>;
    }
  };
  
  // Função para jogar o quiz
  const handlePlayQuiz = () => {
    navigate(`/quiz/${id}/play`);
  };
  
  // Função para voltar
  const handleBack = () => {
    navigate('/quiz');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={handleBack}
      >
        Voltar
      </Button>
      
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-800">{quiz.title}</h1>
          {renderStatus(quiz.status, quiz.score)}
        </div>
        <p className="text-neutral-600 mt-2">{quiz.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1">
          <h3 className="font-bold mb-4">Informações</h3>
          <div className="space-y-4">
            <div className="flex items-center text-neutral-600">
              <Brain className="w-5 h-5 mr-2 text-primary-500" />
              <span>{quiz.questions} questões</span>
            </div>
            <div className="flex items-center text-neutral-600">
              <Clock className="w-5 h-5 mr-2 text-primary-500" />
              <span>Tempo estimado: {quiz.time}</span>
            </div>
            <div className="flex items-center text-neutral-600">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
              <span>Jogado {quiz.timesPlayed} vezes</span>
            </div>
            <div className="space-y-1">
              <div className="text-neutral-600">Categorias:</div>
              <div className="flex flex-wrap gap-2">
                {quiz.categories.map((category, index) => (
                  <Badge key={index}>{category}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="col-span-2">
          <h3 className="font-bold mb-4">Desempenho</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Melhor pontuação</span>
              <span>{Math.max(...quiz.historyScores)}%</span>
            </div>
            <ProgressBar value={Math.max(...quiz.historyScores)} max={100} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Última tentativa:</span>
              <span>{quiz.lastPlayed} - {quiz.score}%</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Data de criação:</span>
              <span>{quiz.created}</span>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="mb-6">
        <h3 className="font-bold mb-4">Prévia de Questões</h3>
        <div className="space-y-4">
          {quiz.questionsPreview.map((question, index) => (
            <div key={index} className="p-3 border rounded-lg border-neutral-200">
              <p className="font-medium">{index + 1}. {question}</p>
              <p className="text-sm text-neutral-500 mt-1">Prévia de questão (respostas disponíveis durante o quiz)</p>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="flex justify-between">
        <div className="space-x-2">
          <Button 
            variant="outline" 
            icon={<Edit className="w-4 h-4" />}
          >
            Editar
          </Button>
          <Button 
            variant="outline" 
            className="text-danger-500 border-danger-500 hover:bg-danger-50" 
            icon={<Trash2 className="w-4 h-4" />}
          >
            Excluir
          </Button>
        </div>
        <Button onClick={handlePlayQuiz}>
          {quiz.status === 'completed' ? 'Refazer Quiz' : 'Iniciar Quiz'}
        </Button>
      </div>
    </div>
  );
};

export default QuizDetailsPage;