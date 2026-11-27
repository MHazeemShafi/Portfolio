import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const curtainConfigs = [
  // 1. Hero → About: Vertical Split
  {
    trigger: "#about",
    start: "top 50%",
    type: "vertical-split",
    panels: 2,
  },
  // 2. About → Education: Diagonal
  {
    trigger: "#education",
    start: "top 50%",
    type: "diagonal",
  },
  // 3. Education → Skills: Horizontal Blinds
  {
    trigger: "#skills",
    start: "top 50%",
    type: "horizontal-blinds",
    strips: 4,
  },
  // 4. Skills → Projects: Vertical Blinds
  {
    trigger: "#projects",
    start: "top 50%",
    type: "vertical-blinds",
    strips: 5,
  },
  // 5. Projects → Certifications: Radial Iris
  {
    trigger: "#certifications",
    start: "top 50%",
    type: "radial",
  },
  // 6. Certifications → Experience: Diagonal Reverse
  {
    trigger: "#experience",
    start: "top 50%",
    type: "diagonal-reverse",
  },
  // 7. Experience → Contact: Horizontal Split
  {
    trigger: "#contact",
    start: "top 50%",
    type: "horizontal-split",
    panels: 2,
  },
];

function CurtainPanel({ index, total, type, initialStyle }) {
  const style = {
    position: "absolute",
    top: 0,
    background: "var(--ink)",
    willChange: "clip-path, transform, opacity",
    opacity: 0, // Initially hidden
    ...initialStyle,
  };

  switch (type) {
    case "vertical-split":
      return (
        <div
          className={`curtain-panel curtain-panel--${index === 0 ? "left" : "right"}`}
          style={{
            ...style,
            width: "50%",
            [index === 0 ? "left" : "right"]: 0,
            bottom: 0,
            transformOrigin: index === 0 ? "right center" : "left center",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      );
    case "horizontal-split":
      return (
        <div
          className={`curtain-panel curtain-panel--${index === 0 ? "top" : "bottom"}`}
          style={{
            ...style,
            height: "50%",
            left: 0,
            right: 0,
            [index === 0 ? "top" : "bottom"]: 0,
            transformOrigin: index === 0 ? "center bottom" : "center top",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      );
    case "horizontal-blinds":
      return (
        <div
          className="curtain-strip"
          style={{
            ...style,
            left: 0,
            right: 0,
            height: `${100 / total}%`,
            top: `${(index * 100) / total}%`,
            transformOrigin: "left center",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      );
    case "vertical-blinds":
      return (
        <div
          className="curtain-strip"
          style={{
            ...style,
            top: 0,
            bottom: 0,
            width: `${100 / total}%`,
            left: `${(index * 100) / total}%`,
            transformOrigin: "top center",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      );
    default:
      return null;
  }
}

function CurtainLayer({ config, reducedMotion }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!config || !containerRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Initially hide all curtain elements
      const panels = containerRef.current.querySelectorAll(".curtain-panel, .curtain-strip");
      const diagonal = containerRef.current.querySelector(".curtain-diagonal");
      const diagonalReverse = containerRef.current.querySelector(".curtain-diagonal-reverse");
      const radial = containerRef.current.querySelector(".curtain-radial");

      gsap.set([...panels, diagonal, diagonalReverse, radial], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start,
          once: true,
          onEnter: () => {
            // Animation handled by GSAP
          },
        },
      });

      switch (config.type) {
        case "vertical-split":
          tl.set(panels, { opacity: 1 })
            .fromTo(
              panels,
              { scaleX: 0 },
              { scaleX: 1, duration: 1, ease: "power3.inOut", stagger: 0.1 }
            )
            .to(
              panels,
              { scaleX: 0, duration: 0.8, ease: "power3.inOut", stagger: -0.1, delay: 0.2 }
            )
            .set(panels, { opacity: 0 });
          break;
        case "diagonal":
          tl.set(diagonal, { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" })
            .to(diagonal, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power3.inOut" })
            .to(diagonal, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", duration: 0.8, ease: "power3.inOut", delay: 0.2 })
            .set(diagonal, { opacity: 0 });
          break;
        case "diagonal-reverse":
          tl.set(diagonalReverse, { opacity: 1, clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)" })
            .to(diagonalReverse, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power3.inOut" })
            .to(diagonalReverse, { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)", duration: 0.8, ease: "power3.inOut", delay: 0.2 })
            .set(diagonalReverse, { opacity: 0 });
          break;
        case "horizontal-blinds":
          tl.set(panels, { opacity: 1 })
            .fromTo(
              panels,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: "power3.inOut", stagger: { each: 0.08, from: "center" } }
            )
            .to(
              panels,
              { scaleX: 0, duration: 0.6, ease: "power3.inOut", stagger: { each: 0.05, from: "center" }, delay: 0.2 }
            )
            .set(panels, { opacity: 0 });
          break;
        case "vertical-blinds":
          tl.set(panels, { opacity: 1 })
            .fromTo(
              panels,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.8, ease: "power3.inOut", stagger: { each: 0.06, from: "center" } }
            )
            .to(
              panels,
              { scaleY: 0, duration: 0.6, ease: "power3.inOut", stagger: { each: 0.04, from: "center" }, delay: 0.2 }
            )
            .set(panels, { opacity: 0 });
          break;
        case "radial":
          tl.set(radial, { opacity: 1, clipPath: "circle(0% at 50% 50%)" })
            .to(radial, { clipPath: "circle(150% at 50% 50%)", duration: 1.2, ease: "power3.inOut" })
            .to(radial, { clipPath: "circle(0% at 50% 50%)", duration: 0.8, ease: "power3.inOut", delay: 0.2 })
            .set(radial, { opacity: 0 });
          break;
      }
    });

    return () => ctx.revert();
  }, [config, reducedMotion]);

  if (!config || reducedMotion) return null;

  const className = `curtain-layer curtain-${config.type}`;

  return (
    <div ref={containerRef} className={className} style={{ "--accent-current": "var(--ink)" }}>
      {config.type === "vertical-split" && (
        <>
          <CurtainPanel index={0} total={2} type="vertical-split" />
          <CurtainPanel index={1} total={2} type="vertical-split" />
        </>
      )}
      {config.type === "horizontal-split" && (
        <>
          <CurtainPanel index={0} total={2} type="horizontal-split" />
          <CurtainPanel index={1} total={2} type="horizontal-split" />
        </>
      )}
      {config.type === "horizontal-blinds" && (
        Array.from({ length: config.strips || 4 }).map((_, i) => (
          <CurtainPanel key={i} index={i} total={config.strips || 4} type="horizontal-blinds" />
        ))
      )}
      {config.type === "vertical-blinds" && (
        Array.from({ length: config.strips || 5 }).map((_, i) => (
          <CurtainPanel key={i} index={i} total={config.strips || 5} type="vertical-blinds" />
        ))
      )}
      {config.type === "diagonal" && <div className="curtain-diagonal" />}
      {config.type === "diagonal-reverse" && <div className="curtain-diagonal-reverse" />}
      {config.type === "radial" && <div className="curtain-radial" />}
    </div>
  );
}

export default function CurtainTransition() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      {curtainConfigs.map((config, index) => (
        <CurtainLayer key={index} config={config} reducedMotion={reducedMotion} />
      ))}
    </>
  );
}