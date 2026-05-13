import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryView } from "@/components/CategoryView";
import { ALL_PRODUCTS, KIDS_CATEGORIES, getProductsByCategory } from "@/data/catalog";

const CURATED_CATEGORY_LABELS: Record<string, string> = {
  mebeli: "Всички мебели",
  "aglovi-divani": "Ъглови дивани",
  "triemestni-divani": "Триместни дивани",
  "dvuemestni-divani": "Двуместни дивани",
  kresla: "Кресла",
  pufove: "Пуфове",
  shkafove: "Шкафове",
  garderobi: "Гардероби",
  skrinove: "Скринове",
  vitrini: "Витрини",
  "trapezni-masi": "Трапезни маси",
  "holni-masi": "Холни маси",
  "bar-masi": "Бар маси",
  stolove: "Столове",
  spalni: "Спални",
  matraci: "Матраци",
  "noshtni-shkafcheta": "Нощни шкафчета",
};

const CATEGORY_NAMES: Record<string, string> = {
  ...CURATED_CATEGORY_LABELS,
  ...Object.fromEntries(KIDS_CATEGORIES.map((c) => [c.slug, c.name])),
};

function findCategoryLabel(slug: string): string | null {
  return CATEGORY_NAMES[slug] ?? null;
}

export const dynamicParams = true;

export function generateStaticParams() {
  // Only curated categories prerender; kids subcategories render on demand.
  return Object.keys(CURATED_CATEGORY_LABELS).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = findCategoryLabel(slug);
  if (!title) notFound();
  const products = slug === "mebeli" ? ALL_PRODUCTS : getProductsByCategory(slug);

  return (
    <>
      <div className="container-x mt-4">
        <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Мебели", href: "/category/mebeli" }, { label: title }]} />
      </div>
      <CategoryView
        products={products}
        title={title}
        showSubcategoryFilter={slug === "mebeli"}
        categoryNames={CATEGORY_NAMES}
      />
    </>
  );
}
