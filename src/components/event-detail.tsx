import { EventPoster } from "@/components/event-poster";
import Link from "next/link";
import { ArrowRight, MapPin, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, getLowestPrice, type MatchEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventDetail({ event }: { event: MatchEvent }) {
  const lowestPrice = getLowestPrice(event);

  return (
    <div className="page-stack">
      <EventPoster event={event} showActions={false} />

      <Card className="panel border-white/10 py-0 shadow-none">
        <CardHeader className="px-5 pt-5 sm:px-6">
          <CardTitle>Zonas y precios</CardTitle>
          <CardDescription>Todos los boletos incluyen acceso digital con QR.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-5 pb-5 sm:px-6">
          {event.tiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 size-3 rounded-full ${tier.color}`} />
                <div>
                  <p className="font-semibold text-foreground">{tier.name}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
              </div>
              <p className="text-xl font-bold text-gradient-gold">
                {formatCurrency(tier.price)}
              </p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Desde</p>
            <p className="text-2xl font-bold text-gradient-gold">
              {formatCurrency(lowestPrice)}
            </p>
          </div>
          <Link
            href={`/eventos/${event.id}/asientos`}
            className={cn(
              "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-bold sm:w-auto",
              "btn-gold",
            )}
          >
            Elegir asientos
            <ArrowRight className="size-4" />
          </Link>
        </CardFooter>
      </Card>

      <Card className="panel border-white/10 bg-white/5 py-0 shadow-none">
        <CardContent className="flex items-start gap-4 px-5 py-5 sm:px-6">
          <div className="rounded-xl bg-blue-900/40 p-3">
            <Shield className="size-6 text-amber-300" />
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Compra segura oficial</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Boletos verificados por el club. Selecciona tus asientos en el mapa del
              Auditorio del Pueblo y entra con tu QR o boleto impreso.
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {event.venue}, {event.city}
            </p>
            <Badge className="border-amber-400/30 bg-amber-400/15 text-amber-200">
              {event.badge ?? "Partido local"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
