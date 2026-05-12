"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/store/cart";
import { PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const wish = useCart((s) => s.wishlist);
  const items = PRODUCTS.filter((p) => wish.includes(p.slug));

  if (!mounted) return <div className="container-x mt-10 min-h-[40vh]" />;

  return (
    <div className="container-x mt-10">
      <h1 className="text-3xl md:text-4xl">Желани</h1>
      {items.length === 0 ? (
        <div className="mt-10 flex min-h-[30vh] flex-col items-center justify-center text-center">
          <Heart className="h-10 w-10 text-ink-300" />
          <p className="mt-4 max-w-md text-ink-500">Все още не си запазил продукти. Натисни иконата на сърце на всеки артикул, за да го добавиш тук.</p>
          <Link href="/" className="btn-primary mt-6">Към продуктите</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  );
}
