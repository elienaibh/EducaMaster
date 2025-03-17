// src/pages/LanguagePage/AudioSyncPage.jsx - linha inicial com importações corrigidas
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ArrowLeft, Download, Share2 } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const AudioSyncPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Refs para áudio e progresso
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  
  // Estado para controle do áudio
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  
  // Mock de dados do material (em uma aplicação real, seria buscado da API)
  const audioMaterial = {
    id: id || 'audio-1',
    title: 'Conversação em Inglês - Situações Cotidianas',
    language: 'Inglês',
    level: 'Iniciante',
    description: 'Diálogos em inglês para situações do dia a dia com sincronização de texto e áudio.',
    audioUrl: 'https://example.com/audio.mp3', // URL fictícia
    transcript: [
      { start: 0, end: 4, text: "Hello! My name is Sarah. Nice to meet you.", translation: "Olá! Meu nome é Sarah. Prazer em conhecê-lo." },
      { start: 4, end: 8, text: "Hi Sarah, I'm John. Nice to meet you too.", translation: "Oi Sarah, eu sou John. Prazer em conhecê-la também." },
      { start: 8, end: 12, text: "Where are you from, John?", translation: "De onde você é, John?" },
      { start: 12, end: 16, text: "I'm from Canada. And you?", translation: "Eu sou do Canadá. E você?" },
      { start: 16, end: 20, text: "I'm from Brazil. I'm here on vacation.", translation: "Eu sou do Brasil. Estou aqui de férias." },
      { start: 20, end: 24, text: "That's great! How long will you stay?", translation: "Que ótimo! Por quanto tempo você vai ficar?" },
      { start: 24, end: 28, text: "For two weeks. I want to visit many places.", translation: "Por duas semanas. Quero visitar muitos lugares." },
      { start: 28, end: 32, text: "I can show you around if you want.", translation: "Posso te mostrar a cidade se você quiser." },
      { start: 32, end: 36, text: "That would be wonderful! Thank you so much.", translation: "Isso seria maravilhoso! Muito obrigado." },
      { start: 36, end: 40, text: "You're welcome. Let's exchange phone numbers.", translation: "De nada. Vamos trocar números de telefone." },
    ],
  };
  
  // Efeito para configurar evento de atualização de tempo
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      // Eventos para atualizar o tempo atual
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
      };
      
      // Evento para definir a duração quando os metadados forem carregados
      const setAudioDuration = () => {
        setDuration(audio.duration);
      };
      
      // Adicionar event listeners
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', setAudioDuration);
      
      // Remover event listeners ao desmontar
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', setAudioDuration);
      };
    }
  }, []);
  
  // Efeito para atualizar a linha atual com base no tempo
  useEffect(() => {
    const line = audioMaterial.transcript.findIndex(
      (item) => currentTime >= item.start && currentTime < item.end
    );
    
    if (line !== -1 && line !== currentLine) {
      setCurrentLine(line);
    }
  }, [currentTime, audioMaterial.transcript, currentLine]);
  
  // Funções para controle de áudio
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };
  
  const handleSkipBack = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  };
  
  const handleSkipForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
  };
  
  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const audio = audioRef.current;
    
    audio.currentTime = percent * duration;
  };
  
  // Formatação de tempo (segundos para MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Navegar para a linha específica
  const navigateToLine = (index) => {
    const audio = audioRef.current;
    audio.currentTime = audioMaterial.transcript[index].start;
    
    if (!isPlaying) {
      togglePlay();
    }
  };
  
  // Voltar para a página anterior
  const handleBack = () => {
    navigate('/language');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={handleBack}
      >
        Voltar
      </Button>
      
      <Card className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">{audioMaterial.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="primary">{audioMaterial.language}</Badge>
              <Badge variant="success">{audioMaterial.level}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              icon={<Download className="w-4 h-4" />}
            >
              Baixar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              icon={<Share2 className="w-4 h-4" />}
            >
              Compartilhar
            </Button>
          </div>
        </div>
        
        <p className="text-neutral-600 mb-6">{audioMaterial.description}</p>
        
        {/* Reprodutor de áudio */}
        <div className="mb-6">
          <audio ref={audioRef} src={audioMaterial.audioUrl} preload="metadata">
            Seu navegador não suporta o elemento de áudio.
          </audio>
          
          {/* Controles de reprodução */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button 
              className="p-2 rounded-full hover:bg-neutral-100"
              onClick={handleSkipBack}
            >
              <SkipBack className="w-6 h-6 text-neutral-600" />
            </button>
            <button 
              className="p-3 bg-primary-100 rounded-full hover:bg-primary-200"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-primary-600" />
              ) : (
                <Play className="w-8 h-8 text-primary-600" />
              )}
            </button>
            <button 
              className="p-2 rounded-full hover:bg-neutral-100"
              onClick={handleSkipForward}
            >
              <SkipForward className="w-6 h-6 text-neutral-600" />
            </button>
          </div>
          
          {/* Barra de progresso */}
          <div className="mb-2">
            <div 
              ref={progressRef}
              className="w-full h-2 bg-neutral-200 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Tempo e mute */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <button 
              className="p-1 rounded-full hover:bg-neutral-100"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-neutral-500" />
              ) : (
                <Volume2 className="w-5 h-5 text-neutral-500" />
              )}
            </button>
          </div>
        </div>
      </Card>
      
      {/* Transcrição e tradução */}
      <Card>
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Transcrição e Tradução</h2>
        
        <div className="space-y-4">
          {audioMaterial.transcript.map((line, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                currentLine === index 
                  ? 'bg-primary-100 border border-primary-200' 
                  : 'hover:bg-neutral-50 border border-neutral-200'
              }`}
              onClick={() => navigateToLine(index)}
            >
              <p className="font-medium mb-1">{line.text}</p>
              <p className="text-sm text-neutral-600">{line.translation}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-neutral-500">
                <span>{formatTime(line.start)} - {formatTime(line.end)}</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs p-1 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToLine(index);
                  }}
                >
                  Reproduzir trecho
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AudioSyncPage;