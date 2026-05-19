import { useMemo } from 'react';
import { courseData, Lesson, Module } from '@/lib/courseData';

export interface SearchResult {
  type: 'module' | 'lesson';
  moduleId: string;
  moduleName: string;
  lessonId?: string;
  lessonName?: string;
  description: string;
  topics?: string[];
}

export function useSearch(query: string): SearchResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    courseData.forEach((module: Module) => {
      // Search in module title and description
      if (
        module.title.toLowerCase().includes(lowerQuery) ||
        module.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'module',
          moduleId: module.id,
          moduleName: module.title,
          description: module.description,
        });
      }

      // Search in lessons
      module.lessons.forEach((lesson: Lesson) => {
        if (
          lesson.title.toLowerCase().includes(lowerQuery) ||
          lesson.description.toLowerCase().includes(lowerQuery) ||
          lesson.topics.some((topic) => topic.toLowerCase().includes(lowerQuery)) ||
          lesson.content.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'lesson',
            moduleId: module.id,
            moduleName: module.title,
            lessonId: lesson.id,
            lessonName: lesson.title,
            description: lesson.description,
            topics: lesson.topics,
          });
        }
      });
    });

    return results;
  }, [query]);
}
