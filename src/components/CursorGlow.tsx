"use client";

import { useEffect, useRef } from "react";

// A soft purple glow that trails the mouse pointer. Mouse and trackpad only: touch
// screens have no hovering pointer. It never takes clicks, and snaps straight to the
// pointer (no trailing ease) for visitors who prefer reduced motion.
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    return attachGlow(glow);
  }, []);

  return <div className="cursorGlow" ref={glowRef} aria-hidden="true" />;
}

// How far the glow closes the gap to the pointer each frame (0-1).
const FOLLOW = 0.22;

function attachGlow(glow: HTMLDivElement) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;

  function render() {
    x += (targetX - x) * (reduceMotion ? 1 : FOLLOW);
    y += (targetY - y) * (reduceMotion ? 1 : FOLLOW);
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.3 ? requestAnimationFrame(render) : 0;
  }

  function onMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!glow.classList.contains("isVisible")) {
      // Appear where the pointer is rather than sliding in from the corner.
      x = targetX;
      y = targetY;
      glow.classList.add("isVisible");
    }
    if (!frame) frame = requestAnimationFrame(render);
  }

  const hide = () => glow.classList.remove("isVisible");

  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", hide);
  window.addEventListener("blur", hide);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", hide);
    window.removeEventListener("blur", hide);
  };
}
