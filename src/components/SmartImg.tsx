"use client";

import { useState } from "react";
import { placeholderFor } from "@/lib/placeholders";

type Kind = "product" | "category" | "style" | "hero" | "tile";

export function SmartImg({
  src,
  alt,
  fallbackKind = "product",
  fallbackKey,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackKind?: Kind;
  fallbackKey?: string;
}) {
  const [errored, setErrored] = useState(false);
  const finalSrc = errored ? placeholderFor(fallbackKind, fallbackKey ?? alt ?? "") : src;
  return (
    <img
      {...rest}
      src={finalSrc as string}
      alt={alt ?? ""}
      onError={() => setErrored(true)}
    />
  );
}
