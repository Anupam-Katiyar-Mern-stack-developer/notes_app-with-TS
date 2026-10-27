"use client";

import { useState } from "react";

export default function NotForm() {
    const [title, setTitle] = useState<string>("");

    return (
        <div>
            <label htmlFor="title">Note Title</label>
            <input type="text " id="title" value={title} onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter note title" />
            <p>Preview:{title}</p>
        </div>
    )
}