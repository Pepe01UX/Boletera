"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket } from "lucide-react";

export function MobileTabbar() {
  const pathname = usePathname();

  return (
    <nav className="mobile-tabbar no-print">
      <div className="mobile-tabbar__inner">
        <Link href="/" className={`mobile-tab ${pathname === "/" ? "mobile-tab--active" : ""}`}>
          <Home className="size-5" />
          Partidos
        </Link>
        <Link
          href="/mis-boletos"
          className={`mobile-tab ${
            pathname.startsWith("/mis-boletos") || pathname.startsWith("/boletos")
              ? "mobile-tab--active"
              : ""
          }`}
        >
          <Ticket className="size-5" />
          Mis boletos
        </Link>
      </div>
    </nav>
  );
}
