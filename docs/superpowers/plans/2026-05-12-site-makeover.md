# Site Makeover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the HTML5 UP Stellar template stylesheet with a clean custom CSS layer using the charcoal/warm palette and IBM Plex Sans, keeping all content and JS behaviour intact.

**Architecture:** The HTML structure stays entirely intact. We rewrite `assets/css/main.css` from scratch, preserving all JS-dependent class/ID hooks identified by auditing `assets/js/main.js`. A small set of HTML changes (font link, footer text, author bolding) completes the makeover.

**Tech Stack:** HTML5, CSS3, IBM Plex Sans via Google Fonts, jQuery (existing, untouched).

---

## File Structure

| File | Change |
|---|---|
| `index.html` | Add Google Fonts `<link>`, fix footer text, add `<strong>` around author names in citations |
| `assets/css/main.css` | Full rewrite — all visual styling, layout, JS-hook rules, responsive breakpoint |

`assets/js/` and `assets/css/fontawesome-all.min.css` are **not touched**.

### JS hooks to preserve in CSS (from `assets/js/main.js`)

| Hook | What the JS does |
|---|---|
| `body.is-preload *` | JS removes `is-preload` from `<body>` after 100ms; CSS must suppress transitions until then |
| `#header` | Sidebar — jQuery Panel plugin uses `side: 'right'`, `visibleClass: 'header-visible'` for mobile |
| `body.header-visible` | Added to `<body>` when mobile sidebar panel is open |
| `#titleBar` | Created by JS on every page load; hidden on desktop, shown on mobile |
| `#titleBar .toggle` | An `<a href="#header">` tag — the hamburger button |
| `#titleBar .title` | A `<span>` with the site name |
| `#nav a.active` | Scroll-spy: JS adds/removes `active` on nav links |
| `#nav a.active-locked` | Scroll-spy: locked active during scroll animation |
| `section.inactive` | Scroll-spy: JS adds this on init, removes on scroll-enter |

---

### Task 1: HTML prep — font import, footer, author bolding

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Start local HTTP server**

The Google Font won't load over `file://`. Run from the repo root and leave running for all tasks:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

- [ ] **Step 2: Add Google Fonts link to `<head>`**

The current `<head>` is:
```html
<head>
    <title>Samuel Hutchinson</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="assets/css/main.css" />
</head>
```

Replace with:
```html
<head>
    <title>Samuel Hutchinson</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/fontawesome-all.min.css" />
    <link rel="stylesheet" href="assets/css/main.css" />
</head>
```

- [ ] **Step 3: Fix footer copyright text**

Find:
```html
<li>&copy; Untitled. All rights reserved.</li>
```
Replace with:
```html
<li>&copy; Samuel Hutchinson &middot; samhutch@mit.edu</li>
```

- [ ] **Step 4: Bold author name in all three publication citations**

The first paper already has `<strong><i>Hutchinson, S.</i></strong>`. Verify the other two match. The second paper's `<p>` should begin:
```html
<p>Lee, C. S., Cohen, S. S., <strong><i>Hutchinson, S.</i></strong>, Tottenham, N., &amp; Baldassano, C. ...
```
The third paper's `<p>` contains a long author list — find `Hutchinson, S.` and wrap it:
```html
... <strong><i>Hutchinson, S.</i></strong>, Pan, S. ...
```

- [ ] **Step 5: Verify in browser**

Open DevTools → Network → filter "Font". Confirm `IBMPlexSans` requests appear (200 status). Check the footer shows "© Samuel Hutchinson · samhutch@mit.edu". The page will look broken until Task 2 — expected.

- [ ] **Step 6: Commit**
```bash
git add index.html
git commit -m "feat: add IBM Plex Sans, fix footer copyright, bold author names"
```

---

### Task 2: CSS scaffold — reset, layout, JS hooks

**Files:**
- Modify: `assets/css/main.css`

This task writes the structural skeleton: reset, base typography, the two-panel sidebar/content layout, and all JS-dependent CSS rules. After this task the page renders with a black left sidebar and content on the right.

- [ ] **Step 1: Overwrite `assets/css/main.css` with the scaffold**

```css
/* =============================================
   RESET & BASE
   ============================================= */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
}

body {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.9rem;
  color: #333333;
  line-height: 1.65;
  background: #ffffff;
}

p {
  margin-bottom: 1rem;
}

p:last-child {
  margin-bottom: 0;
}

a {
  color: #c0392b;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Suppress all transitions on initial page load.
   main.js removes is-preload from <body> after 100ms. */
body.is-preload * {
  transition: none !important;
  animation: none !important;
}

/* =============================================
   LAYOUT: SIDEBAR + WRAPPER
   ============================================= */

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: #1e1e1e;
  color: #ffffff;
  overflow-y: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
}

#wrapper {
  margin-left: 280px;
}

/* =============================================
   SCROLL-SPY: SECTION TRANSITIONS
   main.js adds .inactive on init; removes on scroll-enter.
   ============================================= */

section {
  transition: opacity 0.4s ease;
}

section.inactive {
  opacity: 0;
}

/* =============================================
   MOBILE TITLE BAR
   Created by main.js. Hidden on desktop.
   ============================================= */

#titleBar {
  display: none;
}
```

- [ ] **Step 2: Verify layout in browser at `http://localhost:8000`**

Expected: a dark (~280px) left sidebar panel and page content to the right of it. The content will be unstyled. If the layout is wrong, check browser console for CSS parse errors.

- [ ] **Step 3: Commit**
```bash
git add assets/css/main.css
git commit -m "feat: CSS scaffold — reset, sidebar layout, JS hook rules"
```

---

### Task 3: Sidebar styling

**Files:**
- Modify: `assets/css/main.css`

- [ ] **Step 1: Append sidebar styles to `assets/css/main.css`**

```css
/* =============================================
   SIDEBAR: AVATAR
   HTML: <span class="image avatar"><img …></span>
   ============================================= */

.image.avatar {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  flex-shrink: 0;
}

.image.avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* =============================================
   SIDEBAR: HEADER — NAME, ROLE, LINKS
   HTML: #header > header > h1#logo + p
   ============================================= */

#header > header {
  text-align: center;
}

#header h1 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.4rem;
}

#header h1 a {
  color: #ffffff;
  text-decoration: none;
}

#header > header > p {
  font-size: 0.8rem;
  color: #999999;
  line-height: 1.6;
  margin-top: 0.5rem;
}

#header > header > p a {
  color: #c0392b;
  text-decoration: none;
}

#header > header > p a:hover {
  text-decoration: underline;
}

/* =============================================
   SIDEBAR: NAV
   main.js toggles .active / .active-locked on <a> elements.
   ============================================= */

#nav {
  margin-top: 1.5rem;
}

#nav ul {
  list-style: none;
}

#nav ul li a {
  display: block;
  color: #bbbbbb;
  font-size: 0.85rem;
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.2rem;
  transition: background 0.2s, color 0.2s;
}

#nav ul li a:hover,
#nav ul li a.active {
  background: rgba(192, 57, 43, 0.2);
  color: #c0392b;
}

/* =============================================
   SIDEBAR: SOCIAL ICONS FOOTER
   HTML: #header > footer > ul.icons
   ============================================= */

#header > footer {
  margin-top: auto;
  padding-top: 2rem;
}

.icons {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.icons li a {
  color: #666666;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.2s;
}

.icons li a:hover {
  color: #c0392b;
}

/* FontAwesome icon labels are for screen readers only */
.icons li a .label {
  display: none;
}
```

- [ ] **Step 2: Verify sidebar in browser**

Confirm:
- Avatar is circular, ~80px
- "Sam Hutchinson" is white bold
- Role text is muted grey; Google Scholar and CV links are red
- Nav links are grey; turn to red background pill on hover
- Social icons are visible, turn red on hover

- [ ] **Step 3: Commit**
```bash
git add assets/css/main.css
git commit -m "feat: sidebar styling — avatar, nav active state, social icons"
```

---

### Task 4: Main content — About, Publications, Projects, Footer

**Files:**
- Modify: `assets/css/main.css`

- [ ] **Step 1: Append main content styles to `assets/css/main.css`**

```css
/* =============================================
   SHARED: CONTAINER & SECTION HEADINGS
   ============================================= */

.container {
  padding: 3rem 2.5rem;
  max-width: 860px;
}

h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e1e1e;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid #c0392b;
  margin-bottom: 1.5rem;
}

/* =============================================
   ABOUT: BANNER IMAGE
   HTML: <div class="image main" data-position="center"><img …></div>
   data-position is used by main.js as object-position fallback for old browsers.
   ============================================= */

.image.main {
  margin: 0;
  line-height: 0;
}

.image.main img {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: center;
}

/* =============================================
   ABOUT: BIO
   HTML: .container > header.major > h2 + p, then prose <p> tags
   ============================================= */

.container header.major {
  margin-bottom: 1.75rem;
}

.container header.major h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e1e1e;
  margin-bottom: 0.5rem;
}

.container header.major > p {
  font-size: 0.95rem;
  color: #666666;
  padding-bottom: 1rem;
  border-bottom: 2px solid #c0392b;
  margin-bottom: 0;
}

/* =============================================
   PUBLICATIONS & PROJECTS: IMAGE + CARD
   HTML: .features > article > a.image + .inner > h4 + p
   ============================================= */

.features {
  display: flex;
  flex-direction: column;
}

.features article {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1.25rem 0;
  border-bottom: 1px solid #e8e8e8;
}

.features article:last-child {
  border-bottom: none;
}

/* Thumbnail */
.features article a.image {
  display: block;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}

.features article a.image img {
  display: block;
  width: 80px;
  height: 80px;
  object-fit: cover;
  transition: opacity 0.2s;
}

.features article a.image:hover img {
  opacity: 0.8;
}

/* Title */
.features article .inner h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e1e1e;
  margin-bottom: 0.4rem;
  line-height: 1.4;
}

/* Citation text — italic, publications section only */
#publications .features article .inner p {
  font-size: 0.85rem;
  font-style: italic;
  color: #555555;
  line-height: 1.55;
}

/* Description text — not italic, projects section */
#other .features article .inner p {
  font-size: 0.85rem;
  color: #555555;
  line-height: 1.55;
}

/* =============================================
   MAIN PAGE FOOTER
   HTML: section#footer > .container > ul.copyright
   ============================================= */

#footer {
  background: #f7f7f7;
  border-top: 1px solid #e8e8e8;
}

#footer .copyright {
  list-style: none;
  font-size: 0.8rem;
  color: #888888;
  text-align: center;
  padding: 1.5rem 0;
}
```

- [ ] **Step 2: Verify main content in browser**

At `http://localhost:8000`:
- Banner image spans full main-content width at ~240px height, covers centre
- "Sam Hutchinson" h2 is large/dark; subtitle paragraph has a red bottom border
- Bio prose is readable at 0.9rem
- "Publications" and "Other Projects" h3 headings each have a 2px red bottom border
- Each publication: 80×80 thumbnail on left, italic citation text on right with "Hutchinson, S." bolded
- Each project: 80×80 thumbnail on left, non-italic description on right
- Footer reads "© Samuel Hutchinson · samhutch@mit.edu" in grey on a light background

- [ ] **Step 3: Commit**
```bash
git add assets/css/main.css
git commit -m "feat: main content styles — about, publications, projects, footer"
```

---

### Task 5: Responsive — mobile layout

**Files:**
- Modify: `assets/css/main.css`

`main.js` creates `#titleBar` with DOM structure:
```html
<div id="titleBar">
  <a href="#header" class="toggle"></a>
  <span class="title">Sam Hutchinson</span>
</div>
```

The jQuery Panel plugin slides `#header` in from the **right** and adds `header-visible` to `<body>` when open.

- [ ] **Step 1: Append responsive styles to `assets/css/main.css`**

```css
/* =============================================
   RESPONSIVE: ≤ 1024px
   main.js breakpoints: medium = 737–1024px, small = 481–736px.
   Below 1024px: sidebar becomes a right-side slide-in panel.
   ============================================= */

@media screen and (max-width: 1024px) {

  /* Show the JS-created title bar */
  #titleBar {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    background: #1e1e1e;
    z-index: 200;
    padding: 0 0.75rem;
  }

  /* .toggle is first in DOM; use order to push it right */
  #titleBar .toggle {
    order: 2;
    display: block;
    position: relative;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    cursor: pointer;
  }

  /* Three-line hamburger icon via pseudo-element + box-shadow */
  #titleBar .toggle::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 2px;
    background: #ffffff;
    box-shadow: 0 -6px 0 #ffffff, 0 6px 0 #ffffff;
  }

  #titleBar .title {
    order: 1;
    flex: 1;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Sidebar off-screen to the right; jQuery Panel slides it in */
  #header {
    position: fixed;
    top: 0;
    left: auto;
    right: -300px;
    width: 300px;
    height: 100vh;
    z-index: 300;
    transition: right 0.3s ease;
  }

  /* Panel open: body.header-visible added by jQuery Panel plugin */
  body.header-visible #header {
    right: 0;
  }

  /* Dim overlay behind open panel */
  body.header-visible::before {
    content: '';
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 250;
  }

  /* Full-width content, offset for title bar height */
  #wrapper {
    margin-left: 0;
    padding-top: 44px;
  }

  .container {
    padding: 2rem 1.25rem;
  }

}
```

- [ ] **Step 2: Verify mobile in browser**

Open DevTools → toggle device toolbar → set viewport to 375px wide. Confirm:
- Black title bar appears with "Sam Hutchinson" on the left and a hamburger icon on the right
- Tapping the hamburger slides the sidebar in from the right
- A dark overlay appears behind the open sidebar
- Tapping the overlay closes the sidebar
- Content occupies full width with no left margin

Then switch back to desktop (>1024px) and confirm:
- Fixed sidebar is visible on the left
- No title bar visible
- Content has `margin-left: 280px`

- [ ] **Step 3: Commit**
```bash
git add assets/css/main.css
git commit -m "feat: mobile responsive — title bar, right-side panel slide-in"
```

---

### Task 6: Push to GitHub Pages

- [ ] **Step 1: Push to remote**
```bash
git push origin main
```

- [ ] **Step 2: Verify live site**

Wait ~60 seconds for GitHub Pages to rebuild. Open `https://samhutch511.github.io` and verify:
- IBM Plex Sans loads (check DevTools → Network → Font)
- Sidebar is charcoal with red accent nav
- Banner image displays at correct height
- Publications show italic citation cards
- Footer reads "© Samuel Hutchinson · samhutch@mit.edu"
- Mobile: title bar and panel slide work on a phone or DevTools mobile viewport
