"use client";

import { useEffect, useRef } from "react";

// A glossy purple gumball that replaces the scrollbar. It travels down the right
// edge with the page, appears only while scrolling (or while hovered/dragged),
// and can be dragged or the track clicked like a normal scrollbar.
export default function ScrollGumball() {
  const trackRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const ball = ballRef.current;
    if (!track || !ball) return;
    return attachGumball(track, ball);
  }, []);

  return (
    // Decorative for assistive tech: keyboard and screen-reader users scroll the page directly.
    <div className="scrollGumTrack" ref={trackRef} aria-hidden="true" hidden>
      <div className="scrollGum" ref={ballRef} />
    </div>
  );
}

// How long the gumball lingers after scrolling stops before fading out.
const HIDE_AFTER_MS = 1100;

function attachGumball(track: HTMLDivElement, ball: HTMLDivElement) {
  let frame = 0;
  let dragOffset: number | null = null;
  let hovering = false;
  let hideTimer = 0;
  let lastScrollY = window.scrollY;

  const metrics = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const travel = track.clientHeight - ball.offsetHeight;
    return { maxScroll, travel };
  };

  function hideSoon() {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (!hovering && dragOffset === null) track.classList.remove("isVisible");
    }, HIDE_AFTER_MS);
  }

  function reveal() {
    track.classList.add("isVisible");
    hideSoon();
  }

  function render() {
    frame = 0;
    const { maxScroll, travel } = metrics();
    track.hidden = maxScroll <= 4;
    if (track.hidden) return;
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    ball.style.transform = `translateY(${progress * travel}px)`;
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  function onScroll() {
    // Only real scrolling reveals it, not layout changes that keep the position.
    if (window.scrollY !== lastScrollY) reveal();
    lastScrollY = window.scrollY;
    schedule();
  }

  function scrollToPointer(clientY: number, grabOffset: number) {
    const { maxScroll, travel } = metrics();
    const top = track.getBoundingClientRect().top;
    const offset = Math.min(travel, Math.max(0, clientY - top - grabOffset));
    window.scrollTo({ top: (offset / Math.max(1, travel)) * maxScroll, behavior: "instant" });
  }

  function onBallDown(event: PointerEvent) {
    event.preventDefault();
    dragOffset = event.clientY - ball.getBoundingClientRect().top;
    ball.setPointerCapture(event.pointerId);
    ball.classList.add("isDragging");
  }

  function onBallMove(event: PointerEvent) {
    if (dragOffset !== null) scrollToPointer(event.clientY, dragOffset);
  }

  function onBallUp(event: PointerEvent) {
    dragOffset = null;
    ball.releasePointerCapture(event.pointerId);
    ball.classList.remove("isDragging");
    hideSoon();
  }

  // Like a normal scrollbar, clicking the track pages up or down by about a screen
  // (toward the click) instead of jumping straight to that spot.
  function onTrackDown(event: PointerEvent) {
    if (event.target !== track) return;
    const direction = event.clientY < ball.getBoundingClientRect().top ? -1 : 1;
    window.scrollBy({ top: direction * window.innerHeight * 0.9, behavior: "smooth" });
  }

  // Hovering the right edge reveals the gumball (as macOS shows its scrollbar), so it can
  // be grabbed without scrolling first.
  function onEnter() {
    hovering = true;
    track.classList.add("isVisible");
    window.clearTimeout(hideTimer);
  }

  function onLeave() {
    hovering = false;
    hideSoon();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", schedule);
  const resizeObserver = new ResizeObserver(schedule);
  resizeObserver.observe(document.body);
  ball.addEventListener("pointerdown", onBallDown);
  ball.addEventListener("pointermove", onBallMove);
  ball.addEventListener("pointerup", onBallUp);
  ball.addEventListener("pointercancel", onBallUp);
  track.addEventListener("pointerdown", onTrackDown);
  track.addEventListener("pointerenter", onEnter);
  track.addEventListener("pointerleave", onLeave);
  render();

  return () => {
    cancelAnimationFrame(frame);
    window.clearTimeout(hideTimer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", schedule);
    resizeObserver.disconnect();
    ball.removeEventListener("pointerdown", onBallDown);
    ball.removeEventListener("pointermove", onBallMove);
    ball.removeEventListener("pointerup", onBallUp);
    ball.removeEventListener("pointercancel", onBallUp);
    track.removeEventListener("pointerdown", onTrackDown);
    track.removeEventListener("pointerenter", onEnter);
    track.removeEventListener("pointerleave", onLeave);
  };
}
