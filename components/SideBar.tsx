
"use client";

import { useState } from "react";

const navigation = [
    { label: "All Notes", icon: "▤" },
    { label: "Favorites", icon: "☆" },
    { label: "Recently Deleted", icon: "⌫" },
];

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState("All Notes");

    return (
        <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5">
            <div className="mb-10 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white">
                    N
                </div>

                <div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900">
                        NoteSpace
                    </h1>
                    <p className="text-xs text-slate-500">
                        Your personal workspace
                    </p>
                </div>
            </div>

            <button
                type="button"
                className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700"
            >
                <span className="text-xl">+</span>
                Create new note
            </button>

            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
            </p>

            <nav className="space-y-1">
                {navigation.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveItem(item.label)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${activeItem === item.label
                                ? "bg-violet-50 text-violet-700"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">
                    Stay organized
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keep your ideas and thoughts in one place.
                </p>
            </div>
        </aside>
    );
}
