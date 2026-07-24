export type SeatStatus = "available" | "occupied" | "selected";

export type VenueSeat = {
  id: string;
  label: string;
  row: number;
  number: number;
  status: SeatStatus;
};

export type VenueSection = {
  id: string;
  tierId: string;
  name: string;
  shortName: string;
  tierLabel: string;
  color: string;
  hoverColor: string;
  mapPath: string;
  labelX: number;
  labelY: number;
  seats: VenueSeat[];
};

function buildSeatGrid(
  sectionId: string,
  rows: number,
  cols: number,
  occupied: string[] = [],
  aisleAfter?: number,
): VenueSeat[] {
  const seats: VenueSeat[] = [];

  for (let row = 1; row <= rows; row += 1) {
    for (let col = 1; col <= cols; col += 1) {
      const id = `${sectionId}-R${row}-S${col}`;
      seats.push({
        id,
        label: `F${row}-${col}`,
        row,
        number: col,
        status: occupied.includes(id) ? "occupied" : "available",
      });
    }
  }

  return seats;
}

/** Layout ilustrativo del Auditorio del Pueblo para voleibol (vista cenital). */
export const venueSections: VenueSection[] = [
  {
    id: "pref-centro",
    tierId: "preferente",
    name: "Preferente Centro",
    shortName: "PREF C",
    tierLabel: "Preferente",
    color: "#2563EB",
    hoverColor: "#3B82F6",
    labelX: 240,
    labelY: 78,
    mapPath:
      "M96 52 L384 52 Q400 52 400 68 L400 108 Q400 118 390 118 L90 118 Q80 118 80 108 L80 68 Q80 52 96 52 Z",
    seats: buildSeatGrid(
      "pref-centro",
      5,
      14,
      ["pref-centro-R2-S5", "pref-centro-R3-S8", "pref-centro-R4-S11"],
      7,
    ),
  },
  {
    id: "vip-izq",
    tierId: "vip",
    name: "VIP Cancha Izquierda",
    shortName: "VIP I",
    tierLabel: "VIP",
    color: "#CA8A04",
    hoverColor: "#EAB308",
    labelX: 72,
    labelY: 168,
    mapPath:
      "M36 118 Q36 108 46 108 L108 108 L108 198 Q108 208 98 208 L46 208 Q36 208 36 198 Z",
    seats: buildSeatGrid("vip-izq", 4, 5, ["vip-izq-R1-S2", "vip-izq-R2-S4"]),
  },
  {
    id: "vip-der",
    tierId: "vip",
    name: "VIP Cancha Derecha",
    shortName: "VIP D",
    tierLabel: "VIP",
    color: "#CA8A04",
    hoverColor: "#EAB308",
    labelX: 408,
    labelY: 168,
    mapPath:
      "M444 118 Q444 108 434 108 L372 108 L372 198 Q372 208 382 208 L434 208 Q444 208 444 198 Z",
    seats: buildSeatGrid("vip-der", 4, 5, ["vip-der-R1-S3", "vip-der-R3-S1"]),
  },
  {
    id: "pref-lateral",
    tierId: "preferente",
    name: "Preferente Lateral Izq.",
    shortName: "PREF I",
    tierLabel: "Preferente",
    color: "#1D4ED8",
    hoverColor: "#2563EB",
    labelX: 72,
    labelY: 248,
    mapPath:
      "M36 218 L112 218 L112 288 Q112 298 102 298 L46 298 Q36 298 36 288 Z",
    seats: buildSeatGrid("pref-lateral", 4, 4, ["pref-lateral-R1-S1"]),
  },
  {
    id: "pref-lateral-der",
    tierId: "preferente",
    name: "Preferente Lateral Der.",
    shortName: "PREF D",
    tierLabel: "Preferente",
    color: "#1D4ED8",
    hoverColor: "#2563EB",
    labelX: 408,
    labelY: 248,
    mapPath:
      "M444 218 L368 218 L368 288 Q368 298 378 298 L434 298 Q444 298 444 288 Z",
    seats: buildSeatGrid("pref-lateral-der", 4, 4, ["pref-lateral-der-R2-S2"]),
  },
  {
    id: "general-fondo",
    tierId: "general",
    name: "General Fondo",
    shortName: "GRAL",
    tierLabel: "General",
    color: "#DC2626",
    hoverColor: "#EF4444",
    labelX: 240,
    labelY: 318,
    mapPath:
      "M72 248 L408 248 Q424 248 424 264 L424 324 Q424 334 414 334 L66 334 Q56 334 56 324 L56 264 Q56 248 72 248 Z",
    seats: buildSeatGrid(
      "general-fondo",
      6,
      16,
      ["general-fondo-R1-S6", "general-fondo-R3-S9", "general-fondo-R5-S12"],
      8,
    ),
  },
  {
    id: "general-lateral",
    tierId: "general",
    name: "General Lateral Izq.",
    shortName: "G IZQ",
    tierLabel: "General",
    color: "#B91C1C",
    hoverColor: "#DC2626",
    labelX: 52,
    labelY: 318,
    mapPath: "M36 248 L88 248 L88 334 L36 334 Z",
    seats: buildSeatGrid("general-lateral", 5, 4),
  },
  {
    id: "general-lateral-der",
    tierId: "general",
    name: "General Lateral Der.",
    shortName: "G DER",
    tierLabel: "General",
    color: "#B91C1C",
    hoverColor: "#DC2626",
    labelX: 428,
    labelY: 318,
    mapPath: "M444 248 L392 248 L392 334 L444 334 Z",
    seats: buildSeatGrid("general-lateral-der", 5, 4),
  },
];

export function getSectionById(sectionId: string) {
  return venueSections.find((section) => section.id === sectionId);
}

export function getTierForSeats(seatIds: string[]) {
  if (seatIds.length === 0) return null;

  const firstSeat = seatIds[0];
  const section = venueSections.find((item) =>
    item.seats.some((seat) => seat.id === firstSeat),
  );

  return section?.tierId ?? null;
}

export function getSeatLabels(seatIds: string[]) {
  return seatIds.map((seatId) => {
    const section = venueSections.find((item) =>
      item.seats.some((seat) => seat.id === seatId),
    );
    const seat = section?.seats.find((item) => item.id === seatId);
    return seat ? `${section?.shortName} · ${seat.label}` : seatId;
  });
}

export function getSeatPricing(seatIds: string[], tierPrices: Record<string, number>) {
  return seatIds.reduce((total, seatId) => {
    const section = venueSections.find((item) =>
      item.seats.some((seat) => seat.id === seatId),
    );
    const tierId = section?.tierId ?? "general";
    return total + (tierPrices[tierId] ?? 0);
  }, 0);
}

export function getAisleAfter(sectionId: string) {
  if (sectionId === "pref-centro" || sectionId === "general-fondo") return 8;
  return null;
}
