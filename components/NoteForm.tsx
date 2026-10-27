
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Note } from "@/types/note";

export default function NoteForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote: Note = {
      id: Date.now(),
      title,
      content,
    };

    setNotes((previousNotes) => [...previousNotes, newNote]);

    setTitle("");
    setContent("");
  };

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
        <h2>My Notes</h2>

        {notes.map((note) => (
          <article key={note.id} key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
