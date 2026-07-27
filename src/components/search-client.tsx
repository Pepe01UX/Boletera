"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SearchX, Search } from "lucide-react";
import { EventAgendaRow } from "@/components/home/event-agenda-row";
import { CATEGORY_META, matches, sortByDate } from "@/lib/events";

const quickFilters = ["Voleibol", "Conciertos", "Auditorio", "Durango"];

export function SearchClient() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const ordered = sortByDate(matches);

    if (!normalized) {
      return ordered;
    }

    return ordered.filter((event) =>
      [
        event.title,
        event.venue,
        event.city,
        event.subtitle,
        CATEGORY_META[event.category].label,
        CATEGORY_META[event.category].short,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    results.forEach((event) => {
      const img = new window.Image();
      img.src = event.coverImage;
    });
  }, [results]);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div>
          <p className="t-eyebrow">Encuentra tu próxima salida</p>
          <h1 className="mt-1.5 text-[1.7rem] font-extrabold leading-tight text-white text-display">
            Buscar eventos
          </h1>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Evento, recinto o categoría..."
            aria-label="Buscar eventos"
            className="h-12 w-full rounded-full border border-white/10 bg-[#05070f]/60 pl-11 pr-4 text-sm text-white placeholder:text-white/35 backdrop-blur-xl transition-colors focus:border-amber-300/40 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {quickFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setQuery(filter)}
              className="chip-glass shrink-0 px-3 py-2"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="home-empty">
          <SearchX className="size-8 text-amber-300/70" />
          <p className="text-base font-bold text-white text-display">
            Sin resultados
          </p>
          <p className="max-w-xs text-[13px] leading-relaxed text-white/50">
            No encontramos eventos para &quot;{query}&quot;. Prueba con otro recinto o
            categoría.
          </p>
          <Link href="/" className="btn-ghost-glass mt-1">
            Ver todo el calendario
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {results.map((event) => (
            <EventAgendaRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
