const items = [
  "ARTIFICIAL INTELLIGENCE",
  "MACHINE LEARNING",
  "DEEP LEARNING",
  "COMPUTER VISION",
  "PYTHON",
  "JAVASCRIPT",
  "REACT",
  "NODE.JS",
  "VITE",
  "HTML",
  "CSS",
  "GIT",
  "GITHUB",
  "REST APIS",
  "DATA ANALYSIS",
];

export default function Marquee() {
  const track = [...items, ...items];

  return (
    <div className="nb-marquee" aria-hidden="true" data-surface="midnight">
      <div className="nb-marquee-track">
        {track.map((item, idx) => (
          <span className="nb-marquee-item" key={`${item}-${idx}`}>
            <span>{item}</span>
            <span className="nb-marquee-dot">■</span>
          </span>
        ))}
      </div>
    </div>
  );
}
