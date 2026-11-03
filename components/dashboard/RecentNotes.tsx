import Link from "next/link";
import { ArrowUpRight, FileText, MoreHorizontal } from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type RecentNotesProps = {
  notes: Note[];
};

const colors = [
  "bg-blue-50 text-blue-600",
  "bg-purple-50 text-purple-600",
  "bg-amber-50 text-amber-600",
];

export default function RecentNotes({ notes }: RecentNotesProps) {
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

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="font-medium text-gray-700">No notes yet</p>
          <p className="mt-2 text-sm text-gray-500">
            Create your first note to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note, index) => {
            const color = colors[index % colors.length];

            return (
              <article
                key={note.id}
                className="group flex min-h-[210px] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                    <FileText size={20} />
                  </div>

                  <button
                    type="button"
                    aria-label={`More options for ${note.title}`}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                <h3 className="mt-5 line-clamp-1 font-semibold text-gray-900 transition group-hover:text-blue-600">
                  {note.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {note.content}
                </p>

                <div className="mt-auto flex items-center justify-end border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400">
                    {new Date(note.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}