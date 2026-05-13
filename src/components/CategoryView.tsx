"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type Sort = "popular" | "price-asc" | "price-desc" | "newest";

export function CategoryView({
  products,
  title,
  showSubcategoryFilter = false,
  categoryNames = {},
}: {
  products: Product[];
  title: string;
  showSubcategoryFilter?: boolean;
  categoryNames?: Record<string, string>;
}) {
  const [sort, setSort] = useState<Sort>("popular");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const colors = useMemo(() => {
    const m = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => m.set(c.name, c.hex)));
    return Array.from(m.entries());
  }, [products]);

  const brands = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => {
      if (!p.brand) return;
      m.set(p.brand, (m.get(p.brand) ?? 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [products]);

  const subcategories = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [products]);

  const priceMax = useMemo(() => Math.max(...products.map((p) => p.price), 100), [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (maxPrice != null) list = list.filter((p) => p.price <= maxPrice);
    if (activeColors.length) list = list.filter((p) => p.colors.some((c) => activeColors.includes(c.name)));
    if (activeBrands.length) list = list.filter((p) => p.brand && activeBrands.includes(p.brand));
    if (activeCats.length) list = list.filter((p) => activeCats.includes(p.category));
    if (onSaleOnly) list = list.filter((p) => p.oldPrice);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "newest": list.sort((a, b) => (a.badge === "new" ? -1 : 1)); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [products, sort, maxPrice, activeColors, activeBrands, activeCats, onSaleOnly]);

  function toggle<T>(list: T[], v: T, set: (x: T[]) => void) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  const hasActiveFilters =
    maxPrice != null || activeColors.length || activeBrands.length || activeCats.length || onSaleOnly;

  return (
    <div className="container-x mt-6">
      <div className="mb-6 flex items-end justify-between gap-3">
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        <span className="text-sm text-ink-500">{filtered.length} продукта</span>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <button className="btn-outline lg:hidden" onClick={() => setDrawer(true)}>
          <SlidersHorizontal className="h-4 w-4" /> Филтри
        </button>
        <label className="ml-auto inline-flex items-center gap-2 text-sm">
          Подреди:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-ink-100 bg-white px-3 py-1.5 text-sm outline-none"
          >
            <option value="popular">Най-популярни</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="newest">Най-нови</option>
          </select>
        </label>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className={`${drawer ? "fixed inset-0 z-50 overflow-auto bg-white p-6" : "hidden lg:block"}`}>
          {drawer && (
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <span className="text-lg font-medium">Филтри</span>
              <button onClick={() => setDrawer(false)}><X className="h-5 w-5" /></button>
            </div>
          )}

          <FilterGroup title="Цена">
            <div className="flex items-center justify-between text-xs text-ink-500">
              <span>0 €</span>
              <span>{maxPrice ?? priceMax} €</span>
            </div>
            <input
              type="range"
              min={0}
              max={priceMax}
              step={10}
              value={maxPrice ?? priceMax}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-ink-900"
            />
          </FilterGroup>

          {showSubcategoryFilter && subcategories.length > 1 && (
            <FilterGroup title="Категория">
              <ul className="space-y-1.5">
                {subcategories.map(([slug, count]) => (
                  <li key={slug}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={activeCats.includes(slug)}
                        onChange={() => toggle(activeCats, slug, setActiveCats)}
                        className="accent-ink-900"
                      />
                      <span>{categoryNames[slug] ?? slug}</span>
                      <span className="ml-auto text-xs text-ink-400">{count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </FilterGroup>
          )}

          {brands.length > 0 && (
            <FilterGroup title="Марка">
              <ul className="space-y-1.5">
                {brands.map(([brand, count]) => (
                  <li key={brand}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={activeBrands.includes(brand)}
                        onChange={() => toggle(activeBrands, brand, setActiveBrands)}
                        className="accent-ink-900"
                      />
                      <span>{brand}</span>
                      <span className="ml-auto text-xs text-ink-400">{count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </FilterGroup>
          )}

          {colors.length > 0 && (
            <FilterGroup title="Цвят">
              <div className="grid grid-cols-2 gap-2">
                {colors.map(([name, hex]) => (
                  <button
                    key={name}
                    onClick={() => toggle(activeColors, name, setActiveColors)}
                    className={`flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${
                      activeColors.includes(name) ? "border-ink-900 bg-ink-50" : "border-ink-100"
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full border border-ink-100" style={{ backgroundColor: hex }} />
                    {name}
                  </button>
                ))}
              </div>
            </FilterGroup>
          )}

          <FilterGroup title="Промоции">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="accent-ink-900"
              />
              Само намалени
            </label>
          </FilterGroup>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setMaxPrice(null);
                setActiveColors([]);
                setActiveBrands([]);
                setActiveCats([]);
                setOnSaleOnly(false);
              }}
              className="mt-2 text-sm text-ink-500 underline hover:text-ink-900"
            >
              Изчисти филтрите
            </button>
          )}
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-ink-100 p-12 text-center text-ink-500">
              Няма продукти, отговарящи на филтрите.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 border-b border-ink-100 pb-6 last:border-b-0">
      <div className="mb-3 text-sm font-semibold">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
