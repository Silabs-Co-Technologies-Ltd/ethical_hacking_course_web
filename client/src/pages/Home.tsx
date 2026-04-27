import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { courseData } from '@/lib/courseData';
import { ChevronRight, BookOpen, Target, Shield } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              &gt;_ ETHIC
            </div>
            <div className="text-2xl font-bold text-accent">HACK</div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button className="text-sm hover:text-primary transition-colors">Modules</button>
            <button className="text-sm hover:text-primary transition-colors">About</button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Learning
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ethical Hacking
              <span className="block text-primary">From Zero to Hero</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Master the fundamentals of cybersecurity and ethical hacking. Learn hands-on techniques from network reconnaissance to web application security. No prior knowledge required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={() => {
                  const firstModule = courseData[0];
                  setSelectedModule(firstModule.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Start Course <ChevronRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border hover:bg-card"
              >
                View Curriculum
              </Button>
            </div>
          </div>

          {/* Decorative Terminal */}
          <div className="mt-16 hidden lg:block absolute right-0 top-0 opacity-10">
            <div className="text-primary font-mono text-sm">
              <div>$ nmap -sV target.com</div>
              <div>$ sqlmap -u "http://target.com"</div>
              <div>$ aircrack-ng capture.cap</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border">
        <div className="container py-12">
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10</div>
              <div className="text-sm text-muted-foreground">Comprehensive Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Hands-On Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">0</div>
              <div className="text-sm text-muted-foreground">Prerequisites</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="border-b border-border">
        <div className="container py-20">
          <h2 className="text-4xl font-bold mb-4">Course Curriculum</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A carefully structured progression from fundamental computer concepts to advanced exploitation techniques.
          </p>

          <div className="grid gap-6">
            {courseData.map((module, index) => (
              <Card
                key={module.id}
                className="stagger-item terminal-border bg-card hover:bg-card/80 transition-all cursor-pointer group p-6"
                onClick={() => setSelectedModule(module.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl pt-1 group-hover:scale-110 transition-transform duration-300">{module.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-primary">Module {index + 1}</span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {module.lessons.length} lessons
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {module.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {module.lessons.slice(0, 3).map((lesson) => (
                          <span 
                            key={lesson.id}
                            className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded border border-border"
                          >
                            {lesson.title}
                          </span>
                        ))}
                        {module.lessons.length > 3 && (
                          <span className="text-xs px-2 py-1 text-muted-foreground">
                            +{module.lessons.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary mt-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border">
        <div className="container py-20">
          <h2 className="text-4xl font-bold mb-12">Why This Course?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl">📚</div>
              <h3 className="text-xl font-bold">Zero Prerequisites</h3>
              <p className="text-muted-foreground">
                Start from absolute basics. Every concept is explained thoroughly, assuming no prior computer knowledge.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-4xl">🔬</div>
              <h3 className="text-xl font-bold">Hands-On Labs</h3>
              <p className="text-muted-foreground">
                Learn by doing. Each module includes practical exercises in a safe, isolated lab environment using virtual machines.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-4xl">⚖️</div>
              <h3 className="text-xl font-bold">Ethical Focus</h3>
              <p className="text-muted-foreground">
                Learn the legal and ethical frameworks that govern security testing. Understand the responsibility that comes with these skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module Details Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-card border-primary w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {courseData.find(m => m.id === selectedModule)?.title}
                </h2>
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="text-2xl hover:text-primary transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {courseData.find(m => m.id === selectedModule)?.lessons.map((lesson) => (
                  <div key={lesson.id} className="border border-border rounded p-4 hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-primary">{lesson.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        lesson.difficulty === 'beginner' ? 'bg-green-900/30 text-green-300' :
                        lesson.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-300' :
                        'bg-red-900/30 text-red-300'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>⏱️ {lesson.duration}</span>
                      <span>📌 {lesson.topics.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <Button 
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    setLocation(`/module/${selectedModule}`);
                    setSelectedModule(null);
                  }}
                >
                  Start Module
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedModule(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Course</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Modules</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Lessons</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Labs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tools</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">References</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ethics</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Ethical Hacking Course. Built with security in mind. Always hack responsibly.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
