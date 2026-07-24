"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TeamBadge({
  src,
  alt,
  fallback,
  compact = false,
}: {
  src: string;
  alt: string;
  fallback: string;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-white shadow-xl shadow-black/30 ring-1 ring-white/40",
        compact ? "size-14 p-1.5 rounded-2xl" : "size-[84px] p-2 sm:size-24",
      )}
    >
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          width={compact ? 44 : 80}
          height={compact ? 44 : 80}
          className={cn(
            "object-contain",
            compact ? "h-10 w-10 p-0.5" : "h-[4.5rem] w-[4.5rem] p-1.5 sm:h-20 sm:w-20",
          )}
          sizes={compact ? "44px" : "80px"}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-red-800 font-black text-amber-200",
            compact ? "rounded-xl text-xs" : "rounded-[18px] text-lg",
          )}
        >
          {fallback}
        </div>
      )}
    </div>
  );
}
