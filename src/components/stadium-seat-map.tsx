"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ZoomIn } from "lucide-react";
import {
  getAisleAfter,
  getSectionById,
  type VenueSeat,
  type VenueSection,
  venueSections,
} from "@/lib/venue-map";
import { formatCurrency, type MatchEvent } from "@/lib/events";

type StadiumSeatMapProps = {
  event: MatchEvent;
  selectedSeatIds: string[];
  onSeatToggle: (seatId: string, tierId: string) => void;
  maxSeats: number;
};

export function StadiumSeatMap({
  event,
  selectedSeatIds,
  onSeatToggle,
  maxSeats,
}: StadiumSeatMapProps) {
  const [focusedSectionId, setFocusedSectionId] = useState<string | null>(null);
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const focusedSection = focusedSectionId ? getSectionById(focusedSectionId) : null;

  const tierPrices = useMemo(
    () => Object.fromEntries(event.tiers.map((tier) => [tier.id, tier.price])),
    [event.tiers],
  );

  const tierNames = useMemo(
    () => Object.fromEntries(event.tiers.map((tier) => [tier.id, tier.name])),
    [event.tiers],
  );

  return (
    <Card className="panel overflow-hidden border-white/10 py-0 shadow-none">
      <CardHeader className="space-y-4 px-5 pb-2 pt-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl">
              {focusedSection ? focusedSection.name : "Auditorio del Pueblo"}
            </CardTitle>
            <CardDescription className="mt-1 max-w-xl">
              {focusedSection
                ? "Selecciona tus asientos. Los pasillos centrales facilitan el acceso."
                : "Vista cenital del recinto. Toca una zona para elegir asiento."}
            </CardDescription>
          </div>
          {focusedSection && (
            <Button variant="secondary" size="sm" onClick={() => setFocusedSectionId(null)}>
              <ArrowLeft className="size-4" />
              Mapa general
            </Button>
          )}
        </div>

        {!focusedSection && (
          <div className="flex flex-wrap gap-2">
            {event.tiers.map((tier) => (
              <Badge
                key={tier.id}
                variant="outline"
                className="border-white/15 bg-white/5 text-xs"
              >
                <span className={`mr-1.5 inline-block size-2 rounded-full ${tier.color}`} />
                {tier.name} · {formatCurrency(tier.price)}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4 px-3 pb-5 sm:px-6 sm:pb-6">
        {!focusedSection ? (
          <ArenaOverview
            event={event}
            selectedSeatIds={selectedSeatIds}
            hoveredSectionId={hoveredSectionId}
            tierPrices={tierPrices}
            tierNames={tierNames}
            onHover={setHoveredSectionId}
            onSelect={setFocusedSectionId}
          />
        ) : (
          <SectionSeatPicker
            section={focusedSection}
            price={tierPrices[focusedSection.tierId] ?? 0}
            selectedSeatIds={selectedSeatIds}
            maxSeats={maxSeats}
            onSeatToggle={onSeatToggle}
          />
        )}

        <SelectionSummary
          selectedSeatIds={selectedSeatIds}
          maxSeats={maxSeats}
          tierPrices={tierPrices}
        />
      </CardContent>
    </Card>
  );
}

function ArenaOverview({
  event,
  selectedSeatIds,
  hoveredSectionId,
  tierPrices,
  tierNames,
  onHover,
  onSelect,
}: {
  event: MatchEvent;
  selectedSeatIds: string[];
  hoveredSectionId: string | null;
  tierPrices: Record<string, number>;
  tierNames: Record<string, string>;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const hovered = hoveredSectionId ? getSectionById(hoveredSectionId) : null;

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070b14] p-3 sm:p-5">
        <div className="pointer-events-none absolute inset-x-8 top-3 flex justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>Acceso A</span>
          <span>Auditorio del Pueblo</span>
          <span>Acceso B</span>
        </div>

        <svg
          viewBox="0 0 480 360"
          className="mx-auto mt-4 h-auto w-full max-w-[620px]"
          role="img"
          aria-label="Mapa del auditorio"
        >
          <defs>
            <linearGradient id="arenaFloor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="courtWood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#365314" />
              <stop offset="50%" stopColor="#3f6212" />
              <stop offset="100%" stopColor="#1a2e05" />
            </linearGradient>
            <filter id="sectionGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FBBF24" floodOpacity="0.45" />
            </filter>
          </defs>

          <rect x="8" y="8" width="464" height="344" rx="28" fill="url(#arenaFloor)" />
          <rect x="8" y="8" width="464" height="344" rx="28" fill="none" stroke="#1e293b" strokeWidth="1.5" />

          {venueSections.map((section) => {
            const selectedCount = section.seats.filter((s) =>
              selectedSeatIds.includes(s.id),
            ).length;
            const isHovered = hoveredSectionId === section.id;
            const isActive = selectedCount > 0 || isHovered;

            return (
              <g key={section.id}>
                <path
                  d={section.mapPath}
                  fill={section.color}
                  fillOpacity={isActive ? 0.72 : 0.38}
                  stroke={isActive ? "#FDE68A" : section.color}
                  strokeWidth={isActive ? 2.5 : 1.2}
                  filter={isActive ? "url(#sectionGlow)" : undefined}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => onHover(section.id)}
                  onMouseLeave={() => onHover(null)}
                  onClick={() => onSelect(section.id)}
                />
                <text
                  x={section.labelX}
                  y={section.labelY}
                  textAnchor="middle"
                  fill="#F8FAFC"
                  fontSize="11"
                  fontWeight="700"
                  pointerEvents="none"
                  opacity={0.95}
                >
                  {section.shortName}
                </text>
                {selectedCount > 0 && (
                  <circle
                    cx={section.labelX + 28}
                    cy={section.labelY - 10}
                    r="8"
                    fill="#FBBF24"
                  />
                )}
              </g>
            );
          })}

          {/* Cancha de voleibol */}
          <g>
            <rect
              x="140"
              y="128"
              width="200"
              height="100"
              rx="6"
              fill="url(#courtWood)"
              stroke="#84CC16"
              strokeWidth="2"
            />
            <rect
              x="148"
              y="136"
              width="184"
              height="84"
              rx="4"
              fill="none"
              stroke="#D9F99D"
              strokeWidth="1.5"
              opacity="0.9"
            />
            <line x1="240" y1="136" x2="240" y2="220" stroke="#ECFCCB" strokeWidth="2" opacity="0.95" />
            <line x1="140" y1="178" x2="340" y2="178" stroke="#ECFCCB" strokeWidth="1.5" opacity="0.7" />
            <line x1="190" y1="136" x2="190" y2="220" stroke="#ECFCCB" strokeWidth="1" opacity="0.45" strokeDasharray="4 3" />
            <line x1="290" y1="136" x2="290" y2="220" stroke="#ECFCCB" strokeWidth="1" opacity="0.45" strokeDasharray="4 3" />
            <text x="240" y="183" textAnchor="middle" fill="#ECFCCB" fontSize="13" fontWeight="700">
              CANCHA
            </text>
            <text x="240" y="198" textAnchor="middle" fill="#BEF264" fontSize="9" opacity="0.85">
              {event.title}
            </text>
          </g>

          <text x="240" y="28" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
            FRENTE / RED
          </text>
          <text x="240" y="352" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
            FONDO
          </text>
        </svg>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <ZoomIn className="mt-0.5 size-4 shrink-0 text-amber-300" />
        <div className="min-h-[40px] text-sm">
          {hovered ? (
            <>
              <p className="font-semibold text-foreground">{hovered.name}</p>
              <p className="text-muted-foreground">
                {tierNames[hovered.tierId]} · {formatCurrency(tierPrices[hovered.tierId] ?? 0)} ·{" "}
                Toca para ver asientos
              </p>
            </>
          ) : (
            <p className="text-muted-foreground">
              Pasa el dedo o cursor sobre una zona para ver detalles. Toca para seleccionar asientos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionSeatPicker({
  section,
  price,
  selectedSeatIds,
  maxSeats,
  onSeatToggle,
}: {
  section: VenueSection;
  price: number;
  selectedSeatIds: string[];
  maxSeats: number;
  onSeatToggle: (seatId: string, tierId: string) => void;
}) {
  const rows = Math.max(...section.seats.map((seat) => seat.row));
  const aisleAfter = getAisleAfter(section.id);

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#070b14]">
      <div className="border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-950 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/80">
              {section.tierLabel}
            </p>
            <p className="text-lg font-bold text-white">{section.name}</p>
          </div>
          <Badge className="border-amber-400/30 bg-amber-400/15 text-amber-100">
            {formatCurrency(price)} c/u
          </Badge>
        </div>
      </div>

      {/* Mini cancha de referencia */}
      <div className="flex justify-center border-b border-white/10 bg-[#0a1020] py-4">
        <div className="relative w-full max-w-[220px] px-4">
          <div className="rounded-md border border-lime-500/40 bg-gradient-to-b from-lime-900/80 to-lime-950 px-3 py-2 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-200">
              Cancha
            </p>
          </div>
          <div className="mx-auto mt-2 flex justify-center">
            <div className="h-8 w-0 border-l border-dashed border-slate-500/60" />
          </div>
          <p className="mt-1 text-center text-[10px] text-slate-500">Estás viendo esta zona ↓</p>
        </div>
      </div>

      <div className="overflow-x-auto p-4 sm:p-6">
        <div className="mx-auto w-fit space-y-2">
          {Array.from({ length: rows }, (_, i) => {
            const rowNumber = i + 1;
            const rowSeats = section.seats.filter((seat) => seat.row === rowNumber);

            return (
              <div key={rowNumber} className="flex items-center gap-2">
                <span className="w-7 text-center text-[11px] font-semibold text-slate-500">
                  F{rowNumber}
                </span>
                <div className="flex items-center gap-1.5">
                  {rowSeats.map((seat) => (
                    <span key={seat.id} className="flex items-center gap-1.5">
                      <SeatDot
                        seat={seat}
                        selected={selectedSeatIds.includes(seat.id)}
                        disabled={
                          seat.status === "occupied" ||
                          (selectedSeatIds.length >= maxSeats &&
                            !selectedSeatIds.includes(seat.id))
                        }
                        onPress={() => onSeatToggle(seat.id, section.tierId)}
                      />
                      {aisleAfter === seat.number && (
                        <span className="mx-0.5 inline-block w-4" aria-hidden />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 border-t border-white/10 px-5 py-3 text-[11px] text-slate-400">
        <LegendItem color="#334155" border="#475569" label="Ocupado" />
        <LegendItem color="#1e293b" border="#64748B" label="Disponible" />
        <LegendItem color="#FBBF24" border="#FDE68A" label="Tu selección" />
      </div>
    </div>
  );
}

function SeatDot({
  seat,
  selected,
  disabled,
  onPress,
}: {
  seat: VenueSeat;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const occupied = seat.status === "occupied";

  return (
    <button
      type="button"
      disabled={disabled || occupied}
      onClick={onPress}
      aria-label={`Asiento ${seat.label}`}
      title={seat.label}
      className={`size-7 rounded-full border transition-all sm:size-8 ${
        occupied
          ? "cursor-not-allowed border-slate-600 bg-slate-700"
          : selected
            ? "scale-110 border-amber-200 bg-amber-400 shadow-lg shadow-amber-400/30"
            : "border-slate-500 bg-slate-800 hover:scale-105 hover:border-amber-300/60 hover:bg-slate-700"
      } ${disabled && !occupied && !selected ? "opacity-35" : ""}`}
    />
  );
}

function LegendItem({
  color,
  border,
  label,
}: {
  color: string;
  border: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="size-3 rounded-full border"
        style={{ backgroundColor: color, borderColor: border }}
      />
      {label}
    </div>
  );
}

function SelectionSummary({
  selectedSeatIds,
  maxSeats,
  tierPrices,
}: {
  selectedSeatIds: string[];
  maxSeats: number;
  tierPrices: Record<string, number>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Asientos seleccionados
          </p>
          <p className="text-lg font-bold">
            {selectedSeatIds.length} / {maxSeats}
          </p>
        </div>
        {selectedSeatIds.length > 0 && (
          <Badge className="border-amber-400/30 bg-amber-400/15 text-amber-200">
            {formatCurrency(
              selectedSeatIds.reduce((total, seatId) => {
                const section = venueSections.find((item) =>
                  item.seats.some((seat) => seat.id === seatId),
                );
                return total + (tierPrices[section?.tierId ?? "general"] ?? 0);
              }, 0),
            )}
          </Badge>
        )}
      </div>
    </div>
  );
}
