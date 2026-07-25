export type ViewType =
  | 'dashboard'
  | 'mission'
  | 'learn'
  | 'projects'
  | 'profile'
  | 'today'
  | 'fitness'
  | 'islam'
  | 'finance'
  | 'books'
  | 'calendar'
  | 'analytics'
  | 'ai-coach'
  | 'ai-reviews'
  | 'settings';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type EnergyLevel = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  category: 'learning' | 'projects' | 'fitness' | 'islam' | 'finance' | 'life';
  priority: Priority;
  status: TaskStatus;
  estimatedMinutes: number;
  actualMinutes?: number;
  energyRequired: EnergyLevel;
  isDeepWork: boolean;
  deadline?: string;
  dependencies?: string[];
  createdAt: string;
  notes?: string;
}

export interface TodayScheduleItem {
  id: string;
  time: string;
  title: string;
  category: 'routine' | 'prayer' | 'learning' | 'fitness' | 'rest' | 'projects';
  completed: boolean;
  postponed: boolean;
}

export interface Milestone {
  id: string;
  age: number;
  title: string;
  subtitle: string;
  targetYear: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  completionPercentage: number;
  description: string;
  kpis: string[];
  subGoals: { id: string; title: string; completed: boolean }[];
}

export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  resourcesLink?: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  category: 'SAT' | 'English' | 'Programming' | 'Cybersecurity' | 'Finance' | 'Islam' | 'Soft Skills';
  completed: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  estimatedHours: number;
  completionPercentage: number;
  lessons: Lesson[];
  notes?: string;
  projects?: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: 'active' | 'planning' | 'completed' | 'paused';
  progress: number;
  repoUrl?: string;
  deployUrl?: string;
  deployStatus: 'healthy' | 'building' | 'failed' | 'idle';
  techStack: string[];
  overview: string;
  roadmap: { phase: string; title: string; status: 'done' | 'active' | 'todo' }[];
  tasks: Task[];
  notes: string;
}

export interface ExerciseLog {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weightKg: number;
  targetMuscle: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  splitName: string;
  durationMinutes: number;
  exercises: ExerciseLog[];
  completed: boolean;
}

export interface SwimmingLog {
  id: string;
  date: string;
  distanceMeters: number;
  timeMinutes: number;
  techniqueNotes: string;
}

export interface FitnessState {
  weightKg: number;
  targetWeightKg: number;
  sleepHours: number;
  sleepQualityScore: number;
  waterLiters: number;
  caloriesBurned: number;
  saunaSessionsThisWeek: number;
  workoutSplit: WorkoutSession[];
  swimmingLogs: SwimmingLog[];
  bodyMeasurements: {
    chestCm: number;
    waistCm: number;
    bicepsCm: number;
    thighsCm: number;
  };
}

export interface PrayerState {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  wuduMaintained: boolean;
  streakDays: number;
}

export interface SurahProgress {
  number: number;
  name: string;
  englishTitle: string;
  status: 'memorized' | 'reading' | 'to-learn';
  memorizedAyahs: number;
  totalAyahs: number;
}

export interface DuaItem {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: string;
}

export interface IslamState {
  prayersToday: PrayerState;
  quranProgressPercentage: number;
  juzCompleted: number;
  surahs: SurahProgress[];
  duas: DuaItem[];
  reflectionJournal: { id: string; date: string; text: string }[];
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface FinanceState {
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyBudget: number;
  savingsRate: number;
  netWorthTargetAge25: number;
  transactions: Transaction[];
  assets: { name: string; value: number; category: 'cash' | 'crypto' | 'stocks' | 'business' }[];
  goals: { name: string; target: number; current: number }[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  pagesRead: number;
  totalPages: number;
  status: 'reading' | 'want-to-read' | 'completed';
  rating?: number;
  highlights: string[];
  keyNotes: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: 'deep-work' | 'fitness' | 'prayer' | 'learning' | 'rest';
  completed: boolean;
}

export interface ProfileState {
  level: number;
  xp: number;
  nextLevelXp: number;
  title: string;
  achievements: {
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
    category: string;
  }[];
}

export interface AIReview {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  date: string;
  summary: string;
  wins: string[];
  weaknessesDetected: string[];
  recommendations: string[];
  autoGoalAdjustments: string[];
}

export interface AICoachReport {
  date: string;
  todaysReview: string;
  biggestWin: string;
  biggestMistake: string;
  tomorrowPriority: string;
  weeklyAdvice: string;
}
