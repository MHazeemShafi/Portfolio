import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: -100, y: -100, tx: -100, ty: -100, visible: false };
    let rafId = null;

    const onMove = (e) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      if (!pos.visible) {
        pos.x = e.clientX;
        pos.y = e.clientY;
        pos.visible = true;
      }
    };

    const onLeave = () => {
      pos.visible = false;
      if (dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
    };

    const tick = () => {
      const dot = dotRef.current;
      if (dot && pos.visible) {
        pos.x += (pos.tx - pos.x) * 0.35;
        pos.y += (pos.ty - pos.y) * 0.35;
        dot.style.opacity = "1";
        dot.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="nb-cursor-dot" aria-hidden="true" />;
}
