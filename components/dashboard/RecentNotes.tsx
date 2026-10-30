
import Link from "next/link";
import { ArrowUpRight, FileText, Heart, MoreHorizontal } from "lucide-react";

const notes = [
  {
    id: 1,
    title: "React.js Learning Roadmap",
    content:
      "Learn React hooks, component architecture, state management and performance optimization.",
    category: "Learning",
    date: "Oct 28, 2026",
    color: "bg-blue-50 text-blue-600",
    favorite: true,
  },
  {
    id: 2,
    title: "Project Ideas",
    content:
      "Build a task manager, AI chat application and personal finance tracker.",
    category: "Ideas",
    date: "Oct 26, 2026",
    color: "bg-purple-50 text-purple-600",
    favorite: false,
  },
  {
    id: 3,
    title: "Meeting Notes",
    content:
      "Discuss project progress, upcoming features and development priorities.",
    category: "Work",
    date: "Oct 24, 2026",
    color: "bg-amber-50 text-amber-600",
    favorite: true,
  },
];

export default function RecentNotes() {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Recent Notes
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Quickly access your latest thoughts and ideas.
          </p>
        </div>

        <Link
          href="/notes"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View all
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {notes.map((note) => (
          <article
            key={note.id}
            className="group flex min-h-[210px] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${note.color}`}>
                <FileText size={20} />
              </div>

              <div className="flex items-center gap-2">
                {note.favorite && (
                  <Heart
                    size={17}
                    className="fill-rose-500 text-rose-500"
                  />
                )}
                <button
                  type="button"
                  aria-label={`More options for ${note.title}`}
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
            </div>

            <h3 className="mt-5 line-clamp-1 font-semibold text-gray-900 transition group-hover:text-blue-600">
              {note.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
              {note.content}
            </p>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${note.color}`}>
                {note.category}
              </span>

              <span className="text-xs text-gray-400">{note.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
