"use server";

import { pool } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";


export async function deleteNoteAction(formData: FormData) {

    await requireUser();

    const id = Number(formData.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("invalid note ID")
    }

    const result = await pool.query(
        `
        delete from notes where id =$1 returning id`, [id]
    );

    if (result.rowCount === 0) {
        throw new Error("Note not found");
    }
    redirect("/notes")
}