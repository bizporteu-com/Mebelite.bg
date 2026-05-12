import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductActions } from "@/components/ProductActions";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { PRODUCTS, getProduct } from "@/data/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.name} — Mebelite.bg`, description: p.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <div className="container-x mt-4">
        <Breadcrumbs
          items={[
            { label: "Начало", href: "/" },
            { label: "Мебели", href: "/category/mebeli" },
            { label: product.name },
          ]}
        />
      </div>

      <section className="container-x mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} model={product.model} name={product.name} />
        <ProductActions product={product} />
      </section>

      <section className="container-x mt-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl">Описание</h2>
          <p className="mt-3 text-ink-700">{product.description}</p>

          <h3 className="mt-8 text-lg">Характеристики</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <aside>
          <div className="rounded-lg border border-ink-100 p-5">
            <h3 className="text-lg">Размери</h3>
            <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-ink-500">Ширина</dt><dd>{product.dimensions.w} cm</dd>
              <dt className="text-ink-500">Дълбочина</dt><dd>{product.dimensions.d} cm</dd>
              <dt className="text-ink-500">Височина</dt><dd>{product.dimensions.h} cm</dd>
            </dl>
            <h3 className="mt-6 text-lg">Материали</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {product.materials.map((m) => <li key={m}>· {m}</li>)}
            </ul>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-x mt-20">
          <SectionHeader eyebrow="Други клиенти разгледаха" title="Подобни продукти" href={`/category/${product.category}`} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
