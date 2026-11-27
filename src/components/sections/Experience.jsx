import { useEffect, useState } from "react";
import AnimatedText from "../layout/AnimatedText";
import { certificates } from "../../data/certificates";

const timeline = [
  {
    period: "2026 — 2029",
    kind: "EDUCATION",
    title: "B.E. in Computer Science Engineering",
    org: "P.A. College of Engineering, Mangalore",
    detail: "2nd Year Undergraduate focused on software engineering, algorithms, computer architecture, and applied systems.",
  },
  {
    period: "NOV 2026",
    kind: "HACKATHON",
    title: "The Founder's Arena",
    org: "P.A. College of Engineering, Mangalore",
    detail: "Two-day Hackathon and Startup Pitch Competition (17–18 November 2026).",
  },
  {
    period: "NOV 2026",
    kind: "WORKSHOP",
    title: "Autonomous Mobile Robotics Workshop",
    org: "IEEE Week 2026 · P.A. College of Engineering",
    detail: "Hands-on technical workshop on autonomous mobile robotics systems.",
  },
  {
    period: "SEP 2026",
    kind: "WORKSHOP",
    title: "Code It. Secure It.",
    org: "P.A. College of Engineering",
    detail: "Two-day session on software development and cyber awareness.",
  },
];

const isPdfFile = (path) => typeof path === "string" && path.toLowerCase().endsWith(".pdf");

const resolvePublicAsset = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
};

export default function Experience() {
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    if (!selectedCert) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCert]);

  return (
    <section id="experience" className="nb-section nb-experience" data-surface="silver">
      <div className="nb-container">
        <header className="nb-section-header" data-reveal="fade-up">
          <span className="nb-section-num">04</span>
          <h2 className="nb-section-title">
            <AnimatedText text="Experience & Education" mode="words" />
          </h2>
        </header>

        <div className="nb-timeline" data-reveal="stagger">
          {timeline.map((item) => (
            <article className="nb-timeline-row" key={`${item.title}-${item.period}`}>
              <div className="nb-timeline-meta">
                <span className="nb-timeline-kind">{item.kind}</span>
                <time>{item.period}</time>
              </div>
              <div className="nb-timeline-body">
                <h3>{item.title}</h3>
                <p className="nb-timeline-org">{item.org}</p>
                <p className="nb-timeline-detail">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="nb-certs-block" data-reveal="fade-up">
          <div className="nb-certs-header">
            <h3>Verified Certificates</h3>
            <span>{certificates.length} RECORDS</span>
          </div>

          <div className="nb-certs-list" data-reveal="stagger">
            {certificates.map((cert, idx) => (
              <button
                key={cert.title}
                type="button"
                className="nb-cert-row"
                onClick={() => setSelectedCert(cert)}
              >
                <span className="nb-idx-badge">0{idx + 1}</span>
                <span className="nb-cert-title">{cert.title}</span>
                <span className="nb-cert-inst">
                  {cert.institution} · {cert.year}
                </span>
                <span className="nb-cert-view">VIEW ↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedCert && (
        <div
          className="nb-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedCert(null);
          }}
        >
          <div className="nb-modal-dialog">
            <div className="nb-modal-head">
              <div>
                <span className="nb-modal-kicker">
                  {selectedCert.institution} · {selectedCert.year}
                </span>
                <h3>{selectedCert.title}</h3>
              </div>
              <button
                type="button"
                className="nb-btn nb-btn-red"
                onClick={() => setSelectedCert(null)}
                autoFocus
              >
                CLOSE ✕
              </button>
            </div>
            <div className="nb-modal-body">
              {isPdfFile(selectedCert.image) ? (
                <iframe src={resolvePublicAsset(selectedCert.image)} title={selectedCert.title} />
              ) : (
                <img
                  src={resolvePublicAsset(selectedCert.image)}
                  alt={`Certificate: ${selectedCert.title}`}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

