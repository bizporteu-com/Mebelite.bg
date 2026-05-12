import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryView } from "@/components/CategoryView";
import { NAV, PRODUCTS, getProductsByCategory } from "@/data/catalog";

function findCategoryLabel(slug: string): string | null {
  for (const item of NAV) {
    if ("columns" in item && item.columns) {
      for (const col of item.columns) {
        for (const l of col.links) {
          if (l.href === `/category/${slug}`) return l.label;
        }
      }
    }
  }
  if (slug === "mebeli") return "Всички мебели";
  return null;
}

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const item of NAV) {
    if ("columns" in item && item.columns) {
      for (const col of item.columns) {
        for (const l of col.links) {
          if (l.href.startsWith("/category/")) slugs.add(l.href.replace("/category/", ""));
        }
      }
    }
  }
  PRODUCTS.forEach((p) => slugs.add(p.category));
  slugs.add("mebeli");
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = findCategoryLabel(slug);
  if (!title) notFound();
  const products = slug === "mebeli" ? PRODUCTS : getProductsByCategory(slug);

  return (
    <>
      <div className="container-x mt-4">
        <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Мебели", href: "/category/mebeli" }, { label: title }]} />
      </div>
      <CategoryView products={products} title={title} />
    </>
  );
}
