"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Minus, Plus, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/store/cart";

export function ProductActions({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const wished = useCart((s) => s.wishlist.includes(product.slug));
  const toggleWish = useCart((s) => s.toggleWish);

  const { eur, bgn } = formatPrice(product.price);
  const oldP = product.oldPrice ? formatPrice(product.oldPrice) : null;

  function handleAdd() {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: color?.name,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-ink-500">{product.category.replace(/-/g, " ")}</div>
        <h1 className="mt-1 text-3xl md:text-4xl">{product.name}</h1>
        <div className="mt-2 flex items-center gap-3 text-sm text-ink-500">
          <span>★ {product.rating}</span>
          <span>({product.reviews} оценки)</span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-semibold">{eur}</div>
        {oldP && <div className="text-lg text-ink-500 line-through">{oldP.eur}</div>}
        <div className="text-sm text-ink-500">/ {bgn}</div>
      </div>

      <div>
        <div className="mb-2 text-sm font-medium">
          Цвят: <span className="text-ink-500">{color?.name}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors",
                color?.name === c.name ? "border-ink-900" : "border-transparent hover:border-ink-100",
              )}
              title={c.name}
              aria-label={c.name}
            >
              <span className="h-7 w-7 rounded-full border border-ink-100" style={{ backgroundColor: c.hex }} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-ink-100">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center text-ink-700 hover:text-ink-900" aria-label="Намали">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="flex h-10 w-10 items-center justify-center text-ink-700 hover:text-ink-900" aria-label="Увеличи">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button onClick={handleAdd} className="btn-primary flex-1">
          {added ? <><Check className="h-4 w-4" /> Добавено</> : <><ShoppingBag className="h-4 w-4" /> Добави в количката</>}
        </button>
        <button
          onClick={() => toggleWish(product.slug)}
          aria-label="Запази"
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full border",
            wished ? "border-brand-accent text-brand-accent" : "border-ink-100 text-ink-700 hover:border-ink-900",
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-brand-accent")} />
        </button>
      </div>

      <div className="grid gap-3 rounded-xl2 bg-canvas-soft p-4 text-sm">
        <Row icon={<Truck className="h-4 w-4" />} title={`Доставка ~${product.deliveryDays} работни дни`} sub="Безплатно над 500 лв" />
        <Row icon={<RotateCcw className="h-4 w-4" />} title="365 дни връщане" sub="Без въпроси" />
        <Row icon={<ShieldCheck className="h-4 w-4" />} title="10 години гаранция" sub="На рамата" />
      </div>
    </div>
  );
}

function Row({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-brand-accent">{icon}</span>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-ink-500">{sub}</div>
      </div>
    </div>
  );
}
