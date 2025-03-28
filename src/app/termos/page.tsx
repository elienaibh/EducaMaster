import Container from '@/app/components/Container';

export const metadata = {
  title: 'Termos de Uso | EducaMaster AI',
  description: 'Termos e condições de uso da plataforma EducaMaster AI.',
};

export default function TermsPage() {
  return (
    <Container>
      <div className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>

          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600">
                Ao acessar e usar a plataforma EducaMaster AI, você concorda em cumprir e estar
                vinculado aos seguintes termos e condições de uso. Se você não concordar com
                qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-600 mb-4">
                A EducaMaster AI é uma plataforma de educação online que oferece cursos e conteúdo
                educacional através de tecnologia de inteligência artificial. Nossos serviços
                incluem, mas não se limitam a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Acesso a cursos online</li>
                <li>Material didático digital</li>
                <li>Ferramentas de aprendizado adaptativo</li>
                <li>Avaliações e certificados</li>
                <li>Interação com instrutores e outros alunos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Conta do Usuário</h2>
              <p className="text-gray-600 mb-4">
                Para acessar determinados recursos da plataforma, você precisará criar uma conta.
                Você é responsável por:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Manter a confidencialidade de sua senha</li>
                <li>Restringir o acesso ao seu computador e dispositivos</li>
                <li>Assumir responsabilidade por todas as atividades realizadas em sua conta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Propriedade Intelectual
              </h2>
              <p className="text-gray-600">
                Todo o conteúdo disponível na plataforma, incluindo mas não se limitando a textos,
                gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e compilações
                de dados, é propriedade da EducaMaster AI ou de seus fornecedores de conteúdo e está
                protegido por leis internacionais de direitos autorais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Pagamentos e Reembolsos
              </h2>
              <p className="text-gray-600 mb-4">
                Alguns cursos e recursos podem exigir pagamento. Ao fazer uma compra, você concorda
                que:
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>É responsável por fornecer informações de pagamento precisas</li>
                <li>Autoriza o débito dos valores correspondentes</li>
                <li>Reembolsos podem ser solicitados em até 7 dias após a compra</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Conduta do Usuário</h2>
              <p className="text-gray-600 mb-4">Ao usar nossa plataforma, você concorda em não:</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Violar leis ou regulamentos</li>
                <li>Compartilhar conteúdo ofensivo ou inadequado</li>
                <li>Tentar acessar contas de outros usuários</li>
                <li>Interferir no funcionamento da plataforma</li>
                <li>Copiar ou distribuir o conteúdo sem autorização</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-600">
                A EducaMaster AI não se responsabiliza por danos indiretos, incidentais, especiais,
                consequenciais ou punitivos, incluindo perda de dados, lucros ou receita,
                decorrentes do seu uso ou incapacidade de usar os serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Modificações dos Termos
              </h2>
              <p className="text-gray-600">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações
                entrarão em vigor imediatamente após sua publicação na plataforma. O uso continuado
                dos serviços após tais modificações constitui sua aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contato</h2>
              <p className="text-gray-600">
                Se você tiver dúvidas sobre estes termos, entre em contato conosco através do email:
                suporte@educamaster.ai
              </p>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}
