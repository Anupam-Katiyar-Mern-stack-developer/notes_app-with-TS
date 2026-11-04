import { FileText } from "lucide-react";
import NoteActions from "./NoteActions";
import FavoriteButton from "./FavoriteButton";

type NoteCardProps = {
  note: {
    id: number;
    title: string;
    content: string;
    created_at: string;
    is_favorite: boolean;
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
          <FavoriteButton
            noteId={note.id}
            isFavorite={note.is_favorite}
          />

          <NoteActions noteId={note.id} />
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
