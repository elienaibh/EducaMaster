// src/pages/SettingsPage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Moon, Volume2, Globe, Lock, UserCog, Save, Languages, ArrowLeft } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Toggle from '../../components/ui/Toggle';

const SettingsPage = () => {
  const navigate = useNavigate();
  
  // Estados para as configurações
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState('pt-BR');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [badgeNotifications, setBadgeNotifications] = useState(true);
  const [dailyGoal, setDailyGoal] = useState(15);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Função para salvar alterações
  const handleSaveSettings = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    alert('Configurações salvas com sucesso!');
  };
  
  // Função para alterar senha
  const handleChangePassword = (e) => {
    e.preventDefault();
    
    // Validação simples
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    // Aqui você implementaria a lógica para alterar a senha
    alert('Senha alterada com sucesso!');
    
    // Limpar os campos
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2" 
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          />
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Configurações</h1>
            <p className="text-neutral-600">
              Personalize sua experiência de aprendizado.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Aparência e Interface */}
        <Card>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Moon className="w-5 h-5 mr-2 text-primary-500" />
            Aparência e Interface
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg border-neutral-200">
              <div>
                <h3 className="font-medium">Modo Escuro</h3>
                <p className="text-sm text-neutral-600">Alterar para tema escuro</p>
              </div>
              <Toggle checked={darkMode} onChange={setDarkMode} />
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg border-neutral-200">
              <div>
                <h3 className="font-medium">Idioma da Interface</h3>
                <p className="text-sm text-neutral-600">Selecione o idioma da plataforma</p>
              </div>
              <select 
                className="ml-2 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
                <option value="fr-FR">Français</option>
              </select>
            </div>
            
            <div className="p-4 border rounded-lg border-neutral-200">
              <h3 className="font-medium mb-2">Meta Diária de Estudo</h3>
              <p className="text-sm text-neutral-600 mb-3">Defina sua meta diária em minutos</p>
              <input 
                type="range" 
                min="5" 
                max="60" 
                step="5" 
                value={dailyGoal} 
                onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-neutral-500 mt-1">
                <span>5 min</span>
                <span className="font-bold">{dailyGoal} min</span>
                <span>60 min</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Som e Notificações */}
        <Card>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primary-500" />
            Som e Notificações
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg border-neutral-200">
              <div>
                <h3 className="font-medium">Sons</h3>
                <p className="text-sm text-neutral-600">Ativar efeitos sonoros</p>
              </div>
              <Toggle checked={soundEffects} onChange={setSoundEffects} />
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg border-neutral-200">
              <div>
                <h3 className="font-medium">Notificações</h3>
                <p className="text-sm text-neutral-600">Ativar notificações no app</p>
              </div>
              <Toggle checked={notifications} onChange={setNotifications} />
            </div>
            
            {notifications && (
              <div className="space-y-3 p-4 border rounded-lg border-neutral-200">
                <h3 className="font-medium mb-2">Tipos de Notificações</h3>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Notificações por E-mail</h4>
                    <p className="text-xs text-neutral-500">Receber notificações por e-mail</p>
                  </div>
                  <Toggle checked={emailNotifications} onChange={setEmailNotifications} size="sm" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Notificações Push</h4>
                    <p className="text-xs text-neutral-500">Receber notificações no navegador</p>
                  </div>
                  <Toggle checked={pushNotifications} onChange={setPushNotifications} size="sm" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Lembretes de Estudo</h4>
                    <p className="text-xs text-neutral-500">Lembretes diários para estudar</p>
                  </div>
                  <Toggle checked={studyReminders} onChange={setStudyReminders} size="sm" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Conquistas</h4>
                    <p className="text-xs text-neutral-500">Notificações de novas conquistas</p>
                  </div>
                  <Toggle checked={badgeNotifications} onChange={setBadgeNotifications} size="sm" />
                </div>
              </div>
            )}
          </div>
        </Card>
        
        {/* Privacidade e Segurança */}
        <Card>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-primary-500" />
            Privacidade e Segurança
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 border rounded-lg border-neutral-200">
              <h3 className="font-medium mb-3">Alterar Senha</h3>
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <Input 
                  label="Senha Atual" 
                  type="password" 
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                
                <Input 
                  label="Nova Senha" 
                  type="password" 
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                
                <Input 
                  label="Confirmar Nova Senha" 
                  type="password" 
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                
                <Button type="submit" variant="outline">
                  Alterar Senha
                </Button>
              </form>
            </div>
            
            <div className="p-4 border rounded-lg border-neutral-200">
              <h3 className="font-medium mb-3">Sessões Ativas</h3>
              <p className="text-sm text-neutral-600 mb-3">Dispositivos onde sua conta está conectada</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">Este Dispositivo</h4>
                    <p className="text-xs text-neutral-500">Windows - Chrome - Última atividade: Agora</p>
                  </div>
                  <Button size="sm" variant="outline" disabled>
                    Atual
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">Smartphone</h4>
                    <p className="text-xs text-neutral-500">Android - Chrome - Última atividade: 2 dias atrás</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-danger-500 border-danger-500 hover:bg-danger-50">
                    Encerrar
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg border-danger-200 bg-danger-50">
              <h3 className="font-medium text-danger-700 mb-3">Zona de Perigo</h3>
              <p className="text-sm text-danger-600 mb-3">Ações que não podem ser desfeitas</p>
              
              <Button 
                variant="outline" 
                className="border-danger-500 text-danger-500 hover:bg-danger-50"
              >
                Excluir Minha Conta
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Botão de salvar */}
        <div className="flex justify-end">
          <Button 
            icon={<Save className="w-4 h-4" />}
            onClick={handleSaveSettings}
          >
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;