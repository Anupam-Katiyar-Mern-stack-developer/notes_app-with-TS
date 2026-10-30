
"use client";

import Link from "next/link";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const navigation = [
  { label: "All Notes", href: "/", icon: "▤" },
  { label: "Favorites", href: "/favorites", icon: "☆" },
  { label: "Recently Deleted", href: "/trash", icon: "⌫" },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/40 transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar panel */}
      <aside
        id="app-sidebar"
        aria-label="Main navigation"
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out md:sticky md:top-0 md:z-auto md:h-screen md:w-64 md:max-w-none md:translate-x-0 md:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white">
              N
            </div>
            <div>
              <h2 className="font-bold text-slate-900">NoteSpace</h2>
              <p className="text-xs text-slate-500">Your workspace</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            ✕
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mb-8 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          <span className="text-xl">+</span>
          Create new note
        </button>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            Stay organized
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Keep your ideas and thoughts in one place.
          </p>
        </div>
      </aside>
    </>
  );
}
