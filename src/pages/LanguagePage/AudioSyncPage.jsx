// src/pages/LanguagePage/AudioSyncPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import  useLanguage  from '../../hooks/useLanguage';
import { useBoss } from '../../contexts/BossContext';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import TextSynchronizer from '../../components/language/TextSynchronizer';

const AudioSyncPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMaterial, practiceWithAudioSync } = useLanguage();
  const { damageBoss } = useBoss();
  
  // Estados locais
  const [material, setMaterial] = useState(null);
  const [duration, setDuration] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [lastSegment, setLastSegment] = useState(null);
  
  // Carregar o material
  useEffect(() => {
    try {
      const loadedMaterial = getMaterial(id);
      setMaterial(loadedMaterial);
    } catch (error) {
      console.error('Erro ao carregar material:', error);
      navigate('/language');
    }
  }, [id, getMaterial, navigate]);
  
  // Função para monitorar o progresso da reprodução
  const handleProgress = ({ currentTime, segmentIndex, segment, progressPercentage }) => {
    setDuration(currentTime);
    setCompletionPercentage(progressPercentage);
    
    // Se passou para um novo segmento, registre o progresso
    if (lastSegment !== segmentIndex) {
      setLastSegment(segmentIndex);
      
      // Causar dano ao Boss a cada novo segmento
      if (segmentIndex > 0) {
        damageBoss(10, 'language_audio_segment');
      }
    }
  };
  
  // Função para finalizar a prática
  const handleFinish = () => {
    if (completionPercentage > 0) {
      practiceWithAudioSync(id, Math.round(duration), completionPercentage);
    }
    
    navigate('/language');
  };
  
  if (!material) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-6">
          <p>Carregando material de áudio...</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={handleFinish}
      >
        Voltar
      </Button>
      
      <Card className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">{material.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="primary">{material.language}</Badge>
              <Badge>{material.type}</Badge>
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
        
        <p className="text-neutral-600 mb-6">{material.description}</p>
      </Card>
      
      {/* Sincronizador de texto e áudio */}
      <TextSynchronizer 
        audioUrl={material.audioUrl} 
        transcript={material.transcript}
        onProgress={handleProgress}
      />
      
      {/* Botão para finalizar a prática */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleFinish}>
          Concluir Prática
        </Button>
      </div>
    </div>
  );
};

export default AudioSyncPage;