"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductScroller({
  title,
  href,
  products,
}: {
  title: string;
  href: string;
  products: Product[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  function scroll(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  }
  if (products.length === 0) return null;
  return (
    <section className="container-x mt-12">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="section-h">{title}</h2>
        <Link href={href} className="text-xs text-ink-500 hover:text-ink-900">
          Пълен преглед →
        </Link>
      </div>
      <div className="relative">
        <div
          ref={ref}
          className="scroll-row -mx-2 flex gap-3 overflow-x-auto px-2 pb-2"
        >
          {products.map((p) => (
            <div key={p.slug} className="w-[calc(50%-6px)] shrink-0 md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <ArrowBtn dir="left" onClick={() => scroll(-1)} />
        <ArrowBtn dir="right" onClick={() => scroll(1)} />
      </div>
    </section>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Назад" : "Напред"}
      className={`absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white shadow-card hover:bg-ink-50 md:flex ${
        dir === "left" ? "-left-3" : "-right-3"
      }`}
    >
      {dir === "left" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
