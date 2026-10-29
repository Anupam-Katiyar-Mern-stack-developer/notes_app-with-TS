"use server";

import { createNote } from "@/services/notes.service";
import { revalidatePath } from "next/cache";

export type ActionState = {
    success: boolean;
    message: string;
};

export async function addNote(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const title = formData.get("title");
    const content = formData.get("content");

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

    try {
        await createNote(title.trim(), content.trim());
        revalidatePath("/notes");

        return {
            success: true,
            message: "Note created successfully",
        };
    } catch {
        return {
            success: false,
            message: "Failed to create note",
        };
    }
}