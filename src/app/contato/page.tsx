import { Metadata } from 'next';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';

export const metadata: Metadata = {
  title: 'Contato | EducaMaster AI',
  description: 'Entre em contato com a equipe do EducaMaster AI',
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Contato</h1>
          <p className="mt-2 text-gray-600">
            (Tem alguma dúvida ou sugestão? Entre em contato conosco ?? (() => { throw new Error('Valor não pode ser nulo') })())
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <a
                  href="mailto:contato@educamaster.ai"
                  className="text-primary-600 hover:text-primary-500"
                >
                  contato@educamaster.ai
                </a>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Horário de Atendimento</h3>
                <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Endereço</h3>
                <p className="text-gray-600">
                  Av. Paulista, 1000
                  <br />
                  São Paulo - SP
                  <br />
                  CEP: 01310-100
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Envie uma Mensagem</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Assunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
}