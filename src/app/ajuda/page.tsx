import { Metadata } from 'next';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Ajuda | EducaMaster AI',
    description: 'Central de ajuda e suporte da EducaMaster AI',
  };
}

// Dados mockados das categorias de ajuda
const mockHelpCategories = [
  {
    id: 'cursos',
    title: 'Cursos',
    description: 'Dúvidas sobre cursos, aulas e certificados',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: 'conta',
    title: 'Conta',
    description: 'Gerenciamento de conta e configurações',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: 'pagamentos',
    title: 'Pagamentos',
    description: 'Informações sobre pagamentos e reembolsos',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: 'tecnico',
    title: 'Suporte Técnico',
    description: 'Ajuda com problemas técnicos e bugs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

// Dados mockados das perguntas frequentes
const mockFAQs = [
  {
    id: '1',
    question: 'Como posso começar um curso?',
    answer:
      'Para começar um curso, basta navegar até a página de cursos, escolher o curso desejado e clicar em "Matricular". Você poderá fazer o pagamento e começar a estudar imediatamente.',
  },
  {
    id: '2',
    question: 'Como funciona o certificado?',
    answer:
      'O certificado é emitido automaticamente após a conclusão de todos os módulos do curso e aprovação nas avaliações. Você pode baixá-lo em PDF ou compartilhá-lo diretamente no LinkedIn.',
  },
  {
    id: '3',
    question: 'Posso fazer download das aulas?',
    answer:
      'Sim, você pode fazer download das aulas para assistir offline. Basta clicar no botão de download ao lado de cada aula.',
  },
  {
    id: '4',
    question: 'Como funciona o reembolso?',
    answer:
      'Oferecemos reembolso integral em até 7 dias após a compra do curso. Basta entrar em contato com nosso suporte e explicar o motivo do reembolso.',
  },
  {
    id: '5',
    question: 'Como posso tirar dúvidas?',
    answer:
      'Você pode tirar dúvidas através do fórum de discussão de cada curso, enviar mensagens para os instrutores ou entrar em contato com nosso suporte.',
  },
];

export default function HelpPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Como podemos ajudar?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas ou entre em contato com nosso suporte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockHelpCategories.map(category => (
            <Link key={category.id} href={`/ajuda/${category.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {mockFAQs.map(faq => (
              <Card key={faq.id}>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contato</h2>
              <p className="text-gray-600 mb-6">
                Precisa de mais ajuda? Entre em contato com nossa equipe de suporte.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">suporte@educamaster.ai</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-600">(11) 9999-9999</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-600">São Paulo, SP</span>
                </div>
              </div>
              <div className="mt-6">
                <Button>Enviar Mensagem</Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Recursos</h2>
              <p className="text-gray-600 mb-6">
                Acesse nossos recursos e guias para melhorar sua experiência.
              </p>
              <div className="space-y-4">
                <Link href="/ajuda/guia-iniciante" className="block">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <div>
                      <div className="font-medium">Guia do Iniciante</div>
                      <div className="text-sm text-gray-500">Aprenda a usar a plataforma</div>
                    </div>
                  </div>
                </Link>

                <Link href="/ajuda/tutoriais" className="block">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <div className="font-medium">Tutoriais em Vídeo</div>
                      <div className="text-sm text-gray-500">Assista vídeos explicativos</div>
                    </div>
                  </div>
                </Link>

                <Link href="/ajuda/comunidade" className="block">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <div className="font-medium">Comunidade</div>
                      <div className="text-sm text-gray-500">Conecte-se com outros alunos</div>
                    </div>
                  </div>
                </Link>

                <Link href="/ajuda/status" className="block">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <div>
                      <div className="font-medium">Status do Sistema</div>
                      <div className="text-sm text-gray-500">Verifique o status da plataforma</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
