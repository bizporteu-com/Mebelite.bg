import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BGN_PER_EUR = 1.95583;
export function formatPrice(eur: number) {
  const bgn = eur * BGN_PER_EUR;
  return {
    eur: `€${eur.toLocaleString("bg-BG", { maximumFractionDigits: 0 })}`,
    bgn: `${bgn.toLocaleString("bg-BG", { maximumFractionDigits: 0 })} лв`,
  };
}
