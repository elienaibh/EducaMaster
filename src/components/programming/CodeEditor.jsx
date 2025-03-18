// src/components/programming/CodeEditor.jsx
import React, { useState, useEffect } from 'react';
import { Play, CheckSquare, AlertCircle, Bookmark } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CodeEditor = ({ 
  initialCode = '',
  language = 'javascript',
  onRun,
  onSubmit,
  onSave,
  readOnly = false,
  className = '' 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  
  // Atualizar código inicial quando a prop mudar
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);
  
  // Função para executar o código
  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');
    
    try {
      if (onRun) {
        const result = await onRun(code, language);
        setOutput(result);
      } else {
        // Implementação básica para JavaScript (para demostração)
        // Na prática, este código seria executado em um ambiente seguro no servidor
        if (language === 'javascript') {
          try {
            // Capturar console.log
            const originalConsoleLog = console.log;
            let output = '';
            
            console.log = (...args) => {
              output += args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
              ).join(' ') + '\n';
              originalConsoleLog(...args);
            };
            
            // Avaliar o código em um contexto isolado
            // eslint-disable-next-line no-new-func
            new Function(code)();
            
            // Restaurar console.log
            console.log = originalConsoleLog;
            
            setOutput(output || 'Código executado com sucesso (sem saída).');
          } catch (err) {
            throw err;
          }
        } else {
          setOutput('Executar código em outros idiomas requer o servidor.');
        }
      }
    } catch (err) {
      setError(err.message || 'Erro ao executar o código');
      setOutput(`Erro: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };
  
  // Função para enviar o código para avaliação
  const handleSubmit = async () => {
    setIsRunning(true);
    setError(null);
    
    try {
      if (onSubmit) {
        await onSubmit(code, language);
      }
    } catch (err) {
      setError(err.message || 'Erro ao enviar o código');
    } finally {
      setIsRunning(false);
    }
  };
  
  // Função para salvar o código
  const handleSave = () => {
    if (onSave) {
      onSave(code, language);
    }
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="flex flex-col h-full">
        {/* Barra de ferramentas */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-2">
          <div className="text-sm font-medium">{language.toUpperCase()}</div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              icon={<Bookmark className="w-4 h-4" />}
              onClick={handleSave}
              disabled={readOnly}
            >
              Salvar
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              icon={<Play className="w-4 h-4" />}
              onClick={handleRun}
              disabled={isRunning}
            >
              Executar
            </Button>
            <Button 
              size="sm"
              icon={<CheckSquare className="w-4 h-4" />}
              onClick={handleSubmit}
              disabled={isRunning || readOnly}
            >
              Enviar
            </Button>
          </div>
        </div>
        
        {/* Editor */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Área de código */}
          <div className="flex-1 min-h-[200px] md:min-h-0">
            <textarea
              className="w-full h-full p-4 font-mono text-sm bg-neutral-900 text-white resize-none focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Digite seu código aqui..."
              readOnly={readOnly}
              spellCheck="false"
              rows={10}
            />
          </div>
          
          {/* Saída/Console */}
          {output && (
            <div className="flex-1 border-t md:border-l md:border-t-0 border-neutral-200 min-h-[150px] md:min-h-0">
              <div className="p-2 bg-neutral-100 text-sm font-medium border-b border-neutral-200">
                Saída
              </div>
              <pre className="p-4 font-mono text-sm overflow-auto h-[calc(100%-35px)]">
                {output}
              </pre>
            </div>
          )}
        </div>
        
        {/* Mensagem de erro */}
        {error && (
          <div className="p-3 bg-danger-50 text-danger-700 border-t border-danger-200 flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Erro</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CodeEditor;