"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function EventCardFavorite({ className }: { className?: string }) {
  return (
    <button type="button" aria-label="Guardar partido" className={cn("event-card-favorite", className)}>
      <Heart className="size-4" />
    </button>
  );
}
