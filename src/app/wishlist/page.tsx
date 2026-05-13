"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { SmartImg } from "@/components/SmartImg";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const items = useCart((s) => s.wishlist);
  const toggle = useCart((s) => s.toggleWish);

  if (!mounted) return <div className="container-x mt-10 min-h-[40vh]" />;

  return (
    <div className="container-x mt-10">
      <h1 className="text-3xl md:text-4xl">Желани</h1>
      {items.length === 0 ? (
        <div className="mt-10 flex min-h-[30vh] flex-col items-center justify-center text-center">
          <Heart className="h-10 w-10 text-ink-300" />
          <p className="mt-4 max-w-md text-ink-500">
            Все още не си запазил продукти. Натисни иконата на сърце на всеки артикул, за да го добавиш тук.
          </p>
          <Link href="/" className="btn-primary mt-6">Към продуктите</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => {
            const price = formatPrice(p.price);
            return (
              <article key={p.slug} className="group flex flex-col overflow-hidden rounded border border-ink-100 bg-white">
                <Link href={`/product/${p.slug}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-ink-50">
                    <SmartImg
                      src={p.image}
                      alt={p.name}
                      fallbackKind="product"
                      fallbackKey={p.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-3">
                  <Link href={`/product/${p.slug}`} className="line-clamp-2 text-sm text-ink-900 hover:underline">
                    {p.name}
                  </Link>
                  <div className="mt-1 text-base font-semibold">{price.eur}</div>
                  <div className="text-xs text-ink-500">{price.bgn}</div>
                  <button
                    onClick={() => toggle(p)}
                    className="mt-3 inline-flex items-center gap-1 self-start text-xs text-ink-500 hover:text-sale"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Премахни
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
