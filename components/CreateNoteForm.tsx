
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createNoteAction } from "@/app/(dashboard)/notes/new/actions";
import { updateNoteAction } from "@/app/(dashboard)/notes/[id]/edit/actions";

type CreateNoteFormProps = {
    mode?: "create" | "edit";
    initialData?: {
        id: number;
        title: string;
        content: string;
    };
};

export default function CreateNoteForm({
    mode = "create",
    initialData,
}: CreateNoteFormProps) {
    const isEdit = mode === "edit";

    return (
        <div className="mx-auto w-full max-w-3xl">
            <div className="mb-8">
                <Link
                    href="/notes"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
                >
                    <ArrowLeft size={17} />
                    Back to Notes
                </Link>

                <h1 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {isEdit ? "Edit Note" : "Create New Note"}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {isEdit
                        ? "Update your note details."
                        : "Capture your thoughts, ideas and important information."}
                </p>
            </div>

            <form
                action={isEdit ? updateNoteAction : createNoteAction}
                className="space-y-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
            >
                {isEdit && (
                    <input type="hidden" name="id" value={initialData?.id} />
                )}

                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Note Title
                    </label>

                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={initialData?.title || ""}
                        placeholder="Enter your note title..."
                        required
                        maxLength={200}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Note Content
                    </label>

                    <textarea
                        id="content"
                        name="content"
                        defaultValue={initialData?.content || ""}
                        rows={10}
                        placeholder="Write your thoughts here..."
                        required
                        className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                </div>

                <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                    <Link
                        href="/notes"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                        <Save size={17} />
                        {isEdit ? "Update Note" : "Save Note"}
                    </button>
                </div>
            </form>
        </div>
    );
}
