import { pool } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, content } = body;

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            return Response.json(
                { success: false, message: "Title and content are required" },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `INSERT INTO notes (title, content)
       VALUES ($1, $2)
       RETURNING id, title, content, created_at`,
            [title.trim(), content.trim()]
        );

        return Response.json(
            {
                success: true,
                message: "Note created successfully",
                note: result.rows[0],
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create note error:", error);

        return Response.json(
            { success: false, message: "Failed to create note" },
            { status: 500 }
        );
    }
}



export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const pageNumber = Number(searchParams.get("page") ?? 1);
        const limitNumber = Number(searchParams.get("limit") ?? 10);

        if (
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1 ||
            limitNumber > 100
        ) {
            return Response.json(
                { success: false, message: "Invalid page or limit" },
                { status: 400 }
            );
        }

        const offset = (pageNumber - 1) * limitNumber;

        const result = await pool.query(
            `SELECT id, title, content, created_at
       FROM notes
       ORDER BY created_at DESC, id DESC
       LIMIT $1 OFFSET $2`,
            [limitNumber, offset]
        );

        const resultCount = await pool.query(
            `SELECT COUNT(*) FROM notes`
        );

        const totalNotes = Number(resultCount.rows[0].count);
        const totalPages = Math.ceil(totalNotes / limitNumber);

        return Response.json({
            success: true,
            notes: result.rows,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalNotes,
                totalPages,
            },
        });
    } catch (error) {
        console.error("Fetch notes error:", error);

        return Response.json(
            { success: false, message: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}
