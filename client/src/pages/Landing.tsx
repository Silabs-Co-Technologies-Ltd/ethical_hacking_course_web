import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, BookOpen, Award, Users, Zap, Shield, Code } from "lucide-react";

export default function Landing() {

  const features = [
    {
      icon: BookOpen,
      title: "500+ Courses",
      description: "Comprehensive curriculum covering all tech domains from fundamentals to advanced",
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn professional certificates upon course completion with unique verification IDs",
    },
    {
      icon: Zap,
      title: "Learn at Your Pace",
      description: "Self-paced learning with progress tracking and personalized learning paths",
    },
    {
      icon: Shield,
      title: "Expert Content",
      description: "Created by Silabs & Co Technologies Ltd - industry experts and educators",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of learners on the leaderboard and earn achievement badges",
    },
    {
      icon: Code,
      title: "Hands-On Labs",
      description: "Practical exercises and real-world projects to apply your knowledge",
    },
  ];

  const tracks = [
    { name: "Artificial Intelligence", courses: 50 },
    { name: "Programming Foundations", courses: 45 },
    { name: "Web Development", courses: 40 },
    { name: "Cybersecurity", courses: 35 },
    { name: "Cloud Computing", courses: 30 },
    { name: "Data Science", courses: 35 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Silabs Academy</h1>
              <p className="text-xs text-cyan-400">Technologia Omnibus</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-slate-600 hover:bg-slate-800"
              onClick={() => {
                window.location.href = getLoginUrl("/academy");
              }}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              Sign Up with Google
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <p className="text-sm font-semibold text-cyan-400">Welcome to Silabs Academy</p>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Master Technology
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                From Zero to Hero
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Learn 500+ courses across 11 technology tracks. No prior knowledge required. 
              Start with the fundamentals and master advanced concepts at your own pace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold"
                onClick={() => {
                  window.location.href = getLoginUrl();
                }}
              >
                Start Learning Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 hover:bg-slate-800 text-white"
                onClick={() => {
                  const element = document.getElementById("courses");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Courses
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-3xl font-bold text-cyan-400">500+</p>
                <p className="text-sm text-slate-400">Courses</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-3xl font-bold text-cyan-400">11</p>
                <p className="text-sm text-slate-400">Learning Tracks</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-3xl font-bold text-cyan-400">∞</p>
                <p className="text-sm text-slate-400">Learning Paths</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Why Choose Silabs Academy?</h3>
            <p className="text-xl text-slate-400">Everything you need to succeed in your learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 bg-slate-900/50 border-slate-700/50 hover:border-cyan-500/50 transition-all group">
                  <div className="mb-4 p-3 w-fit rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-slate-400">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Tracks Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Learning Tracks</h3>
            <p className="text-xl text-slate-400">Choose your learning path and start mastering technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, index) => (
              <Card key={index} className="p-6 bg-slate-900/50 border-slate-700/50 hover:border-cyan-500/50 transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {track.name}
                    </h4>
                    <p className="text-sm text-slate-400">{track.courses} courses</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${(track.courses / 50) * 100}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              Explore All Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Technologia Omnibus Section */}
      <section className="py-20 bg-slate-800/50 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Technologia Omnibus</h3>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Technology for Everyone. Our mission is to make quality technology education accessible to all, 
            regardless of background or prior experience. Every course starts from zero, with clear explanations 
            and hands-on practice. Join thousands of learners transforming their careers through Silabs Academy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <p className="text-3xl font-bold text-cyan-400 mb-2">10K+</p>
              <p className="text-slate-400">Active Learners</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <p className="text-3xl font-bold text-cyan-400 mb-2">50K+</p>
              <p className="text-slate-400">Certificates Issued</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <p className="text-3xl font-bold text-cyan-400 mb-2">95%</p>
              <p className="text-slate-400">Completion Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Start Learning?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Join our community of learners and start your journey to mastering technology today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              Sign Up with Google
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 hover:bg-slate-800 text-white"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="font-bold text-white">Silabs Academy</span>
              </div>
              <p className="text-sm text-slate-400">Technology for Everyone</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Certificates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 Silabs & Co Technologies Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
