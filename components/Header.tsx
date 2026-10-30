
export default function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
            <div>
                <h1 className="text-lg font-semibold text-slate-900">
                    My Workspace
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden sm:block">
                    <input
                        type="search"
                        placeholder="Search notes..."
                        className="w-48 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 lg:w-64"
                    />
                </div>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700"
                    aria-label="User profile"
                >
                    U
                </button>
            </div>
        </header>
    );
}
