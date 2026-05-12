import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-100 bg-white">
      <div className="container-x py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <Col title="За нас">
            <FLink href="/about">За компанията</FLink>
            <FLink href="/stores">Магазини</FLink>
            <FLink href="/careers">Кариери</FLink>
            <FLink href="/blog">Блог</FLink>
          </Col>
          <Col title="Информация">
            <FLink href="/help/payments">Плащане</FLink>
            <FLink href="/help/delivery">Доставка и монтаж</FLink>
            <FLink href="/help/returns">Връщания</FLink>
            <FLink href="/help/faq">Често задавани въпроси</FLink>
            <FLink href="/help/tracking">Проследяване</FLink>
          </Col>
          <Col title="За връзка">
            <li className="text-sm text-ink-700">Mebeli.bg EOOD</li>
            <li className="text-sm text-ink-700">ул. Витоша 100, София</li>
            <li className="text-sm text-ink-700">+359 89 670 5495</li>
            <li className="text-sm text-ink-700">Пн–Пт: 09:00–18:00</li>
            <li className="text-sm text-ink-700">Сб: 10:00–16:00</li>
            <li>
              <Link href="/contact" className="text-sm text-ink-900 underline hover:no-underline">
                Изпрати запитване
              </Link>
            </li>
          </Col>
          <div>
            <div className="mb-3 text-sm font-semibold">Начин на плащане</div>
            <div className="flex flex-wrap gap-2">
              <Pay label="VISA" />
              <Pay label="Mastercard" />
              <Pay label="G Pay" />
              <Pay label="Apple Pay" />
              <Pay label="Наложен платеж" />
            </div>
            <div className="mt-5 mb-3 text-sm font-semibold">Последвайте ни</div>
            <div className="flex gap-2 text-ink-700">
              <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} />
              <SocialLink href="#" icon={<Youtube className="h-4 w-4" />} />
              <SocialLink href="#" icon={<MessageCircle className="h-4 w-4" />} />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-500 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-medium text-ink-900">Ние ценим доверието</div>
            <div className="mt-1 flex items-center gap-4 text-[11px] text-ink-500">
              <span>★ Награди</span>
              <span>A+ Награди</span>
              <span>Trustpilot</span>
            </div>
          </div>
          <span>© {new Date().getFullYear()} Mebeli.bg · Всички права запазени · <Link href="/legal/privacy" className="hover:underline">Поверителност</Link> · <Link href="/legal/terms" className="hover:underline">Общи условия</Link></span>
        </div>
      </div>
    </footer>
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
  return <li><Link href={href} className="text-sm text-ink-700 hover:text-ink-900">{children}</Link></li>;
}
function Pay({ label }: { label: string }) {
  return <span className="rounded border border-ink-200 bg-white px-2 py-1 text-[11px] text-ink-700">{label}</span>;
}
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-white hover:border-ink-900 hover:text-ink-900">
      {icon}
    </a>
  );
}
