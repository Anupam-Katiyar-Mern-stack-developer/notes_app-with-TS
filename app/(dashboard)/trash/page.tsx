
import { Trash2 } from "lucide-react";
import { getDeletedNotes } from "@/services/notes.service";

export default async function TrashPage() {
    const deletedNotes = await getDeletedNotes();

    return (
        <main className="mx-auto w-full max-w-7xl space-y-8">
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Trash2 size={24} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Recently Deleted
                        </h1>
                        <p className="text-sm text-slate-500">
                            Restore your notes or permanently delete them.
                        </p>
                    </div>
                </div>
            </div>

            {deletedNotes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                    <Trash2 className="mx-auto mb-4 text-slate-300" size={40} />

                    <h2 className="text-lg font-semibold text-slate-700">
                        Trash is empty
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Notes you delete will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {deletedNotes.map((note) => (
                        <article
                            key={note.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5"
                        >
                            <h2 className="mb-2 font-semibold text-slate-800">
                                {note.title}
                            </h2>

                            <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-slate-500">
                                {note.content}
                            </p>

                            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                                Deleted:{" "}
                                {new Date(note.deleted_at).toLocaleDateString("en-IN")}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}
