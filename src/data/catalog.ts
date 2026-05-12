import type { Category, Product } from "@/lib/types";

export const NAV = [
  {
    label: "Мебели",
    href: "/category/mebeli",
    columns: [
      {
        title: "Меки мебели",
        links: [
          { label: "Ъглови дивани", href: "/category/aglovi-divani" },
          { label: "Триместни дивани", href: "/category/triemestni-divani" },
          { label: "Двуместни дивани", href: "/category/dvuemestni-divani" },
          { label: "Кресла", href: "/category/kresla" },
          { label: "Пуфове", href: "/category/pufove" },
        ],
      },
      {
        title: "Корпусни мебели",
        links: [
          { label: "Шкафове", href: "/category/shkafove" },
          { label: "Гардероби", href: "/category/garderobi" },
          { label: "Скринове", href: "/category/skrinove" },
          { label: "Витрини", href: "/category/vitrini" },
        ],
      },
      {
        title: "Маси и столове",
        links: [
          { label: "Трапезни маси", href: "/category/trapezni-masi" },
          { label: "Холни маси", href: "/category/holni-masi" },
          { label: "Бар маси", href: "/category/bar-masi" },
          { label: "Столове", href: "/category/stolove" },
        ],
      },
      {
        title: "Спалня",
        links: [
          { label: "Спални", href: "/category/spalni" },
          { label: "Матраци", href: "/category/matraci" },
          { label: "Нощни шкафчета", href: "/category/noshtni-shkafcheta" },
        ],
      },
    ],
  },
  {
    label: "Стаи",
    href: "/rooms",
    columns: [
      {
        title: "Стаи",
        links: [
          { label: "Хол", href: "/room/hol" },
          { label: "Спалня", href: "/room/spalnya" },
          { label: "Кухня", href: "/room/kuhnya" },
          { label: "Антре", href: "/room/antre" },
          { label: "Домашен офис", href: "/room/ofis" },
          { label: "Детска стая", href: "/room/detska" },
        ],
      },
    ],
  },
  {
    label: "Вдъхновения",
    href: "/inspiration",
    columns: [
      {
        title: "Стилове",
        links: [
          { label: "Скандинавски", href: "/style/scandinavian" },
          { label: "Индустриален", href: "/style/industrial" },
          { label: "Модерен", href: "/style/modern" },
          { label: "Класически", href: "/style/classic" },
          { label: "Japandi", href: "/style/japandi" },
          { label: "Прованс", href: "/style/provence" },
        ],
      },
    ],
  },
  { label: "Outlet", href: "/outlet" },
  { label: "Нови продукти", href: "/new" },
] as const;

export const HERO_CATEGORIES: Category[] = [
  { slug: "aglovi-divani", name: "Ъглови дивани", image: "/assets/categories/aglovi-divani.jpg" },
  { slug: "kresla", name: "Кресла", image: "/assets/categories/kresla.jpg" },
  { slug: "trapezni-masi", name: "Трапезни маси", image: "/assets/categories/trapezni-masi.jpg" },
  { slug: "spalni", name: "Спални", image: "/assets/categories/spalni.jpg" },
  { slug: "garderobi", name: "Гардероби", image: "/assets/categories/garderobi.jpg" },
  { slug: "holni-masi", name: "Холни маси", image: "/assets/categories/holni-masi.jpg" },
];

export const STYLES = [
  { slug: "scandinavian", name: "Скандинавски", image: "/assets/styles/scandinavian.jpg" },
  { slug: "industrial", name: "Индустриален", image: "/assets/styles/industrial.jpg" },
  { slug: "modern", name: "Модерен", image: "/assets/styles/modern.jpg" },
  { slug: "classic", name: "Класически", image: "/assets/styles/classic.jpg" },
  { slug: "japandi", name: "Japandi", image: "/assets/styles/japandi.jpg" },
  { slug: "provence", name: "Прованс", image: "/assets/styles/provence.jpg" },
];

const palette = {
  cream: { name: "Крем", hex: "#e8e0d2" },
  beige: { name: "Бежов", hex: "#cdb89a" },
  grey: { name: "Сив", hex: "#7d7d7d" },
  charcoal: { name: "Антрацит", hex: "#3a3a3a" },
  forest: { name: "Горско зелено", hex: "#2f4a3b" },
  rust: { name: "Теракота", hex: "#a85a3c" },
  navy: { name: "Тъмносин", hex: "#27384f" },
  oak: { name: "Дъб", hex: "#b6925c" },
};

export const PRODUCTS: Product[] = [
  {
    slug: "aglov-divan-aurora",
    name: "Ъглов диван Aurora",
    category: "aglovi-divani",
    room: "hol",
    style: "scandinavian",
    price: 1290,
    oldPrice: 1490,
    rating: 4.7,
    reviews: 312,
    deliveryDays: 8,
    colors: [palette.cream, palette.grey, palette.forest],
    materials: ["Букова рамка", "Велур", "Студена пяна 35kg/m³"],
    dimensions: { w: 285, d: 175, h: 88 },
    images: [
      "/assets/products/aurora/1.jpg",
      "/assets/products/aurora/2.jpg",
      "/assets/products/aurora/3.jpg",
      "/assets/products/aurora/4.jpg",
    ],
    model: { glb: "/assets/products/aurora/model.glb", usdz: "/assets/products/aurora/model.usdz" },
    description:
      "Просторен ъглов диван с меки заоблени линии и сваляща се дамаска. Седалката с пружинно ядро запазва формата си с години, а краката от масивен бук добавят скандинавска топлина.",
    features: ["Спален механизъм Click-clack", "Сваляща се дамаска", "Скрит сандък за съхранение", "10 години гаранция на рамата"],
    badge: "sale",
  },
  {
    slug: "divan-soren",
    name: "Триместен диван Soren",
    category: "triemestni-divani",
    room: "hol",
    style: "japandi",
    price: 890,
    rating: 4.8,
    reviews: 156,
    deliveryDays: 6,
    colors: [palette.beige, palette.charcoal, palette.navy],
    materials: ["Дъбови крака", "Лен 280gsm"],
    dimensions: { w: 220, d: 92, h: 84 },
    images: [
      "/assets/products/soren/1.jpg",
      "/assets/products/soren/2.jpg",
      "/assets/products/soren/3.jpg",
    ],
    model: { glb: "/assets/products/soren/model.glb", usdz: "/assets/products/soren/model.usdz" },
    description:
      "Soren комбинира япано-скандинавска естетика с компактен 220 cm силует. Меки възглавници от перо и латексова сърцевина за стабилен комфорт.",
    features: ["Перо-латекс възглавници", "Дамаска устойчива на драскане от домашни любимци", "Сглобяване за 10 минути"],
    badge: "new",
  },
  {
    slug: "kreslo-nima",
    name: "Кресло Nima",
    category: "kresla",
    room: "hol",
    style: "modern",
    price: 420,
    rating: 4.6,
    reviews: 89,
    deliveryDays: 5,
    colors: [palette.rust, palette.forest, palette.charcoal],
    materials: ["Букова рамка", "Букле плат"],
    dimensions: { w: 78, d: 82, h: 95 },
    images: ["/assets/products/nima/1.jpg", "/assets/products/nima/2.jpg"],
    model: { glb: "/assets/products/nima/model.glb", usdz: "/assets/products/nima/model.usdz" },
    description: "Скулптурно кресло, което се превръща в акцент във всеки хол.",
    features: ["Букле дамаска", "Въртяща се основа 360°", "Носимост 150 kg"],
    badge: "bestseller",
  },
  {
    slug: "holna-masa-kobe",
    name: "Холна маса Kobe",
    category: "holni-masi",
    room: "hol",
    style: "japandi",
    price: 310,
    rating: 4.5,
    reviews: 64,
    deliveryDays: 4,
    colors: [palette.oak, palette.charcoal],
    materials: ["Масивен дъб", "Метални крака"],
    dimensions: { w: 120, d: 60, h: 38 },
    images: ["/assets/products/kobe/1.jpg", "/assets/products/kobe/2.jpg"],
    model: { glb: "/assets/products/kobe/model.glb", usdz: "/assets/products/kobe/model.usdz" },
    description: "Минималистична холна маса с плот от масивен дъб и матово черни метални крака.",
    features: ["Плот от ФСК-сертифициран дъб", "Защитно матово покритие", "Регулируеми крака"],
  },
  {
    slug: "trapezna-masa-linden",
    name: "Трапезна маса Linden",
    category: "trapezni-masi",
    room: "kuhnya",
    style: "scandinavian",
    price: 740,
    rating: 4.7,
    reviews: 121,
    deliveryDays: 9,
    colors: [palette.oak, palette.cream],
    materials: ["Дъбов фурнир", "MDF плот"],
    dimensions: { w: 180, d: 90, h: 75 },
    images: ["/assets/products/linden/1.jpg", "/assets/products/linden/2.jpg"],
    model: { glb: "/assets/products/linden/model.glb", usdz: "/assets/products/linden/model.usdz" },
    description: "Разтегаема трапезна маса до 240 см за големи семейни събирания.",
    features: ["Разтегаема +60 cm", "Места за 8 души", "Скрита механика"],
  },
  {
    slug: "spalnya-mira",
    name: "Спалня Mira 160×200",
    category: "spalni",
    room: "spalnya",
    style: "modern",
    price: 980,
    rating: 4.8,
    reviews: 203,
    deliveryDays: 12,
    colors: [palette.beige, palette.grey, palette.forest],
    materials: ["Тапицирана табла", "Букова рамка"],
    dimensions: { w: 176, d: 220, h: 110 },
    images: ["/assets/products/mira/1.jpg", "/assets/products/mira/2.jpg"],
    model: { glb: "/assets/products/mira/model.glb", usdz: "/assets/products/mira/model.usdz" },
    description: "Двойно легло с вградена ракла и канапе тип табла за релакс.",
    features: ["Подемен механизъм", "Вградена ракла", "Подходяща за матрак 160×200"],
    badge: "bestseller",
  },
  {
    slug: "garderob-osko",
    name: "Гардероб Osko 200",
    category: "garderobi",
    room: "spalnya",
    style: "modern",
    price: 1120,
    rating: 4.6,
    reviews: 77,
    deliveryDays: 10,
    colors: [palette.oak, palette.charcoal, palette.cream],
    materials: ["ЛПДЧ", "Огледало"],
    dimensions: { w: 200, d: 60, h: 220 },
    images: ["/assets/products/osko/1.jpg", "/assets/products/osko/2.jpg"],
    model: { glb: "/assets/products/osko/model.glb", usdz: "/assets/products/osko/model.usdz" },
    description: "Гардероб с плъзгащи врати, цяло огледало и вградено LED осветление.",
    features: ["Плъзгащи врати с меко затваряне", "LED лента", "5 рафта + щанга"],
  },
  {
    slug: "stol-fern",
    name: "Стол Fern",
    category: "stolove",
    room: "kuhnya",
    style: "scandinavian",
    price: 89,
    rating: 4.4,
    reviews: 412,
    deliveryDays: 3,
    colors: [palette.cream, palette.charcoal, palette.forest, palette.rust],
    materials: ["Букови крака", "PP седалка"],
    dimensions: { w: 47, d: 50, h: 82 },
    images: ["/assets/products/fern/1.jpg", "/assets/products/fern/2.jpg"],
    model: { glb: "/assets/products/fern/model.glb", usdz: "/assets/products/fern/model.usdz" },
    description: "Лек ергономичен стол, който се вписва както в трапезария, така и в офис.",
    features: ["Подложни тапи против надраскване", "Стифируем", "Носимост 120 kg"],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
export function getProductsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}
export function getProductsByRoom(slug: string) {
  return PRODUCTS.filter((p) => p.room === slug);
}
export function getProductsByStyle(slug: string) {
  return PRODUCTS.filter((p) => p.style === slug);
}
