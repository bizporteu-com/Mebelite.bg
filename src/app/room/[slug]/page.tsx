import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryView } from "@/components/CategoryView";
import { getProductsByRoom } from "@/data/catalog";

const ROOMS: Record<string, string> = {
  hol: "Хол",
  spalnya: "Спалня",
  kuhnya: "Кухня",
  antre: "Антре",
  ofis: "Домашен офис",
  detska: "Детска стая",
};

export function generateStaticParams() {
  return Object.keys(ROOMS).map((slug) => ({ slug }));
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = ROOMS[slug];
  if (!name) notFound();
  const products = getProductsByRoom(slug);
  return (
    <>
      <div className="container-x mt-4">
        <Breadcrumbs items={[{ label: "Начало", href: "/" }, { label: "Стаи" }, { label: name }]} />
      </div>
      <CategoryView products={products} title={`Мебели за ${name.toLowerCase()}`} showSubcategoryFilter />
    </>
  );
}
