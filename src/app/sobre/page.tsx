import { Metadata } from 'next';
import Container from '../components/Container';
import Card from '../components/Card';

export const metadata: Metadata = {
  title: 'Sobre | EducaMaster AI',
  description: 'Conheça a EducaMaster AI e como estamos revolucionando a educação com IA',
};

export default function AboutPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Sobre a EducaMaster AI</h1>
          <p className="mt-2 text-gray-600">Transformando a educação com inteligência artificial</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Nossa Missão</h2>
            <p className="text-gray-600">
              A EducaMaster AI nasceu com o objetivo de democratizar o acesso à educação de
              qualidade, utilizando inteligência artificial para criar experiências de aprendizado
              personalizadas e eficientes para cada estudante.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Nossa Visão</h2>
            <p className="text-gray-600">
              Queremos ser referência global em educação adaptativa, ajudando milhões de estudantes
              a alcançarem seu potencial máximo através de uma plataforma inovadora e acessível.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Nossos Valores</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Excelência em educação</li>
              <li>Inovação constante</li>
              <li>Acessibilidade universal</li>
              <li>Personalização do aprendizado</li>
              <li>Comunidade colaborativa</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Nossa Tecnologia</h2>
            <p className="text-gray-600">
              Utilizamos as mais avançadas tecnologias de IA para criar uma experiência de
              aprendizado única, adaptando o conteúdo e o ritmo às necessidades individuais de cada
              estudante.
            </p>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Nossa Equipe</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full" />
              <h3 className="font-semibold">João Silva</h3>
              <p className="text-gray-600">CEO & Fundador</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full" />
              <h3 className="font-semibold">Maria Santos</h3>
              <p className="text-gray-600">CTO</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full" />
              <h3 className="font-semibold">Pedro Oliveira</h3>
              <p className="text-gray-600">Diretor de Produto</p>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Entre em Contato</h2>
          <Card className="p-6">
            <p className="text-gray-600">
              Tem alguma dúvida ou sugestão? Entre em contato conosco através do email{' '}
              <a
                href="mailto:contato@educamaster.ai"
                className="text-primary-600 hover:text-primary-500"
              >
                contato@educamaster.ai
              </a>
            </p>
          </Card>
        </div>
      </div>
    </Container>
  );
}
