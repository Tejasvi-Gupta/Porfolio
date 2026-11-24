(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s),
    $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const data = JSON.parse($("#portfolio-data").textContent);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const theme = $("button[data-theme]");
  function setTheme(v) {
    root.dataset.theme = v;
    theme.textContent = v === "dark" ? "☀" : "☾";
    theme.setAttribute(
      "aria-label",
      v === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
    try {
      localStorage.setItem("arctic-theme", v);
    } catch {}
  }
  let saved;
  try {
    saved = localStorage.getItem("arctic-theme");
  } catch {}
  setTheme(saved === "light" ? "light" : "dark");
  theme.addEventListener("click", () =>
    setTheme(root.dataset.theme === "dark" ? "light" : "dark"),
  );
  if ("IntersectionObserver" in window && !reduced.matches) {
    document.body.classList.add("reveal-ready");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.05 },
    );
    $$(".section").forEach((s) => obs.observe(s));
  }
  const filterButtons = $$("[data-filter]");
  filterButtons.forEach((b) => {
    b.setAttribute("aria-pressed", b.dataset.filter === "all");
    b.addEventListener("click", () => {
      filterButtons.forEach((x) => x.setAttribute("aria-pressed", x === b));
      $$("[data-category]").forEach(
        (c) =>
          (c.hidden =
            b.dataset.filter !== "all" &&
            !c.dataset.category.includes(b.dataset.filter)),
      );
    });
  });
  const escape = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const projectDialog = $("#project-dialog");
  function openProject(id) {
    const p = data.projects.find((x) => x.id === id);
    if (!p) return;
    $("#project-detail").innerHTML =
      `<span class="eyebrow">${escape(p.category)}</span><h2>${escape(p.name)}</h2><p>${escape(p.summary)}</p>${p.image ? `<img src="${escape(p.image)}" alt="NETRA landing page screenshot">` : ""}<h3>Problem</h3><p>${escape(p.problem)}</p><h3>Engineering approach</h3><p>${escape(p.approach)}</p><h3>Technology stack</h3><div class="chips">${p.stack.map((s) => `<span class="chip">${escape(s)}</span>`).join("")}</div><h3>Scope & verification</h3><p>${escape(p.notes)}</p><div class="actions"><a class="button primary" href="${escape(p.repo)}" target="_blank" rel="noopener noreferrer">Source code ↗</a>${p.demo ? `<a class="button" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">Live app ↗</a>` : ""}</div>`;
    projectDialog.showModal();
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-project]");
    if (b) openProject(b.dataset.project);
    if (e.target.closest("[data-close]")) e.target.closest("dialog").close();
  });
  $$("dialog").forEach((d) =>
    d.addEventListener("click", (e) => {
      if (e.target === d) d.close();
    }),
  );
  $$("[data-skill]").forEach((b) => {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      $$("[data-skill]").forEach((x) =>
        x.setAttribute("aria-pressed", x === b),
      );
      const s = b.dataset.skill;
      const found = data.projects.filter((p) =>
        data.associations[s]?.includes(p.id),
      );
      $("#skill-result").innerHTML =
        `<strong>${escape(s)}</strong> · ${found.length ? found.map((p) => `<button data-project="${escape(p.id)}">${escape(p.name)} ↗</button>`).join(" ") : "Part of my learning and technical toolkit; project evidence to be added."}`;
    });
  });
  const commandDialog = $("#command-dialog"),
    search = $("#command-search"),
    commands = $("#commands");
  const list = [
    ["Home", () => (location.hash = "home")],
    ["Selected work", () => (location.hash = "work")],
    ["Skills", () => (location.hash = "skills")],
    ["Journey", () => (location.hash = "journey")],
    ["About", () => (location.hash = "about")],
    ["Contact", () => (location.hash = "contact")],
    ["Email me", () => openEmail()],
    ["Switch theme", () => theme.click()],
    ["View résumé", () => showResume()],
    ...data.projects.map((p) => [p.name, () => openProject(p.id)]),
  ];
  function renderCommands() {
    commands.replaceChildren();
    list
      .filter(([name]) =>
        name.toLowerCase().includes(search.value.toLowerCase()),
      )
      .forEach(([name, fn]) => {
        const b = document.createElement("button");
        b.textContent = name + " ↗";
        b.onclick = () => {
          commandDialog.close();
          fn();
        };
        commands.append(b);
      });
    if (!commands.children.length)
      commands.textContent = "No matching commands.";
  }
  function openCommand() {
    search.value = "";
    renderCommands();
    commandDialog.showModal();
    search.focus();
  }
  search.oninput = renderCommands;
  search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") commands.querySelector("button")?.click();
  });
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (commandDialog.open) commandDialog.close();
      else if (!document.querySelector("dialog[open]")) openCommand();
    }
  });
  let resumeUrl = "/resume/Tejasvi_Gupta_Resume.pdf";
  const embedded = $("#embedded-resume");
  if (embedded) {
    const raw = atob(embedded.textContent.trim());
    const bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
    resumeUrl = URL.createObjectURL(
      new Blob([bytes], { type: "application/pdf" }),
    );
  }
  $$("[data-resume]").forEach((a) => {
    a.href = resumeUrl;
    a.download = "Tejasvi_Gupta_Resume.pdf";
  });
  function showResume() {
    $("#resume-frame").src = resumeUrl;
    $("#resume-dialog").showModal();
  }
  $("[data-view-resume]").onclick = showResume;
  $("[data-copy]").onclick = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      return;
    } catch {}
    const field = document.createElement("textarea");
    field.value = data.email;
    field.setAttribute("readonly", "");
    field.setAttribute("aria-hidden", "true");
    field.style.cssText =
      "position:fixed;top:0;left:0;opacity:0;pointer-events:none;width:1px;height:1px";
    const previous = document.activeElement;
    document.body.append(field);
    try {
      field.select();
      document.execCommand("copy");
    } catch {
    } finally {
      field.remove();
      previous?.focus({ preventScroll: true });
    }
  };
  // Contact form: EmailJS when configured; a local email draft otherwise.
  const emailDialog = $("#email-dialog"),
    emailForm = $("#email-form"),
    emailSubmit = $("#email-submit"),
    emailStatus = $("#email-status"),
    emailDraft = $("#email-draft");
  const emailConfig = data.emailjs || {},
    directEmail = Boolean(
      emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey,
    );
  let sending = false,
    lastSend = 0;
  function emailParams() {
    const f = new FormData(emailForm);
    return {
      from_name: String(f.get("name") || "").trim(),
      reply_to: String(f.get("email") || "").trim(),
      subject: String(f.get("subject") || "").trim(),
      message: String(f.get("message") || "").trim(),
    };
  }
  function updateEmailDraft() {
    const v = emailParams();
    emailDraft.href =
      "mailto:" +
      data.email +
      "?subject=" +
      encodeURIComponent(v.subject || "Portfolio inquiry") +
      "&body=" +
      encodeURIComponent(
        "Name: " + v.from_name + "\nEmail: " + v.reply_to + "\n\n" + v.message,
      );
  }
  function openEmail() {
    emailStatus.textContent = "";
    emailDialog.showModal();
    emailForm.elements.namedItem("name").focus();
  }
  $("#email-mode").textContent = directEmail
    ? "Your message will be sent using EmailJS. Your contact details and message will be processed by that service."
    : "This opens a prefilled draft in your email app. You send it from there.";
  emailSubmit.textContent = directEmail
    ? "Send message ↗"
    : "Open email draft ↗";
  $$("[data-email-me]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      openEmail();
    }),
  );
  emailForm.addEventListener("input", updateEmailDraft);
  updateEmailDraft();
  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return;
    const params = emailParams();
    if (Object.values(params).some((v) => !v)) {
      emailStatus.textContent = "Please fill in all fields.";
      return;
    }
    updateEmailDraft();
    if (!directEmail) {
      emailStatus.textContent =
        "Draft prepared. Send it from your email app; no message has been sent yet.";
      emailDraft.click();
      return;
    }
    if (Date.now() - lastSend < 3000) {
      emailStatus.textContent =
        "Please wait a few seconds before trying again.";
      return;
    }
    sending = true;
    lastSend = Date.now();
    emailSubmit.disabled = true;
    emailSubmit.textContent = "Sending…";
    emailStatus.textContent = "Sending your message…";
    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: emailConfig.serviceId,
            template_id: emailConfig.templateId,
            user_id: emailConfig.publicKey,
            template_params: params,
          }),
          signal: AbortSignal.timeout(15000),
        },
      );
      if (!response.ok) throw new Error("EmailJS request failed");
      emailStatus.textContent = "Message accepted by EmailJS. Thank you!";
      emailForm.reset();
      updateEmailDraft();
    } catch {
      emailStatus.textContent =
        "Could not confirm delivery. Try again or use the email app option.";
    } finally {
      sending = false;
      emailSubmit.disabled = false;
      emailSubmit.textContent = "Send message ↗";
    }
  });
})();
