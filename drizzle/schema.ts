import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended for Silabs Academy with profile and progress tracking.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Academy profile fields
  bio: text("bio"),
  avatar: varchar("avatar", { length: 512 }), // URL to avatar image
  totalCoursesCompleted: int("totalCoursesCompleted").default(0).notNull(),
  totalBadgesEarned: int("totalBadgesEarned").default(0).notNull(),
  totalLessonsCompleted: int("totalLessonsCompleted").default(0).notNull(),
  learningStreak: int("learningStreak").default(0).notNull(),
  lastActivityDate: timestamp("lastActivityDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Courses table - stores all 500 Silabs Academy courses
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  courseNumber: int("courseNumber").notNull().unique(), // 1-500
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "Artificial Intelligence", "Programming Foundations"
  description: text("description").notNull(), // What the course is about
  outcome: text("outcome").notNull(), // What you can do after completing
  concepts: text("concepts").notNull(), // Core concepts (JSON array)
  topics: text("topics").notNull(), // 5 key topics (JSON array)
  project: text("project").notNull(), // Capstone project description
  duration: varchar("duration", { length: 50 }).notNull(), // e.g., "4 hours"
  level: mysqlEnum("level", ["Foundation", "Beginner", "Intermediate", "Advanced"]).notNull(),
  
  // Technologia Omnibus - all courses start from zero
  assumesZeroKnowledge: boolean("assumesZeroKnowledge").default(true).notNull(),
  
  // Course metadata
  isPublished: boolean("isPublished").default(true).notNull(),
  enrollmentCount: int("enrollmentCount").default(0).notNull(),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Course enrollments - tracks which users are taking which courses
 */
export const courseEnrollments = mysqlTable("courseEnrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  
  // Progress tracking
  lessonsCompleted: int("lessonsCompleted").default(0).notNull(),
  quizzesCompleted: int("quizzesCompleted").default(0).notNull(),
  progressPercentage: decimal("progressPercentage", { precision: 5, scale: 2 }).default(0).notNull(),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  
  // Certification
  certificateGenerated: boolean("certificateGenerated").default(false).notNull(),
  certificateUrl: varchar("certificateUrl", { length: 512 }),
  certificateGeneratedAt: timestamp("certificateGeneratedAt"),
  
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
});

export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InsertCourseEnrollment = typeof courseEnrollments.$inferInsert;

/**
 * Lessons - individual lessons within courses
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  lessonNumber: int("lessonNumber").notNull(), // Order within course
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(), // Markdown content
  duration: varchar("duration", { length: 50 }), // e.g., "30 minutes"
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * Lesson progress - tracks which lessons users have completed
 */
export const lessonProgress = mysqlTable("lessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  courseId: int("courseId").notNull(),
  
  isCompleted: boolean("isCompleted").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = typeof lessonProgress.$inferInsert;

/**
 * Quizzes - knowledge checks for lessons
 */
export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  courseId: int("courseId").notNull(),
  
  title: varchar("title", { length: 255 }).notNull(),
  questions: text("questions").notNull(), // JSON array of questions
  passingScore: int("passingScore").default(70).notNull(), // Percentage
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

/**
 * Quiz attempts - tracks user quiz submissions
 */
export const quizAttempts = mysqlTable("quizAttempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  quizId: int("quizId").notNull(),
  courseId: int("courseId").notNull(),
  
  score: int("score").notNull(), // Percentage
  passed: boolean("passed").notNull(),
  answers: text("answers").notNull(), // JSON of user answers
  
  attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
});

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = typeof quizAttempts.$inferInsert;

/**
 * Badges - achievements users can earn
 */
export const badges = mysqlTable("badges", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 512 }).notNull(), // URL to badge icon
  
  // Badge criteria
  criteriaType: mysqlEnum("criteriaType", [
    "first_course_completed",
    "five_courses_completed",
    "ten_courses_completed",
    "all_foundation_courses",
    "all_beginner_courses",
    "all_intermediate_courses",
    "all_advanced_courses",
    "perfect_quiz_score",
    "learning_streak_7_days",
    "learning_streak_30_days",
    "course_category_master",
  ]).notNull(),
  
  criteriaValue: varchar("criteriaValue", { length: 255 }), // Additional criteria data
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = typeof badges.$inferInsert;

/**
 * User badges - tracks which badges users have earned
 */
export const userBadges = mysqlTable("userBadges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeId: int("badgeId").notNull(),
  
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

/**
 * Certificates - stores certificate metadata
 */
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  
  certificateNumber: varchar("certificateNumber", { length: 50 }).notNull().unique(), // Unique cert ID
  certificateUrl: varchar("certificateUrl", { length: 512 }).notNull(), // URL to download
  
  completionDate: timestamp("completionDate").notNull(),
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;

/**
 * User reviews and ratings for courses
 */
export const courseReviews = mysqlTable("courseReviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  
  rating: int("rating").notNull(), // 1-5 stars
  review: text("review"), // Optional written review
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseReview = typeof courseReviews.$inferSelect;
export type InsertCourseReview = typeof courseReviews.$inferInsert;

/**
 * Leaderboard - tracks user rankings
 */
export const leaderboard = mysqlTable("leaderboard", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  rank: int("rank").notNull(),
  points: int("points").default(0).notNull(), // Based on courses completed, badges, etc.
  coursesCompleted: int("coursesCompleted").default(0).notNull(),
  badgesEarned: int("badgesEarned").default(0).notNull(),
  
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Leaderboard = typeof leaderboard.$inferSelect;
export type InsertLeaderboard = typeof leaderboard.$inferInsert;
