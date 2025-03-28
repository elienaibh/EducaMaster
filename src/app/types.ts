export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  type: 'video' | 'text' | 'quiz';
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export type CourseCategory =
  | 'programming'
  | 'design'
  | 'marketing'
  | 'business'
  | 'data'
  | 'languages';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    image?: string;
  };
  modules: Module[];
  students: Student[];
  rating: number;
  price: number;
  category: CourseCategory;
  level: CourseLevel;
  tags: string[];
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonProgress {
  lesson: Lesson;
  completed: boolean;
  timeSpent: number;
  lastAccess: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  progress?: LessonProgress[];
}

export interface Progress {
  user: User;
  course: Course;
  lesson: Lesson;
  timeSpent: number;
  completed: boolean;
  lastAccess: Date;
}

export interface Certificate {
  id: string;
  user: User;
  course: Course;
  issueDate: Date;
  verificationUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: Date;
}
