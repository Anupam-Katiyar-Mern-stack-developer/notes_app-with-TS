
export default function HomePage() {
  return (
    <section>
      <p className="text-sm text-slate-500">
        Workspace / All Notes
      </p>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Your Notes
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Capture your ideas and thoughts.
          </p>
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
        >
          + Create Note
        </button>
      </div>
    </section>
  );
}
