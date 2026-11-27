import { useEffect, useRef, useState } from "react";
import AnimatedText from "../layout/AnimatedText";
import { projects } from "../../data/projects";
import airmeshImg from "../../assets/projects/airmesh.png";
import pixelshrinkImg from "../../assets/projects/pixelshrink.png";
import nexsightImg from "../../assets/projects/nexsight.png";

const projectImages = {
  AIRMESH: airmeshImg,
  PixelShrink: pixelshrinkImg,
  NexSight: nexsightImg,
};

const categories = ["All", "Web Platform", "Web Utility", "Computer Vision"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [previewProject, setPreviewProject] = useState(null);
  const showcaseRef = useRef(null);

  const visibleProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  // Ensure filtered/newly mounted project entries reveal reliably
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container) return;
    const nodes = container.querySelectorAll("[data-reveal]");
    const raf = requestAnimationFrame(() => {
      nodes.forEach((el) => el.classList.add("is-revealed"));
    });
    return () => cancelAnimationFrame(raf);
  }, [filter]);

  useEffect(() => {
    if (!previewProject) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setPreviewProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewProject]);

  return (
    <section id="projects" className="nb-section nb-projects" data-surface="silver">
      <div className="nb-container">
        <div className="nb-projects-top" data-reveal="fade-up">
          <header className="nb-section-header">
            <span className="nb-section-num">05</span>
            <h2 className="nb-section-title">
              <AnimatedText text="Selected Projects" mode="words" />
            </h2>
          </header>

          <div className="nb-filter-bar" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`nb-filter-pill${filter === cat ? " is-active" : ""}`}
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="nb-projects-showcase" ref={showcaseRef}>
          {visibleProjects.map((project, idx) => {
            const layoutClass =
              idx % 3 === 0
                ? "is-layout-wide"
                : idx % 3 === 1
                  ? "is-layout-reverse"
                  : "is-layout-offset";

            return (
              <article
                key={project.name}
                className={`nb-project-entry ${layoutClass} is-revealed`}
              >
                <div className="nb-project-media">
                  <div className="nb-project-meta-bar">
                    <span className="nb-idx-badge">{project.number}</span>
                    <span className="nb-project-cat">{project.category}</span>
                  </div>

                  <button
                    type="button"
                    className="nb-project-frame"
                    onClick={() => setPreviewProject(project)}
                    aria-label={`Inspect preview of ${project.name}`}
                  >
                    <img
                      src={projectImages[project.name]}
                      alt={`Screenshot of ${project.name}`}
                    />
                  </button>
                </div>

                <div className="nb-project-content">
                  <h3 className="nb-project-name">{project.name}</h3>
                  <p className="nb-project-desc">{project.description}</p>

                  <ul className="nb-project-features">
                    {project.features.map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>

                  <div className="nb-project-tech">
                    {project.technologies.map((tech) => (
                      <span className="nb-tech-label" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="nb-project-links">
                    <a
                      className="nb-btn nb-btn-black"
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GITHUB ↗
                    </a>
                    {project.live && (
                      <a
                        className="nb-btn nb-btn-red"
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LIVE WEBSITE ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {previewProject && (
        <div
          className="nb-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.name} preview`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPreviewProject(null);
          }}
        >
          <div className="nb-modal-dialog">
            <div className="nb-modal-head">
              <div>
                <span className="nb-modal-kicker">
                  PROJECT {previewProject.number} · {previewProject.category}
                </span>
                <h3>{previewProject.name}</h3>
              </div>
              <button
                type="button"
                className="nb-btn nb-btn-red"
                onClick={() => setPreviewProject(null)}
                autoFocus
              >
                CLOSE ✕
              </button>
            </div>
            <div className="nb-modal-body">
              <img
                src={projectImages[previewProject.name]}
                alt={`Large preview of ${previewProject.name}`}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

