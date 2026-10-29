import { pool } from "@/lib/db";

export async function getNotes(
    search: string,
    limit: number, page: number
) {

    const offset = (page - 1) * limit;

    const result = await pool.query(
        `select id ,title,content,created_at
        from notes 
        where title ilike $3
        order by created_at desc,id desc
        limit $1 offset $2`, [limit, offset, `%${search}%`]
    );

    const resultCount = await pool.query(
        `
        select count(*) from notes
        where title ilike $1
        `, [search]
    );

    const pages = Number(resultCount.rows);

    const totalPages = (pages / limit)

    return {
        data: result.rows,
        pagination: {
            totalPages,
            page,
            limit,
        }
    }
}


export async function createNote(
    title: string,
    content: string
) {
    const result = await pool.query(
        `insert into notes (title,content)
        values($1,$2)
        returning id,title,content,created_at
        `, [title, content]
    )
    return result.rows[0];
}