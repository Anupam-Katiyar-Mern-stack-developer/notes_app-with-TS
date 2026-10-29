
"use client";

import { useEffect, useState } from "react";
import type { Note, NoteResponse, CreateNoteResponse } from "@/types/note"


export default function NoteForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

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
    const data: CreateNoteResponse = await response.json();



    if (!response.ok) {
      console.error(data.message);
      return;
    }
    if (!data.note) {
      throw new Error("Created note was not returned")
    }

    console.log("Note saved in DB:", data.note);
    setNotes((previousNotes) => [data.note!, ...previousNotes]);
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      async function fetchNotes() {

        try {
          setLoading(true);
          setError("");

          const params = new URLSearchParams({
            page: String(page),
            limit: "10",
            search,
          })

          const response = await fetch(`/api/notes?${params}`, {
            signal: controller.signal
          });
          const data: NoteResponse = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch notes");
          }
          setNotes(data.notes || []);
          setTotalPages(data.pagination.totalPages)

        } catch (error) {
          setError(
            error instanceof Error ? error.message : "something went wrong"
          )
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }

      }

      fetchNotes();
    }, 400)

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    }

  }, [page, search]);

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
        <div>
          <input
            type="search"
            value={search}
            placeholder="Search notes by title..."
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        {loading && <p>Loading notes...</p>}
        {error && <p>{error}</p>}

        <h2>My Notes</h2>

        {!loading && !error && notes.map((note) => (
          <article key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </article>

        ))}
        <div>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
