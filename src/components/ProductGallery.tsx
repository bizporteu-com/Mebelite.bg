"use client";

import { useState } from "react";
import { ModelViewer } from "./ModelViewer";
import { SmartImg } from "./SmartImg";

type Tab = "images" | "3d";

export function ProductGallery({
  images,
  model,
  name,
}: {
  images: string[];
  model?: { glb?: string; usdz?: string };
  name: string;
}) {
  const [tab, setTab] = useState<Tab>("images");
  const [active, setActive] = useState(0);
  const has3D = Boolean(model?.glb);

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setTab("images")}
          className={`rounded-full px-3 py-1 text-xs font-medium ${tab === "images" ? "bg-ink-900 text-white" : "border border-ink-100 text-ink-700"}`}
        >
          Снимки
        </button>
        {has3D && (
          <button
            onClick={() => setTab("3d")}
            className={`rounded-full px-3 py-1 text-xs font-medium ${tab === "3d" ? "bg-ink-900 text-white" : "border border-ink-100 text-ink-700"}`}
          >
            3D & AR
          </button>
        )}
      </div>

      <div className="relative aspect-square overflow-hidden rounded-lg bg-ink-50 md:aspect-[5/4]">
        {tab === "images" ? (
          <SmartImg
            src={images[active]}
            alt={name}
            fallbackKind="product"
            fallbackKey={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <ModelViewer glb={model!.glb!} usdz={model!.usdz} poster={images[0]} name={name} />
        )}
      </div>

      {tab === "images" && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                i === active ? "border-ink-900" : "border-transparent"
              }`}
            >
              <SmartImg
                src={src}
                alt={`${name} ${i + 1}`}
                fallbackKind="product"
                fallbackKey={`${name} ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
