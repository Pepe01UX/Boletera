"use client";

import { useState } from "react";
import { Compass, Sparkles, Volleyball } from "lucide-react";
import { cn } from "@/lib/utils";

const filters = [
  { id: "explore", label: "Explorar", icon: Compass },
  { id: "sports", label: "Deportes", icon: Volleyball },
  { id: "foryou", label: "Para ti", icon: Sparkles },
] as const;

export function HomeFilters() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("explore");

  return (
    <div className="home-filters no-scrollbar">
      {filters.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => setActive(id)}
          className={cn("home-filter-pill", active === id && "home-filter-pill--active")}
        >
          <Icon className="size-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
