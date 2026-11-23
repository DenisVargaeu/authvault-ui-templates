/**
 * authvault-ui-templates — Root Directory Hub Script
 * Shared Dark/Light theme persistence + category filtering + Alt+T shortcut
 */

(() => {
  "use strict";

  const THEME_KEY = "authvault_theme_pref";
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleLabel = document.getElementById("theme-toggle-label");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".template-card");

  function applyTheme(theme) {
    const normalized = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", normalized);
    const isLight = normalized === "light";
    themeToggleBtn.setAttribute("aria-pressed", String(isLight));
    themeToggleBtn.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
    themeToggleLabel.textContent = isLight ? "Light" : "Dark";
  }

  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      saved = null;
    }
    applyTheme(saved || "dark");

    themeToggleBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Ignore storage errors
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        themeToggleBtn.click();
      }
    });
  }

  function initFilters() {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        cards.forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.hidden = !match;
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initFilters();
  });
})();
