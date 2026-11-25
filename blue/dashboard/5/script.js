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
    const search = document.getElementById("session-search");
    const tbody = document.getElementById("access-tbody");
    const pills = document.querySelectorAll(".pill-btn");
    const simBtn = document.getElementById("new-session-btn");
    const metric = document.getElementById("metric-sessions");
    let statusFilter = "all";
    let count = 128;

    function filter() {
      if (!tbody) return;
      const q = (search ? search.value : "").trim().toLowerCase();
      tbody.querySelectorAll("tr").forEach((tr) => {
        const okS = statusFilter === "all" || tr.dataset.status === statusFilter;
        const okQ = !q || tr.textContent.toLowerCase().includes(q);
        tr.hidden = !(okS && okQ);
      });
    }

    if (search) search.addEventListener("input", filter);
    pills.forEach((p) => p.addEventListener("click", () => {
      statusFilter = p.dataset.status;
      pills.forEach((b) => b.classList.toggle("is-active", b === p));
      filter();
    }));

    if (simBtn) simBtn.addEventListener("click", () => {
      count += 1;
      if (metric) metric.textContent = String(count);
      if (tbody) {
        const tr = document.createElement("tr");
        tr.dataset.status = "verified";
        tr.innerHTML = `<td><strong>demo${count}@authvault.dev</strong></td><td>Passkey</td><td>Bratislava, SK</td><td><span class="status-tag status-tag--ok">Verified</span></td><td class="muted">Just now</td>`;
        tbody.prepend(tr);
        filter();
      }
      showToast("Simulated session event recorded.");
    });
  });
})();
