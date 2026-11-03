import "server-only";
import { pool } from "@/lib/db";

export async function getDashboardData() {
  const [totalNotesResult, recentNotesResult, recentCountResult] =
    await Promise.all([
      pool.query(`
        SELECT COUNT(*) AS total_notes
        FROM notes
      `),

      pool.query(`
        SELECT id, title, content, created_at
        FROM notes
        ORDER BY created_at DESC, id DESC
        LIMIT 5
      `),

      pool.query(`
        SELECT COUNT(*) AS recent_notes
        FROM notes
        WHERE created_at >= NOW() - INTERVAL '7 days'
      `),
    ]);

  return {
    totalNotes: Number(totalNotesResult.rows[0].total_notes),
    recentNotes: recentNotesResult.rows,
    recentNotesCount: Number(recentCountResult.rows[0].recent_notes),
  };
}