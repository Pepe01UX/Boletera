export type EventCategory = "deportes" | "conciertos" | "recitales" | "festivales";

export type CategoryFilter = "explorar" | "deportes" | "conciertos" | "para-ti";

export type TicketTier = {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  color: string;
};

export type MatchEvent = {
  id: string;
  title: string;
  opponent: string;
  /** Algunos escudos de la liga no son públicos; sin logo se usa un monograma. */
  opponentLogo?: string;
  opponentShort: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  isHome: boolean;
  category: EventCategory;
  coverImage: string;
  featured?: boolean;
  badge?: string;
  posterClassName: string;
  cardTheme: {
    footerBg: string;
    titleColor: string;
    featuredTitleColor: string;
  };
  tiers: TicketTier[];
};

export const matches: MatchEvent[] = [
  {
    id: "coronelas-vs-tapatias-01",
    title: "Coronelas vs Tapatías",
    opponent: "Tapatías de Guadalajara",
    opponentShort: "TAP",
    subtitle: "Liga de Voleibol Profesional Femenil · Jornada 3",
    date: "2026-08-14",
    time: "20:00",
    venue: "Auditorio del Pueblo",
    city: "Durango, Dgo.",
    isHome: true,
    category: "deportes",
    coverImage:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&crop=faces,entropy&w=1200&h=1200&q=85",
    featured: true,
    badge: "En casa",
    posterClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.45),transparent_40%),linear-gradient(145deg,#0f1f4d_0%,#1e1033_45%,#4a1020_100%)]",
    cardTheme: {
      footerBg: "bg-[#0a2e1f]",
      titleColor: "text-[#6ee7b7]",
      featuredTitleColor: "text-emerald-300",
    },
    tiers: [
      {
        id: "vip",
        name: "VIP Cancha",
        price: 450,
        description: "Asiento premium cerca de la cancha + acceso preferente.",
        available: 48,
        color: "bg-amber-400",
      },
      {
        id: "preferente",
        name: "Preferente",
        price: 280,
        description: "Vista central elevada, ideal para seguir cada rally.",
        available: 120,
        color: "bg-blue-500",
      },
      {
        id: "general",
        name: "General",
        price: 150,
        description: "Acceso general con excelente ambiente de afición.",
        available: 340,
        color: "bg-red-500",
      },
    ],
  },
  {
    id: "coronelas-vs-gigantes-02",
    title: "Coronelas vs Gigantes",
    opponent: "Gigantes de Aguascalientes",
    opponentLogo:
      "https://nyc3.digitaloceanspaces.com/gg-bucket/production/lvpmx/clubs/GIGANTES/shlmdcbg9kmuk26d1owd2xml.webp",
    opponentShort: "GIG",
    subtitle: "Liga de Voleibol Profesional Femenil · Jornada 5",
    date: "2026-08-29",
    time: "19:30",
    venue: "Auditorio del Pueblo",
    city: "Durango, Dgo.",
    isHome: true,
    category: "deportes",
    coverImage:
      "https://images.unsplash.com/photo-1731221180372-57e35146bf20?auto=format&fit=crop&crop=faces,entropy&w=1200&h=1200&q=85",
    badge: "Campeonas invictas",
    posterClassName:
      "bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.25),transparent_42%),linear-gradient(145deg,#111827_0%,#172554_50%,#451a03_100%)]",
    cardTheme: {
      footerBg: "bg-[#1a1040]",
      titleColor: "text-violet-300",
      featuredTitleColor: "text-violet-300",
    },
    tiers: [
      {
        id: "vip",
        name: "VIP Cancha",
        price: 480,
        description: "Experiencia premium con meet & greet post-partido.",
        available: 32,
        color: "bg-amber-400",
      },
      {
        id: "preferente",
        name: "Preferente",
        price: 300,
        description: "Zona media con vista completa de la red.",
        available: 96,
        color: "bg-blue-500",
      },
      {
        id: "general",
        name: "General",
        price: 160,
        description: "Entrada accesible para toda la familia.",
        available: 280,
        color: "bg-red-500",
      },
    ],
  },
  {
    id: "coronelas-vs-guerreras-03",
    title: "Coronelas vs Guerreras",
    opponent: "Guerreras de Puebla",
    opponentShort: "GUE",
    subtitle: "Liga de Voleibol Profesional Femenil · Jornada 7",
    date: "2026-09-12",
    time: "18:00",
    venue: "Auditorio del Pueblo",
    city: "Durango, Dgo.",
    isHome: true,
    category: "deportes",
    coverImage:
      "https://images.unsplash.com/photo-1567781830902-685fb3401f1d?auto=format&fit=crop&crop=faces,entropy&w=1200&h=1200&q=85",
    featured: true,
    badge: "Preventa",
    posterClassName:
      "bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.22),transparent_45%),linear-gradient(145deg,#1e1b4b_0%,#312e81_48%,#7f1d1d_100%)]",
    cardTheme: {
      footerBg: "bg-[#2a1035]",
      titleColor: "text-fuchsia-300",
      featuredTitleColor: "text-cyan-300",
    },
    tiers: [
      {
        id: "vip",
        name: "VIP Cancha",
        price: 420,
        description: "Asientos numerados en zona VIP.",
        available: 40,
        color: "bg-amber-400",
      },
      {
        id: "preferente",
        name: "Preferente",
        price: 260,
        description: "Gran visibilidad del marcador y banquillos.",
        available: 110,
        color: "bg-blue-500",
      },
      {
        id: "general",
        name: "General",
        price: 140,
        description: "Vive la energía de Las Coronelas en casa.",
        available: 360,
        color: "bg-red-500",
      },
    ],
  },
  {
    id: "noche-piano-clasico-04",
    title: "Noche de Piano Clásico",
    opponent: "Orquesta Filarmónica",
    opponentLogo:
      "https://images.unsplash.com/photo-1507334608139-c6cbaabf6621?auto=format&fit=crop&w=200&q=80",
    opponentShort: "OFC",
    subtitle: "Temporada de conciertos · Durango Cultural",
    date: "2026-09-19",
    time: "20:30",
    venue: "Teatro Ricardo Castro",
    city: "Durango, Dgo.",
    isHome: false,
    category: "conciertos",
    coverImage:
      "https://images.unsplash.com/photo-1507334608139-c6cbaabf6621?auto=format&fit=crop&crop=faces,entropy&w=1200&h=1200&q=85",
    featured: true,
    badge: "Nuevo",
    posterClassName:
      "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.35),transparent_45%),linear-gradient(145deg,#2e1065_0%,#1e1b4b_55%,#0f172a_100%)]",
    cardTheme: {
      footerBg: "bg-[#1e1045]",
      titleColor: "text-purple-300",
      featuredTitleColor: "text-purple-300",
    },
    tiers: [
      {
        id: "vip",
        name: "Platea VIP",
        price: 890,
        description: "Fila preferente y acceso al foyer premium.",
        available: 60,
        color: "bg-amber-400",
      },
      {
        id: "preferente",
        name: "Platea",
        price: 550,
        description: "Vista central del escenario.",
        available: 180,
        color: "bg-purple-500",
      },
      {
        id: "general",
        name: "Galería",
        price: 320,
        description: "Acceso general al teatro.",
        available: 240,
        color: "bg-blue-500",
      },
    ],
  },
  {
    id: "festival-durango-vivo-05",
    title: "Festival Durango Vivo",
    opponent: "Varios artistas",
    opponentLogo:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=200&q=80",
    opponentShort: "FDV",
    subtitle: "Música en vivo · 2 días de festival",
    date: "2026-10-10",
    time: "17:00",
    venue: "Parque Guadiana",
    city: "Durango, Dgo.",
    isHome: false,
    category: "festivales",
    coverImage:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&crop=faces,entropy&w=1200&h=1200&q=85",
    badge: "Hot",
    posterClassName:
      "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.3),transparent_50%),linear-gradient(145deg,#431407_0%,#7c2d12_50%,#1c1917_100%)]",
    cardTheme: {
      footerBg: "bg-[#3b1406]",
      titleColor: "text-orange-300",
      featuredTitleColor: "text-orange-300",
    },
    tiers: [
      {
        id: "vip",
        name: "VIP Experience",
        price: 1200,
        description: "Zona preferente + bar incluido.",
        available: 120,
        color: "bg-amber-400",
      },
      {
        id: "preferente",
        name: "General Plus",
        price: 650,
        description: "Acceso a ambas fechas del festival.",
        available: 800,
        color: "bg-orange-500",
      },
      {
        id: "general",
        name: "General",
        price: 420,
        description: "Entrada por día al festival.",
        available: 2000,
        color: "bg-red-500",
      },
    ],
  },
  {
    id: "recital-danza-contemporanea-06",
    title: "Recital de Danza Contemporánea",
    opponent: "Compañía En Movimiento",
    opponentLogo:
      "https://images.unsplash.com/photo-1591162689269-a3fcdab967e3?auto=format&fit=crop&w=200&q=80",
    opponentShort: "CEM",
    subtitle: "Artes escénicas · Temporada primavera",
    date: "2026-09-26",
    time: "19:00",
    venue: "Centro Cultural Durango",
    city: "Durango, Dgo.",
    isHome: false,
    category: "recitales",
    coverImage:
      "https://images.unsplash.com/photo-1591162689269-a3fcdab967e3?auto=format&fit=crop&crop=faces,entropy&w=1200&h=1200&q=85",
    badge: "Temporada",
    posterClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.25),transparent_42%),linear-gradient(145deg,#0c4a6e_0%,#312e81_55%,#0f172a_100%)]",
    cardTheme: {
      footerBg: "bg-[#0c2340]",
      titleColor: "text-sky-300",
      featuredTitleColor: "text-sky-300",
    },
    tiers: [
      {
        id: "vip",
        name: "Preferente",
        price: 520,
        description: "Asientos centrales frente al escenario.",
        available: 80,
        color: "bg-amber-400",
      },
      {
        id: "preferente",
        name: "Butaca",
        price: 380,
        description: "Vista lateral elevada.",
        available: 150,
        color: "bg-sky-500",
      },
      {
        id: "general",
        name: "General",
        price: 220,
        description: "Acceso general al recital.",
        available: 300,
        color: "bg-blue-500",
      },
    ],
  },
];

export const CATEGORY_META: Record<
  EventCategory,
  { label: string; short: string }
> = {
  deportes: { label: "Deportes", short: "Voleibol" },
  conciertos: { label: "Conciertos", short: "Música" },
  recitales: { label: "Recitales", short: "Escena" },
  festivales: { label: "Festivales", short: "Festival" },
};

export function getMatchById(id: string) {
  return matches.find((match) => match.id === id);
}

export function getFeaturedEvents() {
  return matches.filter((event) => event.featured);
}

function toTimestamp(event: MatchEvent) {
  return new Date(`${event.date}T${event.time}:00`).getTime();
}

/** Orden cronológico estable (no depende de `Date.now`, evita desajustes de hidratación). */
export function sortByDate(events: MatchEvent[]) {
  return [...events].sort((a, b) => toTimestamp(a) - toTimestamp(b));
}

export function getUpcomingEvents(limit?: number) {
  const sorted = sortByDate(matches);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getNextEvent() {
  return sortByDate(matches)[0];
}

export function getEventTimestamp(event: MatchEvent) {
  return toTimestamp(event);
}

export type VenueSummary = {
  name: string;
  city: string;
  count: number;
};

export function getVenues(): VenueSummary[] {
  const map = new Map<string, VenueSummary>();

  for (const event of sortByDate(matches)) {
    const existing = map.get(event.venue);
    if (existing) {
      existing.count += 1;
      continue;
    }

    map.set(event.venue, { name: event.venue, city: event.city, count: 1 });
  }

  return [...map.values()];
}

export function filterEventsByCategory(filter: CategoryFilter) {
  switch (filter) {
    case "deportes":
      return matches.filter((event) => event.category === "deportes");
    case "conciertos":
      return matches.filter(
        (event) => event.category === "conciertos" || event.category === "festivales",
      );
    case "para-ti":
      return matches.filter((event) => event.featured);
    default:
      return matches;
  }
}

export function getLowestPrice(event: MatchEvent) {
  return Math.min(...event.tiers.map((tier) => tier.price));
}

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("es-MX", {
  hour: "numeric",
  minute: "2-digit",
});

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function formatMatchDate(date: string, time: string) {
  return dateFormatter.format(new Date(`${date}T${time}:00`));
}

export function formatMatchTime(time: string) {
  const [hours, minutes] = time.split(":");
  const parsed = new Date();
  parsed.setHours(Number(hours), Number(minutes));
  return timeFormatter.format(parsed);
}

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

const shortDateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
});

export function formatShortDate(date: string) {
  const formatted = shortDateFormatter.format(new Date(`${date}T12:00:00`));
  const [day, month] = formatted.split(" ");
  return `${day} ${month?.replace(".", "") ?? ""}`.trim();
}

export function getDateBadgeParts(date: string) {
  const formatted = shortDateFormatter.format(new Date(`${date}T12:00:00`));
  const [day, monthRaw] = formatted.split(" ");
  return {
    day: day ?? "",
    month: monthRaw?.replace(".", "") ?? "",
  };
}

export function formatEventLocation(event: MatchEvent) {
  return `${event.venue}, ${event.city}`;
}

const weekdayFormatter = new Intl.DateTimeFormat("es-MX", { weekday: "short" });

/** Partes sueltas de la fecha para composiciones tipográficas (hero, filas, chips). */
export function getEventDateParts(event: MatchEvent) {
  const parsed = new Date(`${event.date}T${event.time}:00`);
  const { day, month } = getDateBadgeParts(event.date);

  return {
    weekday: weekdayFormatter
      .format(parsed)
      .replace(".", "")
      .toUpperCase(),
    day,
    month: month.toUpperCase(),
    time: formatMatchTime(event.time),
  };
}
