import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../config/auth';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Segurança | EducaMaster AI',
    description: 'Gerencie suas configurações de segurança',
  };
}

// Dados mockados das configurações de segurança
const mockSecuritySettings = {
  twoFactorEnabled: false,
  emailNotifications: true,
  lastPasswordChange: '2024-02-15',
  activeSessions: [
    {
      id: '1',
      device: 'Chrome no Windows',
      location: 'São Paulo, SP',
      lastActive: '2024-03-20T10:30:00',
      current: true,
    },
    {
      id: '2',
      device: 'Safari no iPhone',
      location: 'Rio de Janeiro, RJ',
      lastActive: '2024-03-19T15:45:00',
      current: false,
    },
  ],
  loginHistory: [
    {
      date: '2024-03-20T10:30:00',
      device: 'Chrome no Windows',
      location: 'São Paulo, SP',
      status: 'success',
    },
    {
      date: '2024-03-19T15:45:00',
      device: 'Safari no iPhone',
      location: 'Rio de Janeiro, RJ',
      status: 'success',
    },
    {
      date: '2024-03-18T09:15:00',
      device: 'Chrome no Windows',
      location: 'São Paulo, SP',
      status: 'failed',
    },
  ],
};

export default async function SecurityPage() {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Segurança</h1>
          <p className="mt-2 text-gray-600">Gerencie suas configurações de segurança</p>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Autenticação de Dois Fatores</h2>
                <p className="mt-1 text-gray-600">
                  Adicione uma camada extra de segurança à sua conta
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${mockSecuritySettings.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {mockSecuritySettings.twoFactorEnabled ? 'Ativado' : 'Desativado'}
                </span>
                <Button variant={mockSecuritySettings.twoFactorEnabled ? 'secondary' : 'primary'}>
                  {mockSecuritySettings.twoFactorEnabled ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Notificações de Segurança</h2>
                <p className="mt-1 text-gray-600">
                  Receba alertas sobre atividades suspeitas em sua conta
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${mockSecuritySettings.emailNotifications ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {mockSecuritySettings.emailNotifications ? 'Ativado' : 'Desativado'}
                </span>
                <Button variant={mockSecuritySettings.emailNotifications ? 'secondary' : 'primary'}>
                  {mockSecuritySettings.emailNotifications ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Sessões Ativas</h2>
            <div className="space-y-4">
              {mockSecuritySettings.activeSessions.map(session => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{session.device}</div>
                    <div className="text-sm text-gray-500">
                      {session.location} • Última atividade:{' '}
                      {new Date(session.lastActive).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {session.current && (
                      <span className="text-sm font-medium text-green-600">Atual</span>
                    )}
                    ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())session.current && (
                      <Button variant="secondary" size="sm">
                        Encerrar Sessão
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Histórico de Login</h2>
            <div className="space-y-4">
              {mockSecuritySettings.loginHistory.map((login, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{login.device}</div>
                    <div className="text-sm text-gray-500">
                      {login.location} • {new Date(login.date).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {login.status === 'success' ? (
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <span
                      className={`text-sm font-medium ${login.status === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {login.status === 'success' ? 'Sucesso' : 'Falha'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Alterar Senha</h2>
                <p className="mt-1 text-gray-600">
                  Última alteração:{' '}
                  {new Date(mockSecuritySettings.lastPasswordChange).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Button>Alterar Senha</Button>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}