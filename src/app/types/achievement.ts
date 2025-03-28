export type AchievementRequirementType =
  | 'STUDY_STREAK'
  | 'COURSE_COMPLETION'
  | 'QUIZ_MASTER'
  | 'SOCIAL';

export interface BaseRequirement {
  type: AchievementRequirementType;
}

export interface StudyStreakRequirement extends BaseRequirement {
  type: 'STUDY_STREAK';
  days: number;
}

export interface CourseCompletionRequirement extends BaseRequirement {
  type: 'COURSE_COMPLETION';
  count: number;
}

export interface QuizMasterRequirement extends BaseRequirement {
  type: 'QUIZ_MASTER';
  score: number;
}

export interface SocialRequirement extends BaseRequirement {
  type: 'SOCIAL';
  action: 'FOLLOWERS' | 'FOLLOWING' | 'COMMENTS' | 'LIKES';
  count: number;
}

export type AchievementRequirement =
  | StudyStreakRequirement
  | CourseCompletionRequirement
  | QuizMasterRequirement
  | SocialRequirement;

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: AchievementRequirementType;
  requirement: AchievementRequirement;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
  rewards?: {
    type: 'xp' | 'item' | 'currency';
    amount: number;
    name: string;
    icon?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  achievement: Achievement;
  unlockedAt: Date;
}

export interface AchievementProgress {
  achievement: Achievement;
  progress: number;
  isCompleted: boolean;
}
