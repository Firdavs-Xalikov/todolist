import {
  Milestone,
  RoadmapTopic,
  Project,
  FitnessState,
  IslamState,
  FinanceState,
  Book,
  Task,
  TodayScheduleItem,
  ProfileState,
  AICoachReport,
  CalendarEvent,
  AIReview,
} from '@/types';

export const INITIAL_TODAY_SCHEDULE: TodayScheduleItem[] = [
  { id: 'ts1', time: '06:00', title: 'Morning Routine & Cold Hydration', category: 'routine', completed: false, postponed: false },
  { id: 'ts2', time: '06:30', title: 'Fajr Prayer at Mosque & Dhikr', category: 'prayer', completed: false, postponed: false },
  { id: 'ts3', time: '07:15', title: 'SAT Digital Math & EBRW Practice', category: 'learning', completed: false, postponed: false },
  { id: 'ts4', time: '08:45', title: 'Programming & System Design (Distributed Caching)', category: 'learning', completed: false, postponed: false },
  { id: 'ts5', time: '11:00', title: 'High-Protein Breakfast & Mental Reset', category: 'rest', completed: false, postponed: false },
  { id: 'ts6', time: '12:00', title: 'Gym Workout (Push A Heavy Incline Bench)', category: 'fitness', completed: false, postponed: false },
  { id: 'ts7', time: '13:30', title: 'Swimming Session (2,500m Freestyle)', category: 'fitness', completed: false, postponed: false },
  { id: 'ts8', time: '14:45', title: 'Nutritious Lunch & Dhuhr Prayer', category: 'routine', completed: false, postponed: false },
  { id: 'ts9', time: '15:30', title: 'Cybersecurity HTB Active Directory Labs', category: 'learning', completed: false, postponed: false },
  { id: 'ts10', time: '17:30', title: 'English Vocabulary & Scientific Essay Writing', category: 'learning', completed: false, postponed: false },
  { id: 'ts11', time: '18:30', title: 'Projects Deep Work (ReadForge & Life OS)', category: 'projects', completed: false, postponed: false },
  { id: 'ts12', time: '20:00', title: 'Maghrib Prayer & Family Reflection', category: 'prayer', completed: false, postponed: false },
  { id: 'ts13', time: '21:00', title: 'Reading Tech Books & Isha Prayer', category: 'learning', completed: false, postponed: false },
  { id: 'ts14', time: '22:30', title: 'Sleep Optimization (Dark Room & 18°C)', category: 'rest', completed: false, postponed: false },
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ce1', title: 'Fajr Prayer & Quran Recitation', startTime: '05:30', endTime: '06:15', category: 'prayer', completed: false },
  { id: 'ce2', title: 'Deep Work Block 1: Distributed Systems & Programming', startTime: '06:30', endTime: '09:30', category: 'deep-work', completed: false },
  { id: 'ce3', title: 'Cybersecurity HTB Lab & OWASP Pentesting', startTime: '09:45', endTime: '11:45', category: 'learning', completed: false },
  { id: 'ce4', title: 'Dhuhr Prayer & Healthy Nutrition', startTime: '12:30', endTime: '13:30', category: 'rest', completed: false },
  { id: 'ce5', title: 'Heavy Gym Workout (Push A) & 20 min Sauna', startTime: '14:00', endTime: '15:45', category: 'fitness', completed: false },
  { id: 'ce6', title: 'Asr Prayer & ReadForge Engine Feature Coding', startTime: '16:30', endTime: '18:30', category: 'deep-work', completed: false },
  { id: 'ce7', title: 'Maghrib Prayer & Family Dinner', startTime: '19:45', endTime: '20:30', category: 'rest', completed: false },
  { id: 'ce8', title: 'Isha Prayer, Tech Book Reading & Daily Review', startTime: '21:00', endTime: '22:15', category: 'learning', completed: false },
];

export const INITIAL_AI_REVIEWS: AIReview[] = [
  {
    id: 'air-1',
    type: 'weekly',
    date: 'Day 1 Initialized',
    summary: 'System initialized for Day 1 execution. All goals, roadmaps, and schedule items set for peak self-mastery.',
    wins: [
      'Initialized Project 25 Personal Operating System',
      'Configured 8px spatial grid and dark mode architecture',
    ],
    weaknessesDetected: [],
    recommendations: [
      'Execute 06:30 morning Fajr and deep work window',
      'Maintain 100% daily focus on core SAT & Systems Engineering roadmaps',
    ],
    autoGoalAdjustments: [
      'Set daily schedule timeline to 14 core performance blocks',
    ],
  },
];

export const INITIAL_PROFILE: ProfileState = {
  level: 1,
  xp: 0,
  nextLevelXp: 1000,
  title: 'Sovereign Systems Engineer',
  achievements: [
    { id: 'ach1', title: 'Day 1 Execution', description: 'Begin your journey towards self-mastery by age 25.', unlocked: false, category: 'Islam' },
    { id: 'ach2', title: 'SAT 1500+ Master', description: 'Score 1500+ on the Digital SAT exam.', unlocked: false, category: 'Academics' },
    { id: 'ach3', title: 'Sub-20ms Engine', description: 'Architect Next.js App Router engine with 18ms TTFB.', unlocked: false, category: 'Engineering' },
    { id: 'ach4', title: '2,500m Swimmer', description: 'Log 2.5km continuous freestyle swimming session.', unlocked: false, category: 'Fitness' },
    { id: 'ach5', title: 'Cyber Sentinel', description: 'Solve 15 Hack The Box Active Directory labs.', unlocked: false, category: 'Security' },
    { id: 'ach6', title: '$1,000,000 Milestone', description: 'Achieve $1M net worth by Age 25.', unlocked: false, category: 'Finance' },
  ],
};

export const INITIAL_AI_COACH: AICoachReport = {
  date: new Date().toISOString().split('T')[0],
  todaysReview: 'Day 1 initialized. Complete your first schedule item to begin your streak!',
  biggestWin: 'Project 25 OS deployed and ready for Day 1.',
  biggestMistake: 'None yet. Maintain focus on morning deep work.',
  tomorrowPriority: 'Execute Fajr prayer and early morning SAT practice.',
  weeklyAdvice: 'Focus on one high-priority task at a time with 0 notifications.',
};

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    age: 17,
    title: 'SAT 1500+',
    subtitle: 'Academic Mastery & Standardized Testing',
    targetYear: '2024',
    status: 'in-progress',
    completionPercentage: 0,
    description: 'Score 1500+ on the Digital SAT (Math 800, EBRW 720+) to qualify for top-tier undergraduate admissions and merit scholarships.',
    kpis: ['SAT Target: 1500+', 'Math: 800/800', 'EBRW: 720/800'],
    subGoals: [
      { id: 'sg1', title: 'Complete College Board Question Bank', completed: false },
      { id: 'sg2', title: 'Master Erica Meltzer Grammar & Reading', completed: false },
      { id: 'sg3', title: '10 Full-Length Bluebook Practice Tests', completed: false },
    ],
  },
  {
    id: 'm2',
    age: 18,
    title: 'USA Scholarship',
    subtitle: 'Global Higher Education',
    targetYear: '2025',
    status: 'upcoming',
    completionPercentage: 0,
    description: 'Secure a full tuition scholarship and stipend to study Computer Science & Cybersecurity in the United States.',
    kpis: ['100% Tuition Waiver', 'Stipend Secured', 'F-1 Visa Approved'],
    subGoals: [
      { id: 'sg4', title: 'Submit Common App to 12 Target Universities', completed: false },
      { id: 'sg5', title: 'Write High-Impact Personal Statement', completed: false },
      { id: 'sg6', title: 'Complete Financial Aid & CSS Profile', completed: false },
    ],
  },
  {
    id: 'm3',
    age: 19,
    title: 'University Excellence',
    subtitle: 'CS & Cybersecurity Dual Focus',
    targetYear: '2026',
    status: 'upcoming',
    completionPercentage: 0,
    description: 'Maintain 3.9+ GPA while publishing undergraduate research in Offensive Cybersecurity and Distributed Systems.',
    kpis: ['GPA: 3.95/4.0', 'Dean\'s List', 'Research Paper Accepted'],
    subGoals: [
      { id: 'sg7', title: 'Algorithms & Data Structures A+', completed: false },
      { id: 'sg8', title: 'Join University Competitive Cybersecurity Team', completed: false },
      { id: 'sg9', title: 'Publish IEEE Conference Paper', completed: false },
    ],
  },
  {
    id: 'm4',
    age: 20,
    title: 'Tier-1 Internship',
    subtitle: 'Silicon Valley / High-Growth Startup',
    targetYear: '2027',
    status: 'upcoming',
    completionPercentage: 0,
    description: 'Land a Software Engineering & Security Internship at a premier tech company or fast-growing AI/Infra startup.',
    kpis: ['Comp: $50+/hr', 'Return Offer Target', 'Production Code Deployed'],
    subGoals: [
      { id: 'sg10', title: 'Solve 300+ LeetCode Medium/Hard Problems', completed: false },
      { id: 'sg11', title: 'Build 3 Production Full-Stack Projects', completed: false },
      { id: 'sg12', title: 'Ace System Design & Behavioral Interviews', completed: false },
    ],
  },
  {
    id: 'm5',
    age: 21,
    title: 'Software Engineer',
    subtitle: 'High-Impact Technical Career',
    targetYear: '2028',
    status: 'upcoming',
    completionPercentage: 0,
    description: 'Begin full-time career as a Systems & Security Software Engineer with a total compensation exceeding $180,000/yr.',
    kpis: ['TC: $180k+', 'L4 Engineer Level', '$100k Net Savings'],
    subGoals: [
      { id: 'sg13', title: 'Secure Full-Time Offer Before Graduation', completed: false },
      { id: 'sg14', title: 'Master Production Distributed Systems & K8s', completed: false },
    ],
  },
  {
    id: 'm6',
    age: 23,
    title: 'Own Company',
    subtitle: 'B2B Security & AI Infrastructure',
    targetYear: '2030',
    status: 'upcoming',
    completionPercentage: 0,
    description: 'Launch a venture-backed or bootstrapped cybersecurity SaaS delivering enterprise zero-trust automated compliance.',
    kpis: ['$50k MRR', 'Y-Combinator / Seed Funding', '10 Enterprise Clients'],
    subGoals: [
      { id: 'sg15', title: 'Validate MVP with 20 Enterprise CISOs', completed: false },
      { id: 'sg16', title: 'Assemble Co-Founder & Core Engineering Team', completed: false },
    ],
  },
  {
    id: 'm7',
    age: 25,
    title: 'Financial Freedom',
    subtitle: 'Mastery of Life, Health, Faith & Capital',
    targetYear: '2032',
    status: 'upcoming',
    completionPercentage: 0,
    description: 'Achieve total self-sovereignty: $1,000,000+ net worth, peak physical health, deeply grounded faith, and market leadership.',
    kpis: ['Net Worth: $1,000,000+', 'Passive Income > Expenses', 'Global Freedom'],
    subGoals: [
      { id: 'sg17', title: 'Build Multi-Asset Investment Portfolio', completed: false },
      { id: 'sg18', title: 'Establish Family Endowment & Philanthropy', completed: false },
    ],
  },
];

export const INITIAL_ROADMAPS: RoadmapTopic[] = [
  {
    id: 'prog-1',
    title: 'HTML & CSS Architecture',
    category: 'Programming',
    completed: false,
    difficulty: 'Beginner',
    estimatedHours: 25,
    completionPercentage: 0,
    lessons: [
      { id: 'l1', title: 'Semantic HTML5 & Accessibility (a11y)', completed: false, estimatedHours: 5, difficulty: 'Beginner' },
      { id: 'l2', title: 'Modern Flexbox & CSS Grid Layouts', completed: false, estimatedHours: 8, difficulty: 'Beginner' },
      { id: 'l3', title: 'Custom CSS Variables & Design Systems', completed: false, estimatedHours: 7, difficulty: 'Intermediate' },
    ],
    notes: 'Focus on 8px spatial grids, semantic headings, and clean fluid layouts.',
  },
  {
    id: 'prog-2',
    title: 'JavaScript & TypeScript Mastery',
    category: 'Programming',
    completed: false,
    difficulty: 'Intermediate',
    estimatedHours: 60,
    completionPercentage: 0,
    lessons: [
      { id: 'l4', title: 'Event Loop, Microtasks & Asynchronous JS', completed: false, estimatedHours: 15, difficulty: 'Intermediate' },
      { id: 'l5', title: 'Generics, Conditional Types & Utility Types', completed: false, estimatedHours: 20, difficulty: 'Advanced' },
      { id: 'l6', title: 'Functional Programming & Immutable Patterns', completed: false, estimatedHours: 15, difficulty: 'Intermediate' },
    ],
  },
  {
    id: 'prog-3',
    title: 'React & Next.js App Router',
    category: 'Programming',
    completed: false,
    difficulty: 'Advanced',
    estimatedHours: 80,
    completionPercentage: 0,
    lessons: [
      { id: 'l7', title: 'React 18 Concurrent Rendering & Server Components', completed: false, estimatedHours: 25, difficulty: 'Advanced' },
      { id: 'l8', title: 'Next.js App Router Architecture & Server Actions', completed: false, estimatedHours: 30, difficulty: 'Advanced' },
      { id: 'l9', title: 'State Management with Context & Zustand', completed: false, estimatedHours: 15, difficulty: 'Intermediate' },
    ],
  },
  {
    id: 'sat-1',
    title: 'Digital SAT Math Masterclass',
    category: 'SAT',
    completed: false,
    difficulty: 'Advanced',
    estimatedHours: 60,
    completionPercentage: 0,
    lessons: [
      { id: 'satl1', title: 'Advanced Algebra & Functions', completed: false, estimatedHours: 20, difficulty: 'Intermediate' },
      { id: 'satl2', title: 'Geometry & Trigonometric Applications', completed: false, estimatedHours: 20, difficulty: 'Intermediate' },
      { id: 'satl3', title: 'Desmos Graphing Calculator Tricks & Efficiency', completed: false, estimatedHours: 20, difficulty: 'Advanced' },
    ],
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Project 25',
    tagline: 'Mobile-first personal operating system for peak self-mastery by age 25',
    status: 'active',
    progress: 10,
    repoUrl: 'https://github.com/Firdavs-Xalikov/todolist',
    deployUrl: 'https://todolist-firdavs-xalikov.vercel.app',
    deployStatus: 'healthy',
    techStack: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Capacitor iOS'],
    overview: 'An iPhone-native personal OS designed for peak human performance, tracking roadmaps, daily schedule timeline, mission goals, fitness metrics, prayer status, and finance.',
    roadmap: [
      { phase: 'v1.0', title: 'Mobile Bottom Tab Bar & iOS Aesthetics', status: 'done' },
      { phase: 'v1.1', title: 'Swipe-to-Complete Today Timeline Schedule', status: 'active' },
    ],
    tasks: [],
    notes: 'Day 1 initialized.',
  },
];

export const INITIAL_FITNESS: FitnessState = {
  weightKg: 74.5,
  targetWeightKg: 78.0,
  sleepHours: 8.0,
  sleepQualityScore: 90,
  waterLiters: 0.0,
  caloriesBurned: 0,
  saunaSessionsThisWeek: 0,
  workoutSplit: [
    {
      id: 'w1',
      date: new Date().toISOString().split('T')[0],
      splitName: 'Push A - Heavy Upper Body',
      durationMinutes: 60,
      completed: false,
      exercises: [
        { id: 'ex1', name: 'Incline Barbell Bench Press', sets: 4, reps: 8, weightKg: 85, targetMuscle: 'Upper Chest' },
        { id: 'ex2', name: 'Overhead Dumbbell Press', sets: 4, reps: 10, weightKg: 28, targetMuscle: 'Shoulders' },
      ],
    },
  ],
  swimmingLogs: [],
  bodyMeasurements: {
    chestCm: 108,
    waistCm: 79,
    bicepsCm: 40.5,
    thighsCm: 61,
  },
};

export const INITIAL_ISLAM: IslamState = {
  prayersToday: {
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    wuduMaintained: false,
    streakDays: 1,
  },
  quranProgressPercentage: 0,
  juzCompleted: 0,
  surahs: [
    { number: 1, name: 'Al-Fatiha', englishTitle: 'The Opening', status: 'memorized', memorizedAyahs: 7, totalAyahs: 7 },
    { number: 18, name: 'Al-Kahf', englishTitle: 'The Cave', status: 'reading', memorizedAyahs: 10, totalAyahs: 110 },
  ],
  duas: [
    {
      id: 'd1',
      arabic: 'رَبِّ زِدْنِي عِلْمًا',
      transliteration: 'Rabbi zidni ilma',
      meaning: 'My Lord, increase me in knowledge.',
      category: 'Knowledge & Wisdom',
    },
  ],
  reflectionJournal: [],
};

export const INITIAL_FINANCE: FinanceState = {
  netWorth: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  monthlyBudget: 2000,
  savingsRate: 0,
  netWorthTargetAge25: 1000000,
  transactions: [],
  assets: [],
  goals: [
    { name: 'Target Net Worth at Age 25', target: 1000000, current: 0 },
  ],
};

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'System Design',
    pagesRead: 0,
    totalPages: 616,
    status: 'reading',
    rating: 5,
    highlights: [],
    keyNotes: 'Crucial reading for scaling distributed systems.',
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'tk1',
    title: 'Complete System Design chapter on Distributed Caching & Sharding',
    category: 'learning',
    priority: 'urgent',
    status: 'todo',
    estimatedMinutes: 90,
    energyRequired: 'high',
    isDeepWork: true,
    createdAt: new Date().toISOString().split('T')[0],
  },
];
