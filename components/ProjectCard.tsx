import { projects } from "../content/projects.mjs";
import { Chips, External } from "./Elements";
import { Diagram } from "./Diagram";
export type Project = (typeof projects)[number];
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="glass interactive project" data-category={p.category}>
      <button
        className="project-cover"
        data-project={p.id}
        aria-label={"Preview " + p.name + " case study"}
      >
        {p.image ? (
          <img
            src={p.image} srcSet={p.image === "/images/netra.webp" ? "/images/netra-small.webp 720w, /images/netra.webp 1600w" : undefined} sizes="(max-width: 760px) 95vw, 600px"
            alt={p.name + " landing page screenshot"}
            loading="lazy"
          />
        ) : (
          <Diagram kind={p.cover} />
        )}
        <span className="cover-arrow">↗</span>
      </button>
      <div className="project-body">
        <span className="eyebrow">
          {p.tag} / {p.category}
        </span>
        <h3>{p.name}</h3>
        <p>{p.summary}</p>
        <Chips values={p.stack.slice(0, 5)} />
        <div className="actions">
          <a className="text-button" href={"/projects/" + p.id + "/"}>
            Case study ↗
          </a>
          <External className="text-button" url={p.repo} label="Source code" />
          {p.demo && (
            <External className="text-button" url={p.demo} label="Live app" />
          )}
        </div>
      </div>
    </article>
  );
}
