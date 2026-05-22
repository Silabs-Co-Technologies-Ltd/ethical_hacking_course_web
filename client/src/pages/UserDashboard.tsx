import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Award, BookOpen, TrendingUp, LogOut } from "lucide-react";
import { CertificateCard } from "@/components/CertificateCard";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const { data: enrollments } = trpc.courses.myEnrollments.useQuery();
  const { data: badges } = trpc.badges.myBadges.useQuery();
  const { data: leaderboardPos } = trpc.leaderboard.myPosition.useQuery();

  if (!user) {
    return <div>Loading...</div>;
  }

  const completedCourses = enrollments?.filter((e) => e.isCompleted) || [];
  const inProgressCourses = enrollments?.filter((e) => !e.isCompleted) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center font-bold text-black">
              S
            </div>
            <h1 className="text-xl font-bold">My Learning</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => logout()}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container py-8">
        {/* User Profile */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <BookOpen className="w-8 h-8 text-cyan-400 mb-2" />
              <div className="text-3xl font-bold">{enrollments?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Courses Enrolled</div>
            </Card>
            <Card className="p-6">
              <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
              <div className="text-3xl font-bold">{completedCourses.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </Card>
            <Card className="p-6">
              <Award className="w-8 h-8 text-yellow-400 mb-2" />
              <div className="text-3xl font-bold">{badges?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </Card>
            <Card className="p-6">
              <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-3xl font-bold">#{leaderboardPos?.rank || "N/A"}</div>
              <div className="text-sm text-muted-foreground">Leaderboard Rank</div>
            </Card>
          </div>
        </div>

        {/* In Progress Courses */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">In Progress ({inProgressCourses.length})</h3>
          {inProgressCourses.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>No courses in progress. Start learning today!</p>
              <Button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-black" asChild>
                <a href="/academy">Browse Courses</a>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inProgressCourses.map((enrollment) => (
                <Card key={enrollment.id} className="p-4">
                  <h4 className="font-bold mb-2">{enrollment.course?.title}</h4>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{enrollment.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full transition-all"
                        style={{ width: `${enrollment.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Continue Learning
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Courses & Certificates */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Completed Courses & Certificates ({completedCourses.length})</h3>
          {completedCourses.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>Complete your first course to earn a certificate!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedCourses.map((enrollment) => (
                <CertificateCard
                  key={enrollment.id}
                  enrollment={enrollment}
                  course={enrollment.course}
                />
              ))}
            </div>
          )}
        </div>

        {/* Badges */}
        <div>
          <h3 className="text-xl font-bold mb-4">Badges ({badges?.length || 0})</h3>
          {!badges || badges.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>Complete courses to earn badges!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {badges.map((item: any) => (
                <Card key={item.badge.id} className="p-4 text-center hover:border-cyan-500/50">
                  <div className="text-3xl mb-2">{item.badge.icon}</div>
                  <h4 className="font-bold text-sm mb-1">{item.badge.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.earnedAt).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
