import Link from "next/link";
import { STYLES } from "@/data/catalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function InspirationPage() {
  return (
    <div className="container-x mt-4">
      <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Вдъхновения" }]} />
      <h1 className="mt-4 text-3xl md:text-4xl">Вдъхновения</h1>
      <p className="mt-2 max-w-2xl text-ink-500">Открий своя стил — от уютния Japandi до бруталния индустриален. Всеки стил е селекция от мебели, които работят добре заедно.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {STYLES.map((s) => (
          <Link key={s.slug} href={`/style/${s.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-xl2 bg-canvas-mute">
            <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <div className="text-lg">{s.name}</div>
              <div className="text-xs opacity-80">Разгледай колекцията →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
