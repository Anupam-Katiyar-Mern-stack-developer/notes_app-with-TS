"use server";

import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type RegisterState = {
    error: string;
};

export async function registerUser(
    _prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
        formData.get("confirmPassword") ?? ""
    );
    const terms = formData.get("terms");

    if (!name || !email || !password) {
        return { error: "All fields are required." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { error: "Please enter a valid email address." };
    }

    if (password.length < 8) {
        return { error: "Password must be at least 8 characters." };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match." };
    }

    if (terms !== "on") {
        return { error: "Please accept the Terms and Privacy Policy." };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.query(
            `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)`,
            [name, email, hashedPassword]
        );

        // Automatically login after registration
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });

        return { error: "" };
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Account created, but automatic login failed." };
        }

        // Let Next.js redirect errors propagate
        if (
            error instanceof Error &&
            error.message.includes("NEXT_REDIRECT")
        ) {
            throw error;
        }

        const dbError = error as { code?: string };

        if (dbError.code === "23505") {
            return { error: "This email is already registered." };
        }

        console.error("Registration error:", error);

        return { error: "Something went wrong. Please try again." };
    }
}