"use server";

import { pool } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

export async function updateNoteAction(formData: FormData) {
    await requireUser();

    const id = Number(formData.get("id"));
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid note ID");
    }

    if (!title || !content) {
        throw new Error("Title and content are required");
    }

    if (title.length > 200) {
        throw new Error("Title cannot exceed 200 characters");
    }

    const result = await pool.query(
        `UPDATE notes
         SET title = $1, content = $2
         WHERE id = $3
         RETURNING id`,
        [title, content, id]
    );

    if (result.rowCount === 0) {
        throw new Error("Note not found");
    }

    redirect("/notes");
}