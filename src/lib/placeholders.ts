type Kind = "product" | "category" | "style" | "hero" | "tile";

const SIZES: Record<Kind, [number, number]> = {
  product: [800, 600],
  category: [400, 400],
  style: [600, 800],
  hero: [1600, 900],
  tile: [800, 500],
};

export function placeholderFor(kind: Kind, key: string): string {
  const [w, h] = SIZES[kind];
  const label = encodeURIComponent(key.replace(/[-_]/g, " "));
  return `https://placehold.co/${w}x${h}/efece6/2a2a2a/png?text=${label}&font=lora`;
}
