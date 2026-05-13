# WYSIWYG Site Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local WYSIWYG editor (`editor.html` + `editor_server.py`) that renders the real site inline with click-to-edit text/links, image swapping, and a Save & Commit button that writes `index.html` and runs `git commit`.

**Architecture:** A minimal Python stdlib HTTP server serves static files and two POST endpoints (`/save` writes HTML + runs git commit; `/upload-image` saves image bytes from a base64 JSON payload). A single `editor.html` fetches `index.html` on load, injects its `<body>` content, activates `contenteditable` on designated text elements, adds URL-edit popups on links, adds image-swap overlays, then POSTs a clean serialized `index.html` on save.

**Tech Stack:** Python 3 stdlib only (`http.server`, `subprocess`, `pathlib`, `json`, `base64`); vanilla JS + HTML + CSS; no external dependencies.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `editor_server.py` | Create | HTTP server: static serving, `/save`, `/upload-image` |
| `editor.html` | Create | WYSIWYG editor: rendering, editing, save flow |
| `tests/test_editor_server.py` | Create | Tests for the two pure functions in `editor_server.py` |

---

### Task 1: `editor_server.py` + tests

**Files:**
- Create: `editor_server.py`
- Create: `tests/test_editor_server.py`

- [ ] **Step 1: Write the failing tests**

```python
# tests/test_editor_server.py
import sys, pathlib, subprocess
sys.path.insert(0, str(pathlib.Path(__file__).parent.parent))
from editor_server import save_and_commit, save_image

def _make_git_repo(tmp_path):
    for cmd in [
        ['git', 'init'],
        ['git', 'config', 'user.email', 'test@test.com'],
        ['git', 'config', 'user.name', 'Test'],
    ]:
        subprocess.run(cmd, cwd=tmp_path, check=True, capture_output=True)
    (tmp_path / 'images').mkdir()
    (tmp_path / 'index.html').write_text('<html>original</html>')
    subprocess.run(['git', 'add', '.'], cwd=tmp_path, check=True, capture_output=True)
    subprocess.run(['git', 'commit', '-m', 'init'], cwd=tmp_path, check=True, capture_output=True)

def test_save_and_commit_writes_file(tmp_path):
    _make_git_repo(tmp_path)
    save_and_commit('<html>updated</html>', tmp_path)
    assert (tmp_path / 'index.html').read_text() == '<html>updated</html>'

def test_save_and_commit_returns_short_hash(tmp_path):
    _make_git_repo(tmp_path)
    h = save_and_commit('<html>v2</html>', tmp_path)
    assert len(h) == 7
    assert h.isalnum()

def test_save_image_writes_file(tmp_path):
    (tmp_path / 'images').mkdir()
    path = save_image(b'\x89PNG\r\n', 'avatar.jpg', tmp_path)
    assert path == 'images/avatar.jpg'
    assert (tmp_path / 'images' / 'avatar.jpg').read_bytes() == b'\x89PNG\r\n'

def test_save_image_prevents_path_traversal(tmp_path):
    (tmp_path / 'images').mkdir()
    path = save_image(b'data', '../evil.jpg', tmp_path)
    assert path == 'images/evil.jpg'
    assert not (tmp_path / 'evil.jpg').exists()
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
python3.10 -m pytest tests/test_editor_server.py -v
```

Expected: `ModuleNotFoundError: No module named 'editor_server'`

- [ ] **Step 3: Create `editor_server.py`**

```python
#!/usr/bin/env python3
"""Local editor server. Usage: python editor_server.py"""

import base64
import http.server
import json
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).parent
PORT = 4242


def save_and_commit(html: str, root: pathlib.Path = ROOT) -> str:
    """Write html to index.html, stage and commit. Returns 7-char hash."""
    (root / 'index.html').write_text(html, encoding='utf-8')
    subprocess.run(['git', 'add', 'index.html', 'images/'], cwd=root, check=True)
    subprocess.run(
        ['git', 'commit', '-m', 'chore: update site content via editor'],
        cwd=root, check=True,
    )
    result = subprocess.run(
        ['git', 'rev-parse', '--short', 'HEAD'],
        cwd=root, capture_output=True, text=True, check=True,
    )
    return result.stdout.strip()


def save_image(file_data: bytes, filename: str, root: pathlib.Path = ROOT) -> str:
    """Write image bytes to images/<filename>. Returns relative path."""
    safe_name = pathlib.Path(filename).name  # strip any directory component
    (root / 'images' / safe_name).write_bytes(file_data)
    return f'images/{safe_name}'


class EditorHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path == '/save':
            self._handle_save()
        elif self.path == '/upload-image':
            self._handle_upload_image()
        else:
            self.send_error(404)

    def _handle_save(self):
        length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(length))
        commit_hash = save_and_commit(body['html'])
        self._send_json({'ok': True, 'hash': commit_hash})

    def _handle_upload_image(self):
        length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(length))
        file_data = base64.b64decode(body['data'])
        path = save_image(file_data, body['filename'])
        self._send_json({'ok': True, 'path': path})

    def _send_json(self, data):
        payload = json.dumps(data).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, fmt, *args):
        print(f'  {self.path}  {args[1]}')


if __name__ == '__main__':
    server = http.server.HTTPServer(('127.0.0.1', PORT), EditorHandler)
    print(f'Editor running at http://localhost:{PORT}')
    print(f'Open: http://localhost:{PORT}/editor.html')
    print('Ctrl+C to stop.')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
python3.10 -m pytest tests/test_editor_server.py -v
```

Expected: `4 passed`

- [ ] **Step 5: Commit**

```bash
git add editor_server.py tests/test_editor_server.py
git commit -m "feat: editor server with /save and /upload-image endpoints"
```

---

### Task 2: `editor.html` — shell, toolbar, and site loading

**Files:**
- Create: `editor.html`

The editor page loads `index.html` via `fetch`, injects its `<body>` nodes into the current document, then activates editing. The original `<head>` HTML is stored in `window._originalHead` for clean reconstruction on save.

- [ ] **Step 1: Create `editor.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Site Editor</title>

  <!-- Site CSS — same links as index.html -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/fontawesome-all.min.css">
  <link rel="stylesheet" href="assets/css/main.css">

  <style>
    /* ── Toolbar ── */
    #editor-toolbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 48px;
      background: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 1rem;
      z-index: 9999;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.82rem;
    }
    #editor-toolbar .ed-label  { color: #fff; font-weight: 700; }
    #editor-toolbar .ed-hint   { color: #888; font-size: 0.75rem; }
    #editor-toolbar .ed-spacer { flex: 1; }
    #editor-toolbar .ed-publish {
      color: #aaa;
      font-size: 0.72rem;
    }
    #editor-toolbar .ed-publish code {
      background: #333;
      padding: 0.1rem 0.3rem;
      border-radius: 3px;
      font-family: monospace;
    }
    #editor-save-btn {
      background: #27ae60;
      color: #fff;
      border: none;
      padding: 0.35rem 0.9rem;
      border-radius: 4px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }
    #editor-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    #editor-status { font-size: 0.78rem; color: #aaa; min-width: 160px; }
    #editor-status.unsaved { color: #f0a500; }
    #editor-status.saving  { color: #aaa; }
    #editor-status.saved   { color: #27ae60; }
    #editor-status.error   { color: #e74c3c; }

    /* Push site content below toolbar; sidebar top aligned with toolbar bottom */
    body      { padding-top: 48px; }
    #header   { top: 48px; height: calc(100vh - 48px); }
  </style>
</head>
<body>

<!-- Toolbar — data-editor-ui marks it for removal during save serialization -->
<div id="editor-toolbar" data-editor-ui>
  <span class="ed-label">✎ Site Editor</span>
  <span class="ed-hint">Click highlighted fields to edit · hover images to swap</span>
  <div class="ed-spacer"></div>
  <span class="ed-publish">
    To publish: click <strong style="color:#fff">Save &amp; Commit</strong>,
    then run <code>git push origin main</code> in your terminal.
  </span>
  <span id="editor-status"></span>
  <button id="editor-save-btn" onclick="saveAndCommit()">Save &amp; Commit</button>
</div>

<script>
let _originalHead = '';

function setStatus(msg, cls) {
  const el = document.getElementById('editor-status');
  el.textContent = msg;
  el.className = cls || '';
}

function markUnsaved() {
  setStatus('● unsaved changes', 'unsaved');
}

async function loadSite() {
  const resp = await fetch('/index.html');
  const text = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  _originalHead = doc.head.innerHTML;

  // Append all site body nodes after the toolbar
  const toolbar = document.getElementById('editor-toolbar');
  [...doc.body.childNodes].forEach(node => {
    document.body.appendChild(document.adoptNode(node));
  });
  // Move toolbar back to top (appendChild moved it to end)
  document.body.insertBefore(toolbar, document.body.firstChild);

  activateEditing();
  setStatus('');
}

// activateEditing(), activateUrlLinks(), activateImages(),
// URL popup functions, triggerImagePicker(), serialize(), saveAndCommit()
// — added in subsequent tasks

loadSite();
</script>

</body>
</html>
```

- [ ] **Step 2: Start the server and verify the site loads**

```bash
python editor_server.py
```

Open Chrome at `http://localhost:4242/editor.html`.

Expected:
- Dark toolbar at the top: "✎ Site Editor" on the left, "Save & Commit" button on the right, publish instructions between them.
- Real site renders below — sidebar on left starting beneath the toolbar, content on right.
- No JS errors in DevTools console.

- [ ] **Step 3: Commit**

```bash
git add editor.html
git commit -m "feat: editor shell — toolbar and site loading"
```

---

### Task 3: `editor.html` — contenteditable editing + unsaved tracking

**Files:**
- Modify: `editor.html` — add `activateEditing()`, highlight CSS, paste handler

- [ ] **Step 1: Add editable field highlight CSS**

Inside the `<style>` block in `editor.html`, add after the `#editor-status` rules:

```css
/* ── Editable field highlights ── */
[contenteditable]:hover {
  outline: 2px dashed #f0a500;
  outline-offset: 2px;
  cursor: text;
}
[contenteditable]:focus {
  outline: 2px solid #f0a500;
  outline-offset: 2px;
  background: rgba(240, 165, 0, 0.04);
}
```

- [ ] **Step 2: Add `activateEditing()` and `stripPasteFormatting()` to the `<script>` block**

Replace the comment `// activateEditing() ...` placeholder with:

```javascript
function activateEditing() {
  // Plain text — no HTML markup allowed (name, pub/project titles)
  [
    '#header header #logo a',
    '#publications .features article .inner h4',
    '#other .features article .inner h4',
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.contentEditable = 'plaintext-only';
      el.addEventListener('input', markUnsaved);
    });
  });

  // Rich text — preserves existing <a>, <strong>, <em>, <i>, <br>
  [
    '#about .container > p',
    '#about .container header.major p',
    '#header header p',
    '#publications .features article .inner p',
    '#other .features article .inner p',
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.contentEditable = 'true';
      el.addEventListener('input', markUnsaved);
      el.addEventListener('paste', stripPasteFormatting);
    });
  });

  activateUrlLinks();
  activateImages();
}

function stripPasteFormatting(e) {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text/plain');
  document.execCommand('insertText', false, text);
}

// Stubs — replaced by the full implementations in Tasks 4 and 5
function activateUrlLinks() {}
function activateImages() {}
```

- [ ] **Step 3: Verify contenteditable editing**

Reload `http://localhost:4242/editor.html` (server must still be running).

- Hover over "Sam Hutchinson" in the sidebar → yellow dashed outline
- Click it → cursor appears, type to change the name → "● unsaved changes" appears in toolbar
- Click the bio paragraph → cursor appears, existing links/bold are preserved while typing
- Paste formatted text (copy from a webpage) → only plain text is inserted, no spans or colors
- Hover over a publication citation → editable with yellow highlight

- [ ] **Step 4: Commit**

```bash
git add editor.html
git commit -m "feat: contenteditable editing for text and rich text fields"
```

---

### Task 4: `editor.html` — URL popup for link editing

**Files:**
- Modify: `editor.html` — add popup HTML, popup CSS, `activateUrlLinks()`, popup JS

URL-editable links: Scholar/CV links in the tagline (inside a rich text contenteditable), social icon hrefs, thumbnail `a.image` hrefs, inline DOI/project links in citation/description paragraphs (also inside rich text contenteditable). Nav links (`#about`, `#publications`, `#other`) are NOT made editable — they're scroll anchors.

- [ ] **Step 1: Add URL popup HTML**

Inside `<body>`, add this after the `#editor-toolbar` div and before the `<script>` tag:

```html
<!-- URL edit popup -->
<div id="url-popup" data-editor-ui style="display:none;position:fixed;z-index:10000;
     background:#fff;border:1px solid #ddd;border-radius:6px;padding:0.65rem 0.75rem;
     box-shadow:0 4px 16px rgba(0,0,0,0.15);font-family:'IBM Plex Sans',sans-serif;
     font-size:0.82rem;min-width:320px;">
  <div style="color:#777;margin-bottom:0.4rem;font-size:0.72rem;font-weight:600;letter-spacing:0.05em">EDIT URL</div>
  <input id="url-popup-input" type="url" autocomplete="off"
    style="width:100%;border:1px solid #ccc;border-radius:4px;padding:0.3rem 0.5rem;
           font-family:inherit;font-size:0.82rem;box-sizing:border-box;">
  <div style="display:flex;gap:0.5rem;margin-top:0.5rem;justify-content:flex-end">
    <button onclick="closeUrlPopup(false)"
      style="border:1px solid #ccc;background:#fff;padding:0.25rem 0.7rem;
             border-radius:4px;cursor:pointer;font-family:inherit;font-size:0.78rem">Cancel</button>
    <button onclick="closeUrlPopup(true)"
      style="border:none;background:#c0392b;color:#fff;padding:0.25rem 0.7rem;
             border-radius:4px;cursor:pointer;font-family:inherit;font-size:0.78rem;font-weight:600">Save</button>
  </div>
</div>
```

- [ ] **Step 2: Add URL popup CSS**

Inside the `<style>` block, after the editable field highlight rules:

```css
/* ── URL editable links ── */
a[data-url-editable] {
  cursor: pointer;
  text-decoration: underline dotted;
}
```

- [ ] **Step 3: Add URL popup JS to the `<script>` block**

Replace the stub `function activateUrlLinks() {}` with:

```javascript
let _urlTarget = null;

function openUrlPopup(el, e) {
  e.preventDefault();
  e.stopPropagation();
  _urlTarget = el;
  const input = document.getElementById('url-popup-input');
  input.value = el.getAttribute('href') || '';
  const popup = document.getElementById('url-popup');
  const rect = el.getBoundingClientRect();
  popup.style.top  = (rect.bottom + 6) + 'px';
  popup.style.left = Math.min(rect.left, window.innerWidth - 340) + 'px';
  popup.style.display = 'block';
  input.focus();
  input.select();
}

function closeUrlPopup(save) {
  if (save && _urlTarget) {
    _urlTarget.setAttribute('href', document.getElementById('url-popup-input').value);
    markUnsaved();
  }
  document.getElementById('url-popup').style.display = 'none';
  _urlTarget = null;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeUrlPopup(false);
});
document.addEventListener('click', e => {
  const popup = document.getElementById('url-popup');
  if (popup.style.display !== 'none' && !popup.contains(e.target)) closeUrlPopup(false);
});

function activateUrlLinks() {
  // Enter key in popup input confirms save
  document.getElementById('url-popup-input')
    .addEventListener('keydown', e => { if (e.key === 'Enter') closeUrlPopup(true); });

  // Links to make URL-editable. Excludes nav scroll anchors (#about etc.)
  [
    '#header footer .icons li a',          // social icons
    '#publications .features article a.image',  // pub thumbnail links
    '#publications .features article .inner p a', // inline DOI links
    '#other .features article a.image',    // project thumbnail links
    '#other .features article .inner p a', // inline project links
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.setAttribute('data-url-editable', '');
      el.addEventListener('click', e => openUrlPopup(el, e));
    });
  });

  // Scholar and CV links live inside a contenteditable <p>,
  // so intercept clicks on them specifically
  document.querySelectorAll('#header header p a').forEach(el => {
    el.setAttribute('data-url-editable', '');
    el.addEventListener('click', e => openUrlPopup(el, e));
  });
}
```

- [ ] **Step 4: Verify URL popup**

Reload `http://localhost:4242/editor.html`.

- Click the Twitter icon in the sidebar → popup appears pre-filled with `https://x.com/samhutch511`
- Edit the URL and click Save → right-click the icon → Inspect → verify `href` updated
- Click "Google Scholar" in the tagline → popup appears (even though it's inside a contenteditable)
- Press Escape → popup closes, href unchanged
- Click a DOI link inside a publication citation → popup appears

- [ ] **Step 5: Commit**

```bash
git add editor.html
git commit -m "feat: URL popup for link href editing"
```

---

### Task 5: `editor.html` — image swap overlays

**Files:**
- Modify: `editor.html` — add image overlay CSS, `activateImages()`, `triggerImagePicker()`

Images are: avatar (`span.image.avatar > img`), banner (`div.image.main > img`), and thumbnails (`a.image > img`). Overlays are appended directly to each container — no wrapper div needed since the containers already have `overflow: hidden`.

- [ ] **Step 1: Add image overlay CSS**

Inside the `<style>` block, after the URL editable links rules:

```css
/* ── Image swap overlays ── */
/* Containers need position:relative for the absolute overlay */
.image.avatar, .image.main, a.image { position: relative; }

.ed-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(192, 57, 43, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s;
  cursor: pointer;
  font-size: 1.4rem;
  border-radius: inherit;
  pointer-events: none;
}
.image.avatar:hover .ed-img-overlay,
.image.main:hover   .ed-img-overlay,
a.image:hover       .ed-img-overlay {
  opacity: 1;
  pointer-events: auto;
}
```

- [ ] **Step 2: Add image swap JS to the `<script>` block**

Replace the stub `function activateImages() {}` with the full implementation, then add `triggerImagePicker()` immediately after:

```javascript
function activateImages() {
  [
    '.image.avatar',
    '.image.main',
    '#publications .features article a.image',
    '#other .features article a.image',
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(container => {
      const img = container.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.className = 'ed-img-overlay';
      overlay.setAttribute('data-editor-ui', '');
      overlay.textContent = '📷';
      overlay.title = 'Click to replace image';
      overlay.addEventListener('click', () => triggerImagePicker(img));
      container.appendChild(overlay);
    });
  });
}

function triggerImagePicker(img) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    // Use the existing filename from the current src
    const originalSrc = img.getAttribute('src').split('?')[0];
    const filename = originalSrc.split('/').pop();
    // Encode as base64
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = e => resolve(e.target.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const resp = await fetch('/upload-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, data: base64 }),
    });
    const json = await resp.json();
    if (!json.ok) { alert('Image upload failed'); return; }
    // Cache-bust the src so the browser reloads it
    img.src = originalSrc + '?t=' + Date.now();
    markUnsaved();
  });
  input.click();
}
```

- [ ] **Step 3: Verify image swap**

Reload `http://localhost:4242/editor.html`.

- Hover over the avatar photo → red overlay with 📷 appears
- Click it → system file picker opens
- Select any image → avatar updates immediately, toolbar shows "● unsaved changes"
- Run `ls -la images/avatar.jpg` in terminal → modification time is recent
- Hover over the banner → overlay appears, swap works
- Hover over a publication thumbnail → overlay appears

- [ ] **Step 4: Commit**

```bash
git add editor.html
git commit -m "feat: image swap with hover overlay and server upload"
```

---

### Task 6: `editor.html` — save flow

**Files:**
- Modify: `editor.html` — add `serialize()` and `saveAndCommit()`

`serialize()` clones `document.body`, strips all editor UI (`[data-editor-ui]`), removes `contenteditable` attributes, strips `?t=` cache-bust suffixes from `img src`, restores `class="is-preload"` on body, then reconstructs a complete `index.html` string using the stored `_originalHead`.

- [ ] **Step 1: Add `serialize()` and `saveAndCommit()` to the `<script>` block**

After `triggerImagePicker()`, add:

```javascript
function serialize() {
  const clone = document.body.cloneNode(true);

  // Remove all editor-injected UI elements (toolbar, popup, overlays)
  clone.querySelectorAll('[data-editor-ui]').forEach(el => el.remove());

  // Remove contenteditable attributes
  clone.querySelectorAll('[contenteditable]').forEach(el => {
    el.removeAttribute('contenteditable');
  });

  // Remove data-url-editable markers
  clone.querySelectorAll('[data-url-editable]').forEach(el => {
    el.removeAttribute('data-url-editable');
  });

  // Strip cache-bust query params from all img srcs
  clone.querySelectorAll('img[src]').forEach(img => {
    img.setAttribute('src', img.getAttribute('src').split('?')[0]);
  });

  // Restore original body class (editor adds nothing, but be explicit)
  clone.setAttribute('class', 'is-preload');

  return `<!DOCTYPE HTML>\n<html>\n\t<head>${_originalHead}</head>\n\t${clone.outerHTML}\n</html>`;
}

async function saveAndCommit() {
  const btn = document.getElementById('editor-save-btn');
  btn.disabled = true;
  setStatus('Saving…', 'saving');
  try {
    const resp = await fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: serialize() }),
    });
    const json = await resp.json();
    if (json.ok) {
      setStatus(`Saved ✓ ${json.hash}`, 'saved');
    } else {
      setStatus('Save failed', 'error');
    }
  } catch (err) {
    setStatus('Error: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}
```

- [ ] **Step 2: End-to-end save test**

With the server running, reload `http://localhost:4242/editor.html`.

1. Edit the name "Sam Hutchinson" → change to "Sam H. Test"
2. Click **Save & Commit** → toolbar shows "Saving…" then "Saved ✓ abc1234"
3. Open `index.html` in a text editor → confirm the name change is present
4. Run `git log --oneline -3` → top commit is `chore: update site content via editor`
5. Revert: edit name back to "Sam Hutchinson", click Save & Commit again

- [ ] **Step 3: Verify editor attributes are stripped from saved `index.html`**

Open `index.html` and confirm each of the following is absent:
- `contenteditable` attribute on any element
- `data-editor-ui` attribute on any element
- `data-url-editable` attribute on any element
- `?t=` in any `img src`
- `<body class="editor-active">` (should be `<body class="is-preload">`)

- [ ] **Step 4: Commit**

```bash
git add editor.html
git commit -m "feat: save flow — serialize DOM and POST to server"
```
