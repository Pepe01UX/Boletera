"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarSearch } from "lucide-react";
import { EventAgendaRow } from "@/components/home/event-agenda-row";
import { EventPosterCard } from "@/components/home/event-poster-card";
import { HomeCategoryRail } from "@/components/home/home-category-rail";
import { HomeHero } from "@/components/home/home-hero";
import { HomeNextEvent } from "@/components/home/home-next-event";
import { HomeTopBar } from "@/components/home/home-top-bar";
import { HomeTrust } from "@/components/home/home-trust";
import { HomeVenues } from "@/components/home/home-venues";
import {
  filterEventsByCategory,
  getFeaturedEvents,
  getNextEvent,
  sortByDate,
  type CategoryFilter,
} from "@/lib/events";

export function HomeClient() {
  const [category, setCategory] = useState<CategoryFilter>("explorar");

  const filteredEvents = useMemo(
    () => sortByDate(filterEventsByCategory(category)),
    [category],
  );

  const heroEvents = useMemo(() => {
    if (category === "explorar" || category === "para-ti") {
      return sortByDate(getFeaturedEvents());
    }

    const featured = filteredEvents.filter((event) => event.featured);
    return featured.length > 0 ? featured : filteredEvents.slice(0, 3);
  }, [category, filteredEvents]);

  const nextEvent = useMemo(() => filteredEvents[0] ?? getNextEvent(), [
    filteredEvents,
  ]);

  const upcoming = useMemo(() => filteredEvents.slice(0, 6), [filteredEvents]);

  useEffect(() => {
    filteredEvents.forEach((event) => {
      const img = new window.Image();
      img.src = event.coverImage;
    });
  }, [filteredEvents]);

  return (
    <div className="home">
      <HomeTopBar />
      <HomeHero events={heroEvents} />
      <HomeCategoryRail active={category} onChange={setCategory} />

      <div className="home-stack">
        {filteredEvents.length === 0 ? (
          <div className="home-pad">
            <div className="home-empty">
              <CalendarSearch className="size-8 text-amber-300/70" />
              <p className="text-base font-bold text-white text-display">
                Sin eventos en esta categoría
              </p>
              <p className="max-w-xs text-[13px] leading-relaxed text-white/50">
                Estamos preparando nuevas fechas. Explora todo el calendario mientras
                tanto.
              </p>
              <button
                type="button"
                onClick={() => setCategory("explorar")}
                className="btn-ghost-glass mt-1"
              >
                Ver todo
              </button>
            </div>
          </div>
        ) : (
          <>
            {nextEvent && <HomeNextEvent event={nextEvent} />}

            <section className="home-section">
              <div className="home-section__head">
                <div>
                  <p className="t-eyebrow">Calendario</p>
                  <h2 className="home-section__title">Próximos eventos</h2>
                </div>
                <Link href="/buscar" className="home-section__link">
                  Ver todos
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="home-rail no-scrollbar">
                {upcoming.map((event) => (
                  <EventPosterCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            <section className="home-section">
              <div className="home-section__head">
                <div>
                  <p className="t-eyebrow">Agenda completa</p>
                  <h2 className="home-section__title">Toda la temporada</h2>
                </div>
                <span className="home-section__link t-num">
                  {filteredEvents.length} fechas
                </span>
              </div>
              <div className="agenda-list">
                {filteredEvents.map((event) => (
                  <EventAgendaRow key={event.id} event={event} />
                ))}
              </div>
            </section>
          </>
        )}

        <section className="home-section">
          <div className="home-section__head">
            <div>
              <p className="t-eyebrow">Dónde</p>
              <h2 className="home-section__title">Recintos</h2>
            </div>
          </div>
          <HomeVenues />
        </section>

        <HomeTrust />
      </div>
    </div>
  );
}
