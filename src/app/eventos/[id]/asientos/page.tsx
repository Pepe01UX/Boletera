import { notFound } from "next/navigation";
import { SeatSelectionClient } from "@/components/lazy-routes";
import { getMatchById } from "@/lib/events";

export default async function SeatSelectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getMatchById(id);

  if (!event) {
    notFound();
  }

  return <SeatSelectionClient event={event} />;
}
