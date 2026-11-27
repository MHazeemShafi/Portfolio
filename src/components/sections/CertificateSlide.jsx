const isPdfFile = (path) => typeof path === "string" && path.toLowerCase().endsWith(".pdf");

export default function CertificateSlide({ certificate, accentVar }) {
  const pdf = isPdfFile(certificate.image);

  return (
    <article className="cert-slide" style={{ "--accent-current": `var(${accentVar})` }}>
      <div className="cert-card">
        <div className="cert-image">
          {pdf ? (
            <div className="cert-image-pdf">PDF</div>
          ) : (
            <img src={certificate.image} alt={`Certificate: ${certificate.title}`} loading="lazy" />
          )}
          <div className="cert-overlay">
            <button className="cert-view-btn" type="button">VIEW</button>
          </div>
        </div>
        <div className="cert-content">
          <span className="cert-category">{certificate.category.toUpperCase()}</span>
          <h3 className="cert-title">{certificate.title.toUpperCase()}</h3>
          <p className="cert-institution">{certificate.institution.toUpperCase()}</p>
          <span className="cert-year">{certificate.year}</span>
          {certificate.details && <p className="cert-details">{certificate.details.toUpperCase()}</p>}
        </div>
      </div>
    </article>
  );
}