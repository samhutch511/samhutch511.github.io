# Site Makeover — Design Spec

**Date:** 2026-05-12  
**Status:** Approved

---

## Context

Samuel Hutchinson's personal academic portfolio (`samhutch511.github.io`) is currently built on an HTML5 UP "Stellar" template. The template's CSS is opaque and hard to maintain. The goal is a full visual redesign that preserves all existing content and structure while replacing the template stylesheet with a clean, hand-written CSS layer — updating the palette, typography, and component styling throughout.

The site is static GitHub Pages with no build step. All changes are pure HTML/CSS.

---

## What We're Building

A redesigned `index.html` with a new `assets/css/main.css` that replaces the current HTML5 UP stylesheet. The HTML structure (sidebar + scrolling main content, three sections) stays intact. No content is added or removed.

---

## Layout

**Sidebar (Evolved):** Fixed left sidebar, scrolling main content area to the right. Same information as the current sidebar — modernized spacing and typography, no structural changes.

The HTML5 UP JavaScript (`main.js`, `jquery.scrollex.min.js`, etc.) is retained as-is. The new CSS must be compatible with any class hooks the existing JS relies on for scroll-spy and mobile toggle behavior.

---

## Palette

| Role | Value |
|---|---|
| Sidebar background | `#1e1e1e` |
| Main content background | `#ffffff` |
| Accent (links, active nav, dividers) | `#c0392b` |
| Body text | `#333333` |
| Secondary text / metadata | `#888888` |
| Sidebar text | `#ffffff` |
| Sidebar secondary text | `#999999` |
| Subtle background (publication cards, hover) | `#f7f7f7` |
| Border / divider | `#e8e8e8` |

---

## Typography

**Font:** IBM Plex Sans (Google Fonts)  
**Weights loaded:** 400 (regular), 400 italic, 600 (semi-bold), 700 (bold)  
**Import URL:** `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap`

Replaces the HTML5 UP Source Sans Pro dependency entirely. The `<link>` tag is added to `<head>` in `index.html`. The new `main.css` sets `font-family: 'IBM Plex Sans', sans-serif` as the base.

| Element | Size | Weight |
|---|---|---|
| Sidebar name | 1rem | 700 |
| Sidebar role | 0.8rem | 400 |
| Sidebar nav links | 0.85rem | 400 |
| Section headings (`h3`) | 1.3rem | 700 |
| Publication / project title (`h4`) | 1rem | 600 |
| Body / citation text | 0.9rem | 400 |
| Citation italic | 0.85rem | 400 italic |
| Metadata / badges | 0.75rem | 400 |

---

## Sidebar

**Content (unchanged):**
- Avatar photo (`images/avatar.jpg`) — circular, ~80px diameter
- Name: "Sam Hutchinson" — large, white, bold
- Role: "Incoming PhD student @ MIT BCS" — small, muted
- Links: Google Scholar · CV — inline, accent-colored
- Nav links: About / Publications / Other Projects — active state uses accent red background pill
- Social icons: Twitter, GitHub, Email (FontAwesome) — muted, turn accent red on hover

**Styling updates:**
- Sidebar width: `280px`, fixed, full-height
- Background: `#1e1e1e`
- No border; main content begins immediately to the right
- Active nav item: red background pill (`background: rgba(192, 57, 43, 0.2); color: #c0392b`)
- Bottom padding so social icons don't crowd the nav

---

## About Section

**Banner image:** Full-width `images/banner.jpg` spanning the main content column at the top of the section. Height: `240px`, `object-fit: cover`. User will replace `banner.jpg` with a more intentional photo.

**Below the banner:**
- `<h2>Sam Hutchinson</h2>` — large, dark
- Subtitle: "Welcome to my webpage! I am an incoming PhD student at MIT in the Department of Brain and Cognitive Sciences." — with a `2px solid #c0392b` underline accent on the subtitle line (achieved via a bottom border on the `<p>` or a styled `<hr>`)
- Full bio prose paragraphs — unchanged content, updated typography

---

## Publications Section

**Heading:** `<h3>Publications</h3>` with a thin `1px` red bottom border as a section divider.

**Each publication:** An article with a thumbnail image on the left and text on the right.

- Image: `80px × 80px`, `border-radius: 4px`, `object-fit: cover`. Links to the DOI.
- Title (`h4`): Semi-bold, `#1e1e1e`, links to DOI in accent red on hover.
- Citation text: 0.85rem, italic, `#555555`. Author name "Hutchinson, S." bolded (`<strong>`) within the citation string.
- DOI link: inline after citation, accent red, small.

Three existing papers — no changes to content.

---

## Other Projects Section

**Heading:** Same `<h3>` + red divider treatment as Publications.

**Each project:** Same image+card layout as Publications — thumbnail left, title + description right.

- Image links to the project URL.
- Title (`h4`): Semi-bold, links to the project URL.
- Description: body text, with an inline link ("Explore the interactive figures", "Here is the GitHub repo", etc.)

Three existing projects (EEGym, GPT-2 Text Visualizer, Gadfly essay) — no changes to content.

---

## Footer

Simple, minimal:

```
© Samuel Hutchinson · samhutch@mit.edu
```

Replaces the current "Untitled. All rights reserved." placeholder. Light background (`#f7f7f7`), centered text, `#888888` color.

---

## CSS Strategy

The new `main.css` replaces the HTML5 UP stylesheet entirely. Because the existing `main.js` depends on specific CSS classes for scroll-spy active states and the mobile sidebar toggle, the new stylesheet must define rules for these hooks:

| Hook | Purpose |
|---|---|
| `#header` | Sidebar container — must be `position: fixed`, full height |
| `#wrapper` | Main content wrapper — must have left margin equal to sidebar width |
| `#navPanelToggle` | Mobile hamburger button — hidden on desktop, visible on mobile |
| `#navPanel` | Mobile slide-out nav — positioned off-screen, animated in by JS |
| `body.is-preload *` | Suppresses CSS transitions on initial page load (JS removes this class) |
| `#nav li a.active` | Scroll-spy active state — JS adds/removes `active` class |

**Responsive breakpoint:** Sidebar collapses into a top hamburger menu at `≤ 980px` (matching the HTML5 UP Stellar breakpoint the JS targets). Below this breakpoint, `#header` becomes a fixed top bar and `#wrapper` has no left margin.

---

## File Changes

| File | Action |
|---|---|
| `index.html` | Edit — add Google Fonts `<link>` tag; fix footer copyright text; bold "Hutchinson, S." in citation strings |
| `assets/css/main.css` | Rewrite — replace HTML5 UP stylesheet with new hand-written CSS (see CSS Strategy) |

The HTML5 UP JavaScript files (`assets/js/`) are **not changed**. FontAwesome CSS and webfonts are **not changed**.

---

## Out of Scope

- No new content sections or pages
- No changes to `nlp-project/` or any subproject pages
- No mobile layout overhaul (responsive behavior maintained at current breakpoints, not redesigned)
- No changes to the HTML5 UP JavaScript files
- No image replacements (banner.jpg, avatar.jpg, pic01–05.jpg) — user replaces photos separately
