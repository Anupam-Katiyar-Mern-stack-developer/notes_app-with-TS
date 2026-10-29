"use client";

import { useActionState, useEffect, useRef } from "react";
import { addNote, type ActionState } from "@/app/notes/actions";


const initialState: ActionState = {
  success: false,
  message: "",
}
export default function NoteForm() {
  const [state, formAction, pending] = useActionState(addNote, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type="text" placeholder="Enter title" required className="p-1 border" />
      <textarea
        name="content"
        placeholder="Enter content"
        required
        className="border p-1"

      />
      <button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Note"}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}