import NotForm from "@/components/NoteForm";
import type { Note } from "@/types/note";

export default function Home() {
  const note: Note = {
    id: 1,
    title: "Learn Next.js",
    content: "Aaj TypeScript interface seekha",
  };

  return (
    <main>
      <h1>Mini Notes App</h1>

      <NotForm />
    </main>
  );
}