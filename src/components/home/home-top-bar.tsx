import Image from "next/image";
import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { CORONELAS_LOGO } from "@/lib/branding";

export function HomeTopBar() {
  return (
    <header className="home-topbar">
      <div className="home-topbar__inner">
        <Link href="/" className="home-topbar__brand" aria-label="Inicio">
          <span className="home-topbar__logo">
            <Image
              src={CORONELAS_LOGO}
              alt="Coronelas de Durango"
            width={36}
            height={36}
              className="size-9 object-contain"
              sizes="32px"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block t-eyebrow">Boletera oficial</span>
            <span className="block text-[16px] font-extrabold leading-tight text-white text-display">
              Las Coronelas
            </span>
          </span>
        </Link>

        <div className="home-topbar__actions">
          <Link href="/buscar" className="home-icon-button" aria-label="Buscar eventos">
            <Search className="size-[18px]" />
          </Link>
          <button type="button" className="home-icon-button" aria-label="Mi perfil">
            <UserRound className="size-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
