import { profile as p } from "../content/profile.mjs";
export function Journey() {
  return (
    <>
      <section id="journey" className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">03 / PROFESSIONAL JOURNEY</span>
            <h2>
              Always evolving<span>.</span>
            </h2>
          </div>
        </div>
        <div className="journey-grid">
          {p.experience.map((e) => (
            <article key={e.name} className="glass interactive timeline">
              <span className="eyebrow">{e.status}</span>
              <h3>{e.name}</h3>
              <strong>{e.role}</strong>
              <small>{e.date}</small>
              <p>{e.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
