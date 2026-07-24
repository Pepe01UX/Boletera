"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, Ticket } from "lucide-react";
import { formatCurrency, type MatchEvent } from "@/lib/events";
import { getTierForSeats, venueSections } from "@/lib/venue-map";

const StadiumSeatMap = dynamic(
  () =>
    import("@/components/stadium-seat-map").then((mod) => mod.StadiumSeatMap),
  {
    loading: () => (
      <Card className="panel border-white/10 py-8 shadow-none">
        <CardContent className="text-center text-sm text-muted-foreground">
          Cargando mapa del auditorio...
        </CardContent>
      </Card>
    ),
    ssr: false,
  },
);

export function SeatSelectionClient({ event }: { event: MatchEvent }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(2);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const pricing = useMemo(() => {
    const tierPrices = Object.fromEntries(
      event.tiers.map((tier) => [tier.id, tier.price]),
    );

    const subtotal = selectedSeatIds.reduce((total, seatId) => {
      const section = venueSections.find((item) =>
        item.seats.some((seat) => seat.id === seatId),
      );
      const tierId = section?.tierId ?? "general";
      return total + (tierPrices[tierId] ?? 0);
    }, 0);

    const serviceFee = subtotal > 0 ? Math.round(subtotal * 0.08) : 0;

    return { subtotal, serviceFee, total: subtotal + serviceFee };
  }, [event.tiers, selectedSeatIds]);

  const toggleSeat = (seatId: string) => {
    setSelectedSeatIds((current) => {
      if (current.includes(seatId)) {
        return current.filter((id) => id !== seatId);
      }
      if (current.length >= quantity) return current;

      const incomingTier = getTierForSeats([seatId]);
      const currentTier = getTierForSeats(current);
      if (currentTier && incomingTier && currentTier !== incomingTier) {
        return current;
      }
      return [...current, seatId];
    });
  };

  const canContinue =
    selectedSeatIds.length === quantity && selectedSeatIds.length > 0;

  return (
    <div className="page-stack">
      <div className="section-heading">
        <Badge className="w-fit border-amber-400/30 bg-amber-400/15 text-amber-200">
          Paso 2 de 4
        </Badge>
        <h1>Elige tus asientos</h1>
        <p>
          {event.title} · {event.venue}
        </p>
      </div>

      <Card className="panel border-white/10 py-0 shadow-none">
        <CardHeader className="px-5 pt-5 sm:px-6">
          <CardTitle>Cantidad de boletos</CardTitle>
          <CardDescription>
            Define cuántos asientos necesitas y selecciónalos en el mapa.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5 sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => {
                const next = Math.max(1, quantity - 1);
                setQuantity(next);
                setSelectedSeatIds((current) => current.slice(0, next));
              }}
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-12 text-center text-lg font-bold">{quantity}</span>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setQuantity(Math.min(8, quantity + 1))}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <StadiumSeatMap
        event={event}
        selectedSeatIds={selectedSeatIds}
        maxSeats={quantity}
        onSeatToggle={toggleSeat}
      />

      <div className="checkout-bar no-print">
        <Card className="hero-glow border-amber-400/20 bg-[#12182b]/95 py-0 shadow-none">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total estimado
              </p>
              <p className="text-2xl font-bold text-gradient-gold">
                {formatCurrency(pricing.total)}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedSeatIds.length} de {quantity} asientos seleccionados
              </p>
            </div>
            <Button
              size="lg"
              disabled={!canContinue}
              className="btn-gold w-full sm:w-auto"
              onClick={() =>
                router.push(
                  `/eventos/${event.id}/checkout?seats=${selectedSeatIds.join(",")}`,
                )
              }
            >
              Continuar al pago
              <Ticket className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
