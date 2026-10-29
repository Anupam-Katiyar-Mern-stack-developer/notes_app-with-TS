import { createNote, getNotes } from "@/services/notes.service";

export async function GET(request: Response) {
    try {
        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search")?.trim() ?? "";
        const limit = Number(searchParams.get("limit") ?? 10);
        const page = Number(searchParams.get("page") ?? 1);

        const notes = await getNotes(search, limit, page);

        return Response.json({
            success: true,
            notes: notes.data,
            pagination: notes.data
        })

    } catch (error) {
        return Response.json(
            { success: false, message: "failed to fetch" },
            { status: 500 }
        );
    }


}
export async function POST(request: Response) {
    try {
        const body = await request.json();

        const { title, content } = body;

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() || !content.trim()
        ) {
            return Response.json(
                {
                    success: false,
                    message: "Title and content are required"
                },
                { status: 400 }
            )
        }

        const note = await createNote(
            title.trim(),
            content.trim()
        );

        return Response.json(
            {
                success: true,
                message: "Note created successfully",
                note,
            },
            { status: 201 }
        )

    } catch (error) {

        return Response.json(
            {
                success: false,
                message: "Failed to create note"
            },
            { status: 500 }
        )

    }
}