"use client";

import Link from "next/link";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";


const initialState: LoginState = {
  success: false,
  message: "",
}
export default function LoginPage() {

  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  )
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-white">

      {/* Left Visual Panel */}
      <section className="relative hidden md:flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 p-12">

        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="relative flex h-[440px] w-full max-w-lg items-center justify-center">

          {/* Main Note */}
          <div className="absolute z-10 w-72 rotate-[-5deg] rounded-2xl border border-white/80 bg-white/90 p-6 shadow-2xl shadow-blue-900/10">
            <div className="mb-5 flex items-center justify-between">
              <div className="h-9 w-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
                ✎
              </div>
              <span className="text-xs text-slate-400">Today</span>
            </div>
            <div className="h-3 w-36 rounded-full bg-slate-800" />
            <div className="mt-5 space-y-3">
              <div className="h-2 w-full rounded-full bg-slate-200" />
              <div className="h-2 w-5/6 rounded-full bg-slate-200" />
              <div className="h-2 w-4/6 rounded-full bg-slate-200" />
            </div>
            <div className="mt-7 flex gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600">Personal</span>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-600">Ideas</span>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute right-0 top-5 z-20 w-44 rotate-[8deg] rounded-xl border border-white bg-white/95 p-4 shadow-xl">
            <div className="mb-3 h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">✦</div>
            <div className="h-2 w-24 rounded-full bg-slate-700" />
            <div className="mt-3 h-2 w-full rounded-full bg-slate-200" />
            <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-200" />
          </div>

          {/* Bottom Card */}
          <div className="absolute bottom-5 left-0 z-20 w-48 rotate-[5deg] rounded-xl border border-white bg-white/95 p-4 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-green-100" />
              <div className="h-2 w-20 rounded-full bg-slate-700" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-slate-200" />
              <div className="h-2 w-3/4 rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="absolute left-10 top-10 h-12 w-12 rounded-2xl border border-white/80 bg-white/50 rotate-12" />
          <div className="absolute bottom-12 right-12 h-8 w-8 rounded-full bg-blue-300/50" />
        </div>

        <div className="absolute bottom-8 text-xs font-medium tracking-wide text-blue-500/70">
          MININOTES
        </div>
      </section>

      {/* Login Form */}
      <section className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">

          <Link href="/login" className="mb-10 block text-2xl font-bold text-slate-900">
            Mini<span className="text-blue-600">Notes.</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">

            <button type="button" className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300">
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.85 46.98 31.77 46.98 24.55Z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>
              Google
            </button>

            <button type="button" className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.875 11.85v-8.38H7.08V12h3.045V9.35c0-3 1.79-4.66 4.52-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.86V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12Z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                aria-invalid={!!state.errors?.email?.length}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {state.errors?.email?.[0] && (
                <p className="mt-1 text-sm text-red-500">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                aria-invalid={!!state.errors?.password?.length}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {state.errors?.password?.[0] && (
                <p className="mt-1 text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {state.message && (
              <p
                role="status"
                className={`text-sm ${state.success ? "text-green-600" : "text-red-500"
                  }`}
              >
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </p>

          <p className="mt-10 text-center text-xs text-slate-400">
            © 2026 MiniNotes. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
