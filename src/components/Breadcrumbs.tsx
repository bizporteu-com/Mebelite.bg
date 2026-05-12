import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-ink-500">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {it.href ? (
            <Link href={it.href} className="hover:text-ink-900">{it.label}</Link>
          ) : (
            <span className="text-ink-900">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3 w-3" />}
        </span>
      ))}
    </nav>
  );
}
