import { Metadata } from 'next';
import Container from '../components/Container';
import Card from '../components/Card';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes | EducaMaster AI',
  description: 'Encontre respostas para as perguntas mais comuns sobre a plataforma EducaMaster AI',
};

export default function FAQPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
          <p className="mt-2 text-gray-600">
            Encontre respostas para as perguntas mais comuns sobre nossa plataforma.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sobre a Plataforma</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">O que é o EducaMaster AI?</h3>
                <p className="mt-2 text-gray-600">
                  O EducaMaster AI é uma plataforma de educação adaptativa que utiliza inteligência
                  artificial para personalizar a experiência de aprendizado de cada aluno. Nossa
                  tecnologia analisa o progresso e estilo de aprendizado do usuário para criar um
                  caminho educacional único.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Como funciona a adaptação do conteúdo?
                </h3>
                <p className="mt-2 text-gray-600">
                  Nossa IA analisa seu desempenho, tempo de estudo e padrões de aprendizado para
                  ajustar automaticamente o conteúdo, dificuldade e ritmo das aulas. Isso garante
                  que você aprenda da maneira mais eficiente possível.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Conta e Acesso</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">Como crio uma conta?</h3>
                <p className="mt-2 text-gray-600">
                  Clique no botão &quot;Criar Conta&quot; na página inicial, preencha seus dados e
                  siga as instruções para verificar seu email. Você pode começar a usar a plataforma
                  imediatamente após a verificação.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Esqueci minha senha. O que fazer?</h3>
                <p className="mt-2 text-gray-600">
                  Na página de login, clique em &quot;Esqueci minha senha&quot; e siga as instruções
                  enviadas para seu email. Você poderá criar uma nova senha de forma segura.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Planos e Pagamentos</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">Quais são os planos disponíveis?</h3>
                <p className="mt-2 text-gray-600">
                  Oferecemos três planos: Básico, Pro e Enterprise. Cada plano inclui diferentes
                  recursos e níveis de acesso. Visite nossa página de planos para ver as opções
                  disponíveis e escolher a mais adequada para você.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Como funciona o pagamento?</h3>
                <p className="mt-2 text-gray-600">
                  Aceitamos cartões de crédito, PIX e boleto bancário. Os pagamentos são processados
                  de forma segura e você pode cancelar sua assinatura a qualquer momento.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cursos e Certificados</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">Como são os certificados?</h3>
                <p className="mt-2 text-gray-600">
                  Nossos certificados são digitais e verificáveis. Eles incluem um código único que
                  pode ser validado em nossa plataforma, garantindo a autenticidade do documento.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Posso transferir meu progresso?</h3>
                <p className="mt-2 text-gray-600">
                  Sim, seu progresso é salvo automaticamente e pode ser acessado de qualquer
                  dispositivo. Você pode continuar de onde parou em qualquer momento.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Suporte e Ajuda</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">Como obtenho suporte?</h3>
                <p className="mt-2 text-gray-600">
                  Oferecemos suporte através de email, chat ao vivo e nossa base de conhecimento.
                  Você pode acessar nossa página de contato para solicitar ajuda.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Qual o horário de atendimento?</h3>
                <p className="mt-2 text-gray-600">
                  Nossa equipe de suporte está disponível de segunda a sexta, das 9h às 18h. Fora
                  desse horário, você pode enviar sua mensagem e responderemos assim que possível.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
