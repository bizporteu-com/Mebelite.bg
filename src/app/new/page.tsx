import { PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function NewPage() {
  const items = PRODUCTS.filter((p) => p.badge === "new").concat(PRODUCTS.filter((p) => p.badge !== "new"));
  return (
    <div className="container-x mt-4">
      <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Нови продукти" }]} />
      <h1 className="mt-4 text-3xl md:text-4xl">Нови продукти</h1>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, 12).map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
