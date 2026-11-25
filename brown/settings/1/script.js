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
    const tabs = document.querySelectorAll(".tab-btn[data-section]");
    const panels = document.querySelectorAll(".settings-panel");
    tabs.forEach((btn) => btn.addEventListener("click", () => {
      const t = btn.dataset.section;
      tabs.forEach((b) => b.classList.toggle("is-active", b === btn));
      panels.forEach((p) => { p.hidden = p.id !== `sec-${t}`; });
    }));
    const form = document.getElementById("profile-form");
    if (form) form.addEventListener("submit", (e) => { e.preventDefault(); showToast("Settings saved (simulated demo)."); });
    document.querySelectorAll(".switch").forEach((s) => s.addEventListener("change", () => showToast("Preference updated.")));
  });
})();
