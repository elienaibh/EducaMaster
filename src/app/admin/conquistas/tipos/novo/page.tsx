'use client';

import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAchievementTypes } from '@/hooks/useAchievementTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewAchievementTypePage() {
  const router = useRouter();
  const { createAchievementType } = useAchievementTypes();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    points: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createAchievementType(formData);
      router.push('/admin/conquistas/tipos');
    } catch (error) {
      console.error('Erro ao criar tipo de conquista:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/conquistas/tipos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Novo Tipo de Conquista</h1>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">
                Ícone
              </label>
              <Input id="icon" name="icon" value={formData.icon} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="points" className="text-sm font-medium">
                Pontos
              </label>
              <Input
                id="points"
                name="points"
                type="number"
                value={formData.points}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/conquistas/tipos">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Criar Tipo'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
