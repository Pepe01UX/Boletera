import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/lazy-routes";
import { getMatchById } from "@/lib/events";
import { getSeatLabels, getSeatPricing, getTierForSeats } from "@/lib/venue-map";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ seats?: string }>;
}) {
  const { id } = await params;
  const { seats } = await searchParams;
  const event = getMatchById(id);

  if (!event) {
    notFound();
  }

  const seatIds = seats?.split(",").filter(Boolean) ?? [];

  if (seatIds.length === 0) {
    notFound();
  }

  const tierId = getTierForSeats(seatIds) ?? event.tiers[0].id;
  const selectedTier =
    event.tiers.find((item) => item.id === tierId) ?? event.tiers[0];
  const tierPrices = Object.fromEntries(event.tiers.map((tier) => [tier.id, tier.price]));
  const subtotal = getSeatPricing(seatIds, tierPrices);

  return (
    <CheckoutClient
      event={event}
      selectedTier={selectedTier}
      quantity={seatIds.length}
      seatIds={seatIds}
      seatLabels={getSeatLabels(seatIds)}
      subtotal={subtotal}
    />
  );
}
