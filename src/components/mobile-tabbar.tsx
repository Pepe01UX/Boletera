"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Inicio", icon: Home, isActive: (path: string) => path === "/" },
  {
    href: "/buscar",
    label: "Buscar",
    icon: Search,
    isActive: (path: string) => path.startsWith("/buscar"),
  },
  {
    href: "/mis-boletos",
    label: "Mis Compras",
    icon: Ticket,
    isActive: (path: string) =>
      path.startsWith("/mis-boletos") || path.startsWith("/boletos"),
  },
] as const;

export function MobileTabbar() {
  const pathname = usePathname();

  return (
    <nav className="mobile-tabbar no-print">
      <div className="mobile-tabbar__inner">
        {tabs.map(({ href, label, icon: Icon, isActive }) => {
          const active = isActive(pathname);

          return (
            <Link
              key={href}
              href={href}
              className={cn("mobile-tab", active && "mobile-tab--active")}
            >
              <span className={cn("mobile-tab__icon", active && "mobile-tab__icon--active")}>
                <Icon className="size-5" />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
