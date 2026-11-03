import { getNoteById } from "@/services/notes.service";
import CreateNoteForm from "@/components/CreateNoteForm";
import { notFound } from "next/navigation";

type EditNotePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNotePage({
  params,
}: EditNotePageProps) {
  const { id } = await params;

  const noteId = Number(id);

  if (!Number.isInteger(noteId) || noteId <= 0) {
    notFound();
  }

  const note = await getNoteById(noteId);

  if (!note) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl">
      <CreateNoteForm
        mode="edit"
        initialData={{
          id: note.id,
          title: note.title,
          content: note.content,
        }}
      />
    </main>
  );
}