# EEGym Interactive Project Page — Design Spec

**Date:** 2026-05-12  
**Status:** Approved

---

## Context

Sam has a paper — *EEGym: a novel benchmark for comparing language model representations and human N400 responses* (Hutchinson, Baek, Cy; MIT 6.8610 Grad NLP) — along with all its underlying data and analysis notebooks. The goal is to add an interactive web page to his portfolio site (`samhutch511.github.io`) that presents the paper with explorable versions of its three figures and direct download links for the data and code.

The site is a static GitHub Pages site with no build step. The new page must be pure HTML/CSS/JS.

---

## What We're Building

A new standalone page at `nlp-project/index.html`, linked from an "Other Projects" card in the existing `index.html`.

---

## Page Structure

### Header
- Full paper title
- Authors: Sam Hutchinson · Jenny Baek · Ali Cy
- Venue: MIT 6.8610 Grad NLP
- Single **PDF** button (dark filled, href = `../nlp_group_project.pdf`, `download` attribute set)

### Two-column intro (below header)
**Left column — Abstract + Key Findings**
- Short abstract paragraph summarizing EEGym and its scope
- Blue-bordered "Key Findings" callout box with three bullets:
  1. LLM surprisal strongly predicts N400, especially from the final layer and mid-to-late layers
  2. Pre-trained base models outperform instruction-tuned models
  3. Predictivity scales with model size

**Right column — Downloads (240px)**
- Section label: "Downloads"
- Sub-label: "Data"
  - `combined_clean_n400.csv` — N400 amplitudes · 98 subjects · 46k trials
  - `stims_for_modeling.csv` — Sentences + critical words for modeling
- Sub-label: "Notebooks"
  - `pipeline.ipynb` — Main analysis pipeline
  - `lopopolo_pipeline.ipynb` — Sentence Gestalt model pipeline
  - `final_plots.ipynb` — Figure reproduction
- Each download item is a styled card; clicking downloads the file directly from the repo
- All hrefs are relative from `nlp-project/`: e.g. `../nlp-group-project-main/combined_clean_n400.csv`; each `<a>` has the `download` attribute

### Figure 1 — Predictor comparison
- Title: "Figure 1 — Predictor comparison (ΔAIC vs. null model)"
- Caption: "Higher ΔAIC = stronger prediction of N400 amplitude. Significance stars shown on hover. Use tabs to switch between predictors."
- **5 tabs**: Surprisal · Layer-wise surprisal · Shallow surprisal · Language-network update · SG update
- Each tab shows a Plotly grouped bar chart: x-axis = model name (18 models), y-axis = ΔAIC, bars colored by model family
  - GPT-2 family: blue
  - Pythia family: red/orange
  - Qwen3 base models: purple
  - Qwen3 instruct models: lavender
- Hover tooltip shows: model name, ΔAIC value, significance level (sig column from CSV)
- Data source: `lme_results.csv` (columns: model, predictor, daic, sig)

### Figure 2 — Layer-wise surprisal profile
- Title: "Figure 2 — Layer-wise surprisal profile"
- Caption: "ΔAIC as a function of relative transformer depth (0 = input, 1 = last layer). Click legend entries to toggle model families."
- Plotly line chart: x-axis = layer_pct (0–1), y-axis = ΔAIC, one line per model
- Line colors follow same family color scheme as Figure 1
- Legend entries are grouped by family and are clickable to toggle visibility
- Data source: `lme_layer_results.csv` (columns: model, layer_pct, daic)

### Figure 3 — Effect of model scale
- Title: "Figure 3 — Effect of model scale"
- Caption: "Surprisal predictivity (ΔAIC) as a function of model parameter count. Hover for model name and exact values."
- Plotly scatter plot: x-axis = parameter count in billions (log scale), y-axis = ΔAIC
- Includes GPT-2, Pythia, and Qwen3-base families only (not Qwen3 instruct, no SG model)
- Points colored by family; hover shows model name and ΔAIC
- Data source: `lme_results.csv` filtered to `predictor == "last_layer_surprisal"`, joined with a hardcoded parameter-count lookup table
- Parameter counts (keyed by exact `model` value in the CSV):
  - `gpt2`: 0.117B, `gpt2_large`: 0.774B, `gpt2_xl`: 1.5B
  - `eleutherai_pythia_410m_deduped`: 0.41B, `eleutherai_pythia_1.4b_deduped`: 1.4B, `eleutherai_pythia_2.8b_deduped`: 2.8B, `eleutherai_pythia_6.9b_deduped`: 6.9B, `eleutherai_pythia_12b_deduped`: 12B
  - `qwen_qwen3_0.6b_base`: 0.6B, `qwen_qwen3_1.7b_base`: 1.7B, `qwen_qwen3_4b_base`: 4B, `qwen_qwen3_8b_base`: 8B, `qwen_qwen3_14b_base`: 14B

### Footer
- "Correspondence: samhutch@mit.edu"

---

## Visual Style

Light academic style (Layout B):
- White page background (`#ffffff`)
- Primary dark color: `#1a1a2e` (headers, buttons)
- Accent blue: `#4a7fcb` (active tabs, key findings border, links)
- Body font: system sans-serif stack
- Back navigation link at top: "← samhutch511.github.io" linking to `/`

---

## Data Strategy

All chart data is embedded directly in the HTML page as inline JSON (no fetch required, works on GitHub Pages). The two CSV files needed for charts are:
- `nlp-group-project-main/lme_results.csv` → Figure 1 + Figure 3
- `nlp-group-project-main/lme_layer_results.csv` → Figure 2

A small Python script (`scripts/prepare_chart_data.py`) converts these CSVs to the JSON objects embedded in the page. This script is run once during development; the output is committed as part of `nlp-project/index.html`.

---

## File Changes

| File | Action |
|---|---|
| `nlp-project/index.html` | Create — the new project page |
| `index.html` | Edit — add new "Other Projects" article card linking to `nlp-project/` |
| `scripts/prepare_chart_data.py` | Create — one-off data prep script |

The `nlp-group-project-main/` directory stays in the repo as-is; download links point directly into it.

---

## Other Projects Card (index.html)

New article added to `section#other .features`:
- Image: `images/pic06.jpg` — user provides this file; implementation uses `images/pic01.jpg` as placeholder if not yet present
- Link: `nlp-project/`
- Title: EEGym
- Description: "A standardized EEG benchmark comparing LLM representations to human N400 responses across three datasets and model families. Interactive figures and data available."

---

## Out of Scope

- No backend or server-side computation
- No live model inference demo
- No mobile-optimized layout (desktop-first is fine for an academic portfolio)
- No search or filtering of the raw trial-level data
