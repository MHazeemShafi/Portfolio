import { projects } from "../../data/projects";
import SectionHeader from "../layout/SectionHeader";
import SwipeCarousel from "../ui/SwipeCarousel";
import ProjectSlide from "./ProjectSlide";

export default function ProjectCatalogue() {
  return (
    <section id="projects" className="section projects-section" style={{ "--accent-current": "var(--accent-projects)" }}>
      <SectionHeader number="05" title="SELECTED WORK" accentVar="--accent-projects" />

      <div className="project-catalogue reveal-stagger">
        <SwipeCarousel
          showArrows={true}
          showDots={true}
          onSlideChange={() => {}}
        >
          {projects.map((project, index) => (
            <ProjectSlide key={project.name} project={project} index={index} accentVar="--accent-projects" />
          ))}
        </SwipeCarousel>
      </div>
    </section>
  );
}