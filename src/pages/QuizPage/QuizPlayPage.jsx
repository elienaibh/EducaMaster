// src/pages/QuizPage/QuizPlayPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const QuizPlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado para controlar o quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos em segundos
  const [isFinished, setIsFinished] = useState(false);
  
  // Mock de dados do quiz (em uma aplicação real, seria buscado da API)
  const quiz = {
    id: id || 'quiz-1',
    title: 'Matemática Básica',
    questions: [
      {
        id: 'q1',
        text: 'Qual é o resultado de 25 × 4?',
        options: [
          { id: 'a', text: '100' },
          { id: 'b', text: '125' },
          { id: 'c', text: '90' },
          { id: 'd', text: '110' },
        ],
        correctAnswer: 'a',
        explanation: '25 × 4 = 100, pois 25 × 4 = (20 + 5) × 4 = 80 + 20 = 100',
      },
      {
        id: 'q2',
        text: 'Quanto é 1/4 + 1/2?',
        options: [
          { id: 'a', text: '1/6' },
          { id: 'b', text: '3/4' },
          { id: 'c', text: '1/8' },
          { id: 'd', text: '2/6' },
        ],
        correctAnswer: 'b',
        explanation: '1/4 + 1/2 = 1/4 + 2/4 = 3/4',
      },
      {
        id: 'q3',
        text: 'Se 30% de um número é 15, qual é o número?',
        options: [
          { id: 'a', text: '45' },
          { id: 'b', text: '50' },
          { id: 'c', text: '60' },
          { id: 'd', text: '75' },
        ],
        correctAnswer: 'b',
        explanation: 'Se 30% de x = 15, então 0,3 × x = 15, portanto x = 15 ÷ 0,3 = 50',
      },
      {
        id: 'q4',
        text: 'Qual é a raiz quadrada de 144?',
        options: [
          { id: 'a', text: '10' },
          { id: 'b', text: '12' },
          { id: 'c', text: '14' },
          { id: 'd', text: '16' },
        ],
        correctAnswer: 'b',
        explanation: 'A raiz quadrada de 144 é 12, pois 12 × 12 = 144',
      },
      {
        id: 'q5',
        text: 'Quanto é 3/5 de 80?',
        options: [
          { id: 'a', text: '42' },
          { id: 'b', text: '48' },
          { id: 'c', text: '54' },
          { id: 'd', text: '60' },
        ],
        correctAnswer: 'b',
        explanation: '3/5 de 80 = 3 × (80 ÷ 5) = 3 × 16 = 48',
      }
    ],
    time: '15min',
  };
  
  // Timer
  useEffect(() => {
    if (isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isFinished]);
  
  // Formatar o tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Selecionar uma resposta
  const handleSelectAnswer = (optionId) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionId);
    setIsAnswered(true);
    
    // Verificar se a resposta está correta
    const currentQ = quiz.questions[currentQuestion];
    if (optionId === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  // Ir para a próxima pergunta
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };
  
  // Voltar para a pergunta anterior
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Não resetamos a resposta porque queremos manter o estado de perguntas já respondidas
    }
  };
  
  // Finalizar o quiz
  const handleFinishQuiz = () => {
    navigate(`/quiz/${id}`);
  };
  
  // Calcular a porcentagem de conclusão
  const completionPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100;
  
  // Renderizar a tela de resultados finais
  if (isFinished) {
    const finalScore = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Concluído!</h2>
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary-600 mb-2">{finalScore}%</div>
            <p className="text-neutral-600">Você acertou {score} de {quiz.questions.length} questões</p>
          </div>
          
          {finalScore >= 70 ? (
            <div className="bg-success-50 p-4 rounded-lg mb-6">
              <CheckCircle className="w-8 h-8 text-success-500 mx-auto mb-2" />
              <p className="font-medium text-success-700">Excelente trabalho! Você conquistou uma ótima pontuação.</p>
            </div>
          ) : (
            <div className="bg-warning-50 p-4 rounded-lg mb-6">
              <AlertCircle className="w-8 h-8 text-warning-500 mx-auto mb-2" />
              <p className="font-medium text-warning-700">Continue praticando! Você pode melhorar sua pontuação.</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-primary-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary-600">{score}</div>
              <div className="text-sm text-neutral-600">Questões corretas</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-neutral-600">{quiz.questions.length - score}</div>
              <div className="text-sm text-neutral-600">Questões incorretas</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Reiniciar o quiz
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setIsAnswered(false);
                setScore(0);
                setTimeLeft(900);
                setIsFinished(false);
              }}
            >
              Tentar novamente
            </Button>
            <Button 
              className="w-full"
              onClick={handleFinishQuiz}
            >
              Voltar para detalhes
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  // Obter a pergunta atual
  const question = quiz.questions[currentQuestion];
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-neutral-800">{quiz.title}</h1>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-neutral-500 mr-1" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <ProgressBar value={completionPercentage} max={100} />
        <div className="flex justify-between text-sm text-neutral-500 mt-1">
          <span>Questão {currentQuestion + 1} de {quiz.questions.length}</span>
          <span>{Math.round(completionPercentage)}% concluído</span>
        </div>
      </div>
      
      {/* Pergunta */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold mb-4">
          {currentQuestion + 1}. {question.text}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((option) => {
            // Determinar o estilo da opção
            let optionClass = "p-3 border rounded-lg border-neutral-200 cursor-pointer hover:bg-neutral-50";
            
            if (isAnswered) {
              if (option.id === question.correctAnswer) {
                optionClass = "p-3 border rounded-lg border-success-300 bg-success-50";
              } else if (option.id === selectedAnswer) {
                optionClass = "p-3 border rounded-lg border-danger-300 bg-danger-50";
              }
            } else if (option.id === selectedAnswer) {
              optionClass = "p-3 border rounded-lg border-primary-300 bg-primary-50";
            }
            
            return (
              <div 
                key={option.id} 
                className={optionClass}
                onClick={() => handleSelectAnswer(option.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center font-medium">
                      {option.id.toUpperCase()}
                    </div>
                  </div>
                  <div>{option.text}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Explicação da resposta */}
        {isAnswered && (
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-bold mb-1">Explicação:</h3>
            <p>{question.explanation}</p>
          </div>
        )}
      </Card>
      
      {/* Navegação */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Anterior
        </Button>
        
        {isAnswered ? (
          <Button 
            icon={<ArrowRight className="w-4 h-4 ml-2" />}
            iconPosition="right"
            onClick={handleNextQuestion}
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Próxima' : 'Ver resultado'}
          </Button>
        ) : (
          <div className="text-neutral-500">
            Selecione uma resposta para continuar
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlayPage;