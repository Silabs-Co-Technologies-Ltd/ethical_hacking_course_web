import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { certificates, courseEnrollments } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Certificate database operations
 */

export async function createCertificate(
  userId: number,
  courseId: number,
  certificateNumber: string,
  certificateUrl: string,
  completionDate: Date
) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(certificates).values({
      userId,
      courseId,
      certificateNumber,
      certificateUrl,
      completionDate,
    });

    // Update enrollment record
    const enrollment = await db
      .select()
      .from(courseEnrollments)
      .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
      .limit(1);

    if (enrollment.length > 0) {
      await db
        .update(courseEnrollments)
        .set({
          certificateGenerated: true,
          certificateUrl,
          certificateGeneratedAt: new Date(),
        })
        .where(eq(courseEnrollments.id, enrollment[0].id));
    }

    return {
      id: result[0],
      userId,
      courseId,
      certificateNumber,
      certificateUrl,
      completionDate,
    };
  } catch (error) {
    console.error("Failed to create certificate record:", error);
    throw error;
  }
}

export async function getCertificateByNumber(certificateNumber: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(certificates)
    .where(eq(certificates.certificateNumber, certificateNumber))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getUserCertificates(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(certificates).where(eq(certificates.userId, userId));
}

export async function getCertificateForCourse(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(certificates)
    .where(and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}
