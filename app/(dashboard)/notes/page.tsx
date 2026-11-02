
import { getNotes } from "@/services/notes.service";
import NotesList from "@/components/NoteList";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function NotesPage() {
    const result = await getNotes("", 9, 1);

    return (
        <main className="mx-auto w-full max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        All Notes
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage and organize all your thoughts in one place.
                    </p>
                </div>

                <Link
                    href="/notes/new"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                    <Plus size={18} />
                    Create Note
                </Link>
            </div>

            {/* Notes count */}
            <div>
                <p className="text-sm text-slate-500">
                    Showing {result.data.length} notes
                </p>
            </div>

            {/* Notes */}
            <NotesList notes={result.data} />
        </main>
    );
}
