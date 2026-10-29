import { getNotes } from "@/services/notes.service";

export async function GET(request: Response) {
    try {
        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search")?.trim() ?? "";
        const limit = Number(searchParams.get("limit") ?? 10);
        const page = Number(searchParams.get("page") ?? 1);

        const notes = await getNotes(search:string,limit:number,page)
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