"use client";

import Link from "next/link";
import { Heart, Box } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { SmartImg } from "./SmartImg";

export function ProductCard({ product }: { product: Product }) {
  const { eur, bgn } = formatPrice(product.price);
  const wished = useCart((s) => s.wishlist.includes(product.slug));
  const toggleWish = useCart((s) => s.toggleWish);

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 bg-canvas-mute">
          <SmartImg
            src={product.images[0]}
            alt={product.name}
            fallbackKind="product"
            fallbackKey={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge === "sale" && product.oldPrice && (
              <span className="rounded-full bg-brand-accent px-2 py-0.5 text-[11px] font-medium text-white">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
            {product.badge === "new" && (
              <span className="rounded-full bg-ink-900 px-2 py-0.5 text-[11px] font-medium text-white">Нов</span>
            )}
            {product.badge === "bestseller" && (
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ink-900">Бестселър</span>
            )}
          </div>
          {product.model?.glb && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-medium text-ink-900 shadow-sm">
              <Box className="h-3 w-3" /> 3D / AR
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWish(product.slug);
            }}
            aria-label="Запази"
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-ink-900 hover:text-white"
          >
            <Heart className={cn("h-4 w-4", wished && "fill-brand-accent stroke-brand-accent")} />
          </button>
        </div>

        <div className="mt-3 px-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium leading-tight">{product.name}</h3>
            <div className="text-right">
              <div className="text-sm font-semibold">{eur}</div>
              <div className="text-[11px] text-ink-500">{bgn}</div>
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-ink-500">
            <div className="flex items-center gap-1.5">
              <span>★ {product.rating}</span>
              <span>({product.reviews})</span>
            </div>
            <span>~{product.deliveryDays} р.д.</span>
          </div>
          {product.colors.length > 0 && (
            <div className="mt-2 flex gap-1">
              {product.colors.slice(0, 5).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-3.5 w-3.5 rounded-full border border-ink-100"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
