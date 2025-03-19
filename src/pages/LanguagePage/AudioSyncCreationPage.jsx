// src/pages/LanguagePage/AudioSyncCreationPage.jsx
import Badge from '../../components/ui/Badge';

const AudioSyncCreationPage = () => {
  const navigate = useNavigate();
  const { createAudioSyncMaterial, loading, error } = useLanguage();
  const audioRef = useRef(null);
  
  // Estados
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: '',
    type: 'Diálogo',
    audioFile: null,
    audioUrl: '',
  });
  const [transcript, setTranscript] = useState([]);
  const [currentSegment, setCurrentSegment] = useState({ start: 0, end: 0, text: '', translation: '' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragState, setDragState] = useState({ isDragging: false, segmentIndex: null });
  
  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para lidar com o arquivo de áudio
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const audioUrl = URL.createObjectURL(file);
    setFormData(prev => ({ 
      ...prev, 
      audioFile: file,
      audioUrl: audioUrl
    }));
    
    // Reset transcript ao carregar novo áudio
    setTranscript([]);
  };
  
  // Função para lidar com mudanças no segmento atual
  const handleSegmentChange = (e) => {
    const { name, value } = e.target;
    setCurrentSegment(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para adicionar o segmento atual à transcrição
  const addSegment = () => {
    if (!currentSegment.text) return;
    
    // Converter os tempos de string para número se necessário
    const start = typeof currentSegment.start === 'string' 
      ? parseFloat(currentSegment.start) 
      : currentSegment.start;
      
    const end = typeof currentSegment.end === 'string' 
      ? parseFloat(currentSegment.end) 
      : currentSegment.end;
    
    // Validar os tempos
    if (start >= end || start < 0 || end > duration) {
      alert('Tempo inicial deve ser menor que o tempo final e estar dentro da duração do áudio.');
      return;
    }
    
    // Adicionar segmento
    setTranscript(prev => [...prev, { 
      start, 
      end, 
      text: currentSegment.text, 
      translation: currentSegment.translation 
    }]);
    
    // Limpar o formulário de segmento atual
    setCurrentSegment({ 
      start: end, // Começar o próximo segmento onde o último terminou
      end: Math.min(end + 5, duration), // Adicionar 5 segundos para o fim, limitado pela duração
      text: '', 
      translation: '' 
    });
  };
  
  // Função para remover um segmento
  const removeSegment = (index) => {
    setTranscript(prev => prev.filter((_, i) => i !== index));
  };
  
  // Função para editar um segmento existente
  const editSegment = (index) => {
    setCurrentSegment(transcript[index]);
    removeSegment(index);
  };
  
  // Funções para controle de áudio
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  // Função para definir o tempo atual no áudio
  const setAudioTime = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };
  
  // Função para formatar o tempo (segundos para MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Função para criar o material de áudio sincronizado
  const handleCreateMaterial = async () => {
    if (!formData.audioFile || transcript.length === 0) {
      alert('Por favor, adicione um arquivo de áudio e pelo menos um segmento de transcrição.');
      return;
    }
    
    try {
      // Em uma aplicação real, você faria upload do arquivo de áudio para um servidor
      // Para simplificar, vamos usar a URL do objeto local (não funcionará após recarregar a página)
      
      const newMaterial = await createAudioSyncMaterial({
        title: formData.title,
        language: formData.language,
        type: formData.type,
        description: formData.description,
        duration: `${Math.ceil(duration / 60)}min`,
        audioUrl: formData.audioUrl, // Na aplicação real, seria a URL do servidor
        transcript: transcript,
      });
      
      navigate('/language');
    } catch (err) {
      console.error('Erro ao criar material:', err);
    }
  };
  
  // Eventos de áudio
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setCurrentSegment(prev => ({
        ...prev,
        end: Math.min(prev.start + 5, audioRef.current.duration) // Limite de 5 segundos ou fim do áudio
      }));
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/language')}
      >
        Voltar para Idiomas
      </Button>
      
      <Card className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">
          Criar Material com Sincronização de Áudio
        </h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Título" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Conversação em Inglês - Situações Cotidianas" 
              required 
            />
            
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Idioma
              </label>
              <select 
                className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um idioma</option>
                <option value="Inglês">Inglês</option>
                <option value="Espanhol">Espanhol</option>
                <option value="Francês">Francês</option>
                <option value="Alemão">Alemão</option>
                <option value="Italiano">Italiano</option>
                <option value="Japonês">Japonês</option>
                <option value="Mandarim">Mandarim</option>
                <option value="Russo">Russo</option>
                <option value="Árabe">Árabe</option>
                <option value="Português">Português</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Descrição" 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva brevemente o conteúdo deste material" 
              required 
            />
            
            <div className="mb-4">
              <label className="block mb-2 font-medium text-neutral-700">
                Tipo de Material
              </label>
              <select 
                className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Diálogo">Diálogo</option>
                <option value="Música">Música</option>
                <option value="Notícia">Notícia</option>
                <option value="Podcast">Podcast</option>
                <option value="Discurso">Discurso</option>
                <option value="Aula">Aula</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-neutral-700">
              Arquivo de Áudio
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center">
              {formData.audioUrl ? (
                <div>
                  <audio 
                    ref={audioRef}
                    src={formData.audioUrl}
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full mb-4"
                    controls
                  />
                  <div className="flex items-center justify-center mb-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      icon={<Upload className="w-4 h-4" />}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, audioFile: null, audioUrl: '' }));
                        setTranscript([]);
                        setCurrentSegment({ start: 0, end: 0, text: '', translation: '' });
                      }}
                    >
                      Trocar Arquivo
                    </Button>
                  </div>
                  <div className="text-sm text-neutral-500">
                    Arquivo: {formData.audioFile.name} ({(formData.audioFile.size / 1048576).toFixed(2)} MB)
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600 mb-4">
                    Selecione ou arraste um arquivo de áudio
                  </p>
                  <Button
                    as="label"
                    htmlFor="audio-upload"
                    variant="outline"
                  >
                    Selecionar Arquivo
                    <input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleAudioUpload}
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Seção de transcrição e sincronização */}
      {formData.audioUrl && (
        <Card>
          <h2 className="text-xl font-bold text-neutral-800 mb-4">
            Transcrição e Sincronização
          </h2>
          
          <div className="space-y-6">
            {/* Formulário para adicionar segmento */}
            <div className="p-4 border rounded-lg border-primary-200 bg-primary-50">
              <h3 className="font-bold mb-3 flex items-center">
                <Mic className="w-5 h-5 text-primary-500 mr-2" />
                Adicionar Segmento
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Tempo Inicial (segundos)</label>
                  <div className="flex">
                    <input
                      type="number"
                      name="start"
                      value={currentSegment.start}
                      onChange={handleSegmentChange}
                      step="0.1"
                      min="0"
                      max={duration}
                      className="w-full px-3 py-1.5 border border-neutral-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => setAudioTime(currentSegment.start)}
                    >
                      <PlayCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Tempo Final (segundos)</label>
                  <div className="flex">
                    <input
                      type="number"
                      name="end"
                      value={currentSegment.end}
                      onChange={handleSegmentChange}
                      step="0.1"
                      min="0"
                      max={duration}
                      className="w-full px-3 py-1.5 border border-neutral-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() => setAudioTime(currentSegment.end)}
                    >
                      <PlayCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Texto</label>
                <textarea
                  name="text"
                  value={currentSegment.text}
                  onChange={handleSegmentChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Digite o texto deste segmento de áudio..."
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Tradução (opcional)</label>
                <textarea
                  name="translation"
                  value={currentSegment.translation}
                  onChange={handleSegmentChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Digite a tradução deste segmento (opcional)..."
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-neutral-500">
                  Duração do segmento: {(currentSegment.end - currentSegment.start).toFixed(1)}s
                </div>
                <Button
                  icon={<Plus className="w-4 h-4" />}
                  onClick={addSegment}
                  disabled={!currentSegment.text}
                >
                  Adicionar Segmento
                </Button>
              </div>
            </div>
            
            {/* Lista de segmentos */}
            <div>
              <h3 className="font-bold mb-3">
                Segmentos ({transcript.length})
              </h3>
              
              {transcript.length === 0 ? (
                <div className="p-6 text-center bg-neutral-50 rounded-lg text-neutral-500">
                  Ainda não há segmentos. Adicione segmentos de transcrição acima.
                </div>
              ) : (
                <div className="space-y-3">
                  {transcript.map((segment, index) => (
                    <div 
                      key={index} 
                      className="p-3 border rounded-lg border-neutral-200 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="font-medium text-primary-600 cursor-pointer"
                              onClick={() => {
                                setAudioTime(segment.start);
                                playAudio();
                              }}
                            >
                              {formatTime(segment.start)} - {formatTime(segment.end)}
                            </div>
                            <Badge className="ml-2">
                              {(segment.end - segment.start).toFixed(1)}s
                            </Badge>
                          </div>
                          <p className="mb-1">{segment.text}</p>
                          {segment.translation && (
                            <p className="text-sm text-neutral-500 italic">{segment.translation}</p>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-neutral-500"
                            icon={isPlaying ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                            onClick={() => {
                              setAudioTime(segment.start);
                              isPlaying ? pauseAudio() : playAudio();
                            }}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary-500"
                            icon={<Edit className="w-4 h-4" />}
                            onClick={() => editSegment(index)}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-danger-500"
                            icon={<Trash2 className="w-4 h-4" />}
                            onClick={() => removeSegment(index)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => navigate('/language')}
              >
                Cancelar
              </Button>
              <Button 
                icon={<Save className="w-4 h-4" />}
                onClick={handleCreateMaterial}
                disabled={loading || transcript.length === 0 || !formData.title || !formData.language}
              >
                {loading ? 'Criando...' : 'Criar Material'}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AudioSyncCreationPage;