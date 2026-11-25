import { profile as p } from "../content/profile.mjs";
import { projects } from "../content/projects.mjs";
import { External } from "./Elements";
export function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot"></span> SOFTWARE ENGINEERING · CLOUD ·
            AI
          </div>
          <h1>
            Hi, I’m
            <br />
            <span className="gradient-text">{p.name}.</span>
          </h1>
          <h2>{p.title}</h2>
          <p>{p.intro}</p>
          <div className="actions">
            <a className="button primary shine" href="#work">
              Explore my work <span>↘</span>
            </a>
            <a
              className="button"
              href="/resume/Tejasvi_Gupta_Resume.pdf"
              data-resume
              download
            >
              Download résumé ↓
            </a>
          </div>
          <div className="hero-index">
            <span>01</span>
            <span></span> BUILDING WITH PURPOSE
          </div>
          <div className="socials">
            {p.socials.map(([label, url]) => (
              <External key={url} url={url} label={label} />
            ))}
          </div>
        </div>
        <div className="portrait-stage">
          <div className="orbit orbit-a" aria-hidden="true">
            <i></i>
          </div>
          <div className="orbit orbit-b" aria-hidden="true">
            <i></i>
          </div>
          <div className="orbit orbit-c" aria-hidden="true"></div>
          <div className="portrait glass interactive">
            <div className="portrait-img">
              <picture>
                <source type="image/avif" media="(max-width: 760px)" srcSet="/images/profile-small.avif" />
              <img
                src="/images/profile.webp"
                srcSet="/images/profile-small.webp 640w, /images/profile.webp 1200w" sizes="(max-width: 760px) 300px, 420px" fetchPriority="high"
                alt="Tejasvi Gupta outdoors with mountains in the background"
                width="1200"
                height="1600"
              />
              </picture>
            </div>
            <div className="portrait-label">
              <span className="brand-mark">TG.</span>
              <div>
                <strong>Building what’s next.</strong>
                <small>
                  KIET · CSE · Class of {p.graduation.split(" ").pop()}
                </small>
              </div>
            </div>
          </div>
          {p.currentFocus && (
            <span className="portrait-tag glass">
              <span className="status-dot"></span> {p.currentFocus}
            </span>
          )}
        </div>
      </section>
      <section className="stats" aria-label="Academic highlights">
        {[
          [p.cgpa, "CGPA"],
          [String(projects.length).padStart(2, "0"), "Selected projects"],
          [p.rating, "CodeChef rating*"],
          [p.graduation.split(" ").pop(), "Graduation"],
        ].map(([v, l]) => (
          <div key={l} className="glass interactive stat">
            <strong>{v}</strong>
            <span>{l}</span>
          </div>
        ))}
      </section>
      <p className="footnote">*Résumé-reported rating; not live.</p>
    </>
  );
}
