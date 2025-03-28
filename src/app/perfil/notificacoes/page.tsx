import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../config/auth';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Notificações | EducaMaster AI',
    description: 'Gerencie suas preferências de notificações',
  };
}

// Dados mockados das configurações de notificações
const mockNotificationSettings = {
  email: {
    enabled: true,
    preferences: {
      courseUpdates: true,
      newMessages: true,
      announcements: true,
      marketing: false,
      security: true,
    },
  },
  push: {
    enabled: true,
    preferences: {
      courseUpdates: true,
      newMessages: true,
      announcements: true,
      marketing: false,
      security: true,
    },
  },
  sms: {
    enabled: false,
    preferences: {
      courseUpdates: false,
      newMessages: false,
      announcements: false,
      marketing: false,
      security: true,
    },
  },
};

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Notificações</h1>
          <p className="mt-2 text-gray-600">Gerencie suas preferências de notificações</p>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Notificações por E-mail</h2>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">Receba atualizações importantes por e-mail</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${mockNotificationSettings.email.enabled ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {mockNotificationSettings.email.enabled ? 'Ativado' : 'Desativado'}
                </span>
                <Button variant={mockNotificationSettings.email.enabled ? 'secondary' : 'primary'}>
                  {mockNotificationSettings.email.enabled ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>

            {mockNotificationSettings.email.enabled && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Atualizações de Cursos</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre novos conteúdos e atualizações
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.email.preferences.courseUpdates
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.email.preferences.courseUpdates
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Novas Mensagens</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre novas mensagens e interações
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.email.preferences.newMessages
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.email.preferences.newMessages
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Anúncios</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre anúncios importantes
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.email.preferences.announcements
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.email.preferences.announcements
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre promoções e novidades
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.email.preferences.marketing ? 'primary' : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.email.preferences.marketing
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Segurança</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre atividades suspeitas
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.email.preferences.security ? 'primary' : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.email.preferences.security ? 'Ativado' : 'Desativado'}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Notificações Push</h2>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">Receba notificações instantâneas no seu navegador</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${mockNotificationSettings.push.enabled ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {mockNotificationSettings.push.enabled ? 'Ativado' : 'Desativado'}
                </span>
                <Button variant={mockNotificationSettings.push.enabled ? 'secondary' : 'primary'}>
                  {mockNotificationSettings.push.enabled ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>

            {mockNotificationSettings.push.enabled && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Atualizações de Cursos</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre novos conteúdos e atualizações
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.push.preferences.courseUpdates
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.push.preferences.courseUpdates
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Novas Mensagens</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre novas mensagens e interações
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.push.preferences.newMessages
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.push.preferences.newMessages
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Anúncios</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre anúncios importantes
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.push.preferences.announcements
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.push.preferences.announcements
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre promoções e novidades
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.push.preferences.marketing ? 'primary' : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.push.preferences.marketing ? 'Ativado' : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Segurança</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre atividades suspeitas
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.push.preferences.security ? 'primary' : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.push.preferences.security ? 'Ativado' : 'Desativado'}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Notificações por SMS</h2>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">Receba notificações importantes por SMS</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${mockNotificationSettings.sms.enabled ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {mockNotificationSettings.sms.enabled ? 'Ativado' : 'Desativado'}
                </span>
                <Button variant={mockNotificationSettings.sms.enabled ? 'secondary' : 'primary'}>
                  {mockNotificationSettings.sms.enabled ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>

            {mockNotificationSettings.sms.enabled && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Atualizações de Cursos</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre novos conteúdos e atualizações
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.sms.preferences.courseUpdates
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.sms.preferences.courseUpdates
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Novas Mensagens</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre novas mensagens e interações
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.sms.preferences.newMessages ? 'primary' : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.sms.preferences.newMessages
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Anúncios</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre anúncios importantes
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.sms.preferences.announcements
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.sms.preferences.announcements
                      ? 'Ativado'
                      : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre promoções e novidades
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.sms.preferences.marketing ? 'primary' : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.sms.preferences.marketing ? 'Ativado' : 'Desativado'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Segurança</div>
                    <div className="text-sm text-gray-500">
                      Receba notificações sobre atividades suspeitas
                    </div>
                  </div>
                  <Button
                    variant={
                      mockNotificationSettings.sms.preferences.security ? 'primary' : 'secondary'
                    }
                    size="sm"
                  >
                    {mockNotificationSettings.sms.preferences.security ? 'Ativado' : 'Desativado'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Container>
  );
}