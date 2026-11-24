/* V2 motion controller. All effects are progressive enhancements. */
(() => {
  const root = document.documentElement,
    toggle = document.querySelector("[data-motion]");
  if (!toggle) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)"),
    fine = matchMedia("(pointer: fine)");
  let preference = null;
  try {
    preference = localStorage.getItem("arctic-effects");
  } catch {}
  let paused = false;
  const cards = [...document.querySelectorAll(".interactive")];
  const reset = (c) => {
    for (const key of ["--rx", "--ry", "--x", "--y"])
      c.style.removeProperty(key);
  };
  function sync() {
    paused = reduce.matches || preference === "paused";
    root.dataset.effects = paused ? "paused" : "active";
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute(
      "aria-label",
      paused ? "Resume visual effects" : "Pause visual effects",
    );
    toggle.title = paused ? "Resume visual effects" : "Pause visual effects";
    toggle.textContent = paused ? "▶" : "Ⅱ";
    if (paused) cards.forEach(reset);
    if (reduce.matches) {
      toggle.disabled = true;
      toggle.title = "Motion disabled by system preference";
      toggle.setAttribute("aria-label", toggle.title);
    } else toggle.disabled = false;
  }
  toggle.addEventListener("click", () => {
    preference = paused ? "active" : "paused";
    try {
      localStorage.setItem("arctic-effects", preference);
    } catch {}
    sync();
  });
  reduce.addEventListener("change", sync);
  sync();
  cards.forEach((c) => {
    let raf = 0;
    let last;
    c.addEventListener("pointermove", (e) => {
      if (paused || !fine.matches || e.pointerType === "touch") return;
      last = [e.clientX, e.clientY];
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (paused) return;
        const r = c.getBoundingClientRect(),
          x = Math.max(0, Math.min(1, (last[0] - r.left) / r.width)),
          y = Math.max(0, Math.min(1, (last[1] - r.top) / r.height));
        c.style.setProperty("--x", `${x * 100}%`);
        c.style.setProperty("--y", `${y * 100}%`);
        c.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
        c.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
      });
    });
    c.addEventListener("pointerleave", () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      reset(c);
    });
  });
  const meter = document.querySelector(".scroll-meter"),
    links = [...document.querySelectorAll(".nav nav a")],
    targets = links.map((a) => document.querySelector(a.getAttribute("href")));
  let queued = false;
  function scroll() {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    meter.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    let current = -1;
    targets.forEach((s, i) => {
      if (s && s.getBoundingClientRect().top <= innerHeight * 0.35) current = i;
    });
    links.forEach((a, i) => {
      if (i === current) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }
  function schedule() {
    if (!queued) {
      queued = true;
      requestAnimationFrame(scroll);
    }
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
})();
