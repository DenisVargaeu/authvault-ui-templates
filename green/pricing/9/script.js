(() => {
  "use strict";
  const THEME_KEY = "authvault_theme_pref";
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const toastBox = document.getElementById("toast-container");

  function applyTheme(t) {
    const mode = t === "light" ? "light" : "dark";
    root.setAttribute("data-theme", mode);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(mode === "light"));
      const icon = themeBtn.querySelector("i");
      if (icon) icon.className = mode === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  }

  function toast(msg) {
    if (!toastBox) return;
    const d = document.createElement("div");
    d.className = "toast";
    d.textContent = msg;
    toastBox.appendChild(d);
    window.setTimeout(() => d.remove(), 2400);
  }

  document.addEventListener("DOMContentLoaded", () => {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch {}
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

    // Interactive pills / tabs
    document.querySelectorAll("[data-pill-group]").forEach((group) => {
      const pills = group.querySelectorAll(".m-pill");
      pills.forEach((pill) => {
        pill.addEventListener("click", () => {
          pills.forEach((p) => p.classList.toggle("is-active", p === pill));
          const target = pill.dataset.target;
          if (target) {
            document.querySelectorAll("[data-panel]").forEach((pan) => {
              pan.hidden = pan.dataset.panel !== target;
            });
          }
          const billing = pill.dataset.billing;
          if (billing) {
            document.querySelectorAll("[data-monthly]").forEach((el) => {
              el.textContent = billing === "yearly" ? el.dataset.yearly : el.dataset.monthly;
            });
          }
        });
      });
    });

    // Demo form submission
    document.querySelectorAll("form[data-demo-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        toast(form.dataset.demoMsg || "Action completed (simulated demo).");
      });
    });

    // Demo action buttons
    document.querySelectorAll("[data-demo-toast]").forEach((btn) => {
      btn.addEventListener("click", () => toast(btn.dataset.demoToast));
    });
  });
})();
