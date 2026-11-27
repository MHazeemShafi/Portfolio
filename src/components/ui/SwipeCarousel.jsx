import { useState, useRef, useEffect, useCallback, useMemo } from "react";

export default function SwipeCarousel({
  children,
  className = "",
  onSlideChange,
  showArrows = true,
  showDots = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const trackRef = useRef(null);
  const slidesRef = useRef([]);
  const resizeObserverRef = useRef(null);

  const updateSlideWidth = useCallback(() => {
    if (trackRef.current && slidesRef.current.length > 0) {
      const width = trackRef.current.clientWidth;
      setSlideWidth(width);
    }
  }, []);

  useEffect(() => {
    updateSlideWidth();
    resizeObserverRef.current = new ResizeObserver(updateSlideWidth);
    if (trackRef.current) {
      resizeObserverRef.current.observe(trackRef.current);
    }
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [updateSlideWidth]);

  const goToSlide = useCallback((index, animate = true) => {
    const clampedIndex = Math.max(0, Math.min(index, slidesRef.current.length - 1));
    setCurrentIndex(clampedIndex);
    if (trackRef.current) {
      trackRef.current.style.transition = animate && !reducedMotion
        ? `transform var(--dur-base) var(--ease-out)`
        : "none";
      trackRef.current.style.transform = `translateX(-${clampedIndex * slideWidth}px)`;
    }
    onSlideChange?.(clampedIndex);
  }, [slideWidth, onSlideChange, reducedMotion]);

  const handleWheel = useCallback((e) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    goToSlide(currentIndex + direction);
  }, [currentIndex, goToSlide]);

  const handleTouchStart = useCallback((e) => {
    if (reducedMotion) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  }, [reducedMotion]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || reducedMotion) return;
    const deltaX = e.touches[0].clientX - startX;
    setTranslateX(deltaX);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-currentIndex * slideWidth + deltaX}px)`;
    }
  }, [isDragging, startX, currentIndex, slideWidth, reducedMotion]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || reducedMotion) return;
    setIsDragging(false);
    const threshold = slideWidth * 0.2;
    let newIndex = currentIndex;
    if (translateX < -threshold && currentIndex < slidesRef.current.length - 1) {
      newIndex = currentIndex + 1;
    } else if (translateX > threshold && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }
    goToSlide(newIndex);
    setTranslateX(0);
  }, [isDragging, translateX, currentIndex, slideWidth, goToSlide, reducedMotion]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSlide(slidesRef.current.length - 1);
    }
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const slides = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);

  useEffect(() => {
    slidesRef.current = slides;
  }, [slides]);

  return (
    <div className={`swipe-carousel ${className}`} onWheel={handleWheel}>
      <div
        className="swipe-track"
        ref={trackRef}
        style={{
          transform: isDragging
            ? `translateX(${-currentIndex * slideWidth + translateX}px)`
            : `translateX(-${currentIndex * slideWidth}px)`,
          transition: isDragging || reducedMotion ? "none" : "transform var(--dur-base) var(--ease-out)",
        }}
        role="list"
        aria-roledescription="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="swipe-slide"
            role="listitem"
            aria-hidden={index !== currentIndex}
            tabIndex={index === currentIndex ? 0 : -1}
          >
            {slide}
          </div>
        ))}
      </div>

      {showDots && slides.length > 1 && (
        <div className="swipe-dots" aria-label="Slide navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`swipe-dot${index === currentIndex ? " swipe-dot--active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {showArrows && slides.length > 1 && (
        <div className="swipe-arrows" aria-hidden="true">
          <button
            className="swipe-arrow"
            onClick={() => goToSlide(currentIndex - 1)}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="swipe-arrow"
            onClick={() => goToSlide(currentIndex + 1)}
            disabled={currentIndex === slides.length - 1}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}