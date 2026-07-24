import Link from "next/link";
import { MapPin } from "lucide-react";
import { EventCardFavorite } from "@/components/event-card-favorite";
import { TeamBadge } from "@/components/team-badge";
import {
  formatCurrency,
  formatShortDate,
  getLowestPrice,
  type MatchEvent,
} from "@/lib/events";
import { CORONELAS_LOGO } from "@/lib/branding";

export function EventCardFeatured({ event }: { event: MatchEvent }) {
  const lowestPrice = getLowestPrice(event);

  return (
    <article className="event-card-featured relative">
      <EventCardFavorite className="absolute right-4 top-4 z-20" />
      <Link href={`/eventos/${event.id}`} className="block">
        <div className={`event-card-featured__media ${event.posterClassName}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

          <div className="relative z-10 p-4">
            <span className="event-card-date">{formatShortDate(event.date)}</span>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center gap-4 px-6">
            <TeamBadge src={CORONELAS_LOGO} alt="Coronelas" fallback="CRN" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-white/75">VS</span>
            <TeamBadge
              src={event.opponentLogo}
              alt={event.opponent}
              fallback={event.opponentShort}
            />
          </div>

          <div className="relative z-10 space-y-3 p-5 pt-0">
            <div>
              <h3
                className={`text-2xl font-bold leading-tight sm:text-[1.65rem] ${event.cardTheme.featuredTitleColor}`}
              >
                {event.title}
              </h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/70">
                <MapPin className="size-3.5 shrink-0" />
                {event.venue}, {event.city}
              </p>
            </div>
            <p className="text-sm text-white/80">
              Desde:{" "}
              <span className="text-base font-bold text-white">
                {formatCurrency(lowestPrice)}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
