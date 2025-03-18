// src/components/quiz/QuizQuestion.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const QuizQuestion = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer = null,
  timeLimit = 0,
  onTimeUp,
  onNext,
  className = ''
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(!!userAnswer);
  
  // Configurar o timer quando o componente montar
  useEffect(() => {
    if (timeLimit <= 0 || isAnswered) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLimit, isAnswered, onTimeUp]);
  
  // Formatar o tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Selecionar uma resposta
  const handleSelectAnswer = (optionId) => {
    if (isAnswered || showResult) return;
    
    setSelectedAnswer(optionId);
    setIsAnswered(true);
    
    if (onAnswer) {
      onAnswer(optionId);
    }
  };
  
  // Ir para a próxima questão
  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };
  
  // Animações
  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <Card className={className}>
      <motion.div
        variants={questionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cabeçalho da questão */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{question.text}</h3>
          
          {timeLimit > 0 && !showResult && !isAnswered && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-neutral-500 mr-1" />
              <Badge variant={timeLeft < 10 ? "warning" : "primary"}>
                {formatTime(timeLeft)}
              </Badge>
            </div>
          )}
        </div>
        
        {/* Opções de resposta */}
        <div className="space-y-3">
          {question.options.map((option) => {
            // Determinar o estilo da opção
            let optionClass = "p-3 border rounded-lg border-neutral-200 cursor-pointer hover:bg-neutral-50";
            
            if (showResult) {
              if (option.id === question.correctAnswer) {
                optionClass = "p-3 border rounded-lg border-success-300 bg-success-50";
              } else if (option.id === selectedAnswer && option.id !== question.correctAnswer) {
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
        
        {/* Explicação da resposta (se mostrar resultado) */}
        {showResult && question.explanation && (
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-start">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-danger-500 mr-2 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold mb-1">Explicação:</h4>
                <p>{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Botão de próxima questão (se for mostrar resultado) */}
        {showResult && onNext && (
          <div className="mt-4">
            <Button 
              className="w-full"
              onClick={handleNext}
            >
              Próxima Questão
            </Button>
          </div>
        )}
        
        {/* Mensagem "esperando" (se não tiver respondido e não estiver mostrando resultado) */}
        {!isAnswered && !showResult && (
          <div className="mt-4 text-center text-neutral-500">
            Selecione uma resposta para continuar
          </div>
        )}
      </motion.div>
    </Card>
  );
};

export default QuizQuestion;