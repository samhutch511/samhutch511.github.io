# WYSIWYG Site Editor — Design Spec

**Date:** 2026-05-13
**Status:** Approved

---

## Context

`samhutch511.github.io` is a static GitHub Pages site. An existing `edit_website.ipynb` Jupyter notebook handles text editing via form widgets but cannot replace images. The goal is a WYSIWYG browser editor that renders the real site inline, lets you click to edit any content, and saves back to `index.html` with a git commit. The notebook is retired.

---

## What We're Building

Two new files:

| File | Purpose |
|---|---|
| `editor_server.py` | Minimal local Python server — serves static files + two POST endpoints |
| `editor.html` | WYSIWYG editor — renders the real site with editing overlays |

Nothing else in the project changes. Start editing with:

```bash
python editor_server.py
# Open http://localhost:4242
```

---

## Architecture

### `editor_server.py`

Python stdlib only (`http.server`, `subprocess`, `pathlib`, `json`) — no pip installs beyond what the project already has.

**Static serving:** All GET requests are served from the project root, so `assets/css/main.css`, `assets/js/`, `images/`, and `editor.html` all load normally.

**POST `/save`**
- Receives JSON body: `{ "html": "<full index.html content>" }`
- Writes content to `index.html`
- Runs: `git add index.html images/`
- Runs: `git commit -m "chore: update site content via editor"`
- Returns: `{ "ok": true, "hash": "<short commit hash>" }`

**POST `/upload-image`**
- Receives multipart form data: `file` (image bytes) + `filename` (target name)
- Writes file to `images/<filename>`, overwriting if it exists
- Returns: `{ "ok": true, "path": "images/<filename>" }`

Port: `4242`. Server binds to `127.0.0.1` only.

### `editor.html`

On load:
1. Fetches `index.html` raw HTML via `GET /index.html`
2. Parses the response, extracts the `<body>` content
3. Injects it into the editor page alongside the real site CSS links
4. Activates editing mode on designated elements

On Save & Commit:
1. Serializes the current live DOM back to a complete `index.html` string (preserving `<head>`, doctype, scripts)
2. POSTs to `/save`
3. Shows result in toolbar status area

---

## Editor UI

### Toolbar

Fixed bar at the top of the page (above the rendered site). Contains:

- **"✎ Site Editor"** label
- **"Save & Commit"** button (green) — triggers save flow
- **Status area** — shows one of: idle dot, "Saving…", "Saved ✓ [hash]", or error message
- **Save instructions** (always visible, small text beneath the button):
  > To publish: click Save & Commit, then run `git push origin main` in your terminal.

The toolbar is `position: fixed`, `z-index: 9999`, so it floats above the site content at all times.

### Unsaved changes indicator

When any edit is made, the toolbar shows an amber "● unsaved changes" badge next to the Save button. It clears on successful save.

---

## Editing Interactions

### 1. Plain text fields — `contenteditable="plaintext-only"`

Elements: name (`#header header #logo a`), publication titles (`.inner h4`), project titles (`.inner h4`).

- Yellow dashed border on hover
- `contenteditable="plaintext-only"` — no HTML markup can be introduced
- Click to edit in place, click away to confirm

### 2. Rich text blocks — `contenteditable="true"`

Elements: bio (`#about .container > p`), intro (`#about .container header.major p`), tagline (`#header header p`), citation text (`#publications .inner p`), project descriptions (`#other .inner p`).

- Yellow dashed border on hover
- `contenteditable="true"` — preserves existing `<a>`, `<strong>`, `<em>`, `<i>`, `<br>` tags
- `paste` event handler strips all formatting (font, color, span wrappers) before inserting pasted text, preserving only plain text
- Click to edit in place, click away to confirm

### 3. URL fields — inline popup

Elements: Scholar URL, CV URL, social link hrefs (`#header footer .icons li a`), DOI/project link hrefs (`a.image[href]`, `.inner p a`).

- On click: a small popup appears anchored below the element, containing a text `<input>` pre-filled with the current `href`
- Press Enter or click outside to confirm and close
- The popup is dismissed on Escape without saving changes

### 4. Image swap — hover overlay

Elements: avatar (`images/avatar.jpg`), banner (`images/banner.jpg`), publication thumbnails, project thumbnails.

- On hover: semi-transparent red overlay appears with a camera icon (📷)
- Click overlay → native file picker opens (`<input type="file" accept="image/*">`)
- On file selected:
  - POSTs to `/upload-image` with the file bytes and the **original filename** (e.g. `avatar.jpg`) as the target
  - On success: updates the `<img src>` in the DOM to bust cache (`src = "images/avatar.jpg?t=<timestamp>"`)
  - The overlay disappears; image updates in place

---

## Save Flow

1. User clicks **Save & Commit**
2. Toolbar shows "Saving…"
3. Editor reconstructs the full `index.html` from the current DOM:
   - Restores the original `<head>` (stored on load, unchanged)
   - Replaces `<body>` with the current edited body content
   - Strips any editor-injected attributes (`contenteditable`, `data-editor-*`, etc.) before serializing
4. POSTs to `/save`
5. Server writes `index.html`, runs `git add index.html images/`, runs `git commit`
6. Toolbar shows "Saved ✓ abc1234" (commit hash)
7. Unsaved-changes badge clears

**Scope of git add:** `index.html` and `images/` only — unrelated working-tree changes are not swept in.

---

## Instructions Shown in Editor

Permanently visible beneath the Save & Commit button:

> To publish: click **Save & Commit**, then run `git push origin main` in your terminal.

---

## File Changes

| File | Action |
|---|---|
| `editor_server.py` | Create |
| `editor.html` | Create |
| `edit_website.ipynb` | No change (can be deleted manually once editor is working) |

No changes to `index.html`, `assets/`, or any other existing file.

---

## Out of Scope

- Resizable panels (sidebar/content split)
- Adding or removing publications/projects (content count stays fixed)
- Editing `nlp-project/` or any subproject pages
- Auto-push to GitHub (user runs `git push` manually)
- Rich text toolbar (bold, italic buttons) — existing markup is preserved via contenteditable but no formatting toolbar is added
- Undo/redo beyond the browser's native contenteditable undo stack
