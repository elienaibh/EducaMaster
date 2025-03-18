// src/components/language/TextSynchronizer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

const TextSynchronizer = ({ 
  audioUrl, 
  transcript,
  onProgress,
  className = '' 
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSegment, setCurrentSegment] = useState(0);
  
  // Efeito para configurar o áudio
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
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      // Remover event listeners ao desmontar
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', setAudioDuration);
        audio.removeEventListener('play', () => setIsPlaying(true));
        audio.removeEventListener('pause', () => setIsPlaying(false));
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [audioUrl]);
  
  // Efeito para atualizar o segmento atual
  useEffect(() => {
    if (!transcript || transcript.length === 0) return;
    
    // Encontrar o segmento atual com base no tempo
    const segmentIndex = transcript.findIndex(
      (segment) => currentTime >= segment.start && currentTime < segment.end
    );
    
    if (segmentIndex !== -1 && segmentIndex !== currentSegment) {
      setCurrentSegment(segmentIndex);
      
      // Notificar progresso
      if (onProgress) {
        onProgress({
          currentTime,
          segmentIndex,
          segment: transcript[segmentIndex],
          progressPercentage: Math.round((currentTime / duration) * 100)
        });
      }
    }
  }, [currentTime, transcript, currentSegment, duration, onProgress]);
  
  // Funções para controle de áudio
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };
  
  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };
  
  const skipBack = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  };
  
  const skipForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
  };
  
  const jumpToSegment = (index) => {
    if (!transcript || !transcript[index]) return;
    
    const audio = audioRef.current;
    audio.currentTime = transcript[index].start;
    
    if (!isPlaying) {
      audio.play();
    }
  };
  
  // Formatar tempo (segundos para MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Obter porcentagem do progresso
  const getProgress = () => {
    if (duration === 0) return 0;
    return (currentTime / duration) * 100;
  };
  
  // Manipular clique na barra de progresso
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentClicked = clickPosition / rect.width;
    
    const audio = audioRef.current;
    audio.currentTime = percentClicked * duration;
  };
  
  return (
    <div className={`${className}`}>
      {/* Elemento de áudio (oculto) */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Controles de áudio */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button 
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            onClick={skipBack}
          >
            <SkipBack className="w-6 h-6 text-neutral-600" />
          </button>
          
          <button 
            className="p-3 bg-primary-100 rounded-full hover:bg-primary-200 transition-colors"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-primary-600" />
            ) : (
              <Play className="w-8 h-8 text-primary-600" />
            )}
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            onClick={skipForward}
          >
            <SkipForward className="w-6 h-6 text-neutral-600" />
          </button>
        </div>
        
        {/* Barra de progresso */}
        <div 
          className="h-2 bg-neutral-200 rounded-full cursor-pointer mb-2"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary-500 rounded-full"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-neutral-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          <button 
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
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
      
      {/* Transcrição sincronizada */}
      {transcript && transcript.length > 0 && (
        <div className="space-y-3">
          {transcript.map((segment, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                currentSegment === index 
                  ? 'bg-primary-100 border border-primary-200' 
                  : 'bg-white border border-neutral-200 hover:bg-neutral-50'
              }`}
              onClick={() => jumpToSegment(index)}
            >
              <p className="font-medium mb-1">{segment.text}</p>
              {segment.translation && (
                <p className="text-sm text-neutral-600">{segment.translation}</p>
              )}
              <div className="flex justify-between items-center mt-2 text-xs text-neutral-500">
                <span>{formatTime(segment.start)} - {formatTime(segment.end)}</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs p-1 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpToSegment(index);
                  }}
                >
                  Reproduzir trecho
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextSynchronizer;