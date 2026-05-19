import { useState, useEffect } from 'react';

export interface ProgressData {
  completedLessons: Set<string>;
  completedModules: Set<string>;
  totalLessonsCompleted: number;
  totalModulesCompleted: number;
}

const PROGRESS_STORAGE_KEY = 'ethicalhack_progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({
    completedLessons: new Set(),
    completedModules: new Set(),
    totalLessonsCompleted: 0,
    totalModulesCompleted: 0,
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setProgress({
          completedLessons: new Set(data.completedLessons || []),
          completedModules: new Set(data.completedModules || []),
          totalLessonsCompleted: data.totalLessonsCompleted || 0,
          totalModulesCompleted: data.totalModulesCompleted || 0,
        });
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      completedLessons: Array.from(progress.completedLessons),
      completedModules: Array.from(progress.completedModules),
      totalLessonsCompleted: progress.totalLessonsCompleted,
      totalModulesCompleted: progress.totalModulesCompleted,
    };
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [progress]);

  const markLessonComplete = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.has(lessonId)) {
        return prev;
      }
      const newCompleted = new Set(prev.completedLessons);
      newCompleted.add(lessonId);
      return {
        ...prev,
        completedLessons: newCompleted,
        totalLessonsCompleted: prev.totalLessonsCompleted + 1,
      };
    });
  };

  const markModuleComplete = (moduleId: string) => {
    setProgress((prev) => {
      if (prev.completedModules.has(moduleId)) {
        return prev;
      }
      const newCompleted = new Set(prev.completedModules);
      newCompleted.add(moduleId);
      return {
        ...prev,
        completedModules: newCompleted,
        totalModulesCompleted: prev.totalModulesCompleted + 1,
      };
    });
  };

  const isLessonComplete = (lessonId: string) => {
    return progress.completedLessons.has(lessonId);
  };

  const isModuleComplete = (moduleId: string) => {
    return progress.completedModules.has(moduleId);
  };

  const resetProgress = () => {
    setProgress({
      completedLessons: new Set(),
      completedModules: new Set(),
      totalLessonsCompleted: 0,
      totalModulesCompleted: 0,
    });
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  };

  const getModuleProgress = (totalLessons: number) => {
    return Math.round((progress.totalLessonsCompleted / totalLessons) * 100);
  };

  return {
    progress,
    markLessonComplete,
    markModuleComplete,
    isLessonComplete,
    isModuleComplete,
    resetProgress,
    getModuleProgress,
  };
}
