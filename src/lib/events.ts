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
  opponentLogo: string;
  opponentShort: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  isHome: boolean;
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
    opponentLogo:
      "https://nyc3.digitaloceanspaces.com/gg-bucket/production/lvpmx/clubs/TAPATIAS/logo.webp",
    opponentShort: "TAP",
    subtitle: "Liga de Voleibol Profesional Femenil · Jornada 3",
    date: "2026-04-12",
    time: "20:00",
    venue: "Auditorio del Pueblo",
    city: "Durango, Dgo.",
    isHome: true,
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
    date: "2026-04-26",
    time: "19:30",
    venue: "Auditorio del Pueblo",
    city: "Durango, Dgo.",
    isHome: true,
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
    opponentLogo:
      "https://nyc3.digitaloceanspaces.com/gg-bucket/production/lvpmx/clubs/GUERRERAS/logo.webp",
    opponentShort: "GUE",
    subtitle: "Liga de Voleibol Profesional Femenil · Jornada 7",
    date: "2026-05-10",
    time: "18:00",
    venue: "Auditorio del Pueblo",
    city: "Durango, Dgo.",
    isHome: true,
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
];

export function getMatchById(id: string) {
  return matches.find((match) => match.id === id);
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
