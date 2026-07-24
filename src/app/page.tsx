import Image from "next/image";
import { EventPoster } from "@/components/event-poster";
import { matches } from "@/lib/events";
import { CORONELAS_LOGO } from "@/lib/branding";

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-banner">
        <div className="hero-banner__glow" />
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300/90">
              Boletera oficial
            </p>
            <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
              Vive el voleibol profesional de{" "}
              <span className="text-gradient-gold">Las Coronelas</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Elige tu partido, selecciona tus asientos en el mapa del auditorio
              y entra con tu boleto digital.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-sm">
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5">
              <Image
                src={CORONELAS_LOGO}
                alt="Logo Coronelas de Durango"
                width={52}
                height={52}
                className="h-[52px] w-[52px] object-contain"
                sizes="52px"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Coronelas de Durango</p>
              <p className="text-xs text-white/65">Campeonas invictas LVP</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-stack">
        <div className="section-heading">
          <h2>Próximos partidos en casa</h2>
          <p>Posters oficiales del encuentro. Toca uno para iniciar tu compra.</p>
        </div>

        <div className="poster-feed">
          {matches.map((event) => (
            <EventPoster key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
