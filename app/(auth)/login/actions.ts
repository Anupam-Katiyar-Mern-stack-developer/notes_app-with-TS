
"use server";

import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export type LoginState = {
    success: boolean;
    message: string;
    errors?: {
        email?: string[];
        password?: string[];
    };
};


export async function loginAction(
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const validatedFields = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please check your input.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    let sessionToken: string;

    try {
        const result = await pool.query(
            `SELECT id, name, email, password
       FROM users
       WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        // Generate a cryptographically secure session token.
        sessionToken = randomBytes(32).toString("hex");

        // Store only the SHA-256 hash in PostgreSQL.
        const tokenHash = createHash("sha256")
            .update(sessionToken)
            .digest("hex");

        const expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        await pool.query(
            `INSERT INTO sessions (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`,
            [user.id, tokenHash, expiresAt]
        );
    } catch (error) {
        console.error("Login error:", error);

        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }

    // Set the cookie only after the session is stored successfully.
    const cookieStore = await cookies();

    cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    redirect("/dashboard");
}

