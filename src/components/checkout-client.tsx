"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Mail, Phone, User } from "lucide-react";
import {
  formatCurrency,
  formatMatchDate,
  formatMatchTime,
  type MatchEvent,
  type TicketTier,
} from "@/lib/events";
import { buildTicketHref, saveTicket } from "@/lib/saved-tickets";

export function CheckoutClient({
  event,
  selectedTier,
  quantity,
  seatIds,
  seatLabels,
  subtotal,
}: {
  event: MatchEvent;
  selectedTier: TicketTier;
  quantity: number;
  seatIds: string[];
  seatLabels: string[];
  subtotal: number;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const serviceFee = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee;

  const handlePay = () => {
    setLoading(true);
    const buyerName = name || "Aficionado Coronelas";
    const buyerEmail = email || "fan@coronelas.mx";
    const href = buildTicketHref({
      eventId: event.id,
      seatIds,
      buyerName,
      buyerEmail,
    });
    const orderId = `CRN-${event.id.slice(-4).toUpperCase()}-${Date.now().toString().slice(-6)}`;

    saveTicket({
      id: orderId,
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      city: event.city,
      seatLabels,
      buyerName,
      href,
      purchasedAt: new Date().toISOString(),
    });

    window.setTimeout(() => {
      router.push(href);
    }, 600);
  };

  return (
    <div className="page-stack">
      <div className="section-heading">
        <Badge className="w-fit border-amber-400/30 bg-amber-400/15 text-amber-200">
          Paso 3 de 4
        </Badge>
        <h1>Confirma y paga</h1>
        <p>Estás a un paso de tu entrada para {event.title}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="panel border-white/10 py-0 shadow-none lg:col-span-3">
          <CardHeader className="px-5 pt-5 sm:px-6">
            <CardTitle>Datos del comprador</CardTitle>
            <CardDescription>
              Recibirás tus boletos digitales en el correo indicado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-5 pb-5 sm:px-6 sm:pb-6">
            <Field label="Nombre completo" icon={<User className="size-4" />}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. María González"
              />
            </Field>
            <Field label="Correo electrónico" icon={<Mail className="size-4" />}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
              />
            </Field>
            <Field label="Teléfono" icon={<Phone className="size-4" />}>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="618 000 0000"
              />
            </Field>
            <Separator />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <CreditCard className="size-4 text-amber-300" />
                Pago simulado
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Demo visual: al confirmar generaremos tu boleto digital con QR listo
                para imprimir o presentar en el acceso.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="panel border-white/10 py-0 shadow-none lg:col-span-2">
          <CardHeader className="px-5 pt-5 sm:px-6">
            <CardTitle>Resumen de compra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-5 text-sm sm:px-6 sm:pb-6">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="font-semibold">{event.title}</p>
              <p className="mt-2 text-muted-foreground">
                {formatMatchDate(event.date, event.time)}
              </p>
              <p className="text-muted-foreground">{formatMatchTime(event.time)}</p>
              <p className="mt-2 text-muted-foreground">{event.venue}</p>
            </div>
            <Row label="Zona" value={selectedTier.name} />
            <Row label="Asientos" value={seatLabels.join(", ")} />
            <Row label="Cantidad" value={`${quantity} boletos`} />
            <Row label="Subtotal" value={formatCurrency(subtotal)} />
            <Row label="Servicio" value={formatCurrency(serviceFee)} />
            <Separator />
            <Row label="Total" value={formatCurrency(total)} emphasis />
            <Button
              size="lg"
              disabled={loading}
              className="btn-gold w-full"
              onClick={handlePay}
            >
              {loading ? "Procesando..." : "Confirmar compra"}
            </Button>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              Compra segura · Boletera oficial Coronelas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {icon}
        {label}
      </Label>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className={emphasis ? "font-semibold" : "text-muted-foreground"}>
        {label}
      </span>
      <span
        className={`text-right ${emphasis ? "text-lg font-bold text-gradient-gold" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
