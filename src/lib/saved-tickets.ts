export type SavedTicket = {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  seatLabels: string[];
  buyerName: string;
  href: string;
  purchasedAt: string;
};

const STORAGE_KEY = "coronelas-saved-tickets";

export function getSavedTickets(): SavedTicket[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as SavedTicket[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTicket(ticket: SavedTicket) {
  if (typeof window === "undefined") {
    return;
  }

  const existing = getSavedTickets().filter((item) => item.id !== ticket.id);
  const next = [ticket, ...existing].slice(0, 20);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function buildTicketHref({
  eventId,
  seatIds,
  buyerName,
  buyerEmail,
}: {
  eventId: string;
  seatIds: string[];
  buyerName: string;
  buyerEmail: string;
}) {
  const params = new URLSearchParams({
    seats: seatIds.join(","),
    name: buyerName,
    email: buyerEmail,
  });

  return `/boletos/${eventId}?${params.toString()}`;
}
