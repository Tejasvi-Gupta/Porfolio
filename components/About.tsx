import { profile as p } from "../content/profile.mjs";
import { Chips } from "./Elements";
export function About() {
  return (
    <>
      <section id="about" className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">04 / ABOUT</span>
            <h2>
              Beyond the code<span>.</span>
            </h2>
          </div>
        </div>
        <div className="about-grid">
          <article className="glass panel">
            <h3>My story</h3>
            <p>{p.about}</p>
            <p>
              Software engineering is my primary focus, with cloud and AI as
              complementary interests.
            </p>
            <h3>Education</h3>
            {p.education.map(([name, description]) => (
              <div className="education" key={name}>
                <strong>{name}</strong>
                <small>{description}</small>
              </div>
            ))}
          </article>
          <article className="glass panel">
            <h3>Milestones</h3>
            <ul className="milestones">
              {p.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3>Certifications</h3>
            <p className="footnote">
              Résumé-listed credentials; individual verification links pending.
            </p>
            <Chips values={p.certifications} />
          </article>
        </div>
      </section>
    </>
  );
}
