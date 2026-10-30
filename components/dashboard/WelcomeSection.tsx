
import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-sm sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
            <Sparkles size={14} />
            Your personal workspace
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Welcome back!
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-blue-100 sm:text-base">
            Capture your thoughts, organize your ideas, and keep everything
            important in one place.
          </p>
        </div>

        <Link
          href="/notes"
          className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50 active:scale-95"
        >
          <Plus size={18} />
          Create New Note
        </Link>
      </div>
    </section>
  );
}
