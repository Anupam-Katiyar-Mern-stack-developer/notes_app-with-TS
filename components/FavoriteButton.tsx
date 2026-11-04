
"use client";

import { Heart } from "lucide-react";
import { toggleFavoriteAction } from "@/app/(dashboard)/notes/favorite-actions";

type FavoriteButtonProps = {
  noteId: number;
  isFavorite: boolean;
};

export default function FavoriteButton({
  noteId,
  isFavorite,
}: FavoriteButtonProps) {
  return (
    <form action={toggleFavoriteAction}>
      <input type="hidden" name="id" value={noteId} />

      <button
        type="submit"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`rounded-lg p-2 transition hover:bg-rose-50 ${
          isFavorite
            ? "text-red-500"
            : "text-slate-400 hover:text-red-500"
        }`}
      >
        <Heart
          size={18}
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>
    </form>
  );
}
