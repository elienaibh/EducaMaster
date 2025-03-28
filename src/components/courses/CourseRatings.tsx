import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { useAchievementUnlock } from '@/hooks/useAchievementUnlock';

interface CourseRatingsProps {
  courseId: string;
  ratings: {
    id: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    user: {
      name: string;
      image?: string;
    };
  }[];
}

export function CourseRatings({ courseId, ratings }: CourseRatingsProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { checkAndUnlockAchievement } = useAchievementUnlock();

  const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/courses/${courseId}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      });

      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao enviar avaliação');

      await checkAndUnlockAchievement('Avaliador');
      toast.success('Avaliação enviada com sucesso!');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      toast.error('Erro ao enviar avaliação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({ratings.length} avaliações)</span>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Compartilhe sua experiência com o curso..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="min-h-[100px]"
          />

          <Button type="submit" disabled={isLoading || rating === 0}>
            {isLoading ? 'Enviando...' : 'Enviar avaliação'}
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        {ratings.map(rating => (
          <Card key={rating.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {rating.user.image ? (
                  <img
                    src={rating.user.image}
                    alt={rating.user.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{rating.user.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{rating.user.name}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {rating.comment && (
                  <p className="mt-2 text-sm text-muted-foreground">{rating.comment}</p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(rating.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}