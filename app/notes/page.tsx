import { addNote } from "./actions";

export default function Notepage() {
    return (
        <main>
            <h1>Create Note</h1>

            <form action={addNote}>
                <input type="text" name="title" placeholder="Enter title" className="border p-1" aria-required />
                <textarea name="content" id=""
                    placeholder="Enter content" />

                <button type="submit">Save Notes</button>
            </form>
        </main>
    )
}