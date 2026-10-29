"use server";
import { createNote } from "@/services/notes.service";
import { revalidatePath } from "next/cache";

export async function addNote(formdata: FormData) {
    const title = formdata.get("title");
    const content = formdata.get("content");

    if (
        typeof title !== "string" ||
        typeof content !== "string" ||
        !title.trim() ||
        !content.trim()
    ) {
        return {
            success: false,
            message: "Title and content are required",
        };
    }

    await createNote(title.trim(), content.trim())
    revalidatePath("notes");

    return {
        success: true,
        message: "Note created successfully",
    }
}