"use server";

import { createNote } from "@/services/notes.service";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";

export async function createNoteAction(formData: FormData) {
    const user = await requireUser();

    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();

    if (!title || !content) {
        return {
            success: false,
            message: "Title and content are required.",
        };
    }

    if (title.length > 200) {
        return {
            success: false,
            message: "Title cannot exceed 200 characters.",
        };
    }

    await createNote(title, content);

    redirect("/notes");
}