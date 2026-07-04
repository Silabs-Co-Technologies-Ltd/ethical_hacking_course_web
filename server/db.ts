import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, courses, courseEnrollments, badges, userBadges, leaderboard } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    // Only include fields that are explicitly provided
    const values: any = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    // Only set these fields if they're provided
    if (user.name !== undefined) {
      values.name = user.name;
      updateSet.name = user.name;
    }
    if (user.email !== undefined) {
      values.email = user.email;
      updateSet.email = user.email;
    }
    if (user.loginMethod !== undefined) {
      values.loginMethod = user.loginMethod;
      updateSet.loginMethod = user.loginMethod;
    }

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    } else {
      values.lastSignedIn = new Date();
      updateSet.lastSignedIn = new Date();
    }

    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (process.env.OWNER_OPEN_ID && user.openId === process.env.OWNER_OPEN_ID) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// COURSE QUERIES
// ============================================================================

export async function getAllCourses(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(courses)
    .where(eq(courses.isPublished, true))
    .orderBy(desc(courses.courseNumber))
    .limit(limit)
    .offset(offset);
}

export async function getCoursesByCategory(category: string, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(courses)
    .where(and(eq(courses.isPublished, true), eq(courses.category, category)))
    .orderBy(desc(courses.courseNumber))
    .limit(limit)
    .offset(offset);
}

export async function getCourseById(courseId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function searchCourses(query: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];

  // Simple search by title or category
  const searchTerm = `%${query}%`;
  return db
    .select()
    .from(courses)
    .where(eq(courses.isPublished, true))
    .limit(limit);
}

export async function getCoursesCount() {
  const db = await getDb();
  if (!db) return 0;

  const result = await db.select().from(courses).where(eq(courses.isPublished, true));
  return result.length;
}

// ============================================================================
// ENROLLMENT QUERIES
// ============================================================================

export async function enrollUserInCourse(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return null;

  // Check if already enrolled
  const existing = await db
    .select()
    .from(courseEnrollments)
    .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Create new enrollment
  const result = await db.insert(courseEnrollments).values({
    userId,
    courseId,
    progressPercentage: 0,
  });

  return {
    id: result[0],
    userId,
    courseId,
    progressPercentage: 0,
    isCompleted: false,
  };
}

export async function getUserEnrollments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(courseEnrollments).where(eq(courseEnrollments.userId, userId));
}

export async function getUserEnrollmentForCourse(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(courseEnrollments)
    .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateEnrollmentProgress(enrollmentId: number, progressPercentage: number) {
  const db = await getDb();
  if (!db) return null;

  await db
    .update(courseEnrollments)
    .set({ progressPercentage })
    .where(eq(courseEnrollments.id, enrollmentId));

  return { id: enrollmentId, progressPercentage };
}

export async function markCourseAsCompleted(enrollmentId: number) {
  const db = await getDb();
  if (!db) return null;

  const now = new Date();
  await db
    .update(courseEnrollments)
    .set({
      isCompleted: true,
      completedAt: now,
      progressPercentage: 100,
    })
    .where(eq(courseEnrollments.id, enrollmentId));

  return { id: enrollmentId, isCompleted: true };
}

// ============================================================================
// BADGE QUERIES
// ============================================================================

export async function getAllBadges() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(badges);
}

export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      badge: badges,
      earnedAt: userBadges.earnedAt,
    })
    .from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, userId));
}

export async function awardBadgeToUser(userId: number, badgeId: number) {
  const db = await getDb();
  if (!db) return null;

  // Check if user already has this badge
  const existing = await db
    .select()
    .from(userBadges)
    .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeId, badgeId)))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Award badge
  const result = await db.insert(userBadges).values({
    userId,
    badgeId,
  });

  // Update user badge count
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0) {
    const newCount = (user[0].totalBadgesEarned || 0) + 1;
    await db.update(users).set({ totalBadgesEarned: newCount }).where(eq(users.id, userId));
  }

  return { id: result[0], userId, badgeId };
}

// ============================================================================
// LEADERBOARD QUERIES
// ============================================================================

export async function getLeaderboard(limit = 100) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(leaderboard)
    .orderBy(desc(leaderboard.points))
    .limit(limit);
}

export async function getUserLeaderboardPosition(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(leaderboard).where(eq(leaderboard.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLeaderboardPoints(userId: number, points: number) {
  const db = await getDb();
  if (!db) return null;

  // Get current position
  const existing = await db.select().from(leaderboard).where(eq(leaderboard.userId, userId)).limit(1);

  if (existing.length > 0) {
    // Update existing
    await db.update(leaderboard).set({ points }).where(eq(leaderboard.userId, userId));
  } else {
    // Create new entry
    await db.insert(leaderboard).values({
      userId,
      points,
      rank: 0,
    });
  }

  // Recalculate ranks
  const allEntries = await db.select().from(leaderboard).orderBy(desc(leaderboard.points));
  for (let i = 0; i < allEntries.length; i++) {
    await db.update(leaderboard).set({ rank: i + 1 }).where(eq(leaderboard.id, allEntries[i].id));
  }

  return { userId, points };
}
