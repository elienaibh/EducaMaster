import { Container } from '@/components/ui/container';
import { AchievementsList } from '@/components/achievements/AchievementsList';
import { AchievementsProgress } from '@/components/achievements/AchievementsProgress';
import { AvailableAchievements } from '@/components/achievements/AvailableAchievements';
import { AchievementsRanking } from '@/components/achievements/AchievementsRanking';

export default function AchievementsPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Minhas Conquistas</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AchievementsProgress />
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Conquistas Desbloqueadas</h2>
              <AchievementsList />
            </div>
          </div>
          <div className="space-y-8">
            <AvailableAchievements />
            <AchievementsRanking />
          </div>
        </div>
      </div>
    </Container>
  );
}
