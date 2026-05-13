import { ALL_PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function OutletPage() {
  const items = ALL_PRODUCTS.filter((p) => p.oldPrice);
  return (
    <div className="container-x mt-4">
      <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Outlet" }]} />
      <h1 className="mt-4 text-3xl md:text-4xl">Outlet</h1>
      <p className="mt-1 text-sm text-ink-500">Селектирани продукти с до -40% отстъпка.</p>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
