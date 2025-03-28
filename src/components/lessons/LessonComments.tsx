import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCommentAchievements } from '@/hooks/useCommentAchievements';
import { toast } from 'sonner';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image?: string;
  };
}

interface LessonCommentsProps {
  lessonId: string;
  comments: Comment[];
}

export function LessonComments({ lessonId, comments }: LessonCommentsProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useCommentAchievements(comments.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/lessons/${lessonId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao enviar comentário');

      toast.success('Comentário enviado com sucesso!');
      setContent('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      toast.error('Erro ao enviar comentário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comentários</h3>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Compartilhe sua opinião sobre a aula..."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="min-h-[100px]"
          />

          <Button type="submit" disabled={isLoading || !content.trim()}>
            {isLoading ? 'Enviando...' : 'Enviar comentário'}
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        {comments.map(comment => (
          <Card key={comment.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {comment.user.image ? (
                  <img
                    src={comment.user.image}
                    alt={comment.user.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{comment.user.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.user.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}