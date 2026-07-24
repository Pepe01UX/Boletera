import { notFound } from "next/navigation";
import { TicketWalletClient } from "@/components/lazy-routes";
import { getMatchById } from "@/lib/events";
import { getSeatLabels, getSeatPricing, getTierForSeats } from "@/lib/venue-map";

export default async function TicketWalletPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    seats?: string;
    name?: string;
    email?: string;
  }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const event = getMatchById(id);

  if (!event) {
    notFound();
  }

  const seatIds = query.seats?.split(",").filter(Boolean) ?? [];
  const tierId = getTierForSeats(seatIds) ?? event.tiers[0].id;
  const selectedTier =
    event.tiers.find((item) => item.id === tierId) ?? event.tiers[0];
  const tierPrices = Object.fromEntries(event.tiers.map((tier) => [tier.id, tier.price]));
  const subtotal = getSeatPricing(seatIds, tierPrices);

  return (
    <TicketWalletClient
      event={event}
      selectedTier={selectedTier}
      quantity={seatIds.length || 1}
      seatIds={seatIds}
      seatLabels={getSeatLabels(seatIds)}
      subtotal={subtotal}
      buyerName={query.name ?? "Aficionado Coronelas"}
      buyerEmail={query.email ?? "fan@coronelas.mx"}
    />
  );
}
