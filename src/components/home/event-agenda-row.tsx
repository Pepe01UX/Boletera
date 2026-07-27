import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import {
  CATEGORY_META,
  formatCurrency,
  getEventDateParts,
  getLowestPrice,
  type MatchEvent,
} from "@/lib/events";

export function EventAgendaRow({ event }: { event: MatchEvent }) {
  const { weekday, day, month, time } = getEventDateParts(event);
  const lowestPrice = getLowestPrice(event);

  return (
    <Link href={`/eventos/${event.id}`} className="agenda-row">
      <span className="agenda-row__thumb">
        <CoverImage
          src={event.coverImage}
          alt=""
          sizes="70px"
        />
      </span>

      <span className="agenda-row__body">
        <span className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300/85 t-num">
            {weekday} {day} {month}
          </span>
          <span className="text-[10px] font-semibold text-white/35">{time}</span>
        </span>
        <span className="agenda-row__title mt-1 block">{event.title}</span>
        <span className="agenda-row__meta">
          <span className="truncate">{event.venue}</span>
          <span className="text-white/25">·</span>
          <span className="shrink-0">{CATEGORY_META[event.category].short}</span>
        </span>
      </span>

      <span className="agenda-row__price">
        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
          Desde
        </span>
        <span className="mt-0.5 block text-[14px] font-extrabold text-white t-num">
          {formatCurrency(lowestPrice)}
        </span>
      </span>

      <ChevronRight className="size-4 shrink-0 text-white/25" />
    </Link>
  );
}
