import { PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const results = term
    ? PRODUCTS.filter((p) =>
        [p.name, p.category, p.style, p.room, ...p.materials, ...p.colors.map((c) => c.name)]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(term)),
      )
    : [];

  return (
    <div className="container-x mt-4">
      <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Търсене" }]} />
      <h1 className="mt-4 text-3xl md:text-4xl">Резултати за &ldquo;{q}&rdquo;</h1>
      <p className="mt-1 text-sm text-ink-500">{results.length} продукта</p>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {results.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
