"use client";

import Link from "next/link";
import { Heart, Box, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { SmartImg } from "./SmartImg";

export function ProductCard({ product }: { product: Product }) {
  const { eur, bgn } = formatPrice(product.price);
  const old = product.oldPrice ? formatPrice(product.oldPrice) : null;
  const wished = useCart((s) => s.isWished(product.slug));
  const toggleWish = useCart((s) => s.toggleWish);

  return (
    <article className="group flex flex-col overflow-hidden rounded border border-ink-100 bg-white transition-shadow hover:shadow-hover">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <SmartImg
            src={product.images[0]}
            alt={product.name}
            fallbackKind="product"
            fallbackKey={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-3"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.badge === "sale" && product.oldPrice && (
              <span className="rounded bg-sale px-1.5 py-0.5 text-[11px] font-semibold text-white">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
            {product.badge === "new" && (
              <span className="rounded bg-ink-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">Нов</span>
            )}
            {product.badge === "bestseller" && (
              <span className="rounded bg-ink-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">ТОП</span>
            )}
          </div>
          {product.model?.glb && (
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-white/95 px-1.5 py-0.5 text-[11px] font-medium text-ink-900 shadow-sm">
              <Box className="h-3 w-3" /> 3D / AR
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWish({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
              });
            }}
            aria-label="Запази"
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm hover:bg-ink-50"
          >
            <Heart className={cn("h-4 w-4", wished ? "fill-sale stroke-sale" : "stroke-ink-700")} />
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm text-ink-900 hover:underline">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
          <span className="text-amber-500">★</span>
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-semibold text-ink-900">{eur}</span>
          {old && <span className="text-xs text-ink-400 line-through">{old.eur}</span>}
        </div>
        <div className="text-xs text-ink-500">{bgn}</div>
        <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
          <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> ~{product.deliveryDays} р.д.</span>
          {product.colors.length > 0 && (
            <div className="flex gap-0.5">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-3 w-3 rounded-full border border-ink-200"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
