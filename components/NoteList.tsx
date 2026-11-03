
import NoteCard from "./NoteCard";

type Note = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

type NotesListProps = {
    notes: Note[];
};

export default function NotesList({ notes }: NotesListProps) {
    if (notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <h2 className="text-lg font-semibold text-slate-800">
                    No notes found
                </h2>

                <p className="mt-2 max-w-sm text-sm text-slate-500">
                    Your notes will appear here once you create your first note.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}
