export default function SectionHeader({ number, title, accentVar }) {
  return (
    <header className="section-header reveal-up" style={{ "--accent-current": `var(${accentVar})` }}>
      {number && <span className="section-number">{number}</span>}
      <h2 className="section-title">{title}</h2>
      <span className="section-accent-line" />
    </header>
  );
}