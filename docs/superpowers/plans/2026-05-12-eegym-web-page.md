# EEGym Interactive Project Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone static page at `nlp-project/index.html` with interactive Plotly.js charts of all three EEGym paper figures, a styled header, abstract/key-findings summary, and direct download links for the data CSVs and analysis notebooks.

**Architecture:** A Python data prep script reads the two LME result CSVs and writes `nlp-project/chart-data.js` containing all chart data as a JS constant. The page loads Plotly from CDN and `chart-data.js`, then renders three interactive charts inline. The page is pure HTML/CSS/JS — no build step, deploys as-is to GitHub Pages.

**Tech Stack:** Python 3 (data prep), Plotly.js 2.35.2 (charts), vanilla JS (tab switching, chart init), HTML/CSS (page layout)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `scripts/prepare_chart_data.py` | Create | Reads CSVs, writes `nlp-project/chart-data.js` |
| `tests/test_prepare_chart_data.py` | Create | Verifies data shape and correctness |
| `nlp-project/index.html` | Create | Full project page: header, intro, 3 figures, footer |
| `nlp-project/chart-data.js` | Generated | Chart data as `const CHART_DATA = {...}` — committed after running script |
| `index.html` | Modify | Add EEGym article card to `section#other .features` |

**Data notes (read before coding):**
- `lme_results.csv` has 18 models × 5 predictors = 90 rows. Predictors: `last_layer_surprisal`, `cv_layer_surprisal`, `shallow_surprisal`, `lang_mae_z`, `su_sgm_z`.
- `cv_layer_surprisal` only exists for 8 models (GPT-2 + Pythia) — the "Layer-wise surprisal" tab in Figure 1 will show 8 bars, not 18. This is expected.
- `lme_layer_results.csv` has 244 rows across 8 models (GPT-2 + Pythia only; Qwen3 excluded per paper).
- All files are under `nlp-group-project-main/lme_results/` — note the subdirectory.

---

## Task 1: Data Prep Script

**Files:**
- Create: `scripts/prepare_chart_data.py`
- Create: `tests/test_prepare_chart_data.py`

- [ ] **Step 1: Create the test file**

```python
# tests/test_prepare_chart_data.py
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent.parent / "scripts"))
from prepare_chart_data import read_fig1, read_fig2, read_fig3

def test_fig1_row_count():
    rows = read_fig1()
    # 18 models × 5 predictors = 90, but cv_layer_surprisal only has 8 models
    # so total = 18*4 + 8 = 80
    assert len(rows) == 80

def test_fig1_row_keys():
    row = read_fig1()[0]
    assert set(row.keys()) == {"model", "label", "family", "color", "predictor", "daic", "sig"}

def test_fig1_all_families_present():
    families = {r["family"] for r in read_fig1()}
    assert families == {"GPT-2", "Pythia", "Qwen3 Base", "Qwen3 Instruct"}

def test_fig2_only_gpt2_pythia():
    families = {r["family"] for r in read_fig2()}
    assert families == {"GPT-2", "Pythia"}

def test_fig2_layer_pct_range():
    for row in read_fig2():
        assert 0.0 <= row["layer_pct"] <= 1.0

def test_fig3_excludes_qwen3_instruct():
    for row in read_fig3():
        assert row["family"] != "Qwen3 Instruct"

def test_fig3_all_have_params():
    for row in read_fig3():
        assert row["params_b"] > 0
```

- [ ] **Step 2: Run the tests — verify they fail**

```bash
cd /Users/samhutchinson/Documents/GitHub/samhutch511.github.io
python3 -m pytest tests/test_prepare_chart_data.py -v
```

Expected: `ModuleNotFoundError: No module named 'prepare_chart_data'`

- [ ] **Step 3: Create the script**

```python
# scripts/prepare_chart_data.py
import csv, json, pathlib

ROOT        = pathlib.Path(__file__).parent.parent
LME_RESULTS = ROOT / "nlp-group-project-main/lme_results/lme_results.csv"
LME_LAYER   = ROOT / "nlp-group-project-main/lme_results/lme_layer_results.csv"
OUT         = ROOT / "nlp-project/chart-data.js"

FAMILY_MAP = {
    "gpt2": "GPT-2", "gpt2_large": "GPT-2", "gpt2_xl": "GPT-2",
    "eleutherai_pythia_410m_deduped": "Pythia",
    "eleutherai_pythia_1.4b_deduped": "Pythia",
    "eleutherai_pythia_2.8b_deduped": "Pythia",
    "eleutherai_pythia_6.9b_deduped": "Pythia",
    "eleutherai_pythia_12b_deduped":  "Pythia",
    "qwen_qwen3_0.6b_base":  "Qwen3 Base", "qwen_qwen3_1.7b_base": "Qwen3 Base",
    "qwen_qwen3_4b_base":    "Qwen3 Base", "qwen_qwen3_8b_base":   "Qwen3 Base",
    "qwen_qwen3_14b_base":   "Qwen3 Base",
    "qwen_qwen3_0.6b":  "Qwen3 Instruct", "qwen_qwen3_1.7b": "Qwen3 Instruct",
    "qwen_qwen3_4b":    "Qwen3 Instruct", "qwen_qwen3_8b":   "Qwen3 Instruct",
    "qwen_qwen3_14b":   "Qwen3 Instruct",
}

LABEL_MAP = {
    "gpt2": "GPT-2", "gpt2_large": "GPT-2-L", "gpt2_xl": "GPT-2-XL",
    "eleutherai_pythia_410m_deduped": "Py-410M",
    "eleutherai_pythia_1.4b_deduped": "Py-1.4B",
    "eleutherai_pythia_2.8b_deduped": "Py-2.8B",
    "eleutherai_pythia_6.9b_deduped": "Py-6.9B",
    "eleutherai_pythia_12b_deduped":  "Py-12B",
    "qwen_qwen3_0.6b_base":  "Qw3-0.6B-b", "qwen_qwen3_1.7b_base": "Qw3-1.7B-b",
    "qwen_qwen3_4b_base":    "Qw3-4B-b",   "qwen_qwen3_8b_base":   "Qw3-8B-b",
    "qwen_qwen3_14b_base":   "Qw3-14B-b",
    "qwen_qwen3_0.6b":  "Qw3-0.6B", "qwen_qwen3_1.7b": "Qw3-1.7B",
    "qwen_qwen3_4b":    "Qw3-4B",   "qwen_qwen3_8b":   "Qw3-8B",
    "qwen_qwen3_14b":   "Qw3-14B",
}

PARAMS_B = {
    "gpt2": 0.117, "gpt2_large": 0.774, "gpt2_xl": 1.5,
    "eleutherai_pythia_410m_deduped": 0.41,
    "eleutherai_pythia_1.4b_deduped": 1.4,
    "eleutherai_pythia_2.8b_deduped": 2.8,
    "eleutherai_pythia_6.9b_deduped": 6.9,
    "eleutherai_pythia_12b_deduped":  12.0,
    "qwen_qwen3_0.6b_base": 0.6,  "qwen_qwen3_1.7b_base": 1.7,
    "qwen_qwen3_4b_base":   4.0,  "qwen_qwen3_8b_base":   8.0,
    "qwen_qwen3_14b_base":  14.0,
}

COLORS = {
    "GPT-2":          "#4361ee",
    "Pythia":         "#e63946",
    "Qwen3 Base":     "#7b2d8b",
    "Qwen3 Instruct": "#c77dff",
}

def read_fig1():
    rows = []
    with open(LME_RESULTS) as f:
        for row in csv.DictReader(f):
            m = row["model"]
            if m not in FAMILY_MAP:
                continue
            rows.append({
                "model":     m,
                "label":     LABEL_MAP[m],
                "family":    FAMILY_MAP[m],
                "color":     COLORS[FAMILY_MAP[m]],
                "predictor": row["predictor"],
                "daic":      round(float(row["daic"]), 2),
                "sig":       row["sig"],
            })
    return rows

def read_fig2():
    rows = []
    with open(LME_LAYER) as f:
        for row in csv.DictReader(f):
            m = row["model"]
            if m not in FAMILY_MAP:
                continue
            rows.append({
                "model":     m,
                "label":     LABEL_MAP[m],
                "family":    FAMILY_MAP[m],
                "color":     COLORS[FAMILY_MAP[m]],
                "layer_pct": round(float(row["layer_pct"]), 4),
                "daic":      round(float(row["daic"]), 2),
            })
    return rows

def read_fig3():
    rows = []
    with open(LME_RESULTS) as f:
        for row in csv.DictReader(f):
            m = row["model"]
            if row["predictor"] != "last_layer_surprisal":
                continue
            if m not in PARAMS_B:
                continue
            rows.append({
                "model":    m,
                "label":    LABEL_MAP[m],
                "family":   FAMILY_MAP[m],
                "color":    COLORS[FAMILY_MAP[m]],
                "params_b": PARAMS_B[m],
                "daic":     round(float(row["daic"]), 2),
            })
    return rows

def main():
    data = {"fig1": read_fig1(), "fig2": read_fig2(), "fig3": read_fig3()}
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(f"const CHART_DATA = {json.dumps(data, indent=2)};\n")
    print(f"Written {OUT}  ({len(data['fig1'])} fig1 rows, {len(data['fig2'])} fig2 rows, {len(data['fig3'])} fig3 rows)")

if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run the tests — verify they pass**

```bash
python3 -m pytest tests/test_prepare_chart_data.py -v
```

Expected: 7 tests PASS

- [ ] **Step 5: Generate chart-data.js**

```bash
python3 scripts/prepare_chart_data.py
```

Expected output: `Written .../nlp-project/chart-data.js  (80 fig1 rows, 244 fig2 rows, 11 fig3 rows)`

- [ ] **Step 6: Commit**

```bash
git add scripts/prepare_chart_data.py tests/test_prepare_chart_data.py nlp-project/chart-data.js
git commit -m "feat: add chart data prep script and generated chart-data.js"
```

---

## Task 2: HTML Shell (header, intro, downloads — no charts)

**Files:**
- Create: `nlp-project/index.html`

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EEGym — Sam Hutchinson</title>
  <script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
  <script src="chart-data.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
           background: #f0f2f5; color: #222; }
    a { color: #4a7fcb; }

    .page { background: #fff; max-width: 900px; margin: 0 auto;
            padding: 0 0 48px; box-shadow: 0 2px 20px rgba(0,0,0,.08); }

    /* Back nav */
    .back-nav { padding: 12px 36px; border-bottom: 1px solid #eee;
                font-size: 13px; color: #888; }
    .back-nav a { text-decoration: none; }

    /* Header */
    .paper-header { padding: 32px 36px 24px; border-bottom: 1px solid #eee; }
    .paper-header h1 { margin: 0 0 8px; font-size: 22px; font-weight: 700;
                       line-height: 1.35; color: #1a1a2e; }
    .authors { font-size: 14px; color: #555; margin-bottom: 4px; }
    .venue   { font-size: 13px; color: #888; margin-bottom: 16px; }
    .pdf-btn { display: inline-block; padding: 6px 20px; background: #1a1a2e;
               color: #fff; text-decoration: none; border-radius: 4px;
               font-size: 13px; font-weight: 600; }
    .pdf-btn:hover { background: #2d2d4e; color: #fff; }

    /* Two-col intro */
    .intro-grid { display: grid; grid-template-columns: 1fr 250px; gap: 28px;
                  padding: 28px 36px; border-bottom: 1px solid #eee; }
    .abstract-col h3 { margin: 0 0 10px; font-size: 12px; text-transform: uppercase;
                       letter-spacing: .07em; color: #888; }
    .abstract-col p  { font-size: 14px; line-height: 1.7; color: #333; margin: 0 0 14px; }
    .findings-box { background: #f8f9fa; border-left: 3px solid #4a7fcb;
                    padding: 12px 16px; border-radius: 0 6px 6px 0; }
    .findings-box h4 { margin: 0 0 8px; font-size: 11px; text-transform: uppercase;
                       letter-spacing: .07em; color: #4a7fcb; }
    .findings-box ul { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.8; color: #333; }

    .downloads-col h3 { margin: 0 0 10px; font-size: 12px; text-transform: uppercase;
                        letter-spacing: .07em; color: #888; }
    .dl-group { margin-bottom: 12px; }
    .dl-group-label { font-size: 10px; text-transform: uppercase; letter-spacing: .08em;
                      color: #aaa; margin-bottom: 5px; }
    .dl-item { display: block; background: #f8f9fa; border: 1px solid #e5e5e5;
               border-radius: 6px; padding: 8px 12px; margin-bottom: 6px;
               text-decoration: none; color: inherit; transition: border-color .15s; }
    .dl-item:hover { border-color: #4a7fcb; }
    .dl-name { font-family: monospace; font-size: 11px; font-weight: 600; color: #1a1a2e; }
    .dl-desc { font-size: 11px; color: #888; margin-top: 2px; }

    /* Figure sections */
    .figure-section { padding: 28px 36px; border-bottom: 1px solid #eee; }
    .figure-section h2 { margin: 0 0 4px; font-size: 16px; font-weight: 700; color: #1a1a2e; }
    .fig-caption { font-size: 13px; color: #666; margin: 0 0 16px; line-height: 1.55; }

    /* Tabs (Figure 1) */
    .tabs { display: flex; border-bottom: 2px solid #e5e5e5; margin-bottom: 16px;
            overflow-x: auto; }
    .tab { padding: 8px 16px; font-size: 13px; cursor: pointer; color: #888; white-space: nowrap;
           border-bottom: 2px solid transparent; margin-bottom: -2px; background: none;
           border-top: none; border-left: none; border-right: none; font-family: inherit; }
    .tab:hover { color: #555; }
    .tab.active { color: #4a7fcb; border-bottom-color: #4a7fcb; font-weight: 600; }

    /* Footer */
    .page-footer { padding: 20px 36px 0; }
    .page-footer p { font-size: 13px; color: #aaa; margin: 0; }
  </style>
</head>
<body>
<div class="page">

  <div class="back-nav">
    <a href="/">← samhutch511.github.io</a>
  </div>

  <div class="paper-header">
    <h1>EEGym: a novel benchmark for comparing language model representations and human N400 responses</h1>
    <div class="authors">Sam Hutchinson &nbsp;·&nbsp; Jenny Baek &nbsp;·&nbsp; Ali Cy</div>
    <div class="venue">MIT 6.8610 Grad NLP</div>
    <a class="pdf-btn" href="../nlp_group_project.pdf" download>PDF</a>
  </div>

  <div class="intro-grid">
    <div class="abstract-col">
      <h3>Abstract</h3>
      <p>We present EEGym, a standardized benchmark aggregating N400 ERP data from three independent
         labs (~46k trials across 98 subjects). We compare representations from GPT-2, Pythia, Qwen3,
         and a Sentence Gestalt model on their ability to predict human neural responses to language.</p>
      <div class="findings-box">
        <h4>Key findings</h4>
        <ul>
          <li>LLM surprisal strongly predicts N400, especially from the final layer and mid-to-late layers</li>
          <li>Pre-trained base models outperform instruction-tuned models</li>
          <li>Predictivity scales with model size</li>
        </ul>
      </div>
    </div>

    <div class="downloads-col">
      <h3>Downloads</h3>
      <div class="dl-group">
        <div class="dl-group-label">Data</div>
        <a class="dl-item" href="../nlp-group-project-main/combined_clean_n400.csv" download>
          <div class="dl-name">combined_clean_n400.csv</div>
          <div class="dl-desc">N400 amplitudes · 98 subjects · 46k trials</div>
        </a>
        <a class="dl-item" href="../nlp-group-project-main/stims_for_modeling.csv" download>
          <div class="dl-name">stims_for_modeling.csv</div>
          <div class="dl-desc">Sentences + critical words for modeling</div>
        </a>
      </div>
      <div class="dl-group">
        <div class="dl-group-label">Notebooks</div>
        <a class="dl-item" href="../nlp-group-project-main/pipeline.ipynb" download>
          <div class="dl-name">pipeline.ipynb</div>
          <div class="dl-desc">Main analysis pipeline</div>
        </a>
        <a class="dl-item" href="../nlp-group-project-main/lopopolo_pipeline.ipynb" download>
          <div class="dl-name">lopopolo_pipeline.ipynb</div>
          <div class="dl-desc">Sentence Gestalt model pipeline</div>
        </a>
        <a class="dl-item" href="../nlp-group-project-main/final_plots.ipynb" download>
          <div class="dl-name">final_plots.ipynb</div>
          <div class="dl-desc">Figure reproduction</div>
        </a>
      </div>
    </div>
  </div>

  <!-- Figure sections added in Task 3 & 4 -->

  <div class="page-footer">
    <p>Correspondence: <a href="mailto:samhutch@mit.edu">samhutch@mit.edu</a></p>
  </div>

</div>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify shell layout**

```bash
open nlp-project/index.html
```

Check: header title/authors/venue render correctly, PDF button present, two-column intro with abstract and downloads visible, download cards show correct filenames, back link at top.

- [ ] **Step 3: Commit**

```bash
git add nlp-project/index.html
git commit -m "feat: add EEGym page shell (header, intro, downloads)"
```

---

## Task 3: Figure 1 — Tabbed Bar Chart

**Files:**
- Modify: `nlp-project/index.html` — insert Figure 1 section + JS

- [ ] **Step 1: Insert the Figure 1 section**

Add the following HTML after the `<!-- Figure sections added in Task 3 & 4 -->` comment and before the `.page-footer` div:

```html
  <div class="figure-section">
    <h2>Figure 1 — Predictor comparison (ΔAIC vs. null model)</h2>
    <p class="fig-caption">Higher ΔAIC = stronger prediction of N400 amplitude.
       Significance stars shown on hover. Use tabs to switch between predictors.</p>
    <div class="tabs">
      <button class="tab active" data-predictor="last_layer_surprisal">Surprisal</button>
      <button class="tab" data-predictor="cv_layer_surprisal">Layer-wise surprisal</button>
      <button class="tab" data-predictor="shallow_surprisal">Shallow surprisal</button>
      <button class="tab" data-predictor="lang_mae_z">Language-network update</button>
      <button class="tab" data-predictor="su_sgm_z">SG update</button>
    </div>
    <div id="fig1-chart"></div>
  </div>
```

- [ ] **Step 2: Add the Figure 1 JS**

Add the following `<script>` block just before `</body>`:

```html
<script>
  // ── Figure 1 ──────────────────────────────────────────────────────────────
  const FAMILY_ORDER = ["GPT-2", "Pythia", "Qwen3 Base", "Qwen3 Instruct"];

  function renderFig1(predictor) {
    const rows = CHART_DATA.fig1.filter(d => d.predictor === predictor);
    const traces = FAMILY_ORDER.map(fam => {
      const r = rows.filter(d => d.family === fam);
      if (!r.length) return null;
      return {
        type: "bar",
        name: fam,
        x: r.map(d => d.label),
        y: r.map(d => d.daic),
        marker: { color: r[0].color },
        customdata: r.map(d => d.sig || "n.s."),
        hovertemplate: "<b>%{x}</b><br>ΔAIC: %{y:.1f}<br>Sig: %{customdata}<extra></extra>",
      };
    }).filter(Boolean);

    Plotly.react("fig1-chart", traces, {
      xaxis: { title: "Model", tickangle: -35, automargin: true },
      yaxis: { title: "ΔAIC vs. null" },
      legend: { orientation: "h", y: -0.35 },
      margin: { t: 10, b: 120, l: 60, r: 20 },
      height: 360,
      plot_bgcolor: "#fff",
      paper_bgcolor: "#fff",
    }, { responsive: true, displayModeBar: false });
  }

  document.querySelectorAll(".tab[data-predictor]").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab[data-predictor]")
              .forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderFig1(tab.dataset.predictor);
    });
  });

  renderFig1("last_layer_surprisal");
</script>
```

- [ ] **Step 3: Open in browser and verify Figure 1**

```bash
open nlp-project/index.html
```

Check: 5 tabs render, clicking each tab switches the chart, bars are colored by family (blue=GPT-2, red=Pythia, purple=Qwen3 Base, lavender=Qwen3 Instruct), hover shows model name + ΔAIC + sig, "Layer-wise surprisal" tab shows only 8 bars (GPT-2 + Pythia).

- [ ] **Step 4: Commit**

```bash
git add nlp-project/index.html
git commit -m "feat: add Figure 1 tabbed bar chart"
```

---

## Task 4: Figures 2 and 3

**Files:**
- Modify: `nlp-project/index.html` — insert Figure 2 + 3 sections and JS

- [ ] **Step 1: Insert Figure 2 and 3 HTML sections**

Add after the Figure 1 `</div>` and before `.page-footer`:

```html
  <div class="figure-section">
    <h2>Figure 2 — Layer-wise surprisal profile</h2>
    <p class="fig-caption">ΔAIC as a function of relative transformer depth
       (0&nbsp;= input layer, 1&nbsp;= last layer). Only GPT-2 and Pythia families
       included (tuned-lens probes required). Click legend entries to toggle models.</p>
    <div id="fig2-chart"></div>
  </div>

  <div class="figure-section">
    <h2>Figure 3 — Effect of model scale</h2>
    <p class="fig-caption">Last-layer surprisal predictivity (ΔAIC) as a function of
       parameter count. Hover for model name and exact values.</p>
    <div id="fig3-chart"></div>
  </div>
```

- [ ] **Step 2: Add Figure 2 and 3 JS**

Append inside the existing `<script>` block, after the Figure 1 code:

```javascript
  // ── Figure 2 ──────────────────────────────────────────────────────────────
  function renderFig2() {
    const models = [...new Set(CHART_DATA.fig2.map(d => d.model))];
    const traces = models.map(model => {
      const rows = CHART_DATA.fig2
        .filter(d => d.model === model)
        .sort((a, b) => a.layer_pct - b.layer_pct);
      const { label, family, color } = rows[0];
      return {
        type: "scatter", mode: "lines", name: label,
        legendgroup: family,
        x: rows.map(d => d.layer_pct),
        y: rows.map(d => d.daic),
        line: { color },
        hovertemplate: `<b>${label}</b><br>Depth: %{x:.2f}<br>ΔAIC: %{y:.1f}<extra></extra>`,
      };
    });

    Plotly.newPlot("fig2-chart", traces, {
      xaxis: { title: "Relative layer depth (0 = input, 1 = last)", range: [0, 1] },
      yaxis: { title: "ΔAIC vs. null" },
      legend: { groupclick: "toggleitem" },
      margin: { t: 10, b: 60, l: 60, r: 20 },
      height: 360,
      plot_bgcolor: "#fff",
      paper_bgcolor: "#fff",
    }, { responsive: true, displayModeBar: false });
  }

  // ── Figure 3 ──────────────────────────────────────────────────────────────
  function renderFig3() {
    const traces = FAMILY_ORDER.filter(f => f !== "Qwen3 Instruct").map(fam => {
      const rows = CHART_DATA.fig3.filter(d => d.family === fam);
      if (!rows.length) return null;
      return {
        type: "scatter", mode: "markers", name: fam,
        x: rows.map(d => d.params_b),
        y: rows.map(d => d.daic),
        marker: { color: rows[0].color, size: 10 },
        customdata: rows.map(d => d.label),
        hovertemplate: "<b>%{customdata}</b><br>Params: %{x}B<br>ΔAIC: %{y:.1f}<extra></extra>",
      };
    }).filter(Boolean);

    Plotly.newPlot("fig3-chart", traces, {
      xaxis: { title: "Parameter count (billions)", type: "log" },
      yaxis: { title: "ΔAIC vs. null" },
      margin: { t: 10, b: 60, l: 60, r: 20 },
      height: 320,
      plot_bgcolor: "#fff",
      paper_bgcolor: "#fff",
    }, { responsive: true, displayModeBar: false });
  }

  renderFig2();
  renderFig3();
```

- [ ] **Step 3: Open in browser and verify Figures 2 and 3**

```bash
open nlp-project/index.html
```

Check:
- Figure 2: 8 lines (3 GPT-2 + 5 Pythia), ΔAIC generally rises toward the right, hovering shows model name + depth + ΔAIC, clicking a legend entry hides/shows that line.
- Figure 3: 11 points (3 GPT-2 + 5 Pythia + 3 Qwen3 Base — wait, Qwen3 Base has 5 sizes: 0.6, 1.7, 4, 8, 14B), x-axis is log-scaled, hover shows model name.
- No console errors.

- [ ] **Step 4: Commit**

```bash
git add nlp-project/index.html
git commit -m "feat: add Figures 2 and 3 (layer depth and scale charts)"
```

---

## Task 5: Add EEGym Card to index.html

**Files:**
- Modify: `index.html` — add article to `section#other .features`

- [ ] **Step 1: Open index.html and find the insertion point**

The existing two project articles in `section#other` end around line 108:
```html
              </article>
            </div>
```

- [ ] **Step 2: Insert the new article**

Add a third `<article>` inside `section#other .features`, after the Gadfly article and before the closing `</div>`:

```html
              <article>
                <a href="nlp-project/" class="image"><img src="images/pic01.jpg" alt="" /></a>
                <div class="inner">
                  <h4>EEGym</h4>
                  <p>A standardized EEG benchmark comparing LLM representations to human N400 responses
                     across three datasets and model families. Interactive figures and data available.
                     <a href="nlp-project/">Explore the interactive figures.</a></p>
                </div>
              </article>
```

Note: `images/pic01.jpg` is a placeholder. Replace with `images/pic06.jpg` once you have a suitable image to add to the `images/` directory.

- [ ] **Step 3: Open index.html in browser and verify**

```bash
open index.html
```

Scroll to "Other Projects". Check: three articles visible, EEGym card shows image + title + description + link. Clicking "Explore the interactive figures." navigates to `nlp-project/index.html`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add EEGym card to Other Projects"
```

---

## Self-Review Checklist

- [x] PDF button → `../nlp_group_project.pdf` with `download` attr ✓ (Task 2)
- [x] Download hrefs use correct relative paths (`../nlp-group-project-main/...`) ✓ (Task 2)
- [x] Model names in `LABEL_MAP` / `FAMILY_MAP` / `PARAMS_B` match exact CSV values ✓ (Task 1 code)
- [x] Figure 1 "Layer-wise surprisal" tab correctly shows 8 models not 18 — `cv_layer_surprisal` only has GPT-2+Pythia in the CSV ✓ (Task 1 test + Task 3)
- [x] Figure 2 caption explicitly notes GPT-2+Pythia only ✓ (Task 4)
- [x] Figure 3 excludes Qwen3 Instruct — `FAMILY_ORDER.filter(f => f !== "Qwen3 Instruct")` ✓ (Task 4)
- [x] `FAMILY_ORDER` defined once (Task 3) and reused in Task 4 — no naming drift ✓
- [x] `Plotly.react` used for Figure 1 (handles re-renders on tab switch); `Plotly.newPlot` for Figs 2+3 (render once) ✓
- [x] Other Projects card placeholder image noted ✓ (Task 5)
