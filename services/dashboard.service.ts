
import "server-only";
import { pool } from "@/lib/db";

export async function getDashboardData() {
  const [
    totalNotesResult,
    recentNotesResult,
    recentCountResult,
    deletedNotesResult,
  ] = await Promise.all([
    // Total active notes
    pool.query(`
      SELECT COUNT(*) AS total_notes
      FROM notes
      WHERE deleted_at IS NULL
    `),

    // Latest 4 active notes
    pool.query(`
      SELECT id, title, content, created_at
      FROM notes
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC, id DESC
      LIMIT 4
    `),

    // Active notes created in last 2 days
    pool.query(`
      SELECT COUNT(*) AS recent_notes
      FROM notes
      WHERE deleted_at IS NULL
      AND created_at >= NOW() - INTERVAL '2 days'
    `),

    // Total deleted notes
    pool.query(`
      SELECT COUNT(*) AS deleted_notes
      FROM notes
      WHERE deleted_at IS NOT NULL
    `),
  ]);

  return {
    totalNotes: Number(totalNotesResult.rows[0].total_notes),

    recentNotes: recentNotesResult.rows,

    recentNotesCount: Number(recentCountResult.rows[0].recent_notes),

    deletedNotesCount: Number(deletedNotesResult.rows[0].deleted_notes),
  };
}
