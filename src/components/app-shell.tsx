"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscoverAmbientBg } from "@/components/discover-ambient-bg";
import { CORONELAS_LOGO } from "@/lib/branding";
import { MobileTabbar } from "@/components/mobile-tabbar";
import { ProgressNav } from "@/components/progress-nav";
import { cn } from "@/lib/utils";

const discoverRoutes = ["/", "/buscar", "/mis-boletos"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDiscover = discoverRoutes.includes(pathname);

  return (
    <>
      {isDiscover && <DiscoverAmbientBg />}
      <div className="app-grain no-print" aria-hidden />
      <div
        className={cn(
          "app-shell relative z-10",
          isDiscover && "app-shell--discover",
        )}
      >
        {!isDiscover && (
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
        )}

        {!isDiscover && <ProgressNav />}

        <main className="app-main">{children}</main>
        <MobileTabbar />
      </div>
    </>
  );
}
