import { pool } from "@/lib/db";

export async function getNotes() {
    const result = await pool.query(
        `select id ,title,content,created_at
        from notes 
        order by created_at desc,id desc`
    )
    return result.rows;
}