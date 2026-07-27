"use client";

import { Compass, Music2, Sparkles, Volleyball } from "lucide-react";
import { type CategoryFilter } from "@/lib/events";
import { cn } from "@/lib/utils";

const categories: {
  id: CategoryFilter;
  label: string;
  icon: typeof Compass;
}[] = [
  { id: "explorar", label: "Explorar", icon: Compass },
  { id: "deportes", label: "Deportes", icon: Volleyball },
  { id: "conciertos", label: "Conciertos", icon: Music2 },
  { id: "para-ti", label: "Para ti", icon: Sparkles },
];

export function HomeCategoryRail({
  active,
  onChange,
}: {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}) {
  return (
    <div className="home-catrail-wrap">
      <div
        className="home-catrail no-scrollbar"
        role="tablist"
        aria-label="Categorías de eventos"
      >
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
              className={cn(
                "home-catrail__pill",
                isActive && "home-catrail__pill--active",
              )}
            >
              <Icon
                className={cn("size-4 shrink-0", isActive && "text-black")}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
