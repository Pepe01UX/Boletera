"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Evita lazy-load y el flash al entrar al viewport. */
  eager?: boolean;
};

export function CoverImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  eager = true,
}: CoverImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={eager ? "eager" : "lazy"}
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover transition-opacity duration-200 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
