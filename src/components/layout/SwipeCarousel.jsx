import { useCallback, useRef } from "react";

export default function SwipeCarousel({
  items,
  activeIndex,
  onChange,
  label,
  renderSlide,
}) {
  const viewportRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, moved: false });
  const total = items.length;

  const goPrev = useCallback(() => {
    if (total === 0) return;
    onChange((activeIndex - 1 + total) % total);
  }, [activeIndex, onChange, total]);

  const goNext = useCallback(() => {
    if (total === 0) return;
    onChange((activeIndex + 1) % total);
  }, [activeIndex, onChange, total]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  const onPointerDown = (e) => {
    if (e.target instanceof Element && e.target.closest("a, button")) return;
    dragRef.current = { active: true, startX: e.clientX, moved: false };
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    if (Math.abs(e.clientX - dragRef.current.startX) > 12) {
      dragRef.current.moved = true;
    }
  };

  const onPointerUp = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.active = false;
    if (Math.abs(dx) > 48) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      className="swiss-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="carousel-toolbar">
        <div className="carousel-counter" aria-live="polite">
          <span className="counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="counter-sep">/</span>
          <span className="counter-total">{String(total).padStart(2, "0")}</span>
        </div>

        <div className="carousel-dots" role="tablist" aria-label={`${label} slides`}>
          {items.map((item, idx) => (
            <button
              key={item.name || item.title || idx}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Go to item ${idx + 1}`}
              className={`carousel-dot${idx === activeIndex ? " is-active" : ""}`}
              onClick={() => onChange(idx)}
            />
          ))}
        </div>

        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={goPrev}
            aria-label="Previous item"
            data-cursor="PREV"
          >
            ←
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={goNext}
            aria-label="Next item"
            data-cursor="NEXT"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="carousel-viewport"
        data-cursor="DRAG"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="carousel-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {items.map((item, idx) => (
            <div
              className={`carousel-slide${idx === activeIndex ? " is-active" : ""}`}
              key={item.name || item.title || idx}
              aria-hidden={idx !== activeIndex}
            >
              {renderSlide(item, idx, idx === activeIndex)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
