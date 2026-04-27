import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { courseData } from '@/lib/courseData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { ProseContent } from '@/components/ProseContent';

export default function Module() {
  const { moduleId } = useParams();
  const [, setLocation] = useLocation();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const module = courseData.find(m => m.id === moduleId);
  const selectedLesson = module?.lessons.find(l => l.id === selectedLessonId) || module?.lessons[0];
  const lessonIndex = module?.lessons.findIndex(l => l.id === selectedLesson?.id) ?? 0;

  if (!module) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Module Not Found</h1>
          <Button onClick={() => setLocation('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Module {courseData.indexOf(module) + 1}</div>
            <div className="font-bold">{module.title}</div>
          </div>
          <div className="w-16" />
        </div>
      </nav>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Lessons List */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-bold text-sm text-primary mb-4">Lessons</h3>
              {module.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-left p-3 rounded border transition-all text-sm ${
                    selectedLesson?.id === lesson.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-mono text-xs text-muted-foreground mb-1">
                    Lesson {idx + 1}
                  </div>
                  <div className="line-clamp-2">{lesson.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {selectedLesson && (
              <>
                {/* Lesson Header */}
                <div className="border-b border-border pb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-primary">
                      Lesson {lessonIndex + 1} of {module.lessons.length}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      selectedLesson.difficulty === 'beginner' ? 'bg-green-900/30 text-green-300' :
                      selectedLesson.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-300' :
                      'bg-red-900/30 text-red-300'
                    }`}>
                      {selectedLesson.difficulty}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl font-bold mb-4">{selectedLesson.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6">{selectedLesson.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">⏱️ Duration:</span>
                      <span className="font-mono">{selectedLesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">📚 Topics:</span>
                      <span className="font-mono">{selectedLesson.topics.length} topics</span>
                    </div>
                  </div>
                </div>

                {/* Topics Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedLesson.topics.map((topic) => (
                    <span 
                      key={topic}
                      className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded border border-border text-sm font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Lesson Content */}
                <Card className="bg-card border-border p-8">
                  <ProseContent>
                    <Streamdown>{selectedLesson.content}</Streamdown>
                  </ProseContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-8 border-t border-border">
                  {prevLesson ? (
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => setSelectedLessonId(prevLesson.id)}
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous Lesson
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      disabled
                      className="gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous Lesson
                    </Button>
                  )}
                  
                  {nextLesson ? (
                    <Button
                      className="ml-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => setSelectedLessonId(nextLesson.id)}
                    >
                      Next Lesson <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      className="ml-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => setLocation('/')}
                    >
                      Back to Home <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-mono text-primary">
                      {lessonIndex + 1} / {module.lessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${((lessonIndex + 1) / module.lessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
