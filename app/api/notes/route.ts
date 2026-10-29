import { getNotes } from "@/services/notes.service";

export async function GET() {
    try {
        const notes = await getNotes();
        return Response.json({
            success: true,
            notes,
        })

    } catch (error) {
        return Response.json(
            { success: false, message: "failed to fetch" },
            { status: 500 }
        )
    }
}