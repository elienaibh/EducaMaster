import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '../config/auth';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';

export const metadata: Metadata = {
  title: 'Erro | EducaMaster AI',
  description: 'Página de erro da EducaMaster AI',
};

export default async function ErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  const errorMessage = searchParams.error || 'Ocorreu um erro inesperado';

  return (
    <Container>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
              Erro
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">{errorMessage}</p>
          </div>

          <div className="mt-8 space-y-6">
            <Link href="/entrar" className="block w-full">
              <Button className="w-full">Voltar para o login</Button>
            </Link>

            <div className="text-center">
              <a href="/" className="font-medium text-primary-600 hover:text-primary-500">
                Voltar para a página inicial
              </a>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
