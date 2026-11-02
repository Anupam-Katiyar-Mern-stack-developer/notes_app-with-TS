
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function NotesToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      const query = params.toString();

      if (query !== searchParams.toString()) {
        router.replace(query ? `${pathname}?${query}` : pathname);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, pathname, router, searchParams]);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <Search size={19} className="shrink-0 text-slate-400" />

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes by title..."
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="text-slate-400 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
