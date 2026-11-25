<div align="center">

# authvault-ui-templates

**48 flat, Notion-inspired UI templates across 6 categories — built with pure HTML5, CSS3, and Vanilla JavaScript.**

[![Templates](https://img.shields.io/badge/Templates-48-a67b5b?style=flat-square&labelColor=1a1613)](#template-galleries)
[![Categories](https://img.shields.io/badge/Categories-6_×_8-a67b5b?style=flat-square&labelColor=1a1613)](#category-overview)
[![Stack](https://img.shields.io/badge/Stack-HTML5_%7C_CSS3_%7C_Vanilla_JS-a67b5b?style=flat-square&labelColor=1a1613)](#quick-start)
[![Themes](https://img.shields.io/badge/Themes-Espresso_Dark_%26_Warm_Paper-a67b5b?style=flat-square&labelColor=1a1613)](#design-system)
[![Version](https://img.shields.io/badge/Version-v1.0.0-a67b5b?style=flat-square&labelColor=1a1613)](#project-structure)

[Directory Hub](#directory-hub) &middot; [Category Overview](#category-overview) &middot; [Template Galleries](#template-galleries) &middot; [Design System](#design-system) &middot; [Quick Start](#quick-start) &middot; [Customization](#customization)

<br />

<img src="./screenshots/hub.png" alt="authvault-ui-templates Directory Hub" width="100%" />

</div>

---

> [!NOTE]
> **Simulated Demo Only:** All authentication flows, settings forms, onboarding steps, and dashboard telemetry are simulated strictly on the client side. No real passwords or credentials are ever collected, transmitted, or stored.

## Why authvault-ui-templates?

Most UI kits drown you in build pipelines, heavy frameworks, neon gradients, and cluttered glassmorphism. **authvault-ui-templates** takes the opposite approach:

- **Zero frameworks & zero build step** — pure semantic HTML5, modern CSS3 custom properties, and modular Vanilla JavaScript.
- **Calm, flat Notion aesthetic** — restrained warm espresso & paper palettes, `1px` hairline borders, crisp `Inter` typography, and zero emojis.
- **48 standalone templates** — 6 core product page categories, each engineered in **8 genuinely distinct architectural layouts** (sidebar shells, 50/50 splits, centered documents, kanban boards, comparison matrices, command modals, and full-height drawers).
- **Shared theme persistence** — toggle between **Espresso Dark** and **Warm Paper Light** anywhere using the UI switch or `Alt + T`; your preference persists seamlessly across all 48 pages via `localStorage`.

---

## Directory Hub

Open the root [index.html](./index.html) to browse all 48 templates from a single interactive gallery with real rendered thumbnails and instant category filtering (`All`, `Login`, `Dashboard`, `Settings`, `Onboarding`, `Pricing`, `Errors`).

---

## Category Overview

| Category | Layouts | Folder | Key Interactive Features | Jump |
|---|---|---|---|---|
| **Login & Authentication** | `8` | `/login/1` – `/login/8` | Login/Register tabs, live email & password validation, 4-level strength meter, Forgot Password flow, demo autofill, toast notifications | [View Gallery](#1-login--authentication) |
| **Workspace Dashboards** | `8` | `/dashboard/1` – `/dashboard/8` | KPI telemetry cards, searchable & filterable access log, simulated live event generator, Kanban status board, security checklist | [View Gallery](#2-workspace-dashboards) |
| **Account & Settings** | `8` | `/settings/1` – `/settings/8` | Profile, Security, and Notifications sections, custom flat toggle switches, simulated save feedback | [View Gallery](#3-account--workspace-settings) |
| **Onboarding Wizards** | `8` | `/onboarding/1` – `/onboarding/8` | 3-step interactive setup stepper, team size selector, live-updating workspace preview, launch summary | [View Gallery](#4-onboarding-wizards) |
| **Plans & Pricing** | `8` | `/pricing/1` – `/pricing/8` | Monthly / Yearly (`-20%`) billing switcher, 3-tier grids, horizontal rows, feature comparison matrix, summary drawer | [View Gallery](#5-plans--pricing) |
| **Errors & System Status** | `8` | `/errors/1` – `/errors/8` | `404`, `403`, `500` with service health checklist, and `503` Maintenance Mode with quick recovery navigation | [View Gallery](#6-errors--system-status) |

---

## Template Galleries

Every layout below was rendered at `1440×900` in headless Firefox. Expand any section to inspect all 8 screenshots side-by-side.

### 1. Login & Authentication

<table>
  <tr>
    <td width="50%">
      <img src="./screenshots/layout-1.png" alt="Login 01 — Right Editorial Split" />
      <br /><strong>01 &mdash; Right Editorial Split</strong> (<code>/login/1/</code>)
    </td>
    <td width="50%">
      <img src="./screenshots/layout-3.png" alt="Login 03 — Full-Height 50/50 Split" />
      <br /><strong>03 &mdash; Full-Height 50/50 Split</strong> (<code>/login/3/</code>)
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./screenshots/layout-5.png" alt="Login 05 — Notion Sidebar App Shell" />
      <br /><strong>05 &mdash; Notion Sidebar App Shell</strong> (<code>/login/5/</code>)
    </td>
    <td width="50%">
      <img src="./screenshots/layout-8.png" alt="Login 08 — 65/35 Editorial + Drawer" />
      <br /><strong>08 &mdash; 65/35 Editorial + Drawer</strong> (<code>/login/8/</code>)
    </td>
  </tr>
</table>

<details>
<summary><strong>Show remaining 4 Login layouts (02, 04, 06, 07)</strong></summary>
<br />
<table>
  <tr>
    <td width="50%"><img src="./screenshots/layout-2.png" alt="Login 02" /><br /><strong>02 &mdash; Centered Minimal Document</strong> (<code>/login/2/</code>)</td>
    <td width="50%"><img src="./screenshots/layout-4.png" alt="Login 04" /><br /><strong>04 &mdash; Left Card + Workspace Board</strong> (<code>/login/4/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/layout-6.png" alt="Login 06" /><br /><strong>06 &mdash; Framed Editorial Window</strong> (<code>/login/6/</code>)</td>
    <td width="50%"><img src="./screenshots/layout-7.png" alt="Login 07" /><br /><strong>07 &mdash; Command Modal</strong> (<code>/login/7/</code>)</td>
  </tr>
</table>
</details>

---

### 2. Workspace Dashboards

<table>
  <tr>
    <td width="50%">
      <img src="./screenshots/dashboard-1.png" alt="Dashboard 01 — Sidebar Overview" />
      <br /><strong>01 &mdash; Sidebar Overview</strong> (<code>/dashboard/1/</code>)
    </td>
    <td width="50%">
      <img src="./screenshots/dashboard-4.png" alt="Dashboard 04 — Kanban Status Board" />
      <br /><strong>04 &mdash; Kanban Status Board</strong> (<code>/dashboard/4/</code>)
    </td>
  </tr>
</table>

<details>
<summary><strong>Show remaining 6 Dashboard layouts (02, 03, 05, 06, 07, 08)</strong></summary>
<br />
<table>
  <tr>
    <td width="50%"><img src="./screenshots/dashboard-2.png" alt="Dashboard 02" /><br /><strong>02 &mdash; Top-Nav Centered</strong> (<code>/dashboard/2/</code>)</td>
    <td width="50%"><img src="./screenshots/dashboard-3.png" alt="Dashboard 03" /><br /><strong>03 &mdash; Right Sidebar Rail</strong> (<code>/dashboard/3/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/dashboard-5.png" alt="Dashboard 05" /><br /><strong>05 &mdash; KPI Rail + Activity Stream</strong> (<code>/dashboard/5/</code>)</td>
    <td width="50%"><img src="./screenshots/dashboard-6.png" alt="Dashboard 06" /><br /><strong>06 &mdash; Framed Workspace Window</strong> (<code>/dashboard/6/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/dashboard-7.png" alt="Dashboard 07" /><br /><strong>07 &mdash; Command Search Dashboard</strong> (<code>/dashboard/7/</code>)</td>
    <td width="50%"><img src="./screenshots/dashboard-8.png" alt="Dashboard 08" /><br /><strong>08 &mdash; 65/35 Executive + Drawer</strong> (<code>/dashboard/8/</code>)</td>
  </tr>
</table>
</details>

---

### 3. Account & Workspace Settings

<table>
  <tr>
    <td width="50%">
      <img src="./screenshots/settings-1.png" alt="Settings 01 — Left Nav Rail + Card" />
      <br /><strong>01 &mdash; Left Nav Rail + Card</strong> (<code>/settings/1/</code>)
    </td>
    <td width="50%">
      <img src="./screenshots/settings-3.png" alt="Settings 03 — 50/50 Split Settings" />
      <br /><strong>03 &mdash; 50/50 Split Settings</strong> (<code>/settings/3/</code>)
    </td>
  </tr>
</table>

<details>
<summary><strong>Show remaining 6 Settings layouts (02, 04, 05, 06, 07, 08)</strong></summary>
<br />
<table>
  <tr>
    <td width="50%"><img src="./screenshots/settings-2.png" alt="Settings 02" /><br /><strong>02 &mdash; Top Underline Tabs</strong> (<code>/settings/2/</code>)</td>
    <td width="50%"><img src="./screenshots/settings-4.png" alt="Settings 04" /><br /><strong>04 &mdash; Right Nav Rail</strong> (<code>/settings/4/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/settings-5.png" alt="Settings 05" /><br /><strong>05 &mdash; Sidebar App Shell</strong> (<code>/settings/5/</code>)</td>
    <td width="50%"><img src="./screenshots/settings-6.png" alt="Settings 06" /><br /><strong>06 &mdash; Framed Window</strong> (<code>/settings/6/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/settings-7.png" alt="Settings 07" /><br /><strong>07 &mdash; Command Modal</strong> (<code>/settings/7/</code>)</td>
    <td width="50%"><img src="./screenshots/settings-8.png" alt="Settings 08" /><br /><strong>08 &mdash; Stacked Property Cards</strong> (<code>/settings/8/</code>)</td>
  </tr>
</table>
</details>

---

### 4. Onboarding Wizards

<table>
  <tr>
    <td width="50%">
      <img src="./screenshots/onboarding-1.png" alt="Onboarding 01 — Centered Stepper Card" />
      <br /><strong>01 &mdash; Centered Stepper Card</strong> (<code>/onboarding/1/</code>)
    </td>
    <td width="50%">
      <img src="./screenshots/onboarding-4.png" alt="Onboarding 04 — Left Wizard + Live Preview" />
      <br /><strong>04 &mdash; Left Wizard + Live Preview</strong> (<code>/onboarding/4/</code>)
    </td>
  </tr>
</table>

<details>
<summary><strong>Show remaining 6 Onboarding layouts (02, 03, 05, 06, 07, 08)</strong></summary>
<br />
<table>
  <tr>
    <td width="50%"><img src="./screenshots/onboarding-2.png" alt="Onboarding 02" /><br /><strong>02 &mdash; Right Editorial Split</strong> (<code>/onboarding/2/</code>)</td>
    <td width="50%"><img src="./screenshots/onboarding-3.png" alt="Onboarding 03" /><br /><strong>03 &mdash; 50/50 Vertical Stepper</strong> (<code>/onboarding/3/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/onboarding-5.png" alt="Onboarding 05" /><br /><strong>05 &mdash; Sidebar App Shell</strong> (<code>/onboarding/5/</code>)</td>
    <td width="50%"><img src="./screenshots/onboarding-6.png" alt="Onboarding 06" /><br /><strong>06 &mdash; Framed Setup Window</strong> (<code>/onboarding/6/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/onboarding-7.png" alt="Onboarding 07" /><br /><strong>07 &mdash; Spotlight Command Setup</strong> (<code>/onboarding/7/</code>)</td>
    <td width="50%"><img src="./screenshots/onboarding-8.png" alt="Onboarding 08" /><br /><strong>08 &mdash; 65/35 Quote + Drawer</strong> (<code>/onboarding/8/</code>)</td>
  </tr>
</table>
</details>

---

### 5. Plans & Pricing

<table>
  <tr>
    <td width="50%">
      <img src="./screenshots/pricing-1.png" alt="Pricing 01 — 3-Column Classic Grid" />
      <br /><strong>01 &mdash; 3-Column Classic Grid</strong> (<code>/pricing/1/</code>)
    </td>
    <td width="50%">
      <img src="./screenshots/pricing-4.png" alt="Pricing 04 — Comparison Matrix Table" />
      <br /><strong>04 &mdash; Comparison Matrix Table</strong> (<code>/pricing/4/</code>)
    </td>
  </tr>
</table>

<details>
<summary><strong>Show remaining 6 Pricing layouts (02, 03, 05, 06, 07, 08)</strong></summary>
<br />
<table>
  <tr>
    <td width="50%"><img src="./screenshots/pricing-2.png" alt="Pricing 02" /><br /><strong>02 &mdash; Horizontal Stacked Tiers</strong> (<code>/pricing/2/</code>)</td>
    <td width="50%"><img src="./screenshots/pricing-3.png" alt="Pricing 03" /><br /><strong>03 &mdash; 50/50 Split Pricing</strong> (<code>/pricing/3/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/pricing-5.png" alt="Pricing 05" /><br /><strong>05 &mdash; Sidebar Shell Pricing</strong> (<code>/pricing/5/</code>)</td>
    <td width="50%"><img src="./screenshots/pricing-6.png" alt="Pricing 06" /><br /><strong>06 &mdash; Framed Pricing Window</strong> (<code>/pricing/6/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/pricing-7.png" alt="Pricing 07" /><br /><strong>07 &mdash; Two-Tier Focus</strong> (<code>/pricing/7/</code>)</td>
    <td width="50%"><img src="./screenshots/pricing-8.png" alt="Pricing 08" /><br /><strong>08 &mdash; 65/35 + Summary Drawer</strong> (<code>/pricing/8/</code>)</td>
  </tr>
</table>
</details>

---

### 6. Errors & System Status

<table>
  <tr>
    <td width="50%">
      <img src="./screenshots/errors-2.png" alt="Error 02 — Right Editorial 404" />
      <br /><strong>02 &mdash; Right Editorial 404</strong> (<code>/errors/2/</code>)
    </td>
    <td width="50%">
      <img src="./screenshots/errors-4.png" alt="Error 04 — 500 + Status Checklist" />
      <br /><strong>04 &mdash; 500 + Status Checklist</strong> (<code>/errors/4/</code>)
    </td>
  </tr>
</table>

<details>
<summary><strong>Show remaining 6 Error &amp; Status layouts (01, 03, 05, 06, 07, 08)</strong></summary>
<br />
<table>
  <tr>
    <td width="50%"><img src="./screenshots/errors-1.png" alt="Error 01" /><br /><strong>01 &mdash; Minimal Centered 404</strong> (<code>/errors/1/</code>)</td>
    <td width="50%"><img src="./screenshots/errors-3.png" alt="Error 03" /><br /><strong>03 &mdash; 50/50 Split 403 Forbidden</strong> (<code>/errors/3/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/errors-5.png" alt="Error 05" /><br /><strong>05 &mdash; Sidebar Shell 404</strong> (<code>/errors/5/</code>)</td>
    <td width="50%"><img src="./screenshots/errors-6.png" alt="Error 06" /><br /><strong>06 &mdash; Framed Diagnostic Window</strong> (<code>/errors/6/</code>)</td>
  </tr>
  <tr>
    <td width="50%"><img src="./screenshots/errors-7.png" alt="Error 07" /><br /><strong>07 &mdash; Spotlight Quick-Recovery</strong> (<code>/errors/7/</code>)</td>
    <td width="50%"><img src="./screenshots/errors-8.png" alt="Error 08" /><br /><strong>08 &mdash; 65/35 Maintenance Mode (503)</strong> (<code>/errors/8/</code>)</td>
  </tr>
</table>
</details>

---

## Design System

Every template shares a unified set of CSS custom properties for instant visual consistency:

| Token | Espresso Dark (`data-theme="dark"`) | Warm Paper Light (`data-theme="light"`) | Role |
|---|---|---|---|
| `--bg-page` | `#120F0D` | `#F6F3EF` | Page canvas |
| `--bg-card` | `#1A1613` | `#FFFFFF` | Primary cards & panels |
| `--bg-sidebar` | `#161210` | `#F2EDE7` | Sidebars & header strips |
| `--accent` | `#A67B5B` | `#6F4E37` | Primary buttons & active indicators |
| `--accent-text` | `#C9A68A` | `#6F4E37` | Links, eyebrows & accents |
| `--text-primary` | `#F2ECE6` | `#241C17` | Primary ink |
| `--text-secondary` | `#A89C91` | `#64574E` | Subtitles & body copy |

### Keyboard Shortcuts & Ergonomics

| Shortcut | Action |
|---|---|
| `Alt + T` | Toggle between **Espresso Dark** and **Warm Paper Light** (persisted via `localStorage`) |
| `Tab` / `Shift + Tab` | Full keyboard focus traversal with accessible `:focus-visible` rings |
| `ArrowLeft` / `ArrowRight` | Switch between `Sign In` and `Register` tabs on login layouts |

---

## Quick Start

No `npm install`, no bundler, no build step required.

### Option 1 — Python Built-in Server
```bash
git clone https://github.com/Denisvargaeu/authvault-ui-templates.git
cd authvault-ui-templates
python3 -m http.server 8000
```
Open `http://localhost:8000/` to browse the interactive Directory Hub.

### Option 2 — Node.js (`npx serve`)
```bash
npx serve .
```

### Option 3 — Direct File Access
Open any `index.html` directly in your browser (e.g., `login/1/index.html` or `dashboard/4/index.html`).

---

## Customization

Because every template is completely self-contained (`index.html`, `style.css`, `script.js`), you can copy any single folder (for example `login/3/` or `pricing/4/`) straight into your project and re-brand it in seconds by editing `:root` in `style.css`:

```css
:root {
  --accent: #a67b5b;       /* Primary brand color */
  --accent-hover: #b88c6c; /* Hover state */
  --bg-page: #120f0d;      /* Canvas background */
  --bg-card: #1a1613;      /* Elevated card surface */
}
```

---

## Project Structure

```text
authvault-ui-templates/
├── index.html              # Interactive Directory Hub (48 templates)
├── style.css               # Hub styles
├── script.js               # Hub catalog renderer, filters & theme sync
├── login/1..8/             # 8 Authentication & Login layouts
├── dashboard/1..8/         # 8 Workspace Dashboard layouts
├── settings/1..8/          # 8 Account & Workspace Settings layouts
├── onboarding/1..8/        # 8 Onboarding Wizard layouts
├── pricing/1..8/           # 8 Plans & Pricing layouts
├── errors/1..8/            # 8 Error & System Status layouts
├── screenshots/            # 49 rendered desktop previews (1440x900)
└── README.md
```

---

<div align="center">

`v1.0.0` &middot; Built with pure HTML5, CSS3 &amp; Vanilla JavaScript &middot; &copy; 2026 DenisVargaeu

</div>
