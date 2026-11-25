/**
 * authvault-ui-templates — Interactive Main Directory Hub Script
 * Renders all 72 templates, live search (/ shortcut), category & mobile-first filtering,
 * live Desktop/Mobile iframe preview modal, and shared Dark/Light theme sync (Alt+T).
 */

(() => {
  "use strict";

  const THEME_KEY = "authvault_theme_pref";
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleLabel = document.getElementById("theme-toggle-label");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sectionsStack = document.getElementById("sections-stack");
  const searchInput = document.getElementById("hub-search");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");

  // Preview Modal Elements
  const previewModal = document.getElementById("preview-modal");
  const previewTitle = document.getElementById("preview-title");
  const previewPath = document.getElementById("preview-path");
  const previewOpenLink = document.getElementById("preview-open-link");
  const previewStage = document.getElementById("preview-stage");
  const previewFrame = document.getElementById("preview-frame");
  const vpButtons = document.querySelectorAll(".vp-btn");

  let activeFilter = "all";

  const MOBILE_ITEMS = [
    { n: 9, name: "Mobile Bottom Sheet", desc: "Mobile-first hero band + rising bottom-sheet card with 48px touch targets.", mobile: true },
    { n: 10, name: "Mobile Tab-Bar Shell", desc: "Native-style mobile app shell with fixed 4-item bottom navigation bar.", mobile: true },
    { n: 11, name: "Mobile Thumb-Zone Deck", desc: "One-handed layout with sticky bottom primary action bar.", mobile: true },
    { n: 12, name: "Mobile Pill & Accordion", desc: "Swipeable horizontal pills and compact collapsible sections.", mobile: true },
  ];

  const CATALOG = [
    {
      id: "login",
      title: "Login & Authentication",
      pathHint: "/login/1 - /login/12",
      tag: "Login",
      items: [
        { n: 1, name: "Right Editorial Split", desc: "Left workspace canvas with line art & live inspector, right auth card.", img: "./screenshots/layout-1.png" },
        { n: 2, name: "Centered Minimal Document", desc: "Distraction-free single-column Notion document with command strip.", img: "./screenshots/layout-2.png" },
        { n: 3, name: "Full-Height 50/50 Split", desc: "Edge-to-edge architectural split with numbered overview & form pane.", img: "./screenshots/layout-3.png" },
        { n: 4, name: "Left Card + Workspace Board", desc: "Reversed asymmetric layout with left card and right Notion board.", img: "./screenshots/layout-4.png" },
        { n: 5, name: "Notion Sidebar App Shell", desc: "Persistent left workspace navigation rail with centered form.", img: "./screenshots/layout-5.png" },
        { n: 6, name: "Framed Editorial Window", desc: "Framed horizontal card with top action bar and live metrics.", img: "./screenshots/layout-6.png" },
        { n: 7, name: "Command Modal", desc: "Spotlight-style flat command window over subtle grid.", img: "./screenshots/layout-7.png" },
        { n: 8, name: "65/35 Editorial + Drawer", desc: "Wide editorial quote & timeline paired with full-height right drawer.", img: "./screenshots/layout-8.png" },
        ...MOBILE_ITEMS,
      ],
    },
    {
      id: "dashboard",
      title: "Workspace Dashboards",
      pathHint: "/dashboard/1 - /dashboard/12",
      tag: "Dashboard",
      items: [
        { n: 1, name: "Sidebar Overview", desc: "Classic left sidebar, 4 KPIs, searchable access log & checklist." },
        { n: 2, name: "Top-Nav Centered", desc: "Clean top navigation bar with centered KPI cards and log table." },
        { n: 3, name: "Right Sidebar Rail", desc: "Main workspace analytics on the left, docked inspector rail on the right." },
        { n: 4, name: "Kanban Status Board", desc: "3-column Notion status board (Active / Review / Verified) + KPI strip." },
        { n: 5, name: "KPI Rail + Activity Stream", desc: "Vertical metric column on the left paired with tall access log." },
        { n: 6, name: "Framed Workspace Window", desc: "Centered framed application window with full telemetry controls." },
        { n: 7, name: "Command Search Dashboard", desc: "Search-first minimal dashboard over an architectural line grid." },
        { n: 8, name: "65/35 Executive + Drawer", desc: "Wide KPI & table canvas with full-height live telemetry right drawer." },
        ...MOBILE_ITEMS,
      ],
    },
    {
      id: "settings",
      title: "Account & Workspace Settings",
      pathHint: "/settings/1 - /settings/12",
      tag: "Settings",
      items: [
        { n: 1, name: "Left Nav Rail + Card", desc: "Classic Notion left navigation column with tabbed form card." },
        { n: 2, name: "Top Underline Tabs", desc: "Centered single-column document with horizontal section tabs." },
        { n: 3, name: "50/50 Split Settings", desc: "Full-height split with section descriptions on left and form on right." },
        { n: 4, name: "Right Nav Rail", desc: "Reversed asymmetric settings layout with navigation on the right." },
        { n: 5, name: "Sidebar App Shell", desc: "Full-height workspace sidebar paired with clean settings canvas." },
        { n: 6, name: "Framed Window", desc: "Centered framed window housing two-column account settings." },
        { n: 7, name: "Command Modal", desc: "Spotlight-style compact modal for quick preference adjustments." },
        { n: 8, name: "Stacked Property Cards", desc: "All profile, security, and notification settings visible on one page." },
        ...MOBILE_ITEMS,
      ],
    },
    {
      id: "onboarding",
      title: "Onboarding Wizards",
      pathHint: "/onboarding/1 - /onboarding/12",
      tag: "Onboarding",
      items: [
        { n: 1, name: "Centered Stepper Card", desc: "Classic 3-step centered Notion wizard with progress pills." },
        { n: 2, name: "Right Editorial Split", desc: "Left workspace pitch paired with a right-aligned setup wizard." },
        { n: 3, name: "50/50 Vertical Stepper", desc: "Full-height architectural split with step guide and clean form." },
        { n: 4, name: "Left Wizard + Live Preview", desc: "Interactive wizard on left with live-updating workspace preview on right." },
        { n: 5, name: "Sidebar App Shell", desc: "Persistent preview sidebar paired with centered onboarding steps." },
        { n: 6, name: "Framed Setup Window", desc: "Horizontal framed setup window combining wizard and live preview." },
        { n: 7, name: "Spotlight Command Setup", desc: "Compact terminal-bar modal (`authvault://setup`) over grid." },
        { n: 8, name: "65/35 Quote + Drawer", desc: "Minimal editorial quote on left with docked right setup drawer." },
        ...MOBILE_ITEMS,
      ],
    },
    {
      id: "pricing",
      title: "Plans & Pricing",
      pathHint: "/pricing/1 - /pricing/12",
      tag: "Pricing",
      items: [
        { n: 1, name: "3-Column Classic Grid", desc: "Centered three-tier grid with Monthly / Yearly (-20%) toggle." },
        { n: 2, name: "Horizontal Stacked Tiers", desc: "Full-width scannable horizontal plan rows." },
        { n: 3, name: "50/50 Split Pricing", desc: "Left manifesto & billing toggle with right stacked tier cards." },
        { n: 4, name: "Comparison Matrix Table", desc: "Notion database-style feature comparison matrix across all plans." },
        { n: 5, name: "Sidebar Shell Pricing", desc: "Workspace sidebar navigation paired with billing tiers." },
        { n: 6, name: "Framed Pricing Window", desc: "All three plans inside a framed window with header billing toggle." },
        { n: 7, name: "Two-Tier Focus", desc: "Minimal high-contrast Starter vs Pro Team layout over grid." },
        { n: 8, name: "65/35 + Summary Drawer", desc: "Selectable tiers on the left with docked billing summary drawer." },
        ...MOBILE_ITEMS,
      ],
    },
    {
      id: "errors",
      title: "Errors & System Status",
      pathHint: "/errors/1 - /errors/12",
      tag: "System",
      items: [
        { n: 1, name: "Minimal Centered 404", desc: "Clean flat 404 Not Found card over subtle dot grid." },
        { n: 2, name: "Right Editorial 404", desc: "Oversized typographic 404 on left with right recovery card." },
        { n: 3, name: "50/50 Split 403 Forbidden", desc: "Full-height split access restriction page with recovery links." },
        { n: 4, name: "500 + Status Checklist", desc: "Server error card paired with live service health checklist." },
        { n: 5, name: "Sidebar Shell 404", desc: "Workspace sidebar rail with centered document-not-found notice." },
        { n: 6, name: "Framed Diagnostic Window", desc: "Terminal-bar framed error window (`authvault://error/404`)." },
        { n: 7, name: "Spotlight Quick-Recovery", desc: "Compact centered recovery modal over architectural line grid." },
        { n: 8, name: "65/35 Maintenance Mode", desc: "Wide 503 maintenance notice paired with right status drawer." },
        ...MOBILE_ITEMS,
      ],
    },
  ];

  function renderCatalog() {
    sectionsStack.innerHTML = CATALOG.map((cat) => {
      const cardsHtml = cat.items
        .map((item) => {
          const img = item.img || `./screenshots/${cat.id}-${item.n}.png`;
          const href = `./${cat.id}/${item.n}/`;
          const num = String(item.n).padStart(2, "0");
          const tagLabel = item.mobile ? "Mobile-First" : cat.tag;
          const searchBlob = `${cat.id} ${cat.title} ${num} ${item.name} ${item.desc} ${tagLabel}`.toLowerCase();

          return `
            <article class="template-card" data-category="${cat.id}" data-mobile="${item.mobile ? "true" : "false"}" data-search="${searchBlob}">
              <a href="${href}" class="template-card__thumb">
                <img src="${img}" alt="${cat.title} ${num} — ${item.name}" loading="lazy" />
                <span class="thumb-num">${num}</span>
              </a>
              <div class="template-card__body">
                <div class="template-card__top">
                  <h3 class="template-card__title">${item.name}</h3>
                  <span class="cat-tag">${tagLabel}</span>
                </div>
                <p class="template-card__desc">${item.desc}</p>
                <div class="template-card__foot">
                  <span class="path-label">/${cat.id}/${item.n}/</span>
                  <div class="card-actions">
                    <button
                      type="button"
                      class="preview-btn"
                      data-preview-url="${href}"
                      data-preview-title="${cat.title} ${num} — ${item.name}"
                      data-preview-path="/${cat.id}/${item.n}/"
                      data-preview-mobile="${item.mobile ? "true" : "false"}"
                    >Preview</button>
                    <a href="${href}" class="open-link">Open <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            </article>`;
        })
        .join("");

      return `
        <section class="cat-section" data-section-cat="${cat.id}">
          <div class="cat-section__head">
            <h2>${cat.title}</h2>
            <span>${cat.pathHint}</span>
          </div>
          <div class="gallery-grid">${cardsHtml}</div>
        </section>`;
    }).join("");
  }

  function applyFilters() {
    const query = (searchInput.value || "").trim().toLowerCase();
    let visibleTotal = 0;

    document.querySelectorAll(".template-card").forEach((card) => {
      const catMatch =
        activeFilter === "all" ||
        (activeFilter === "mobile" ? card.dataset.mobile === "true" : card.dataset.category === activeFilter);
      const queryMatch = !query || card.dataset.search.includes(query);
      const show = catMatch && queryMatch;
      card.hidden = !show;
      if (show) visibleTotal += 1;
    });

    document.querySelectorAll(".cat-section").forEach((sec) => {
      const visible = sec.querySelectorAll(".template-card:not([hidden])").length;
      sec.hidden = visible === 0;
    });

    resultsCount.textContent = `${visibleTotal} / 72`;
    emptyState.hidden = visibleTotal > 0;
  }

  function setViewportMode(mode) {
    const isMob = mode === "mobile";
    previewStage.classList.toggle("is-mobile", isMob);
    vpButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.vp === mode));
  }

  function openPreview({ url, title, path, mobile }) {
    previewTitle.textContent = title;
    previewPath.textContent = path;
    previewOpenLink.href = url;
    previewFrame.src = url;
    setViewportMode(mobile ? "mobile" : "desktop");
    previewModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closePreview() {
    previewModal.hidden = true;
    previewFrame.src = "about:blank";
    document.body.style.overflow = "";
  }

  function applyTheme(theme) {
    const normalized = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", normalized);
    const isLight = normalized === "light";
    themeToggleBtn.setAttribute("aria-pressed", String(isLight));
    themeToggleBtn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    themeToggleLabel.textContent = isLight ? "Light" : "Dark";
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch { saved = null; }
    applyTheme(saved || "dark");

    themeToggleBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch {}
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCatalog();
    initTheme();
    applyFilters();

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter;
        filterButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        applyFilters();
      });
    });

    searchInput.addEventListener("input", applyFilters);

    resetFiltersBtn.addEventListener("click", () => {
      activeFilter = "all";
      searchInput.value = "";
      filterButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.filter === "all"));
      applyFilters();
    });

    sectionsStack.addEventListener("click", (e) => {
      const btn = e.target.closest(".preview-btn");
      if (!btn) return;
      openPreview({
        url: btn.dataset.previewUrl,
        title: btn.dataset.previewTitle,
        path: btn.dataset.previewPath,
        mobile: btn.dataset.previewMobile === "true",
      });
    });

    vpButtons.forEach((btn) => {
      btn.addEventListener("click", () => setViewportMode(btn.dataset.vp));
    });

    document.querySelectorAll("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", closePreview);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !previewModal.hidden) {
        closePreview();
        return;
      }
      if (event.altKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        themeToggleBtn.click();
        return;
      }
      if (event.key === "/" && document.activeElement !== searchInput && previewModal.hidden) {
        event.preventDefault();
        searchInput.focus();
      }
    });
  });
})();
