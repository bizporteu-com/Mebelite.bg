import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryView } from "@/components/CategoryView";
import { STYLES, getProductsByStyle } from "@/data/catalog";

export function generateStaticParams() {
  return STYLES.map((s) => ({ slug: s.slug }));
}

export default async function StylePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const style = STYLES.find((s) => s.slug === slug);
  if (!style) notFound();
  const products = getProductsByStyle(slug);
  return (
    <>
      <div className="container-x mt-4">
        <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Вдъхновения", href: "/inspiration" }, { label: style.name }]} />
      </div>
      <CategoryView products={products} title={`Стил: ${style.name}`} />
    </>
  );
}
