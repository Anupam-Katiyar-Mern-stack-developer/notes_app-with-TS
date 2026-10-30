
type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        aria-controls="app-sidebar"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
          My Workspace
        </h1>
      </div>

      <div className="relative w-10 shrink-0 sm:w-56 lg:w-64">
        <input
          type="search"
          placeholder="Search notes..."
          aria-label="Search notes"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 sm:pl-9"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-2 hidden text-slate-400 sm:block"
        >
          ⌕
        </span>
      </div>

      <button
        type="button"
        aria-label="User profile"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700"
      >
        U
      </button>
    </header>
  );
}
