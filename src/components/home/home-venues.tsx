import { Building2 } from "lucide-react";
import { getVenues } from "@/lib/events";

export function HomeVenues() {
  const venues = getVenues();

  return (
    <div className="home-rail no-scrollbar">
      {venues.map((venue) => (
        <article key={venue.name} className="venue-card">
          <span className="venue-card__icon">
            <Building2 className="size-4 text-amber-300/85" />
          </span>
          <h3 className="text-[13.5px] font-bold leading-tight text-white text-display">
            {venue.name}
          </h3>
          <p className="mt-1 text-[11px] text-white/45">{venue.city}</p>
          <p className="mt-3 text-[11px] font-semibold text-amber-300/85 t-num">
            {venue.count} {venue.count === 1 ? "evento" : "eventos"}
          </p>
        </article>
      ))}
    </div>
  );
}
