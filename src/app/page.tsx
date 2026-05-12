import Link from "next/link";
import { ArrowRight, Box, Camera } from "lucide-react";
import { HERO_CATEGORIES, PRODUCTS, STYLES } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SmartImg } from "@/components/SmartImg";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <ArPromo />
      <Inspiration />
      <Reviews />
    </>
  );
}

function Hero() {
  return (
    <section className="container-x mt-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="relative col-span-2 overflow-hidden rounded-xl2 bg-canvas-mute">
          <SmartImg
            src="/assets/hero/hero-main.jpg"
            alt="Mebelite hero"
            fallbackKind="hero"
            fallbackKey="Spring collection"
            className="h-[440px] w-full object-cover md:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <span className="chip bg-white/90">Пролетна колекция 2026</span>
            <h1 className="mt-4 max-w-md text-3xl text-white md:text-5xl">
              Мебели, които стоят добре във вашия дом.
            </h1>
            <p className="mt-3 max-w-md text-sm text-white/85 md:text-base">
              Разгледайте дивана в 3D и го разположете в собствения си хол с AR — преди да го купите.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/category/aglovi-divani" className="btn-primary bg-white text-ink-900 hover:bg-canvas-soft">
                Разгледай дивани <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/inspiration" className="btn-outline border-white/60 text-white hover:border-white">
                Вдъхновения
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <HeroTile
            src="/assets/hero/hero-outlet.jpg"
            tag="Outlet"
            title="До -60% на избрани"
            href="/outlet"
          />
          <HeroTile
            src="/assets/hero/hero-new.jpg"
            tag="Нови"
            title="Колекция Japandi"
            href="/style/japandi"
          />
        </div>
      </div>
    </section>
  );
}

function HeroTile({ src, tag, title, href }: { src: string; tag: string; title: string; href: string }) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-xl2 bg-canvas-mute">
      <SmartImg
        src={src}
        alt={title}
        fallbackKind="tile"
        fallbackKey={title}
        className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span className="chip w-fit bg-white/90">{tag}</span>
        <div className="mt-2 text-lg text-white">{title}</div>
      </div>
    </Link>
  );
}

function CategoryStrip() {
  return (
    <section className="container-x mt-16">
      <SectionHeader eyebrow="Категории" title="Купи по категория" href="/category/mebeli" />
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
        {HERO_CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className="group block text-center">
            <div className="aspect-square overflow-hidden rounded-full bg-canvas-mute">
              <SmartImg
                src={c.image}
                alt={c.name}
                fallbackKind="category"
                fallbackKey={c.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-2 text-sm">{c.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const products = PRODUCTS.slice(0, 8);
  return (
    <section className="container-x mt-20">
      <SectionHeader eyebrow="Любими" title="Меки мебели на седмицата" href="/category/aglovi-divani" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}

function ArPromo() {
  return (
    <section className="container-x mt-24">
      <div className="grid items-center gap-8 overflow-hidden rounded-xl2 bg-brand p-8 text-white md:grid-cols-2 md:p-14">
        <div>
          <span className="chip bg-white/15 text-white">Ново</span>
          <h2 className="mt-3 text-3xl text-white md:text-4xl">Виж го у вас, преди да го купиш.</h2>
          <p className="mt-3 max-w-md text-white/80">
            Всеки продукт може да бъде разгледан в 3D и поставен в стаята ви чрез камерата на телефона. Никакво
            приложение, никакво гадаене с метър.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/product/aglov-divan-aurora" className="btn-primary bg-white text-ink-900 hover:bg-canvas-soft">
              <Box className="h-4 w-4" /> Пробвай в 3D
            </Link>
            <Link href="/product/aglov-divan-aurora" className="btn-outline border-white/40 text-white hover:border-white">
              <Camera className="h-4 w-4" /> Стартирай AR
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 bg-white/5">
          <SmartImg
            src="/assets/hero/ar-preview.jpg"
            alt="AR preview"
            fallbackKind="hero"
            fallbackKey="AR in your living room"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Inspiration() {
  return (
    <section className="container-x mt-24">
      <SectionHeader eyebrow="Стилове" title="Вдъхновения" href="/inspiration" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {STYLES.map((s) => (
          <Link key={s.slug} href={`/style/${s.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-xl2 bg-canvas-mute">
            <SmartImg
              src={s.image}
              alt={s.name}
              fallbackKind="style"
              fallbackKey={s.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">{s.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="container-x mt-24">
      <div className="grid items-center gap-8 rounded-xl2 bg-canvas-soft p-8 md:grid-cols-3 md:p-12">
        <div>
          <div className="text-5xl font-semibold">4.6 / 5</div>
          <div className="mt-2 text-sm text-ink-500">45,000+ оценки на продукти</div>
        </div>
        <Quote text="Доставиха ми дивана за 6 дни. Точно както изглеждаше в AR прегледа на сайта — даже разположението в стаята си го направих предварително." author="Мариана, София" />
        <Quote text="Качество за парите си. Поръчах гардероба след като го &laquo;поставих&raquo; в спалнята през телефона — пасна перфектно." author="Стоян, Пловдив" />
      </div>
    </section>
  );
}

function Quote({ text, author }: { text: string; author: string }) {
  return (
    <figure className="space-y-3">
      <div className="text-brand-accent">★★★★★</div>
      <blockquote className="text-sm leading-relaxed text-ink-700" dangerouslySetInnerHTML={{ __html: `&ldquo;${text}&rdquo;` }} />
      <figcaption className="text-xs text-ink-500">— {author}</figcaption>
    </figure>
  );
}
