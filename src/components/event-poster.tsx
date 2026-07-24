import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TeamBadge } from "@/components/team-badge";
import {
  formatCurrency,
  formatMatchDate,
  formatMatchTime,
  getLowestPrice,
  type MatchEvent,
} from "@/lib/events";
import { CORONELAS_LOGO } from "@/lib/branding";
import { cn } from "@/lib/utils";

export function EventPoster({
  event,
  showActions = true,
}: {
  event: MatchEvent;
  showActions?: boolean;
}) {
  const lowestPrice = getLowestPrice(event);

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1020] shadow-2xl shadow-black/30">
      <Link href={`/eventos/${event.id}`} className="block">
        <div
          className={`relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] ${event.posterClassName}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/35 to-transparent" />

          <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-2 sm:left-7 sm:top-7">
            {event.badge && (
              <Badge className="border-amber-400/30 bg-amber-400/15 text-amber-200">
                {event.badge}
              </Badge>
            )}
            <Badge variant="secondary">Local</Badge>
          </div>

          <div className="absolute inset-x-0 top-[16%] flex items-center justify-center gap-5 px-6 sm:top-[18%] sm:gap-10">
            <TeamBadge src={CORONELAS_LOGO} alt="Coronelas de Durango" fallback="CRN" />
            <p className="text-sm font-black uppercase tracking-[0.4em] text-amber-200 sm:text-base">
              VS
            </p>
            <TeamBadge
              src={event.opponentLogo}
              alt={event.opponent}
              fallback={event.opponentShort}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 space-y-5 p-6 sm:p-8">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/90 sm:text-xs">
                {event.subtitle}
              </p>
              <h2 className="max-w-xl text-3xl font-black leading-[1.05] text-white sm:text-4xl">
                {event.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-white/90 sm:text-base">
                  {formatMatchDate(event.date, event.time)}
                </p>
                <p className="text-sm text-white/70">{formatMatchTime(event.time)}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <MapPin className="size-3.5 shrink-0" />
                  {event.venue}, {event.city}
                </p>
              </div>
              <div className="w-fit rounded-2xl bg-black/35 px-5 py-3 ring-1 ring-white/10">
                <p className="text-[10px] uppercase tracking-wide text-white/60">Desde</p>
                <p className="text-2xl font-black text-amber-300">
                  {formatCurrency(lowestPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {showActions && (
        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Entrada digital con QR incluida
          </p>
          <Link
            href={`/eventos/${event.id}`}
            className={cn(
              "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-bold sm:w-auto",
              "btn-gold",
            )}
          >
            Comprar boletos
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </article>
  );
}
