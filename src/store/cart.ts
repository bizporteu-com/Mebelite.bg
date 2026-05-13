"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  qty: number;
};

export type WishItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
};

type CartState = {
  lines: CartLine[];
  wishlist: WishItem[];
  add: (line: CartLine) => void;
  remove: (slug: string, color?: string) => void;
  setQty: (slug: string, color: string | undefined, qty: number) => void;
  clear: () => void;
  toggleWish: (item: WishItem) => void;
  isWished: (slug: string) => boolean;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      wishlist: [],
      add: (line) =>
        set((s) => {
          const idx = s.lines.findIndex((l) => l.slug === line.slug && l.color === line.color);
          if (idx >= 0) {
            const next = [...s.lines];
            next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
            return { lines: next };
          }
          return { lines: [...s.lines, line] };
        }),
      remove: (slug, color) =>
        set((s) => ({ lines: s.lines.filter((l) => !(l.slug === slug && l.color === color)) })),
      setQty: (slug, color, qty) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.slug === slug && l.color === color ? { ...l, qty: Math.max(1, qty) } : l,
          ),
        })),
      clear: () => set({ lines: [] }),
      toggleWish: (item) =>
        set((s) => ({
          wishlist: s.wishlist.find((w) => w.slug === item.slug)
            ? s.wishlist.filter((w) => w.slug !== item.slug)
            : [...s.wishlist, item],
        })),
      isWished: (slug) => get().wishlist.some((w) => w.slug === slug),
      count: () => get().lines.reduce((a, l) => a + l.qty, 0),
      subtotal: () => get().lines.reduce((a, l) => a + l.qty * l.price, 0),
    }),
    { name: "mebelite-cart", version: 2 },
  ),
);
