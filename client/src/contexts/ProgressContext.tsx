import { createContext, useContext, ReactNode } from 'react';
import { useProgress, ProgressData } from '@/hooks/useProgress';

interface ProgressContextType {
  progress: ProgressData;
  markLessonComplete: (lessonId: string) => void;
  markModuleComplete: (moduleId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  isModuleComplete: (moduleId: string) => boolean;
  resetProgress: () => void;
  getModuleProgress: (totalLessons: number) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progressHook = useProgress();

  return (
    <ProgressContext.Provider value={progressHook}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgressContext must be used within ProgressProvider');
  }
  return context;
}
