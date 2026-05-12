# Mebelite.bg

A Next.js clone of [mebeli.bg](https://www.mebeli.bg/) with **3D product rotation** and **AR room visualization** baked into every product page.

## Stack

- **Next.js 15** (App Router, RSC, static product routes)
- **TypeScript** + **Tailwind CSS**
- **Zustand** (persisted cart + wishlist in `localStorage`)
- **[`<model-viewer>`](https://modelviewer.dev/)** for 3D rotation + native AR
  - **Android** → Scene Viewer via `.glb`
  - **iOS** → Quick Look via `.usdz`
  - **Desktop** → in-page orbit + pinch zoom + auto-rotate
- **lucide-react** icons, Google Fonts (Inter + Fraunces)

No external 3D framework (Three.js / R3F) — `<model-viewer>` covers both rotation and AR with a single component and zero JS on the hot path until a user activates 3D.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, category strip, featured products, AR promo, styles, reviews |
| `/category/[slug]` | Category listing with sort + price/color/material filters |
| `/room/[slug]` | Products grouped by room (hol, spalnya, kuhnya, …) |
| `/style/[slug]` | Products grouped by style (scandinavian, japandi, …) |
| `/product/[slug]` | Product detail with image gallery, **3D & AR tab**, color/qty/cart |
| `/cart` | Cart with line totals, shipping rule, checkout button |
| `/wishlist` | Saved products |
| `/search?q=` | Full-text product search |
| `/inspiration`, `/outlet`, `/new` | Marketing landing pages |

## 3D / AR

Look at `src/components/ModelViewer.tsx`. The component:

1. Lazy-imports `@google/model-viewer` only when an actual product viewer mounts.
2. Renders a `<model-viewer>` element with `camera-controls`, `auto-rotate`, `ar`, `ar-modes="webxr scene-viewer quick-look"`.
3. Exposes the **"Виж в стаята си (AR)"** button which calls `activateAR()`. On iOS this opens Quick Look; on Android, Scene Viewer; on desktop, falls back to WebXR if available, otherwise stays in 3D.

Drop your `.glb` / `.usdz` files into `public/assets/products/<slug>/` — see [`public/assets/README.md`](./public/assets/README.md) for naming and constraints.

## Local dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Adding products

Edit `src/data/catalog.ts`. Each product needs `slug`, `name`, `category`, `price`, dimensions, colors, and optionally `model: { glb, usdz }` to enable the 3D/AR tab. The product card and category filters update automatically.
