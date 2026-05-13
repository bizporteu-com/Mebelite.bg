import Link from "next/link";
import { Box, Camera, Play, Truck, RotateCcw, Wallet, BadgeCheck } from "lucide-react";
import {
  MEBELI_CATEGORIES,
  ALL_PRODUCTS,
  ROOMS_HOME,
  STYLES,
  getProductsByCategory,
  getProductsByRoom,
} from "@/data/catalog";
import { ProductScroller } from "@/components/ProductScroller";
import { SmartImg } from "@/components/SmartImg";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Rooms />
      <Mebeli />
      <Styles />
      <ProductScroller
        title="Мека мебел"
        href="/category/aglovi-divani"
        products={[
          ...getProductsByCategory("aglovi-divani"),
          ...getProductsByCategory("triemestni-divani"),
          ...getProductsByCategory("kresla"),
        ].slice(0, 8)}
      />
      <ProductScroller
        title="Хол"
        href="/room/hol"
        products={getProductsByRoom("hol").slice(0, 8)}
      />
      <ProductScroller
        title="Спалня"
        href="/room/spalnya"
        products={getProductsByRoom("spalnya").slice(0, 8)}
      />
      <ArPromo />
      <Inspirations />
      <Ugc />
      <Reviews />
      <Trust />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[320px] w-full overflow-hidden md:h-[460px]">
        <SmartImg
          src="/assets/hero/hero-main.jpg"
          alt="1 поръчка = 1 дърво"
          fallbackKind="hero"
          fallbackKey="1 поръчка = 1 дърво"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl font-medium md:text-5xl">1 поръчка = 1 дърво</h1>
          <p className="mt-3 max-w-xl px-6 text-sm md:text-base">
            За всяка направена поръчка засаждаме по едно дърво в България.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  return (
    <section className="container-x mt-12">
      <h2 className="section-h mb-4">Стаи</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {ROOMS_HOME.map((r) => (
          <Link key={r.slug} href={`/room/${r.slug}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden rounded bg-ink-50">
              <SmartImg
                src={r.image}
                alt={r.name}
                fallbackKind="style"
                fallbackKey={r.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-3 text-sm font-medium text-ink-900">{r.name}</div>
            <div className="mt-0.5 text-xs text-ink-500">{r.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Mebeli() {
  return (
    <section className="mt-12">
      <div className="container-x">
        <h2 className="section-h mb-4">Мебели</h2>
      </div>
      <div className="bg-tint py-6">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {MEBELI_CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="group block text-center">
                <div className="aspect-[5/4] overflow-hidden rounded bg-white">
                  <SmartImg
                    src={c.image}
                    alt={c.name}
                    fallbackKind="tile"
                    fallbackKey={c.name}
                    className="h-full w-full object-contain p-4 transition-transform group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-2 text-sm font-medium text-ink-900">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Styles() {
  const four = STYLES.slice(0, 4);
  return (
    <section className="container-x mt-12">
      <h2 className="section-h mb-4">Стилове на мебели</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {four.map((s) => (
          <Link key={s.slug} href={`/style/${s.slug}`} className="group block">
            <div className="aspect-[5/6] overflow-hidden rounded bg-ink-50">
              <SmartImg
                src={s.image}
                alt={s.name}
                fallbackKind="style"
                fallbackKey={s.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-3 text-sm font-medium text-ink-900">{s.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArPromo() {
  return (
    <section className="container-x mt-12">
      <div className="grid items-center gap-6 overflow-hidden rounded bg-ink-50 p-6 md:grid-cols-2 md:p-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">Ново</div>
          <h2 className="mt-2 text-2xl font-medium md:text-3xl">Виж го у вас, преди да го купиш</h2>
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
            alt="AR в стаята ви"
            fallbackKind="hero"
            fallbackKey="AR в стаята ви"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

const INSPIRATIONS = [
  { title: "Мебели с релефни дървесни плотове", img: "/assets/inspirations/1.jpg" },
  { title: "Мебели с текстурирани повърхности", img: "/assets/inspirations/2.jpg" },
  { title: "Мебели в един комплект", img: "/assets/inspirations/3.jpg" },
  { title: "Стилизирана малка мебел", img: "/assets/inspirations/4.jpg" },
];

function Inspirations() {
  return (
    <section className="container-x mt-12">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="section-h">Вдъхновения</h2>
        <Link href="/inspiration" className="text-xs text-ink-500 hover:text-ink-900">
          Покажи повече →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {INSPIRATIONS.map((i) => (
          <Link key={i.title} href="/inspiration" className="group block">
            <div className="aspect-square overflow-hidden rounded bg-ink-50">
              <SmartImg
                src={i.img}
                alt={i.title}
                fallbackKind="style"
                fallbackKey={i.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-2 text-xs text-ink-700">{i.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const UGC = [
  { title: "Вижте новия ни корнер диван у клиент", img: "/assets/ugc/1.jpg" },
  { title: "Холна композиция за нов апартамент", img: "/assets/ugc/2.jpg" },
  { title: "Поглед към новата ни колекция", img: "/assets/ugc/3.jpg" },
  { title: "Видео на нашата спалня Mira", img: "/assets/ugc/4.jpg" },
];

function Ugc() {
  return (
    <section className="container-x mt-12">
      <h2 className="section-h mb-3">Mebeli.bg във Вашия дом</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {UGC.map((u) => (
          <button key={u.title} type="button" className="group block text-left">
            <div className="relative aspect-[4/5] overflow-hidden rounded bg-ink-50">
              <SmartImg
                src={u.img}
                alt={u.title}
                fallbackKind="style"
                fallbackKey={u.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm">
                <Play className="ml-0.5 h-4 w-4 fill-ink-900 text-ink-900" />
              </div>
              <div className="absolute right-3 top-3 rounded bg-white/95 px-1.5 py-0.5 text-[10px] font-semibold text-ink-900">
                Mebeli.bg
              </div>
            </div>
            <div className="mt-2 text-xs text-ink-700">{u.title}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      stars: 5,
      text: "Изключително професионално отношение на куриера. Доставка преди обявения час, бърз, отзивчив, помогна и с разпакетирането на новия ми гардероб.",
      author: "Олена Иличова",
      ago: "8 дни",
    },
    {
      stars: 5,
      text: "Изключително бързо и качествено обслужване. Получих си покупката бързо и в перфектно състояние!",
      author: "Илия Цуковски",
      ago: "9 дни",
    },
    {
      stars: 5,
      text: "Мебели за дневната - перфектни и красиви качество. Поръчвам поредна моя покупка от Mebeli.bg и към следващата ще се повторя нашата сделка.",
      author: "Любо Малински",
      ago: "10 дни",
    },
  ];
  return (
    <section className="container-x mt-12">
      <div className="grid items-start gap-6 md:grid-cols-[200px_1fr] md:gap-10">
        <div>
          <div className="flex items-center gap-2 text-amber-500">★★★★★</div>
          <div className="mt-1 text-3xl font-medium">4.7</div>
          <div className="text-xs text-ink-500">На основа на 1097 ревюта</div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded border border-ink-100 px-2 py-1 text-[11px] text-ink-500">
            <span className="font-semibold text-ink-900">Google</span>
            <span>Ревюта</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.author} className="rounded border border-ink-100 p-4">
              <div className="text-amber-500">{"★".repeat(r.stars)}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{r.text}</p>
              <div className="mt-3 text-xs text-ink-500">
                <span className="font-medium text-ink-900">{r.author}</span> · преди {r.ago}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: <Truck className="h-6 w-6" />, title: "Безплатна доставка", sub: "Доставяме безплатно поръчки над определена сума. Доставка във всички населени места." },
    { icon: <Wallet className="h-6 w-6" />, title: "Плащане при доставка", sub: "Плащате на куриера, само ако сте удовлетворени от пратката." },
    { icon: <RotateCcw className="h-6 w-6" />, title: "Безплатно връщане в рамките на 365 дни", sub: "Връщате безплатно, ако в рамките на 365 дни промените решението си." },
    { icon: <BadgeCheck className="h-6 w-6" />, title: "Гаранция за добра цена", sub: "Намерили сте по-евтино другаде? Свържете се с нас и ще се опитаме да изравним цената." },
  ];
  return (
    <section className="container-x mt-14 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
      {items.map((i) => (
        <div key={i.title}>
          <div className="text-ink-900">{i.icon}</div>
          <div className="mt-2 text-sm font-medium">{i.title}</div>
          <div className="mt-1 text-xs leading-relaxed text-ink-500">{i.sub}</div>
        </div>
      ))}
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mt-14 bg-mint">
      <div className="container-x flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
        <div>
          <div className="text-base font-medium">Идеи за обзавеждане на дома във Вашата електронна поща</div>
          <div className="mt-1 text-xs text-ink-700">Абонирайте се за нашия бюлетин и спестявайте първи от нашите оферти.</div>
        </div>
        <form className="flex w-full max-w-md gap-2">
          <input
            type="email"
            required
            placeholder="Въведете имейл адрес"
            className="flex-1 rounded border border-ink-200 bg-white px-3 py-2 text-sm outline-none focus:border-ink-900"
          />
          <button type="submit" className="btn-primary">Абонирай ме</button>
        </form>
      </div>
      <div className="container-x pb-4 text-[11px] text-ink-700">
        Съгласявам се с условията за <Link href="/legal/privacy" className="underline">обработка на лични данни</Link>.
      </div>
    </section>
  );
}
