import { notFound } from "next/navigation";
import { EventDetail } from "@/components/event-detail";
import { getMatchById } from "@/lib/events";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getMatchById(id);

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
