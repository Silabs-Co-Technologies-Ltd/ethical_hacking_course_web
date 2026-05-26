import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  FileText, 
  TrendingUp, 
  User, 
  LogOut,
  Download,
  Eye,
  Star,
  Zap,
  Trophy,
  Target
} from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user data
  const { data: enrollments } = trpc.courses.myEnrollments.useQuery();
  const { data: badges } = trpc.badges.myBadges.useQuery();
  const { data: certificates } = trpc.certificates.myCertificates.useQuery();
  const { data: leaderboardPosition } = trpc.leaderboard.myPosition.useQuery();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-slate-400 mb-8">You need to be logged in to view your profile.</p>
            <Button onClick={() => setLocation("/")} className="bg-cyan-500 hover:bg-cyan-600">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const completedCourses = enrollments?.filter(e => e.isCompleted) || [];
  const inProgressCourses = enrollments?.filter(e => !e.isCompleted) || [];
  const totalProgress = enrollments?.length 
    ? Math.round((completedCourses.length / enrollments.length) * 100) 
    : 0;

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{user.name || "Student"}</h1>
                <p className="text-slate-400">{user.email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Courses Completed */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cyan-400" />
                Courses Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{completedCourses.length}</div>
              <p className="text-xs text-slate-400 mt-1">
                {enrollments?.length ? `${totalProgress}% of enrolled courses` : "No courses yet"}
              </p>
            </CardContent>
          </Card>

          {/* Badges Earned */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Badges Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-400">{badges?.length || 0}</div>
              <p className="text-xs text-slate-400 mt-1">Achievement milestones unlocked</p>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-400" />
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{certificates?.length || 0}</div>
              <p className="text-xs text-slate-400 mt-1">Professional credentials earned</p>
            </CardContent>
          </Card>

          {/* Leaderboard Rank */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Leaderboard Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">
                #{leaderboardPosition?.rank || "—"}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {leaderboardPosition?.points || 0} points earned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Badges
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Certificates
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Learning Summary</CardTitle>
                <CardDescription className="text-slate-400">Your overall learning statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Overall Progress</label>
                    <span className="text-sm font-bold text-cyan-400">{totalProgress}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-2 bg-slate-700" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-cyan-400" />
                      <p className="text-xs text-slate-400">Total Enrolled</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{enrollments?.length || 0}</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <p className="text-xs text-slate-400">In Progress</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{inProgressCourses.length}</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-green-400" />
                      <p className="text-xs text-slate-400">Completed</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{completedCourses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Achievements</CardTitle>
                <CardDescription className="text-slate-400">Your latest badges and certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges && badges.length > 0 ? (
                    badges.slice(0, 3).map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                        <Award className="w-5 h-5 text-amber-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{item.badge?.name}</p>
                          <p className="text-xs text-slate-400">{item.badge?.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 text-center py-4">No badges earned yet. Complete courses to earn badges!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Badges</CardTitle>
                <CardDescription className="text-slate-400">
                  {badges?.length || 0} badge{badges?.length !== 1 ? "s" : ""} earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                {badges && badges.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {badges.map((item: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="flex flex-col items-center p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-amber-500/50 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mb-3">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-white text-center">{item.badge?.name}</h3>
                        <p className="text-xs text-slate-400 text-center mt-1">{item.badge?.description}</p>
                        <Badge variant="secondary" className="mt-3 bg-amber-900/30 text-amber-300 border-amber-700">
                          Earned
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">No badges earned yet</p>
                    <p className="text-sm text-slate-500">Complete courses and reach milestones to earn badges!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Certificates</CardTitle>
                <CardDescription className="text-slate-400">
                  {certificates?.length || 0} certificate{certificates?.length !== 1 ? "s" : ""} earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                {certificates && certificates.length > 0 ? (
                  <div className="space-y-3">
                    {certificates.map((cert: any, idx: number) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-green-500/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="w-8 h-8 text-green-400" />
                          <div>
                            <h3 className="text-sm font-bold text-white">{cert.courseTitle}</h3>
                            <p className="text-xs text-slate-400">
                              Certificate #{cert.certificateNumber}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Earned on {new Date(cert.completionDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-800"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">No certificates earned yet</p>
                    <p className="text-sm text-slate-500">Complete courses to earn certificates!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Course Progress</CardTitle>
                <CardDescription className="text-slate-400">
                  Track your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enrollments && enrollments.length > 0 ? (
                  <div className="space-y-4">
                    {enrollments.map((enrollment: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-white">{enrollment.course?.title}</h3>
                          <span className="text-sm font-bold text-cyan-400">
                            {enrollment.progressPercentage}%
                          </span>
                        </div>
                        <Progress 
                          value={enrollment.progressPercentage} 
                          className="h-2 bg-slate-700"
                        />
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{enrollment.course?.category}</span>
                          <span>
                            {enrollment.isCompleted ? (
                              <Badge className="bg-green-900/30 text-green-300 border-green-700">
                                Completed
                              </Badge>
                            ) : (
                              <Badge className="bg-blue-900/30 text-blue-300 border-blue-700">
                                In Progress
                              </Badge>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">No courses enrolled yet</p>
                    <p className="text-sm text-slate-500">Start learning by enrolling in a course!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
