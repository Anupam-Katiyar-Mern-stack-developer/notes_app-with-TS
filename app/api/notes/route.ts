import { pool } from "@/lib/db";

export async function GET() {
    return Response.json({
        success: true,
        message: "Notes API working",
    });
}

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