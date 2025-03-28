import { Container } from '@/components/ui/container';
import { AchievementTypesList } from '@/components/achievements/AchievementTypesList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function AchievementTypesPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Tipos de Conquistas</h1>
          <Link href="/admin/conquistas/tipos/novo">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Tipo
            </Button>
          </Link>
        </div>
        <AchievementTypesList />
      </div>
    </Container>
  );
}
