import { useEffect, useRef, useState } from "react";
import { certificates } from "../../data/certificates";
import SectionHeader from "../layout/SectionHeader";
import SwipeCarousel from "../ui/SwipeCarousel";
import CertificateSlide from "./CertificateSlide";

const isPdfFile = (path) => typeof path === "string" && path.toLowerCase().endsWith(".pdf");

export default function CertificateCatalogue() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);
  const visible = certificates.filter((cert) => filter === "all" || cert.type === filter);

  useEffect(() => {
    if (!selected) return;
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setSelected(null);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  function closeModal() {
    setSelected(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <section id="certifications" className="section certifications-section" style={{ "--accent-current": "var(--accent-certs)" }}>
      <SectionHeader number="06" title="CERTIFICATIONS" accentVar="--accent-certs" />

      <div className="cert-filters" role="group" aria-label="Certificate filters">
        {[
          ["all", "ALL"],
          ["course", "COURSES"],
          ["event", "EVENTS"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className="cert-filter"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="cert-catalogue reveal-stagger">
        <SwipeCarousel showArrows={true} showDots={true}>
          {visible.map((certificate) => (
            <CertificateSlide
              key={certificate.title}
              certificate={certificate}
              accentVar="--accent-certs"
            />
          ))}
        </SwipeCarousel>
      </div>

      {selected && (
        <div
          className="cert-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title.toUpperCase()}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="cert-modal-content">
            <header className="cert-modal-header">
              <h3 className="cert-modal-title">{selected.title.toUpperCase()}</h3>
              <button
                className="cert-modal-close"
                type="button"
                onClick={closeModal}
                autoFocus
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <div className="cert-modal-body">
              {isPdfFile(selected.image) ? (
                <iframe src={selected.image} title={selected.title.toUpperCase()} />
              ) : (
                <img src={selected.image} alt={`Large preview of ${selected.title.toUpperCase()}`} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}