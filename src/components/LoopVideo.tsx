"use client";

import { useEffect, useRef } from "react";

// A silent clip that behaves like a GIF: muted, looping, inline on phones, no controls.
// It starts once the page is interactive (the poster shows until then). Visitors who
// prefer reduced motion get the poster with controls instead of autoplay.
export default function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true; // React doesn't always write `muted` into server-rendered HTML
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }
    video.play().catch(() => {
      // Autoplay refused (e.g. low-power mode): offer controls instead.
      video.controls = true;
    });
  }, []);

  return (
    <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
  );
}
