// src/components/quiz/QuizQuestion.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const QuizQuestion = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult = false,
  onNext,
  timeLimit = 0,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Efeito para controlar o timer
  useEffect(() => {
    if (timeLimit <= 0 || isAnswered) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsAnswered(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLimit, isAnswered]);
  
  // Formatar o tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Lidar com a seleção de resposta
  const handleSelect = (optionId) => {
    if (isAnswered || showResult) return;
    
    onSelectAnswer(optionId);
    setIsAnswered(true);
  };
  
  // Animação para a questão
  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <motion.div
        variants={questionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cabeçalho da questão */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">{question.text}</h3>
          {timeLimit > 0 && (
            <Badge variant={timeLeft < 10 ? "warning" : "primary"}>
              {formatTime(timeLeft)}
            </Badge>
          )}
        </div>
        
        {/* Opções de resposta */}
        <div className="space-y-3 mb-4">
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
                onClick={() => handleSelect(option.id)}
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
        
        {/* Explicação (se mostrar resultado) */}
        {showResult && question.explanation && (
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
            <h4 className="font-bold mb-1">Explicação:</h4>
            <p>{question.explanation}</p>
          </div>
        )}
        
        {/* Botão de próxima questão */}
        {showResult && (
          <div className="mt-4">
            <Button 
              className="w-full"
              onClick={onNext}
            >
              Próxima Questão
            </Button>
          </div>
        )}
      </motion.div>
    </Card>
  );
};

export default QuizQuestion;