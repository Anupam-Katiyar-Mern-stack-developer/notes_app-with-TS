
import "server-only";
import { pool } from "@/lib/db";

export async function getNotes(
  search: string,
  limit: number,
  page: number
) {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;

  const result = await pool.query(
    `SELECT id, title, content, created_at
     FROM notes
     WHERE title ILIKE $3
     ORDER BY created_at DESC, id DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset, searchTerm]
  );

  const resultCount = await pool.query(
    `SELECT COUNT(*) FROM notes WHERE title ILIKE $1`,
    [searchTerm]
  );

  const totalCount = Number(resultCount.rows[0].count);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: result.rows,
    pagination: {
      totalCount,
      totalPages,
      page,
      limit,
    },
  };
}

export async function createNote(
  title: string,
  content: string
) {
  const result = await pool.query(
    `INSERT INTO notes (title, content)
     VALUES ($1, $2)
     RETURNING id, title, content, created_at`,
    [title, content]
  );

  return result.rows[0];
}

export async function getNoteById(id: number) {
  const result = await pool.query(
    `SELECT id, title, content, created_at
     FROM notes
     WHERE id = $1
     LIMIT 1`,
    [id]
  );

  return result.rows[0] ?? null;
}
