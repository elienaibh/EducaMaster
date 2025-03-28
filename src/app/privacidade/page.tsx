import { Metadata } from 'next';
import Container from '@/app/components/Container';
import Card from '../components/Card';

export const metadata: Metadata = {
  title: 'Política de Privacidade | EducaMaster AI',
  description: 'Política de privacidade e proteção de dados da plataforma EducaMaster AI.',
};

export default function PrivacyPage() {
  return (
    <Container>
      <div className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>

          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introdução</h2>
              <p className="text-gray-600">
                A EducaMaster AI está comprometida em proteger sua privacidade. Esta política
                descreve como coletamos, usamos e protegemos suas informações pessoais quando você
                usa nossa plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Informações que Coletamos
              </h2>
              <p className="text-gray-600 mb-4">Coletamos os seguintes tipos de informações:</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Informações de registro (nome, email, senha)</li>
                <li>Dados de perfil (foto, biografia, interesses)</li>
                <li>Informações de pagamento</li>
                <li>Dados de uso da plataforma</li>
                <li>Informações do dispositivo e navegador</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Como Usamos suas Informações
              </h2>
              <p className="text-gray-600 mb-4">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Fornecer e personalizar nossos serviços</li>
                <li>Processar pagamentos e transações</li>
                <li>Enviar comunicações importantes</li>
                <li>Melhorar nossa plataforma</li>
                <li>Prevenir fraudes e abusos</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Compartilhamento de Informações
              </h2>
              <p className="text-gray-600 mb-4">Podemos compartilhar suas informações com:</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Provedores de serviços (processamento de pagamento, hospedagem)</li>
                <li>Parceiros de negócios (com seu consentimento)</li>
                <li>Autoridades legais (quando exigido por lei)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Segurança de Dados</h2>
              <p className="text-gray-600">
                Implementamos medidas técnicas e organizacionais apropriadas para proteger suas
                informações pessoais contra acesso não autorizado, alteração, divulgação ou
                destruição. Isso inclui criptografia de dados, firewalls e controles de acesso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Seus Direitos</h2>
              <p className="text-gray-600 mb-4">Você tem direito a:</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir dados imprecisos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Retirar seu consentimento</li>
                <li>Receber seus dados em formato portável</li>
                <li>Opor-se ao processamento de seus dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Cookies e Tecnologias Similares
              </h2>
              <p className="text-gray-600">
                Usamos cookies e tecnologias similares para melhorar sua experiência, entender como
                você usa nossa plataforma e personalizar nossos serviços. Você pode controlar o uso
                de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Retenção de Dados</h2>
              <p className="text-gray-600">
                Mantemos suas informações pessoais apenas pelo tempo necessário para fornecer nossos
                serviços e cumprir nossas obrigações legais. Quando os dados não forem mais
                necessários, eles serão excluídos ou anonimizados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Transferências Internacionais
              </h2>
              <p className="text-gray-600">
                Seus dados podem ser transferidos e processados em países fora do seu país de
                residência. Implementamos salvaguardas apropriadas para proteger suas informações
                durante essas transferências.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Alterações nesta Política
              </h2>
              <p className="text-gray-600">
                Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações
                significativas através de um aviso em nossa plataforma ou por email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contato</h2>
              <p className="text-gray-600">
                Se você tiver dúvidas sobre esta política de privacidade ou sobre como tratamos seus
                dados, entre em contato com nosso Encarregado de Proteção de Dados através do email:
                privacidade@educamaster.ai
              </p>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}
