"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Camera, RotateCw, Maximize2 } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          "ios-src"?: string;
          alt?: string;
          ar?: boolean;
          "ar-modes"?: string;
          "ar-scale"?: string;
          "ar-placement"?: string;
          "camera-controls"?: boolean;
          "touch-action"?: string;
          "auto-rotate"?: boolean;
          "auto-rotate-delay"?: number | string;
          "rotation-per-second"?: string;
          "shadow-intensity"?: number | string;
          "shadow-softness"?: number | string;
          "environment-image"?: string;
          exposure?: number | string;
          poster?: string;
          "camera-orbit"?: string;
          "field-of-view"?: string;
          "interaction-prompt"?: string;
          "min-camera-orbit"?: string;
          "max-camera-orbit"?: string;
          loading?: string;
          reveal?: string;
        },
        HTMLElement
      >;
    }
  }
}

export function ModelViewer({
  glb,
  usdz,
  poster,
  name,
}: {
  glb: string;
  usdz?: string;
  poster?: string;
  name: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [arSupported, setArSupported] = useState(true);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => !cancelled && setReady(true))
      .catch(() => !cancelled && setReady(true));
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current as HTMLElement & { canActivateAR?: boolean };
    const check = () => setArSupported(Boolean(el.canActivateAR ?? true));
    el.addEventListener("load", check);
    return () => el.removeEventListener("load", check);
  }, [ready]);

  function activateAR() {
    const el = ref.current as (HTMLElement & { activateAR?: () => void }) | null;
    el?.activateAR?.();
  }

  function toggleFullscreen() {
    const node = wrapRef.current;
    if (!node) return;
    if (!document.fullscreenElement) {
      node.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden rounded-lg bg-ink-50">
      {ready && (
        // @ts-expect-error custom element
        <model-viewer
          ref={ref as React.RefObject<HTMLElement>}
          src={glb}
          ios-src={usdz}
          alt={name}
          ar={true}
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          ar-placement="floor"
          camera-controls={true}
          touch-action="pan-y"
          auto-rotate={autoRotate}
          auto-rotate-delay="400"
          rotation-per-second="20deg"
          shadow-intensity="1"
          shadow-softness="0.8"
          exposure="0.9"
          interaction-prompt="auto"
          poster={poster}
          loading="eager"
          reveal="auto"
          style={{ width: "100%", height: "100%" }}
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 top-3 flex items-center justify-between px-3">
        <span className="pointer-events-auto chip bg-white/90">
          <Box className="h-3 w-3" /> 3D изглед
        </span>
        <div className="pointer-events-auto flex gap-1.5">
          <IconBtn label="Авто-въртене" onClick={() => setAutoRotate((v) => !v)} active={autoRotate}>
            <RotateCw className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Цял екран" onClick={toggleFullscreen} active={fullscreen}>
            <Maximize2 className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        <button
          onClick={activateAR}
          disabled={!arSupported}
          className="btn-primary shadow-card disabled:opacity-60"
        >
          <Camera className="h-4 w-4" />
          Виж в стаята си (AR)
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-16 left-1/2 hidden -translate-x-1/2 text-[11px] text-ink-500 sm:block">
        Влачи за въртене · Pinch за zoom
      </div>
    </div>
  );
}

function IconBtn({
  children, onClick, label, active,
}: { children: React.ReactNode; onClick: () => void; label: string; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-full border bg-white/95 shadow-sm transition-colors hover:bg-white ${
        active ? "border-ink-900 text-ink-900" : "border-ink-100 text-ink-500"
      }`}
    >
      {children}
    </button>
  );
}
