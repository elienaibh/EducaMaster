import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../config/auth';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';

export const metadata: Metadata = {
  title: 'Configurações | EducaMaster AI',
  description: 'Gerencie suas preferências e configurações da plataforma',
};

// Dados mockados para configurações do usuário
const mockUserSettings = {
  notifications: {
    email: {
      newCourses: true,
      courseUpdates: true,
      achievements: true,
      marketing: false,
    },
    push: {
      newCourses: true,
      courseUpdates: true,
      achievements: true,
      marketing: false,
    },
  },
  appearance: {
    theme: 'system',
    fontSize: 'medium',
    highContrast: false,
  },
  preferences: {
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
  },
  accessibility: {
    screenReader: true,
    keyboardNavigation: true,
    reducedMotion: false,
    highContrast: false,
  },
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="mt-2 text-gray-600">
            Gerencie suas preferências e configurações da plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notificações */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Notificações</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Notificações por Email</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.email.newCourses}
                    />
                    <span className="ml-2">Novos cursos disponíveis</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.email.courseUpdates}
                    />
                    <span className="ml-2">Atualizações de cursos</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.email.achievements}
                    />
                    <span className="ml-2">Conquistas desbloqueadas</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.email.marketing}
                    />
                    <span className="ml-2">Comunicações de marketing</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Notificações Push</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.push.newCourses}
                    />
                    <span className="ml-2">Novos cursos disponíveis</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.push.courseUpdates}
                    />
                    <span className="ml-2">Atualizações de cursos</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.push.achievements}
                    />
                    <span className="ml-2">Conquistas desbloqueadas</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked={mockUserSettings.notifications.push.marketing}
                    />
                    <span className="ml-2">Comunicações de marketing</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Aparência */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Aparência</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  defaultValue={mockUserSettings.appearance.theme}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamanho da Fonte
                </label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  defaultValue={mockUserSettings.appearance.fontSize}
                >
                  <option value="small">Pequeno</option>
                  <option value="medium">Médio</option>
                  <option value="large">Grande</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked={mockUserSettings.appearance.highContrast}
                  />
                  <span className="ml-2">Alto Contraste</span>
                </label>
              </div>
            </div>
          </Card>

          {/* Preferências */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Preferências</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  defaultValue={mockUserSettings.preferences.language}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Horário</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  defaultValue={mockUserSettings.preferences.timezone}
                >
                  <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de Data
                </label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  defaultValue={mockUserSettings.preferences.dateFormat}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de Hora
                </label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  defaultValue={mockUserSettings.preferences.timeFormat}
                >
                  <option value="24h">24 horas</option>
                  <option value="12h">12 horas</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Acessibilidade */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Acessibilidade</h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked={mockUserSettings.accessibility.screenReader}
                  />
                  <span className="ml-2">Suporte a leitor de tela</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked={mockUserSettings.accessibility.keyboardNavigation}
                  />
                  <span className="ml-2">Navegação por teclado</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked={mockUserSettings.accessibility.reducedMotion}
                  />
                  <span className="ml-2">Movimento reduzido</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked={mockUserSettings.accessibility.highContrast}
                  />
                  <span className="ml-2">Alto contraste</span>
                </label>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button>Salvar Alterações</Button>
        </div>
      </div>
    </Container>
  );
}