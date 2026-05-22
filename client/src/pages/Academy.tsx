import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState, useMemo } from "react";
import { BookOpen, Award, Users, Zap } from "lucide-react";
import { useRoute } from "wouter";

export default function Academy() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  // Fetch courses
  const { data: coursesData, isLoading } = trpc.courses.list.useQuery({
    limit: 20,
    offset: page * 20,
  });

  // Get unique categories
  const categories = useMemo(() => {
    if (!coursesData?.courses) return [];
    const cats = new Set(coursesData.courses.map((c) => c.category));
    return Array.from(cats).sort();
  }, [coursesData]);

  // Filter courses by search and category
  const filteredCourses = useMemo(() => {
    if (!coursesData?.courses) return [];
    return coursesData.courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [coursesData, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center font-bold text-black">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold">Silabs Academy</h1>
              <p className="text-xs text-muted-foreground">Technologia Omnibus</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm">{user?.name}</span>
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </>
            ) : (
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 border-b border-border">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-4 text-cyan-400">Learn Technology From Zero</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master 500+ courses across 11 tracks. No prior knowledge required. Start your journey
            with Silabs Academy.
          </p>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold">11</div>
              <div className="text-sm text-muted-foreground">Tracks</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Beginner</div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold">Live</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-b border-border py-6">
        <div className="container">
          <div className="mb-4">
            <Input
              placeholder="Search courses by title or topic..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(null);
                setPage(0);
              }}
            >
              All Courses
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(0);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm">
                  Page {page + 1} of {Math.ceil((coursesData?.total || 0) / 20)}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={!coursesData || page >= Math.ceil(coursesData.total / 20) - 1}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function CourseCard({ course }: { course: any }) {
  const { user, isAuthenticated } = useAuth();
  const enrollMutation = trpc.courses.enroll.useMutation();

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    try {
      await enrollMutation.mutateAsync({ courseId: course.id });
      alert("Successfully enrolled in course!");
    } catch (error) {
      alert("Failed to enroll in course");
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Foundation":
        return "bg-blue-500/20 text-blue-400";
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "Advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Card className="p-6 hover:border-cyan-500/50 transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs px-2 py-1 rounded ${getLevelColor(course.level)}`}>
          {course.level}
        </span>
        <span className="text-xs text-muted-foreground">{course.duration}</span>
      </div>

      <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
        {course.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">
          <strong>Learn:</strong> {course.outcome.substring(0, 80)}...
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">#{course.courseNumber}</span>
        <Button
          size="sm"
          onClick={handleEnroll}
          disabled={enrollMutation.isPending}
          className="bg-cyan-500 hover:bg-cyan-600 text-black"
        >
          {enrollMutation.isPending ? "Enrolling..." : "Enroll"}
        </Button>
      </div>
    </Card>
  );
}
