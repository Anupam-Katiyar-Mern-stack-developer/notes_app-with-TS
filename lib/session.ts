import "server-only"


import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { pool } from "./db";
import { redirect } from "next/navigation";

export async function getCurrentUsers() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
        return null;
    }

    const tokenHash = createHash("sha256")
        .update(token)
        .digest("hex");

    const result = await pool.query(
        `select u.id, u.name,u.email
            from sessions s
             join users u on u.id = s.user_id
             where s.token_hash =$1
             and s.expires_at > now()
             limit 1`, [tokenHash]
    )

    return result.rows[0] ?? null;

}


export async function requireUser() {

    const user = await getCurrentUsers();

    if (!user) {
        redirect("/login")
    }

    return user;


}