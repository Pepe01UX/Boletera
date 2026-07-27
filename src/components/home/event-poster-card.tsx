import Link from "next/link";
import { MapPin } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { EventCardFavorite } from "@/components/event-card-favorite";
import {
  CATEGORY_META,
  formatCurrency,
  getEventDateParts,
  getLowestPrice,
  type MatchEvent,
} from "@/lib/events";

export function EventPosterCard({ event }: { event: MatchEvent }) {
  const { weekday, day, month } = getEventDateParts(event);
  const lowestPrice = getLowestPrice(event);

  return (
    <article className="poster-card group">
      <Link href={`/eventos/${event.id}`} className="block">
        <div className="poster-card__media">
          <CoverImage
            src={event.coverImage}
            alt={event.title}
            className="poster-card__img"
            sizes="(max-width: 640px) 62vw, 265px"
          />
          <div className="poster-card__scrim" />

          <div className="absolute left-3 top-3 z-10">
            <span className="date-block">
              <span className="date-block__day t-num">{day}</span>
              <span className="date-block__month">{month}</span>
            </span>
          </div>

          <div className="poster-card__body">
            <span className="chip-glass self-start">
              {CATEGORY_META[event.category].short}
            </span>
            <h3 className="poster-card__title">{event.title}</h3>
            <p className="flex items-center gap-1.5 text-[11px] text-white/50">
              <MapPin className="size-3 shrink-0 text-amber-300/70" />
              <span className="truncate">{event.venue}</span>
            </p>
            <div className="poster-card__foot">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/45 t-num">
                {weekday}
              </span>
              <span className="text-[13px] font-extrabold text-amber-300 t-num">
                {formatCurrency(lowestPrice)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <EventCardFavorite className="absolute right-3 top-3 z-20" />
    </article>
  );
}
