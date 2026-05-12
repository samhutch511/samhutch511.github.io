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
