import Link from "next/link";
import { ArrowRight, Box, Camera, ChevronRight } from "lucide-react";
import { HERO_CATEGORIES, PRODUCTS, STYLES, getProductsByCategory } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { SmartImg } from "@/components/SmartImg";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <ProductRow title="Меки мебели" href="/category/aglovi-divani" slugs={["aglovi-divani", "triemestni-divani"]} />
      <PromoStrip />
      <ProductRow title="За хола" href="/room/hol" room="hol" />
      <ArPromo />
      <ProductRow title="Спалня" href="/room/spalnya" room="spalnya" />
      <StylesGrid />
      <Trust />
    </>
  );
}

function HeroBanner() {
  return (
    <section className="container-x mt-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative overflow-hidden rounded md:col-span-2 md:row-span-2">
          <SmartImg
            src="/assets/hero/hero-main.jpg"
            alt="Mebelite"
            fallbackKind="hero"
            fallbackKey="Мечтаният дом е на една стъпка"
            className="h-[300px] w-full object-cover md:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Пролетна колекция</div>
            <h1 className="mt-2 max-w-md text-2xl font-semibold text-white md:text-4xl">
              Мечтаният дом е на една стъпка
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/90">Безплатна доставка над 500 лв · 365 дни връщане</p>
            <Link href="/category/mebeli" className="btn-primary mt-5 w-fit">
              Пазарувай сега
            </Link>
          </div>
        </div>

        <PromoTile src="/assets/hero/hero-outlet.jpg" tag="Outlet" title="До -60% отстъпки" href="/outlet" />
        <PromoTile src="/assets/hero/hero-new.jpg" tag="Ново" title="Японско-скандинавски стил" href="/style/japandi" />
      </div>
    </section>
  );
}

function PromoTile({ src, tag, title, href }: { src: string; tag: string; title: string; href: string }) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded">
      <SmartImg
        src={src}
        alt={title}
        fallbackKind="tile"
        fallbackKey={title}
        className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/80">{tag}</div>
        <div className="mt-0.5 text-base font-semibold text-white">{title}</div>
      </div>
    </Link>
  );
}

function CategoryGrid() {
  return (
    <section className="container-x mt-10">
      <h2 className="mb-4 text-lg font-semibold">Купи по категория</h2>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {HERO_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="group block overflow-hidden rounded border border-ink-100 bg-white transition-shadow hover:shadow-hover"
          >
            <div className="aspect-square overflow-hidden bg-ink-50">
              <SmartImg
                src={c.image}
                alt={c.name}
                fallbackKind="category"
                fallbackKey={c.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-2 text-center text-xs font-medium text-ink-900 group-hover:text-brand">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductRow({
  title,
  href,
  slugs,
  room,
}: {
  title: string;
  href: string;
  slugs?: string[];
  room?: string;
}) {
  let products = PRODUCTS;
  if (slugs) products = slugs.flatMap((s) => getProductsByCategory(s));
  if (room) products = PRODUCTS.filter((p) => p.room === room);
  products = products.slice(0, 4);
  if (products.length === 0) return null;

  return (
    <section className="container-x mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link href={href} className="flex items-center gap-1 text-sm text-brand hover:underline">
          Виж всички <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}

function PromoStrip() {
  return (
    <section className="container-x mt-10">
      <div className="grid gap-3 md:grid-cols-3">
        <StripItem title="Безплатна доставка" sub="При поръчка над 500 лв" />
        <StripItem title="Плащане при доставка" sub="С наложен платеж" />
        <StripItem title="365 дни връщане" sub="Без обяснения" />
      </div>
    </section>
  );
}

function StripItem({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="rounded border border-ink-100 bg-white px-4 py-3">
      <div className="text-sm font-semibold text-ink-900">{title}</div>
      <div className="text-xs text-ink-500">{sub}</div>
    </div>
  );
}

function ArPromo() {
  return (
    <section className="container-x mt-10">
      <div className="grid items-center gap-6 overflow-hidden rounded bg-brand-50 p-6 md:grid-cols-2 md:p-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Ново</div>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Виж го у вас, преди да го купиш</h2>
          <p className="mt-2 max-w-md text-sm text-ink-700">
            Всеки продукт може да бъде разгледан в 3D и поставен в стаята ви чрез камерата на телефона.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/product/aglov-divan-aurora" className="btn-primary">
              <Box className="h-4 w-4" /> Пробвай в 3D
            </Link>
            <Link href="/product/aglov-divan-aurora" className="btn-outline">
              <Camera className="h-4 w-4" /> Стартирай AR
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded bg-white">
          <SmartImg
            src="/assets/hero/ar-preview.jpg"
            alt="AR preview"
            fallbackKind="hero"
            fallbackKey="AR в стаята ви"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function StylesGrid() {
  return (
    <section className="container-x mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-lg font-semibold">Вдъхновения по стил</h2>
        <Link href="/inspiration" className="flex items-center gap-1 text-sm text-brand hover:underline">
          Виж всички <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {STYLES.map((s) => (
          <Link key={s.slug} href={`/style/${s.slug}`} className="group relative block overflow-hidden rounded">
            <SmartImg
              src={s.image}
              alt={s.name}
              fallbackKind="style"
              fallbackKey={s.name}
              className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium text-white">{s.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="container-x mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-ink-100 bg-white p-4">
        <div>
          <div className="text-xl font-bold">4.6 / 5</div>
          <div className="text-xs text-ink-500">45 000+ оценки на продукти</div>
        </div>
        <div className="text-amber-500">★★★★★</div>
        <Link href="/reviews" className="flex items-center gap-1 text-sm text-brand hover:underline">
          Виж отзивите <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
