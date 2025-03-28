import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../config/auth';
import Container from '../components/Container';
import PlanCard from '../components/PlanCard';
import { Plan } from '../types';

export const metadata: Metadata = {
  title: 'Planos | EducaMaster AI',
  description: 'Escolha o plano ideal para você',
};

// TODO: Implementar busca de planos no banco de dados
async function getPlans(): Promise<Plan[]> {
  return [];
}

export default async function PlansPage() {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  const plans = await getPlans();

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Planos Disponíveis</h1>
          <p className="mt-2 text-gray-600">
            Escolha o plano ideal para você e comece sua jornada de aprendizado
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Nenhum plano disponível</h3>
            <p className="mt-2 text-sm text-gray-500">
              Em breve teremos planos disponíveis para você
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}