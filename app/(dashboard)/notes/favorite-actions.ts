"use server";

import { pool } from "@/lib/db";

import { requireUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteAction(formData: FormData) {

    await requireUser();

    const id = Number(formData.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid note ID");
    }

    await pool.query(
        `UPDATE notes
     SET is_favorite = NOT is_favorite
     WHERE id = $1
     AND deleted_at IS NULL`,
        [id]
    );

    revalidatePath("/notes");
    revalidatePath("/favorites");
    revalidatePath("/dashboard");

}