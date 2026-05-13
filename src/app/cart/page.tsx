"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { SmartImg } from "@/components/SmartImg";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());

  if (!mounted) return <div className="container-x mt-10 min-h-[40vh]" />;

  if (lines.length === 0) {
    return (
      <div className="container-x mt-16 flex min-h-[40vh] flex-col items-center justify-center text-center">
        <ShoppingBag className="h-10 w-10 text-ink-300" />
        <h1 className="mt-4 text-2xl">Количката ти е празна</h1>
        <p className="mt-2 max-w-md text-sm text-ink-500">
          Разгледай категориите и добави първия си продукт. Не забравяй да го пробваш в 3D!
        </p>
        <Link href="/" className="btn-primary mt-6">Към магазина</Link>
      </div>
    );
  }

  const shipping = subtotal > 500 ? 0 : 19; // BGN
  const total = subtotal + shipping;
  const s = formatPrice(subtotal);
  const t = formatPrice(total);
  const sh = formatPrice(shipping);

  return (
    <div className="container-x mt-10">
      <h1 className="text-3xl md:text-4xl">Количка</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-ink-100">
          {lines.map((l) => {
            const lp = formatPrice(l.price * l.qty);
            return (
              <div key={`${l.slug}-${l.color}`} className="flex gap-4 py-6">
                <Link href={`/product/${l.slug}`} className="block h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-ink-100 bg-white md:h-28 md:w-28">
                  <SmartImg
                    src={l.image}
                    alt={l.name}
                    fallbackKind="product"
                    fallbackKey={l.name}
                    className="h-full w-full object-contain p-1.5"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <Link href={`/product/${l.slug}`} className="font-medium hover:underline">{l.name}</Link>
                    <div className="text-right">
                      <div className="font-semibold">{lp.eur}</div>
                      <div className="text-xs text-ink-500">{lp.bgn}</div>
                    </div>
                  </div>
                  {l.color && <div className="text-xs text-ink-500">Цвят: {l.color}</div>}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-ink-100">
                      <button onClick={() => setQty(l.slug, l.color, l.qty - 1)} className="flex h-9 w-9 items-center justify-center" aria-label="Намали">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm">{l.qty}</span>
                      <button onClick={() => setQty(l.slug, l.color, l.qty + 1)} className="flex h-9 w-9 items-center justify-center" aria-label="Увеличи">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button onClick={() => remove(l.slug, l.color)} className="flex items-center gap-1 text-xs text-ink-500 hover:text-ink-900">
                      <Trash2 className="h-3.5 w-3.5" /> Премахни
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit rounded-lg border border-ink-100 p-6">
          <h2 className="text-lg font-semibold">Поръчка</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-ink-500">Междинна сума</dt><dd>{s.eur}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">Доставка</dt><dd>{shipping === 0 ? "Безплатна" : sh.bgn}</dd></div>
            <div className="mt-3 flex justify-between border-t border-ink-100 pt-3 text-base font-semibold"><dt>Общо</dt><dd>{t.eur}</dd></div>
            <div className="text-right text-xs text-ink-500">{t.bgn}</div>
          </dl>
          <button className="btn-primary mt-6 w-full">Към плащане</button>
          <Link href="/" className="mt-3 block text-center text-sm text-ink-500 hover:text-ink-900">Продължи пазаруването</Link>
        </aside>
      </div>
    </div>
  );
}
