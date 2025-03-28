export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  progress?: Progress[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  level: string;
  duration: string;
  image: string;
  category: string;
  tags: string[];
  thumbnail: string;
  modules: Module[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'text' | 'quiz';
  duration: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: User;
  course: Course;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  user: User;
  plan: Plan;
  status: 'active' | 'canceled' | 'expired';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  id: string;
  user: User;
  course: Course;
  lesson: Lesson;
  completed: boolean;
  timeSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certificate {
  id: string;
  user: User;
  course: Course;
  issueDate: Date;
  verificationUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAchievement {
  id: string;
  user: User;
  achievement: Achievement;
  earnedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
