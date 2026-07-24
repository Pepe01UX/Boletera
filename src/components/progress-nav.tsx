"use client";

import { usePathname } from "next/navigation";

const steps = [
  { label: "Partido", paths: ["/", "/eventos"] },
  { label: "Asientos", paths: ["/asientos"] },
  { label: "Pago", paths: ["/checkout"] },
  { label: "Entrada", paths: ["/boletos"] },
];

export function ProgressNav() {
  const pathname = usePathname();
  const hideProgress =
    pathname.startsWith("/boletos") ||
    pathname.startsWith("/mis-boletos") ||
    pathname === "/";

  if (hideProgress) {
    return null;
  }

  return (
    <nav aria-label="Progreso de compra" className="progress-nav no-print">
      {steps.map((step, index) => {
        const active = step.paths.some((path) =>
          path === "/"
            ? pathname === "/"
            : pathname.includes(path.replace("/", "")),
        );

        return (
          <div key={step.label} className="flex items-center gap-2">
            <div className={`progress-pill ${active ? "progress-pill--active" : ""}`}>
              {index + 1}. {step.label}
            </div>
            {index < steps.length - 1 && <div className="h-px w-5 bg-white/10" />}
          </div>
        );
      })}
    </nav>
  );
}
