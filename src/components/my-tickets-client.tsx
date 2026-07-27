"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { formatMatchDate, formatMatchTime } from "@/lib/events";
import { getSavedTickets, type SavedTicket } from "@/lib/saved-tickets";

export function MyTicketsClient() {
  const [tickets, setTickets] = useState<SavedTicket[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTickets(getSavedTickets());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="panel rounded-2xl border border-white/10 p-8 text-center text-sm text-muted-foreground">
        Cargando tus boletos...
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <Card className="panel border-white/10 py-0 shadow-none">
        <CardHeader className="px-5 pt-8 text-center sm:px-6">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-amber-400/10 ring-1 ring-amber-400/20">
            <Ticket className="size-8 text-amber-300" />
          </div>
          <CardTitle className="text-xl">Aún no tienes boletos</CardTitle>
          <CardDescription className="mx-auto max-w-sm">
            Cuando completes una compra, tus entradas digitales aparecerán aquí con acceso
            rápido a tu QR.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center px-5 pb-8 sm:px-6">
          <Button asChild className="btn-gold">
            <Link href="/">Ver partidos</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="page-stack">
      <div className="section-heading">
        <h1>Mis compras</h1>
        <p>Tus entradas compradas en esta sesión. Toca una para ver el QR.</p>
      </div>

      <div className="flex flex-col gap-4">
        {tickets.map((ticket) => (
          <Link key={ticket.id} href={ticket.href} className="block">
            <Card className="panel border-white/10 py-0 shadow-none transition-colors hover:border-amber-400/30">
              <CardContent className="space-y-3 px-5 py-5 sm:px-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold text-foreground">{ticket.eventTitle}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ticket.buyerName} · {ticket.seatLabels.join(", ")}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                    Activo
                  </span>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0 text-amber-300" />
                    {formatMatchDate(ticket.date, ticket.time)} · {formatMatchTime(ticket.time)}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-amber-300" />
                    {ticket.venue}, {ticket.city}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
