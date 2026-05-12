# Assets folder

Drop your real assets here. The site references the files below; placeholders are rendered when missing.

## Layout

```
public/assets/
├── hero/
│   ├── hero-main.jpg        # 1600×900, hero banner
│   ├── hero-outlet.jpg      # 800×500
│   ├── hero-new.jpg         # 800×500
│   └── ar-preview.jpg       # 1200×900, AR section illustration
├── categories/
│   ├── aglovi-divani.jpg    # 400×400, round category tile
│   ├── kresla.jpg
│   ├── trapezni-masi.jpg
│   ├── spalni.jpg
│   ├── garderobi.jpg
│   └── holni-masi.jpg
├── styles/
│   ├── scandinavian.jpg     # 600×800
│   ├── industrial.jpg
│   ├── modern.jpg
│   ├── classic.jpg
│   ├── japandi.jpg
│   └── provence.jpg
└── products/
    └── <product-slug>/
        ├── 1.jpg            # ≥1200×900, primary
        ├── 2.jpg, 3.jpg ... # gallery
        ├── model.glb        # for Android Scene Viewer + WebXR rotation
        └── model.usdz       # for iOS Quick Look (AR)
```

Product slugs currently expected (see `src/data/catalog.ts`):

- aglov-divan-aurora
- divan-soren
- kreslo-nima
- holna-masa-kobe
- trapezna-masa-linden
- spalnya-mira
- garderob-osko
- stol-fern

## 3D / AR models

`<model-viewer>` is used in `src/components/ModelViewer.tsx` and supports:
- **Android**: `model.glb` → Scene Viewer (native AR)
- **iOS**: `model.usdz` → Quick Look (native AR)
- **Desktop**: in-page 3D rotation, pinch-zoom, auto-rotate

Recommended GLB constraints:
- ≤ 6 MB per model (web delivery)
- Single mesh or merged meshes, Draco-compressed
- PBR materials, baked AO if heavy
- Y-up, +Z forward, **real-world scale in meters** (1 unit = 1 m). AR placement on floor relies on this.

USDZ should be a converted version of the same GLB. Use [Reality Converter](https://developer.apple.com/augmented-reality/tools/) or `gltf-pipeline` + `usdz_converter` on macOS.

## Images

- Format: `.jpg` (1500–2000 px wide is enough for product hero shots)
- Background: prefer plain or in-context lifestyle shots; transparent PNG only if you want to overlay
- File size: keep ≤ 350 KB per image (Next.js doesn't optimize from `/public` automatically — these are served as-is by `<img>`)
