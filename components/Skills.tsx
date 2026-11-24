import { profile as p } from "../content/profile.mjs";
import { Chips } from "./Elements";
export function Skills() {
  return (
    <>
      <section id="skills" className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">02 / TOOLKIT</span>
            <h2>
              Built with curiosity<span>.</span>
            </h2>
          </div>
          <p>Explore the technologies behind my work.</p>
        </div>
        <div className="glass skills-panel">
          <div className="core">
            {p.core.map((s) => (
              <button key={s} className="skill interactive" data-skill={s}>
                <span aria-hidden="true" className="skill-symbol">
                  {p.skillSymbols[s as keyof typeof p.skillSymbols] ?? s}
                </span>
                {s}
              </button>
            ))}
          </div>
          <div id="skill-result" aria-live="polite">
            Select a technology to explore related projects.
          </div>
          <details>
            <summary>Explore all technical skills</summary>
            <div className="all-skills">
              {Object.entries(p.skills).map(([name, items]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <Chips values={items} />
                </div>
              ))}
            </div>
            <p className="footnote">
              Includes project experience and areas of ongoing learning.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
