import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, Truck, RotateCcw, ShieldCheck, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-100 bg-canvas-soft">
      <div className="container-x py-10">
        <div className="grid grid-cols-2 gap-6 border-b border-ink-100 pb-10 md:grid-cols-4">
          <Trust icon={<Truck className="h-6 w-6" />} title="Безплатна доставка" sub="Над 500 лв" />
          <Trust icon={<RotateCcw className="h-6 w-6" />} title="365 дни връщане" sub="Без въпроси" />
          <Trust icon={<ShieldCheck className="h-6 w-6" />} title="10 г. гаранция" sub="На рамата" />
          <Trust icon={<Leaf className="h-6 w-6" />} title="1 продукт = 1 дърво" sub="Залесяваме България" />
        </div>

        <div className="grid gap-8 py-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="font-display text-2xl">Mebelite<span className="text-brand-accent">.</span>bg</div>
            <p className="mt-3 max-w-sm text-sm text-ink-500">
              Производител и онлайн магазин за качествени мебели на достъпна цена. Доставка в цяла България.
            </p>
            <div className="mt-5 flex gap-2 text-ink-500">
              <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Youtube className="h-4 w-4" />} />
              <SocialLink href="#" icon={<MessageCircle className="h-4 w-4" />} />
            </div>
          </div>
          <Col title="Купувачи">
            <FLink href="/help/payments">Плащане</FLink>
            <FLink href="/help/delivery">Доставка</FLink>
            <FLink href="/help/tracking">Проследяване</FLink>
            <FLink href="/help/returns">Връщания</FLink>
            <FLink href="/help/faq">Често задавани въпроси</FLink>
          </Col>
          <Col title="Компания">
            <FLink href="/about">За нас</FLink>
            <FLink href="/stores">Магазини</FLink>
            <FLink href="/careers">Кариери</FLink>
            <FLink href="/blog">Блог</FLink>
            <FLink href="/contact">Контакти</FLink>
          </Col>
          <Col title="Условия">
            <FLink href="/legal/terms">Общи условия</FLink>
            <FLink href="/legal/privacy">Поверителност</FLink>
            <FLink href="/legal/cookies">Бисквитки</FLink>
            <FLink href="/legal/ods">Онлайн спорове</FLink>
          </Col>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-500 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Mebelite.bg · Всички права запазени</span>
          <div className="flex items-center gap-2">
            <span className="rounded border border-ink-100 bg-white px-2 py-1">VISA</span>
            <span className="rounded border border-ink-100 bg-white px-2 py-1">MasterCard</span>
            <span className="rounded border border-ink-100 bg-white px-2 py-1">Apple Pay</span>
            <span className="rounded border border-ink-100 bg-white px-2 py-1">Наложен платеж</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Trust({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-brand-accent">{icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-ink-500">{sub}</div>
      </div>
    </div>
  );
}
function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold">{title}</div>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}
function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <li><Link href={href} className="text-sm text-ink-500 hover:text-ink-900">{children}</Link></li>;
}
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-100 bg-white hover:border-ink-900 hover:text-ink-900">
      {icon}
    </a>
  );
}
