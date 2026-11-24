import { projects } from "../content/projects.mjs";
import { ProjectCard } from "./ProjectCard";
export function Work() {
  return (
    <>
      <section id="work" className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">01 / ENGINEERING COLLECTION</span>
            <h2>
              Selected work<span>.</span>
            </h2>
          </div>
          <p>Real projects. Practical problems. Thoughtful engineering.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter projects">
          <button data-filter="all" aria-pressed="true">
            All
          </button>
          <button data-filter="AI">AI</button>
          <button data-filter="Cloud">Cloud</button>
          <button data-filter="Full stack">Full stack</button>
          <button data-filter="Collaborative">Collaborative</button>
        </div>
        <div className="project-grid" data-project-grid>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
