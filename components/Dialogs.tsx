import { profile as p } from "../content/profile.mjs";
export function Dialogs() {
  return (
    <>
      <dialog id="project-dialog" aria-label="Project case study">
        <div className="dialog-inner">
          <button className="close" data-close aria-label="Close case study">
            ×
          </button>
          <div id="project-detail"></div>
        </div>
      </dialog>
      <dialog id="command-dialog" aria-label="Quick navigation">
        <div className="dialog-inner">
          <button
            className="close"
            data-close
            aria-label="Close command palette"
          >
            ×
          </button>
          <h2>Quick navigation</h2>
          <input
            id="command-search"
            placeholder="Search pages and projects…"
            aria-label="Search commands"
          />
          <div id="commands"></div>
        </div>
      </dialog>
      <dialog id="email-dialog" aria-labelledby="email-title">
        <div className="dialog-inner">
          <button className="close" data-close aria-label="Close contact form">
            ×
          </button>
          <span className="eyebrow">CONTACT / 01</span>
          <h2 id="email-title">Email me</h2>
          <p>Send a message about opportunities, projects or collaborations.</p>
          <form id="email-form" className="email-form">
            <div className="email-fields">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Jane Doe"
                />
              </label>
              <label>
                Your email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="jane@example.com"
                />
              </label>
            </div>
            <label>
              Subject
              <input
                name="subject"
                required
                maxLength={150}
                placeholder="Software engineering opportunity"
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows={5}
                required
                maxLength={2000}
                placeholder="Tell me a little about your message…"
              ></textarea>
            </label>
            <p className="footnote" id="email-mode"></p>
            <div className="actions">
              <button
                type="submit"
                className="button primary shine"
                id="email-submit"
              >
                Open email draft ↗
              </button>
              <a className="button" id="email-draft" href={`mailto:${p.email}`}>
                Use email app ↗
              </a>
            </div>
            <p id="email-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </dialog>
      <dialog id="resume-dialog" aria-label="Résumé viewer">
        <div className="dialog-inner">
          <button className="close" data-close aria-label="Close résumé">
            ×
          </button>
          <h2>Résumé</h2>
          <p>Uploaded résumé · earlier version</p>
          <a
            className="button"
            data-resume
            href="/resume/Tejasvi_Gupta_Resume.pdf"
            download
          >
            Download PDF ↓
          </a>
          <iframe id="resume-frame" title="Résumé PDF"></iframe>
        </div>
      </dialog>
    </>
  );
}
