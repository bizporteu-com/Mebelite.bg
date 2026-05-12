import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, Truck, RotateCcw, ShieldCheck, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 bg-footer text-ink-100">
      <div className="border-b border-white/10 bg-white text-ink-900">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          <Trust icon={<Truck className="h-6 w-6" />} title="Безплатна доставка" sub="Над 500 лв" />
          <Trust icon={<RotateCcw className="h-6 w-6" />} title="365 дни връщане" sub="Без въпроси" />
          <Trust icon={<ShieldCheck className="h-6 w-6" />} title="10 г. гаранция" sub="На рамата" />
          <Trust icon={<Leaf className="h-6 w-6" />} title="1 продукт = 1 дърво" sub="Залесяваме България" />
        </div>
      </div>

      <div className="container-x py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="text-xl font-semibold text-white">Mebelite.bg</div>
            <p className="mt-3 max-w-sm text-sm text-ink-300">
              Производител и онлайн магазин за качествени мебели на достъпна цена. Доставка в цяла България.
            </p>
            <div className="mt-5 flex gap-2">
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

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-300 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Mebelite.bg · Всички права запазени</span>
          <div className="flex items-center gap-2">
            <span className="rounded bg-white/10 px-2 py-1 text-white">VISA</span>
            <span className="rounded bg-white/10 px-2 py-1 text-white">MasterCard</span>
            <span className="rounded bg-white/10 px-2 py-1 text-white">Apple Pay</span>
            <span className="rounded bg-white/10 px-2 py-1 text-white">Наложен платеж</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Trust({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-brand">{icon}</div>
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
      <div className="mb-3 text-sm font-semibold text-white">{title}</div>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}
function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <li><Link href={href} className="text-sm text-ink-300 hover:text-white">{children}</Link></li>;
}
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
      {icon}
    </a>
  );
}
