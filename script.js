/**
 * authvault-ui-templates — Root Color Edition Selector Script
 * Shared Dark/Light theme toggle (Alt+T) + keyboard shortcuts 1-4 to open editions.
 */

(() => {
  "use strict";

  const THEME_KEY = "authvault_theme_pref";
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-toggle-label");

  function applyTheme(theme) {
    const mode = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", mode);
    const isLight = mode === "light";
    themeBtn.setAttribute("aria-pressed", String(isLight));
    themeBtn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    themeLabel.textContent = isLight ? "Light" : "Dark";
  }

  document.addEventListener("DOMContentLoaded", () => {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch {}
    applyTheme(saved || "dark");

    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch {}
    });

    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        themeBtn.click();
        return;
      }
      if (!e.altKey && !e.ctrlKey && !e.metaKey && ["1", "2", "3", "4"].includes(e.key)) {
        const card = document.querySelector(`.edition-card[data-key="${e.key}"]`);
        if (card) window.location.href = card.getAttribute("href");
      }
    });
  });
})();
