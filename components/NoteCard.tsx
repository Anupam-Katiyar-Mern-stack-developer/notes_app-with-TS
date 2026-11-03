
import { FileText, Heart, MoreVertical } from "lucide-react";
import NoteActions from "./NoteActions";

type NoteCardProps = {
  note: {
    id: number;
    title: string;
    content: string;
    created_at: string;
  };
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <FileText size={20} />
        </div>

        <div className="flex gap-2 text-slate-400">
          <button
            type="button"
            aria-label="Add to favorites"
            className="rounded-lg p-2 transition hover:bg-rose-50 hover:text-rose-500"
          >
            <Heart size={18} />
          </button>

          <button
            type="button"
            aria-label="More options"
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <NoteActions noteId={note.id} />
          </button>
        </div>
      </div>

      <h2 className="mb-2 line-clamp-1 text-lg font-semibold text-slate-800">
        {note.title}
      </h2>

      <p className="line-clamp-4 min-h-24 whitespace-pre-wrap break-words text-sm leading-6 text-slate-500">
        {note.content}
      </p>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400">
          {new Date(note.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
