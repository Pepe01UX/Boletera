import Link from "next/link";
import { MapPin } from "lucide-react";
import { EventCardFavorite } from "@/components/event-card-favorite";
import { TeamBadge } from "@/components/team-badge";
import { type MatchEvent } from "@/lib/events";
import { CORONELAS_LOGO } from "@/lib/branding";

export function EventCardPopular({ event }: { event: MatchEvent }) {
  return (
    <article className="event-card-popular relative shrink-0">
      <EventCardFavorite className="absolute right-3 top-3 z-20" />
      <Link href={`/eventos/${event.id}`} className="block">
        <div className={`event-card-popular__media ${event.posterClassName}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

          <div className="relative z-[1] flex items-center justify-center gap-2 px-3 pb-2 pt-6">
            <TeamBadge compact src={CORONELAS_LOGO} alt="Coronelas" fallback="CRN" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/75">
              VS
            </span>
            <TeamBadge
              compact
              src={event.opponentLogo}
              alt={event.opponent}
              fallback={event.opponentShort}
            />
          </div>
        </div>

        <div className={`event-card-popular__footer ${event.cardTheme.footerBg}`}>
          <h3 className={`text-base font-bold leading-tight ${event.cardTheme.titleColor}`}>
            {event.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/55">
            <MapPin className="size-3 shrink-0" />
            {event.venue}, {event.city}
          </p>
        </div>
      </Link>
    </article>
  );
}
