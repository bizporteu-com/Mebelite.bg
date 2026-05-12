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
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white">
      <div className="border-b border-ink-100 bg-ink-50">
        <div className="container-x flex h-8 items-center justify-between text-xs text-ink-500">
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

        <Link href="/" className="flex items-center" aria-label="Mebeli.bg">
          <span className="text-lg font-semibold uppercase tracking-[0.18em] text-ink-900">
            Mebeli<span className="mx-1.5 inline-block h-4 w-px translate-y-0.5 bg-ink-300 align-middle" />Bg
          </span>
        </Link>

        <form action="/search" className="ml-2 hidden flex-1 md:flex" role="search">
          <div className="flex w-full items-center rounded border border-ink-200 bg-white pl-3 focus-within:border-ink-900">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              name="q"
              placeholder="Какво търсите?"
              className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-ink-400"
            />
            <button className="btn-primary m-0.5 rounded px-4 py-1.5 text-xs">Търсене</button>
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-1 text-ink-700">
          <Link href="/account" className="hidden rounded p-2 hover:bg-ink-50 md:flex" aria-label="Профил">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="relative rounded p-2 hover:bg-ink-50" aria-label="Желани">
            <Heart className="h-5 w-5" />
            {mounted && wishCount > 0 && <Badge>{wishCount}</Badge>}
          </Link>
          <Link href="/cart" className="relative rounded p-2 hover:bg-ink-50" aria-label="Количка">
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
                  "flex items-center gap-1 px-3 py-1.5 hover:underline",
                  open === item.label && "underline",
                )}
              >
                {item.label}
                {"columns" in item && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {"columns" in item && open === item.label && (
                <div className="absolute left-0 top-full z-50 grid w-[640px] grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-6 rounded border border-ink-100 bg-white p-6 shadow-hover"
                  style={{ ['--cols' as never]: item.columns.length }}
                >
                  {item.columns.map((col) => (
                    <div key={col.title}>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                        {col.title}
                      </div>
                      <ul className="space-y-1.5">
                        {col.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="block text-sm text-ink-700 hover:text-ink-900 hover:underline">
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
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sale px-1 text-[10px] font-semibold text-white">
      {children}
    </span>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <div className="container-x flex h-16 items-center justify-between">
        <span className="text-xl font-semibold">Меню</span>
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
