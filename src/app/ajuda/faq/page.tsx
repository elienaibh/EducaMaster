import { Metadata } from 'next';
import Container from '../../../components/Container';
import Card from '../../../components/Card';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Perguntas Frequentes | EducaMaster AI',
    description: 'Encontre respostas para as perguntas mais comuns sobre a EducaMaster AI',
  };
}

// Dados mockados das categorias de FAQ
const mockFAQCategories = [
  {
    id: 'cursos',
    title: 'Cursos e Conteúdo',
    description: 'Dúvidas sobre matrículas, aulas e certificados',
    faqs: [
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
    ],
  },
  {
    id: 'conta',
    title: 'Conta e Acesso',
    description: 'Dúvidas sobre login, senha e configurações',
    faqs: [
      {
        id: '4',
        question: 'Como recupero minha senha?',
        answer:
          'Clique em "Esqueci minha senha" na página de login e siga as instruções enviadas para seu e-mail cadastrado.',
      },
      {
        id: '5',
        question: 'Como altero meus dados pessoais?',
        answer:
          'Acesse a página de perfil e clique em "Editar". Você poderá atualizar suas informações pessoais, foto e preferências.',
      },
      {
        id: '6',
        question: 'Como cancelo minha conta?',
        answer:
          'Para cancelar sua conta, acesse as configurações de perfil e procure a opção "Cancelar Conta". O processo é irreversível e todos os seus dados serão excluídos.',
      },
    ],
  },
  {
    id: 'pagamentos',
    title: 'Pagamentos e Reembolsos',
    description: 'Informações sobre preços, formas de pagamento e reembolsos',
    faqs: [
      {
        id: '7',
        question: 'Quais formas de pagamento são aceitas?',
        answer:
          'Aceitamos cartões de crédito (Visa, Mastercard, American Express), PIX, boleto bancário e transferência bancária.',
      },
      {
        id: '8',
        question: 'Como funciona o reembolso?',
        answer:
          'Oferecemos reembolso integral em até 7 dias após a compra do curso. Basta entrar em contato com nosso suporte e explicar o motivo do reembolso.',
      },
      {
        id: '9',
        question: 'Posso parcelar o pagamento?',
        answer: 'Sim, você pode parcelar em até 12x sem juros nos cartões de crédito.',
      },
    ],
  },
  {
    id: 'tecnico',
    title: 'Suporte Técnico',
    description: 'Dúvidas sobre problemas técnicos e bugs',
    faqs: [
      {
        id: '10',
        question: 'O que fazer se o vídeo não carregar?',
        answer:
          'Verifique sua conexão com a internet, limpe o cache do navegador e tente novamente. Se o problema persistir, entre em contato com nosso suporte.',
      },
      {
        id: '11',
        question: 'Como funciona o suporte ao vivo?',
        answer:
          'Nosso suporte ao vivo está disponível de segunda a sexta, das 9h às 18h. Você pode iniciar um chat através do botão "Suporte ao Vivo" na página de ajuda.',
      },
      {
        id: '12',
        question: 'Como reportar um bug?',
        answer:
          'Use o formulário de contato na página de ajuda, descrevendo detalhadamente o problema encontrado. Inclua prints e informações sobre seu navegador e sistema operacional.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre a EducaMaster AI
          </p>
        </div>

        <div className="space-y-8">
          {mockFAQCategories.map(category => (
            <Card key={category.id}>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-gray-600 mb-6">{category.description}</p>

                <div className="space-y-4">
                  {category.faqs.map(faq => (
                    <div
                      key={faq.id}
                      className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Não encontrou o que procurava? Entre em contato com nosso suporte.
          </p>
          <a
            href="/ajuda/contato"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <span>Falar com Suporte</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </Container>
  );
}
