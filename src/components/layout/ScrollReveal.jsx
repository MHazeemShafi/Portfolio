import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  useEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll("[data-reveal], [data-text-reveal='scroll']")
    );
    const immediateText = Array.from(
      document.querySelectorAll("[data-text-reveal='immediate']")
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      revealTargets.forEach((el) => el.classList.add("is-revealed"));
      immediateText.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    // Trigger hero immediate text animations on first paint
    const rafHero = requestAnimationFrame(() => {
      immediateText.forEach((el) => el.classList.add("is-revealed"));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    revealTargets.forEach((el) => observer.observe(el));

    // GSAP ScrollTrigger parallax on geometric blocks and project preview images
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const speed = Number(el.getAttribute("data-parallax")) || 28;
        gsap.fromTo(
          el,
          { y: -speed * 0.4 },
          {
            y: speed,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section, article") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    });

    return () => {
      cancelAnimationFrame(rafHero);
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
}
