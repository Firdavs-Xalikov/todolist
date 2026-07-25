'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ViewType,
  Task,
  TodayScheduleItem,
  Milestone,
  RoadmapTopic,
  Project,
  FitnessState,
  IslamState,
  FinanceState,
  Book,
  ProfileState,
  AICoachReport,
  AIReview,
  CalendarEvent,
  WorkoutSession,
  SwimmingLog,
  Transaction,
} from '@/types';
import {
  INITIAL_TODAY_SCHEDULE,
  INITIAL_PROFILE,
  INITIAL_AI_COACH,
  INITIAL_MILESTONES,
  INITIAL_ROADMAPS,
  INITIAL_PROJECTS,
  INITIAL_FITNESS,
  INITIAL_ISLAM,
  INITIAL_FINANCE,
  INITIAL_BOOKS,
  INITIAL_TASKS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_AI_REVIEWS,
} from '@/data/seedData';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isFocusTimerOpen: boolean;
  setIsFocusTimerOpen: (open: boolean) => void;
  isAICoachModalOpen: boolean;
  setIsAICoachModalOpen: (open: boolean) => void;

  // Data
  todaySchedule: TodayScheduleItem[];
  profile: ProfileState;
  aiCoach: AICoachReport;
  milestones: Milestone[];
  roadmaps: RoadmapTopic[];
  projects: Project[];
  fitness: FitnessState;
  islam: IslamState;
  finance: FinanceState;
  books: Book[];
  tasks: Task[];
  calendarEvents: CalendarEvent[];
  aiReviews: AIReview[];

  // Mutators
  toggleScheduleItem: (id: string) => void;
  postponeScheduleItem: (id: string) => void;
  gainXP: (amount: number) => void;
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
  togglePrayer: (prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha') => void;
  toggleLesson: (topicId: string, lessonId: string) => void;
  addWorkoutSession: (session: WorkoutSession) => void;
  addSwimmingLog: (log: SwimmingLog) => void;
  addTransaction: (tx: Transaction) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
  updateBookProgress: (id: string, pagesRead: number) => void;
  addJournalEntry: (text: string) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'project_25_state_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isFocusTimerOpen, setIsFocusTimerOpen] = useState(false);
  const [isAICoachModalOpen, setIsAICoachModalOpen] = useState(false);

  const [todaySchedule, setTodaySchedule] = useState<TodayScheduleItem[]>(INITIAL_TODAY_SCHEDULE);
  const [profile, setProfile] = useState<ProfileState>(INITIAL_PROFILE);
  const [aiCoach, setAiCoach] = useState<AICoachReport>(INITIAL_AI_COACH);
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [roadmaps, setRoadmaps] = useState<RoadmapTopic[]>(INITIAL_ROADMAPS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [fitness, setFitness] = useState<FitnessState>(INITIAL_FITNESS);
  const [islam, setIslam] = useState<IslamState>(INITIAL_ISLAM);
  const [finance, setFinance] = useState<FinanceState>(INITIAL_FINANCE);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.todaySchedule) setTodaySchedule(parsed.todaySchedule);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.aiCoach) setAiCoach(parsed.aiCoach);
        if (parsed.milestones) setMilestones(parsed.milestones);
        if (parsed.roadmaps) setRoadmaps(parsed.roadmaps);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.fitness) setFitness(parsed.fitness);
        if (parsed.islam) setIslam(parsed.islam);
        if (parsed.finance) setFinance(parsed.finance);
        if (parsed.books) setBooks(parsed.books);
        if (parsed.tasks) setTasks(parsed.tasks);
      }
    } catch (err) {
      console.error('Failed to parse state:', err);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      const stateToSave = {
        todaySchedule,
        profile,
        aiCoach,
        milestones,
        roadmaps,
        projects,
        fitness,
        islam,
        finance,
        books,
        tasks,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error('Failed to save state:', err);
    }
  }, [
    todaySchedule,
    profile,
    aiCoach,
    milestones,
    roadmaps,
    projects,
    fitness,
    islam,
    finance,
    books,
    tasks,
  ]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        setIsFocusTimerOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mutators
  const gainXP = (amount: number) => {
    setProfile((prev) => {
      const newXp = prev.xp + amount;
      if (newXp >= prev.nextLevelXp) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: newXp - prev.nextLevelXp,
          nextLevelXp: Math.round(prev.nextLevelXp * 1.25),
        };
      }
      return { ...prev, xp: newXp };
    });
  };

  const toggleScheduleItem = (id: string) => {
    setTodaySchedule((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          if (nextCompleted) gainXP(100);
          return { ...item, completed: nextCompleted, postponed: false };
        }
        return item;
      })
    );
  };

  const postponeScheduleItem = (id: string) => {
    setTodaySchedule((prev) =>
      prev.map((item) => (item.id === id ? { ...item, postponed: !item.postponed } : item))
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isDone = t.status === 'completed';
          if (!isDone) gainXP(150);
          return { ...t, status: isDone ? 'todo' : 'completed' };
        }
        return t;
      })
    );
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const togglePrayer = (prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha') => {
    setIslam((prev) => {
      const isDone = !prev.prayersToday[prayer];
      if (isDone) gainXP(75);
      return {
        ...prev,
        prayersToday: {
          ...prev.prayersToday,
          [prayer]: isDone,
        },
      };
    });
  };

  const toggleLesson = (topicId: string, lessonId: string) => {
    setRoadmaps((prev) =>
      prev.map((topic) => {
        if (topic.id !== topicId) return topic;

        const updatedLessons = topic.lessons.map((l) => {
          if (l.id === lessonId) {
            const nextCompleted = !l.completed;
            if (nextCompleted) gainXP(120);
            return { ...l, completed: nextCompleted };
          }
          return l;
        });
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const completionPercentage = Math.round((completedCount / updatedLessons.length) * 100);

        return {
          ...topic,
          lessons: updatedLessons,
          completionPercentage,
          completed: completionPercentage === 100,
        };
      })
    );
  };

  const addWorkoutSession = (session: WorkoutSession) => {
    setFitness((prev) => ({
      ...prev,
      workoutSplit: [session, ...prev.workoutSplit],
    }));
    gainXP(200);
  };

  const addSwimmingLog = (log: SwimmingLog) => {
    setFitness((prev) => ({
      ...prev,
      swimmingLogs: [log, ...prev.swimmingLogs],
    }));
    gainXP(200);
  };

  const addTransaction = (tx: Transaction) => {
    setFinance((prev) => {
      const netWorthChange = tx.type === 'income' ? tx.amount : -tx.amount;
      return {
        ...prev,
        netWorth: prev.netWorth + netWorthChange,
        transactions: [tx, ...prev.transactions],
      };
    });
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const updateBookProgress = (id: string, pagesRead: number) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const newStatus = pagesRead >= b.totalPages ? 'completed' : 'reading';
        return {
          ...b,
          pagesRead: Math.min(pagesRead, b.totalPages),
          status: newStatus,
        };
      })
    );
  };

  const addJournalEntry = (text: string) => {
    setIslam((prev) => ({
      ...prev,
      reflectionJournal: [
        {
          id: `rj-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          text,
        },
        ...prev.reflectionJournal,
      ],
    }));
    gainXP(100);
  };

  const resetToDefaults = () => {
    setTodaySchedule(INITIAL_TODAY_SCHEDULE);
    setProfile(INITIAL_PROFILE);
    setAiCoach(INITIAL_AI_COACH);
    setMilestones(INITIAL_MILESTONES);
    setRoadmaps(INITIAL_ROADMAPS);
    setProjects(INITIAL_PROJECTS);
    setFitness(INITIAL_FITNESS);
    setIslam(INITIAL_ISLAM);
    setFinance(INITIAL_FINANCE);
    setBooks(INITIAL_BOOKS);
    setTasks(INITIAL_TASKS);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isSidebarOpen,
        setIsSidebarOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isFocusTimerOpen,
        setIsFocusTimerOpen,
        isAICoachModalOpen,
        setIsAICoachModalOpen,

        todaySchedule,
        profile,
        aiCoach,
        milestones,
        roadmaps,
        projects,
        fitness,
        islam,
        finance,
        books,
        tasks,
        calendarEvents: INITIAL_CALENDAR_EVENTS,
        aiReviews: INITIAL_AI_REVIEWS,

        toggleScheduleItem,
        postponeScheduleItem,
        gainXP,
        toggleTask,
        addTask,
        deleteTask,
        togglePrayer,
        toggleLesson,
        addWorkoutSession,
        addSwimmingLog,
        addTransaction,
        updateMilestone,
        updateBookProgress,
        addJournalEntry,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
