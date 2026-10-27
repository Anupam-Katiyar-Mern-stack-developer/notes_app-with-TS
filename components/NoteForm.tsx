"use client";

import { useState } from "react";

export default function NotForm() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    return (
        <div>
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log({
                    title,
                    content,
                })
            }}>

                <label htmlFor="title">Note Title</label>
                <input type="text " id="title" value={title} onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter note title" />

                <label htmlFor="content">Note COntent</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="write your note" />
                <button type="submit">Create Note</button>
            </form>
        </div>
    )
}