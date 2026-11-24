export function Navigation() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="aurora" aria-hidden="true"></div>
      <div className="ice-grid" aria-hidden="true"></div>
      <div className="scroll-meter" aria-hidden="true"></div>
      <header className="nav glass">
        <a className="brand brand-lockup" href="#home" aria-label="TG. Home">
          <span className="brand-mark">TG.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#journey">Journey</a>
          <a href="#about">About</a>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn motion-toggle"
            data-motion
            aria-label="Pause visual effects"
            aria-pressed="false"
            title="Pause visual effects"
          >
            Ⅱ
          </button>
          <button className="icon-btn" data-theme aria-label="Switch theme">
            ☀
          </button>
        </div>
      </header>
    </>
  );
}
