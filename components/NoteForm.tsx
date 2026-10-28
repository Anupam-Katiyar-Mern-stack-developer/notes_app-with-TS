
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Note } from "@/types/note";

export default function NoteForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const data = await response.json();

    setNotes((previousNotes) => [
      data.note,
      ...previousNotes,
    ]);

    if (!response.ok) {
      console.error(data.message);
      return;
    }

    console.log("Note saved in DB:", data.note)
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/notes");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch notes");
        }
        setNotes(data.notes || []);

      } catch (error) {
        setError(
          error instanceof Error ? error.message : "something went wrong"
        )
      } finally {
        setLoading(false);
      }

    }

    fetchNotes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Note Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter note title"
        />

        <label htmlFor="content">Note Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your note"
        />

        <button type="submit">Create Note</button>
      </form>

      <section>

        {loading && <p>Loading notes...</p>}
        {error && <p>{error}</p>}

        <h2>My Notes</h2>

        {!loading && !error && notes.map((note) => (
          <article key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
