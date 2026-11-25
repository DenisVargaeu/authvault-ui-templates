(() => {
  "use strict";
  const THEME_KEY = "authvault_theme_pref";
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-toggle-label");
  const toastContainer = document.getElementById("toast-container");

  function applyTheme(theme) {
    const t = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", t);
    if (themeBtn) themeBtn.setAttribute("aria-pressed", String(t === "light"));
    if (themeLabel) themeLabel.textContent = t === "light" ? "Light" : "Dark";
  }

  function showToast(msg) {
    if (!toastContainer) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    toastContainer.appendChild(el);
    window.setTimeout(() => el.remove(), 2500);
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch { saved = null; }
    applyTheme(saved || "dark");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch {}
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key.toLowerCase() === "t" && themeBtn) {
        e.preventDefault();
        themeBtn.click();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    const steps = document.querySelectorAll(".wizard-step");
    const pills = document.querySelectorAll(".step-pill");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const wsName = document.getElementById("ws-name");
    const wsRole = document.getElementById("ws-role");
    const choices = document.querySelectorAll(".choice-card");
    let step = 1;
    let size = "Solo (1)";

    function syncPreview() {
      const n = (wsName && wsName.value.trim()) || "Studio Espresso";
      const r = (wsRole && wsRole.value.trim()) || "Product Designer";
      document.querySelectorAll("[data-bind='name']").forEach((el) => el.textContent = n);
      document.querySelectorAll("[data-bind='role']").forEach((el) => el.textContent = r);
      document.querySelectorAll("[data-bind='size']").forEach((el) => el.textContent = size);
    }

    function render() {
      steps.forEach((s) => { s.hidden = Number(s.dataset.step) !== step; });
      pills.forEach((p) => p.classList.toggle("is-active", Number(p.dataset.stepInd) <= step));
      if (prevBtn) prevBtn.disabled = step === 1;
      if (nextBtn) nextBtn.querySelector("span").textContent = step === 3 ? "Open Dashboard" : "Continue";
      syncPreview();
    }

    if (wsName) wsName.addEventListener("input", syncPreview);
    if (wsRole) wsRole.addEventListener("input", syncPreview);
    choices.forEach((c) => c.addEventListener("click", () => {
      size = c.dataset.choice;
      choices.forEach((x) => x.classList.toggle("is-selected", x === c));
      syncPreview();
    }));
    if (prevBtn) prevBtn.addEventListener("click", () => { if (step > 1) { step -= 1; render(); } });
    if (nextBtn) nextBtn.addEventListener("click", () => {
      if (step < 3) { step += 1; render(); }
      else { showToast("Workspace created (demo)."); window.setTimeout(() => { window.location.href = "../../dashboard/1/"; }, 600); }
    });
    render();
  });
})();
