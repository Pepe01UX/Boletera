import Image from "next/image";
import Link from "next/link";
import { CORONELAS_LOGO } from "@/lib/branding";
import { MobileTabbar } from "@/components/mobile-tabbar";
import { ProgressNav } from "@/components/progress-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-header no-print">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 ring-1 ring-white/20">
            <Image
              src={CORONELAS_LOGO}
              alt="Logo Coronelas de Durango"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              sizes="40px"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300/90">
              Coronelas de Durango
            </p>
            <p className="truncate text-sm font-bold text-foreground sm:text-base">
              Boletera Oficial
            </p>
          </div>
        </Link>
      </header>

      <ProgressNav />
      <main className="app-main">{children}</main>
      <MobileTabbar />
    </div>
  );
}
