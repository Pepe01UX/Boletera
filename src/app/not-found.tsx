import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
        404
      </p>
      <h1 className="text-3xl font-bold">Partido no encontrado</h1>
      <p className="max-w-md text-muted-foreground">
        No encontramos el evento que buscas. Regresa al inicio para ver los partidos
        disponibles de Las Coronelas.
      </p>
      <Button asChild className="btn-gold">
        <Link href="/">Ir al inicio</Link>
      </Button>
    </div>
  );
}
