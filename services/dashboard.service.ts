import "server-only";

import { pool } from "@/lib/db";


export async function getDashboardData() {
    const [totalNotesResult, recentResult] = await Promise.all([
        pool.query(
            `
            select Count(*) as total_notes
            from notes
            `
        ),

        pool.query(
            `
            select id ,title,content,created_at
            from notes
            order by created_at desc ,id desc
            limit 5
            `
        ),
    ]);

    return {
        totalNotesResult: Number(totalNotesResult.rows[0].total_notes),
        recentResult: recentResult.rows,
    }
}