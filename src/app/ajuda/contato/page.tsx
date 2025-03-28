import { Metadata } from 'next';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contato | EducaMaster AI',
    description: 'Entre em contato com nossa equipe de suporte',
  };
}

// Dados mockados dos canais de contato
const mockContactChannels = [
  {
    id: 'email',
    title: 'E-mail',
    description: 'suporte@educamaster.ai',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 'telefone',
    title: 'Telefone',
    description: '(11) 9999-9999',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    description: '(11) 99999-9999',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
];

// Dados mockados dos horários de atendimento
const mockBusinessHours = [
  {
    day: 'Segunda a Sexta',
    hours: '9h às 18h',
  },
  {
    day: 'Sábado',
    hours: '9h às 13h',
  },
  {
    day: 'Domingo',
    hours: 'Fechado',
  },
];

export default function ContactPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contato</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Entre em contato com nossa equipe de suporte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="duvida">Dúvida</option>
                      <option value="reclamacao">Reclamação</option>
                      <option value="sugestao">Sugestão</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Horário de Atendimento</h2>
                <div className="space-y-4">
                  {mockBusinessHours.map(schedule => (
                    <div key={schedule.day} className="flex justify-between items-center">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Canais de Contato</h2>
                <div className="space-y-6">
                  {mockContactChannels.map(channel => (
                    <div key={channel.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{channel.title}</h3>
                        <p className="text-gray-600">{channel.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Localização</h2>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4">
                  {/* Aqui você pode adicionar um mapa ou imagem */}
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Endereço</p>
                  <p className="text-gray-600">
                    Av. Paulista, 1000 - Bela Vista
                    <br />
                    São Paulo - SP, 01310-100
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
