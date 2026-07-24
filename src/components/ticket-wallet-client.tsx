"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Printer,
  Share2,
} from "lucide-react";
import {
  formatCurrency,
  formatMatchDate,
  formatMatchTime,
  type MatchEvent,
  type TicketTier,
} from "@/lib/events";
import { CORONELAS_LOGO } from "@/lib/branding";

function buildQrUrl(data: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=12&data=${encodeURIComponent(data)}`;
}

export function TicketWalletClient({
  event,
  selectedTier,
  quantity,
  seatIds,
  seatLabels,
  subtotal,
  buyerName,
  buyerEmail,
}: {
  event: MatchEvent;
  selectedTier: TicketTier;
  quantity: number;
  seatIds: string[];
  seatLabels: string[];
  subtotal: number;
  buyerName: string;
  buyerEmail: string;
}) {
  const orderId = useMemo(
    () => `CRN-${event.id.slice(-4).toUpperCase()}-${Date.now().toString().slice(-6)}`,
    [event.id],
  );

  const qrData = `${orderId}|${event.id}|${seatIds.join("-")}|${buyerEmail}`;
  const total = subtotal + Math.round(subtotal * 0.08);

  return (
    <div className="page-stack mx-auto max-w-xl">
      <div className="space-y-3 text-center no-print">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-emerald-300 ring-1 ring-emerald-400/20">
          <CheckCircle2 className="size-4" />
          Compra confirmada
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          ¡Listo, {buyerName.split(" ")[0]}!
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Tu entrada digital ya está disponible para el acceso al recinto.
        </p>
      </div>

      <Card
        id="ticket-print"
        className="ticket-print hero-glow overflow-hidden border-amber-400/20 bg-gradient-to-b from-[#151b31] to-[#0B1020] py-0 shadow-none"
      >
        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-blue-950/80 to-red-950/50 px-5 py-5 sm:px-6">
          <div className="flex w-full items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
                <Image
                  src={CORONELAS_LOGO}
                  alt="Coronelas de Durango"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                  Las Coronelas · Boletera Oficial
                </p>
                <CardTitle className="mt-1 text-xl text-white">{event.title}</CardTitle>
              </div>
            </div>
            <Badge className="border-amber-400/30 bg-amber-400/15 text-amber-200">
              {quantity} {quantity === 1 ? "boleto" : "boletos"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-5 py-5 sm:px-6">
          <div className="mx-auto w-fit rounded-2xl bg-white p-4">
            <Image
              src={buildQrUrl(qrData)}
              alt="Código QR de acceso"
              width={280}
              height={280}
              className="rounded-lg"
              unoptimized
            />
          </div>

          <div className="grid gap-3 text-sm">
            <TicketRow
              icon={<CalendarDays className="size-4 text-amber-300" />}
              label="Fecha"
              value={formatMatchDate(event.date, event.time)}
            />
            <TicketRow
              icon={<Clock3 className="size-4 text-blue-300" />}
              label="Horario"
              value={formatMatchTime(event.time)}
            />
            <TicketRow
              icon={<MapPin className="size-4 text-red-300" />}
              label="Recinto"
              value={`${event.venue}, ${event.city}`}
            />
            <TicketRow
              icon={<MapPin className="size-4 text-emerald-300" />}
              label="Asientos"
              value={seatLabels.join(", ")}
            />
            <TicketRow
              icon={<CheckCircle2 className="size-4 text-amber-300" />}
              label="Zona"
              value={selectedTier.name}
            />
          </div>

          <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Orden</p>
            <p className="font-mono text-lg font-bold">{orderId}</p>
            <p className="mt-1 text-sm text-muted-foreground">{buyerName}</p>
            <p className="text-sm text-muted-foreground">{buyerEmail}</p>
            <p className="mt-2 text-sm font-semibold text-gradient-gold">
              Total pagado: {formatCurrency(total)}
            </p>
          </div>
        </CardContent>

        <CardFooter className="grid gap-3 border-t border-white/10 px-5 py-5 no-print sm:grid-cols-2 sm:px-6">
          <Button variant="secondary" className="w-full">
            <Share2 className="size-4" />
            Compartir
          </Button>
          <Button className="btn-gold w-full" onClick={() => window.print()}>
            <Printer className="size-4" />
            Imprimir
          </Button>
        </CardFooter>
      </Card>

      <Card className="panel border-white/10 bg-white/5 py-0 shadow-none no-print">
        <CardContent className="space-y-3 px-5 py-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
          <Badge className="w-fit border-amber-400/30 bg-amber-400/15 text-amber-200">
            Importante
          </Badge>
          <p>
            Presenta este QR en la entrada del Auditorio del Pueblo. También puedes
            imprimirlo desde el botón superior.
          </p>
        </CardContent>
      </Card>

      <Button asChild variant="secondary" className="no-print w-full">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}

function TicketRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
