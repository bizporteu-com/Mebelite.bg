import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BGN_PER_EUR = 1.95583;

const money = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// `price` is stored as BGN (matches guga.bg feed exactly).
// EUR is derived for display.
export function formatPrice(bgn: number) {
  const eur = bgn / BGN_PER_EUR;
  return {
    eur: `€${money(eur)}`,
    bgn: `${money(bgn)} лв`,
  };
}
