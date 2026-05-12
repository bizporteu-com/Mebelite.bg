import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  eyebrow,
  title,
  href,
  cta = "Виж всички",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="text-xs font-medium uppercase tracking-wider text-ink-500">{eyebrow}</div>}
        <h2 className="mt-1 text-2xl md:text-3xl">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="hidden items-center gap-1 text-sm text-ink-700 hover:text-ink-900 md:inline-flex">
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
