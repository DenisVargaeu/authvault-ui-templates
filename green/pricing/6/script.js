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
    const btns = document.querySelectorAll(".bill-btn");
    const prices = document.querySelectorAll("[data-monthly]");
    btns.forEach((b) => b.addEventListener("click", () => {
      const m = b.dataset.billing;
      btns.forEach((x) => x.classList.toggle("is-active", x === b));
      prices.forEach((p) => { p.textContent = m === "yearly" ? p.dataset.yearly : p.dataset.monthly; });
      showToast(`Switched to ${m} billing.`);
    }));
  });
})();
