import airmeshImg from "../../../projectsimg/airmesh.png";
import pixelshrinkImg from "../../../projectsimg/pixelshrink.png";
import nexsightImg from "../../../projectsimg/nexsight.png";

const projectImages = {
  AIRMESH: airmeshImg,
  PixelShrink: pixelshrinkImg,
  NexSight: nexsightImg,
};

export default function ProjectSlide({ project, index, accentVar }) {
  const isFeatured = project.featured;
  const layoutClass = isFeatured ? "" : (index % 2 === 0 ? "project-slide--mirror" : "");
  const stackedClass = !isFeatured && index === 2 ? "project-slide--stacked" : "";

  return (
    <article className={`project-slide ${layoutClass} ${stackedClass}`} style={{ "--accent-current": `var(${accentVar})` }}>
      <div className="project-image">
        <img
          src={projectImages[project.name]}
          alt={`Preview of ${project.name}`}
          loading={index === 0 ? "eager" : "lazy"}
        />
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-content">
        {project.highlight && (
          <span className="project-highlight">{project.highlight.toUpperCase()}</span>
        )}
        <h3 className="project-title">{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((technology) => (
            <span className="tag tag--tech" key={technology}>{technology.toUpperCase()}</span>
          ))}
        </div>
        <div className="project-links">
          <a className="btn-link" href={project.repository} target="_blank" rel="noreferrer">
            VIEW SOURCE
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          {project.live && (
            <a className="btn-link" href={project.live} target="_blank" rel="noreferrer">
              LIVE DEMO
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}