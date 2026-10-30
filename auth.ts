import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";

import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),

  session: {
    strategy: "jwt",
  },

  providers: [
    Google,
    Facebook,

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = String(credentials.email ?? "")
          .trim()
          .toLowerCase();

        const password = String(credentials.password ?? "");

        if (!email || !password) return null;

        const result = await pool.query(
          `SELECT id, name, email, password
           FROM users
           WHERE email = $1`,
          [email]
        );

        const user = result.rows[0];

        if (!user?.password) return null;

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,
});