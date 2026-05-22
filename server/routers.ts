import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllCourses,
  getCoursesByCategory,
  getCourseById,
  getCoursesCount,
  enrollUserInCourse,
  getUserEnrollments,
  getUserEnrollmentForCourse,
  updateEnrollmentProgress,
  markCourseAsCompleted,
  getAllBadges,
  getUserBadges,
  awardBadgeToUser,
  getLeaderboard,
  getUserLeaderboardPosition,
  updateLeaderboardPoints,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============================================================================
  // COURSES
  // ============================================================================
  courses: router({
    // Get all published courses with pagination
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        })
      )
      .query(async ({ input }) => {
        const coursesList = await getAllCourses(input.limit, input.offset);
        const total = await getCoursesCount();
        return {
          courses: coursesList,
          total,
          limit: input.limit,
          offset: input.offset,
        };
      }),

    // Get courses by category
    byCategory: publicProcedure
      .input(
        z.object({
          category: z.string(),
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        })
      )
      .query(async ({ input }) => {
        return getCoursesByCategory(input.category, input.limit, input.offset);
      }),

    // Get single course details
    detail: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return getCourseById(input.courseId);
      }),

    // Enroll user in course
    enroll: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const enrollment = await enrollUserInCourse(ctx.user.id, input.courseId);
        return enrollment;
      }),

    // Get user's enrollments
    myEnrollments: protectedProcedure.query(async ({ ctx }) => {
      const enrollments = await getUserEnrollments(ctx.user.id);
      // Enrich with course details
      const enriched = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await getCourseById(enrollment.courseId);
          return {
            ...enrollment,
            course,
          };
        })
      );
      return enriched;
    }),

    // Get enrollment details for a specific course
    getEnrollment: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input, ctx }) => {
        return getUserEnrollmentForCourse(ctx.user.id, input.courseId);
      }),

    // Update progress
    updateProgress: protectedProcedure
      .input(
        z.object({
          enrollmentId: z.number(),
          progressPercentage: z.number().min(0).max(100),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Verify ownership
        const enrollment = await getUserEnrollmentForCourse(ctx.user.id, 0);
        if (!enrollment || enrollment.id !== input.enrollmentId) {
          throw new Error("Unauthorized");
        }
        return updateEnrollmentProgress(input.enrollmentId, input.progressPercentage);
      }),

    // Mark course as completed
    complete: protectedProcedure
      .input(z.object({ enrollmentId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        // Mark as completed
        const result = await markCourseAsCompleted(input.enrollmentId);

        // Award badge for first course completed
        const enrollments = await getUserEnrollments(ctx.user.id);
        const completedCount = enrollments.filter((e) => e.isCompleted).length;

        if (completedCount === 1) {
          // Award "First Course" badge
          const allBadges = await getAllBadges();
          const firstCourseBadge = allBadges.find((b) => b.criteriaType === "first_course_completed");
          if (firstCourseBadge) {
            await awardBadgeToUser(ctx.user.id, firstCourseBadge.id);
          }
        }

        // Update leaderboard
        const points = completedCount * 100; // 100 points per course
        await updateLeaderboardPoints(ctx.user.id, points);

        return result;
      }),
  }),

  // ============================================================================
  // BADGES
  // ============================================================================
  badges: router({
    // Get all available badges
    list: publicProcedure.query(async () => {
      return getAllBadges();
    }),

    // Get user's earned badges
    myBadges: protectedProcedure.query(async ({ ctx }) => {
      return getUserBadges(ctx.user.id);
    }),

    // Award badge (admin only)
    award: protectedProcedure
      .input(
        z.object({
          userId: z.number(),
          badgeId: z.number(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return awardBadgeToUser(input.userId, input.badgeId);
      }),
  }),

  // ============================================================================
  // LEADERBOARD
  // ============================================================================
  leaderboard: router({
    // Get top leaderboard entries
    top: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).default(50),
        })
      )
      .query(async ({ input }) => {
        return getLeaderboard(input.limit);
      }),

    // Get user's leaderboard position
    myPosition: protectedProcedure.query(async ({ ctx }) => {
      return getUserLeaderboardPosition(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
