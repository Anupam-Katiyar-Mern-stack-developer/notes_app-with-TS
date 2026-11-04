
"use server";

import { pool } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

export async function deleteNoteAction(formData: FormData) {
    await requireUser();

    const id = Number(formData.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid note ID");
    }

    const result = await pool.query(
        `UPDATE notes
     SET deleted_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND deleted_at IS NULL
     RETURNING id`,
        [id]
    );

    if (result.rowCount === 0) {
        throw new Error("Note not found");
    }

    redirect("/notes");
}
