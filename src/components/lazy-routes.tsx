import dynamic from "next/dynamic";

function PageSkeleton({ label }: { label: string }) {
  return (
    <div className="page-stack">
      <div className="panel animate-pulse rounded-2xl border border-white/10 p-8 text-center text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export const CheckoutClient = dynamic(
  () => import("@/components/checkout-client").then((mod) => mod.CheckoutClient),
  {
    loading: () => <PageSkeleton label="Cargando checkout..." />,
  },
);

export const TicketWalletClient = dynamic(
  () => import("@/components/ticket-wallet-client").then((mod) => mod.TicketWalletClient),
  {
    loading: () => <PageSkeleton label="Cargando tu boleto..." />,
  },
);

export const SeatSelectionClient = dynamic(
  () => import("@/components/seat-selection-client").then((mod) => mod.SeatSelectionClient),
  {
    loading: () => <PageSkeleton label="Cargando mapa de asientos..." />,
  },
);
