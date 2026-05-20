import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProgressContext } from '@/contexts/ProgressContext';
import { useLocation } from 'wouter';
import { ChevronLeft, BarChart3, Award, BookOpen, Target } from 'lucide-react';
import { courseData } from '@/lib/courseData';
import { Certificate } from '@/components/Certificate';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { progress, resetProgress } = useProgressContext();
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const totalLessons = courseData.reduce((sum, module) => sum + module.lessons.length, 0);
  const progressPercentage = Math.round((progress.totalLessonsCompleted / totalLessons) * 100);
  const allModulesCompleted = progress.totalModulesCompleted === courseData.length;

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress? This action cannot be undone.')) {
      resetProgress();
    }
  };

  const handleGenerateCertificate = () => {
    if (!userName.trim()) return;
    setShowCertificate(true);
    setShowNameInput(false);
  };

  if (showCertificate && userName) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
          <div className="container flex items-center justify-between py-4">
            <Button
              variant="ghost"
              onClick={() => setShowCertificate(false)}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <div className="flex items-center gap-2">
              <img src="/manus-storage/silabslogo_09e95224.jpg" alt="Silabs & Co Technologies Ltd" className="h-6 w-6 rounded-full" />
              <h1 className="text-xl font-bold">Certificate of Completion</h1>
            </div>
            <div className="w-16" />
          </div>
        </nav>

        <div className="container py-12">
          <Certificate
            userName={userName}
            completionDate={new Date()}
            totalLessonsCompleted={progress.totalLessonsCompleted}
            totalModulesCompleted={progress.totalModulesCompleted}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <img src="/manus-storage/silabslogo_09e95224.jpg" alt="Silabs & Co Technologies Ltd" className="h-6 w-6 rounded-full" />
            <h1 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Your Dashboard
            </h1>
          </div>
          <div className="w-16" />
        </div>
      </nav>

      <div className="container py-12">
        {/* Overall Progress */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Progress Card */}
          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" /> Overall Progress
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold">Course Completion</span>
                  <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {progress.totalLessonsCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                  <div className="text-xs text-muted-foreground mt-1">of {totalLessons}</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {progress.totalModulesCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                  <div className="text-xs text-muted-foreground mt-1">of {courseData.length}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  {progressPercentage === 100
                    ? '🎉 Congratulations! You have completed the entire course!'
                    : `Keep going! You are ${progressPercentage}% through the course.`}
                </p>
              </div>
            </div>
          </Card>

          {/* Module Progress */}
          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-accent" /> Module Progress
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {courseData.map((module, idx) => {
                const moduleLessonsCompleted = module.lessons.filter((lesson) =>
                  progress.completedLessons.has(lesson.id)
                ).length;
                const moduleProgress = Math.round((moduleLessonsCompleted / module.lessons.length) * 100);

                return (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{idx + 1}. {module.title}</span>
                      <span className="text-xs text-muted-foreground">{moduleProgress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${moduleProgress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Certificate Section */}
        {allModulesCompleted && (
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary p-8 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Award className="w-12 h-12 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">🎓 Congratulations!</h3>
                  <p className="text-muted-foreground">
                    You have completed all modules! Generate your certificate now.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowNameInput(true)}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Award className="w-4 h-4" /> Get Certificate
              </Button>
            </div>
          </Card>
        )}

        {/* Name Input for Certificate */}
        {showNameInput && (
          <Card className="bg-card border-border p-8 mb-12">
            <h3 className="text-xl font-bold mb-4">Generate Your Certificate</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleGenerateCertificate}
                  disabled={!userName.trim()}
                  className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  <Award className="w-4 h-4" /> Generate Certificate
                </Button>
                <Button
                  onClick={() => {
                    setShowNameInput(false);
                    setUserName('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Completed Lessons */}
        {progress.totalLessonsCompleted > 0 && (
          <Card className="bg-card border-border p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Completed Lessons</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {courseData.map((module) =>
                module.lessons
                  .filter((lesson) => progress.completedLessons.has(lesson.id))
                  .map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg border border-border"
                    >
                      <div className="text-green-400 mt-1">✓</div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{module.title}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => setLocation('/')}
            className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue Learning
          </Button>
          <Button
            onClick={handleResetProgress}
            variant="outline"
            className="flex-1"
          >
            Reset Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
