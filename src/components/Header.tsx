"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Phone, Search, ShoppingBag, User, ChevronDown, Menu, X } from "lucide-react";
import { NAV } from "@/data/catalog";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());
  const wishCount = useCart((s) => s.wishlist.length);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-canvas/95 backdrop-blur">
      <div className="border-b border-ink-100/60 bg-canvas-soft">
        <div className="container-x flex h-9 items-center justify-between text-xs text-ink-500">
          <span>Безплатна доставка над 500 лв · 365 дни връщане</span>
          <div className="hidden items-center gap-4 md:flex">
            <a href="tel:+359896709455" className="flex items-center gap-1.5 hover:text-ink-900">
              <Phone className="h-3.5 w-3.5" /> +359 89 670 9455
            </a>
            <Link href="/help" className="hover:text-ink-900">Помощ</Link>
            <Link href="/stores" className="hover:text-ink-900">Магазини</Link>
          </div>
        </div>
      </div>

      <div className="container-x flex h-16 items-center gap-6">
        <button className="md:hidden" onClick={() => setMobile(true)} aria-label="Меню">
          <Menu className="h-6 w-6" />
        </button>

        <Link href="/" className="flex items-center">
          <span className="font-display text-2xl tracking-tight">Mebelite<span className="text-brand-accent">.</span>bg</span>
        </Link>

        <form action="/search" className="ml-2 hidden flex-1 md:flex" role="search">
          <div className="flex w-full items-center rounded-full border border-ink-100 bg-white pl-4 focus-within:border-ink-900">
            <Search className="h-4 w-4 text-ink-300" />
            <input
              name="q"
              placeholder="Търси диван, гардероб, маса..."
              className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-ink-300"
            />
            <button className="btn-primary m-1 px-4 py-1.5 text-xs">Търсене</button>
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-1 text-ink-700">
          <Link href="/account" className="hidden rounded-full p-2 hover:bg-canvas-soft md:flex" aria-label="Профил">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="relative rounded-full p-2 hover:bg-canvas-soft" aria-label="Желани">
            <Heart className="h-5 w-5" />
            {mounted && wishCount > 0 && <Badge>{wishCount}</Badge>}
          </Link>
          <Link href="/cart" className="relative rounded-full p-2 hover:bg-canvas-soft" aria-label="Количка">
            <ShoppingBag className="h-5 w-5" />
            {mounted && count > 0 && <Badge>{count}</Badge>}
          </Link>
        </nav>
      </div>

      <div className="hidden border-t border-ink-100 md:block">
        <div className="container-x flex h-11 items-center gap-1 text-sm">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => "columns" in item && setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-canvas-soft",
                  open === item.label && "bg-canvas-soft",
                )}
              >
                {item.label}
                {"columns" in item && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {"columns" in item && open === item.label && (
                <div className="absolute left-0 top-full z-50 grid w-[640px] grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-6 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card"
                  style={{ ['--cols' as never]: item.columns.length }}
                >
                  {item.columns.map((col) => (
                    <div key={col.title}>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-300">
                        {col.title}
                      </div>
                      <ul className="space-y-1.5">
                        {col.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="block text-sm text-ink-700 hover:text-ink-900">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {mobile && <MobileMenu onClose={() => setMobile(false)} />}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] font-semibold text-white">
      {children}
    </span>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-canvas md:hidden">
      <div className="container-x flex h-16 items-center justify-between">
        <span className="font-display text-xl">Меню</span>
        <button onClick={onClose} aria-label="Затвори"><X className="h-6 w-6" /></button>
      </div>
      <nav className="container-x flex flex-col divide-y divide-ink-100">
        {NAV.map((item) => (
          <Link key={item.label} href={item.href} className="py-4 text-lg" onClick={onClose}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
