"use client";

import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CoverImage } from "@/components/cover-image";
import { EventCardFavorite } from "@/components/event-card-favorite";
import { type MatchEvent } from "@/lib/events";

const SLIDE_MS = 6000;

export function HomeHero({ events }: { events: MatchEvent[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((target: number) => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    rail.scrollTo({ left: target * rail.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (events.length <= 1 || paused) {
      return;
    }

    const timer = window.setTimeout(
      () => goTo((index + 1) % events.length),
      SLIDE_MS,
    );

    return () => window.clearTimeout(timer);
  }, [events.length, goTo, index, paused]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const handlePointerRelease = (pointer: ReactPointerEvent) => {
    if (pointer.pointerType !== "mouse") {
      setPaused(false);
    }
  };

  const handleScroll = () => {
    const rail = railRef.current;
    if (!rail || rail.clientWidth === 0) {
      return;
    }

    const next = Math.round(rail.scrollLeft / rail.clientWidth);
    if (next !== index && next >= 0 && next < events.length) {
      setIndex(next);
    }
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <section
      className="home-hero"
      aria-roledescription="carrusel"
      aria-label="Eventos destacados"
    >
      <div
        ref={railRef}
        className="home-hero__rail no-scrollbar"
        onScroll={handleScroll}
        onPointerDown={() => setPaused(true)}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        onPointerEnter={(pointer) => {
          if (pointer.pointerType === "mouse") {
            setPaused(true);
          }
        }}
        onPointerLeave={(pointer) => {
          if (pointer.pointerType === "mouse") {
            setPaused(false);
          }
        }}
      >
        {events.map((event, slideIndex) => (
          <HeroCard
            key={event.id}
            event={event}
            position={slideIndex + 1}
            total={events.length}
            eager={slideIndex === 0}
          />
        ))}
      </div>

      {events.length > 1 && (
        <div className="home-hero__dots" role="tablist" aria-label="Slides destacados">
          {events.map((event, dotIndex) => (
            <button
              key={event.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Ir a ${event.title}`}
              className="home-hero__dot"
              data-active={dotIndex === index}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function HeroCard({
  event,
  position,
  total,
  eager,
}: {
  event: MatchEvent;
  position: number;
  total: number;
  eager: boolean;
}) {
  return (
    <article
      className="home-hero__card"
      role="group"
      aria-label={`${position} de ${total}: ${event.title}`}
    >
      <Link href={`/eventos/${event.id}`} className="home-hero__card-link">
        <div className="home-hero__card-media">
          <CoverImage
            src={event.coverImage}
            alt={event.title}
            sizes="(max-width: 820px) 100vw, 780px"
            priority={eager}
            className="home-hero__card-img"
          />
          <div className="home-hero__card-scrim" aria-hidden />
          <div className="home-hero__card-body">
            <h2 className="home-hero__card-title text-gradient-brand">{event.title}</h2>
            <p className="home-hero__card-location">{event.city}</p>
          </div>
        </div>
      </Link>

      <EventCardFavorite className="home-hero__card-fav" />
    </article>
  );
}
