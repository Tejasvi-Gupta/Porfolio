import { profile as p } from "../content/profile.mjs";
export function Contact() {
  return (
    <>
      <section id="contact" className="glass contact">
        <span className="eyebrow">05 / LET’S CONNECT</span>
        <h2>
          Let’s build something
          <br />
          <span className="gradient-text">meaningful.</span>
        </h2>
        <p>Interested in software engineering, cloud and AI opportunities.</p>
        <div className="actions">
          <a
            className="button primary shine"
            data-email-me
            href={`mailto:${p.email}`}
          >
            Email me ↗
          </a>
          <button className="button" data-copy>
            Copy email
          </button>
          <button className="button" data-view-resume>
            View résumé
          </button>
        </div>
        <p className="contact-address">
          <a href={`mailto:${p.email}`}>{p.email}</a>
        </p>
        <p className="footnote">
          Current résumé PDF is an earlier version; portfolio includes newer
          projects and experience.
        </p>
      </section>
    </>
  );
}
