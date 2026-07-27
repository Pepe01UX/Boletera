"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { CORONELAS_LOGO } from "@/lib/branding";
import {
  getEventDateParts,
  getEventTimestamp,
  type MatchEvent,
} from "@/lib/events";

type Remaining = { days: string; hours: string; minutes: string; seconds: string };

const PLACEHOLDER: Remaining = {
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
};

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function computeRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

function Crest({ src, monogram }: { src?: string; monogram: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className="home-next__crest home-next__crest--fallback">{monogram}</span>
    );
  }

  return (
    <span className="home-next__crest">
      <Image
        src={src}
        alt=""
        width={30}
        height={30}
        className="size-[30px] object-contain"
        sizes="30px"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

export function HomeNextEvent({ event }: { event: MatchEvent }) {
  const target = getEventTimestamp(event);
  const [remaining, setRemaining] = useState<Remaining>(PLACEHOLDER);
  const { weekday, day, month, time } = getEventDateParts(event);

  useEffect(() => {
    setRemaining(computeRemaining(target));
    const timer = window.setInterval(
      () => setRemaining(computeRemaining(target)),
      1000,
    );

    return () => window.clearInterval(timer);
  }, [target]);

  const units = [
    { label: "Días", value: remaining.days },
    { label: "Horas", value: remaining.hours },
    { label: "Min", value: remaining.minutes },
    { label: "Seg", value: remaining.seconds },
  ];

  return (
    <section className="home-pad">
      <article className="home-next">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="t-eyebrow">Arranca el próximo evento</p>
            <h3 className="mt-1.5 text-[1.15rem] font-extrabold leading-tight text-white text-display">
              {event.title}
            </h3>
            <p className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-snug text-white/55">
              <MapPin className="mt-[3px] size-3 shrink-0 text-amber-300/80" />
              <span className="t-num">
                {event.venue} · {weekday} {day} {month} · {time}
              </span>
            </p>
          </div>

          <div className="home-next__vs" aria-hidden>
            {event.category === "deportes" ? (
              <>
                <Crest src={CORONELAS_LOGO} monogram="CRN" />
                <span className="text-[10px] font-bold text-white/40">VS</span>
                <Crest src={event.opponentLogo} monogram={event.opponentShort} />
              </>
            ) : (
              <span className="home-next__thumb">
                <CoverImage
                  src={event.coverImage}
                  alt=""
                  sizes="64px"
                />
              </span>
            )}
          </div>
        </div>

        <div className="home-next__grid" aria-live="off">
          {units.map((unit) => (
            <div key={unit.label} className="home-next__unit">
              <span className="home-next__value">{unit.value}</span>
              <span className="home-next__label">{unit.label}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/eventos/${event.id}/asientos`}
          className="btn-primary-gold mt-4 w-full"
        >
          Elegir mis asientos
          <ArrowRight className="size-4" />
        </Link>
      </article>
    </section>
  );
}
