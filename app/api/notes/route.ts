import { NextRequest } from "next/server";

export async function GET() {
    return Response.json({
        success: true,
        message: "Notes API working"
    })
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { title, content } = body;

    return Response.json({
        success: true,
        message: "Not recieved successfully",
        notes: {
            title,
            content,
        }
    })

}