const CHART_DATA = {
  "fig1": [
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "last_layer_surprisal",
      "daic": 233.39,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "cv_layer_surprisal",
      "daic": 216.32,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "shallow_surprisal",
      "daic": 0.42,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "lang_mae_z",
      "daic": -1.74,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "last_layer_surprisal",
      "daic": 250.92,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "cv_layer_surprisal",
      "daic": 231.62,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "shallow_surprisal",
      "daic": 8.13,
      "sig": "**"
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "lang_mae_z",
      "daic": -1.95,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "last_layer_surprisal",
      "daic": 246.13,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "cv_layer_surprisal",
      "daic": 240.21,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "shallow_surprisal",
      "daic": 7.07,
      "sig": "**"
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "lang_mae_z",
      "daic": -1.96,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "last_layer_surprisal",
      "daic": 211.2,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "cv_layer_surprisal",
      "daic": 180.51,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "shallow_surprisal",
      "daic": -1.91,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "lang_mae_z",
      "daic": -2.0,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "last_layer_surprisal",
      "daic": 230.66,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "cv_layer_surprisal",
      "daic": 217.43,
      "sig": "***"
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "shallow_surprisal",
      "daic": 3.51,
      "sig": "*"
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "lang_mae_z",
      "daic": -1.98,
      "sig": ""
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "last_layer_surprisal",
      "daic": 208.52,
      "sig": "***"
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "cv_layer_surprisal",
      "daic": 178.13,
      "sig": "***"
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "shallow_surprisal",
      "daic": -0.5,
      "sig": ""
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "lang_mae_z",
      "daic": -1.42,
      "sig": ""
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "last_layer_surprisal",
      "daic": 194.46,
      "sig": "***"
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "cv_layer_surprisal",
      "daic": 155.29,
      "sig": "***"
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "shallow_surprisal",
      "daic": -1.97,
      "sig": ""
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "lang_mae_z",
      "daic": -1.86,
      "sig": ""
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "last_layer_surprisal",
      "daic": 216.47,
      "sig": "***"
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "cv_layer_surprisal",
      "daic": 206.39,
      "sig": "***"
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "shallow_surprisal",
      "daic": 0.83,
      "sig": ""
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "lang_mae_z",
      "daic": -1.63,
      "sig": ""
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "predictor": "su_sgm_z",
      "daic": -1.17,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_0.6b_base",
      "label": "Qw3-0.6B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "last_layer_surprisal",
      "daic": 201.92,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_0.6b_base",
      "label": "Qw3-0.6B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "shallow_surprisal",
      "daic": -1.69,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_0.6b_base",
      "label": "Qw3-0.6B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "lang_mae_z",
      "daic": -1.9,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_0.6b_base",
      "label": "Qw3-0.6B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_0.6b",
      "label": "Qw3-0.6B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "last_layer_surprisal",
      "daic": 126.62,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_0.6b",
      "label": "Qw3-0.6B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "shallow_surprisal",
      "daic": -1.7,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_0.6b",
      "label": "Qw3-0.6B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "lang_mae_z",
      "daic": -1.89,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_0.6b",
      "label": "Qw3-0.6B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_1.7b_base",
      "label": "Qw3-1.7B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "last_layer_surprisal",
      "daic": 225.34,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_1.7b_base",
      "label": "Qw3-1.7B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "shallow_surprisal",
      "daic": 3.46,
      "sig": "*"
    },
    {
      "model": "qwen_qwen3_1.7b_base",
      "label": "Qw3-1.7B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "lang_mae_z",
      "daic": -1.87,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_1.7b_base",
      "label": "Qw3-1.7B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_1.7b",
      "label": "Qw3-1.7B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "last_layer_surprisal",
      "daic": 178.2,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_1.7b",
      "label": "Qw3-1.7B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "shallow_surprisal",
      "daic": -1.27,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_1.7b",
      "label": "Qw3-1.7B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "lang_mae_z",
      "daic": -1.87,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_1.7b",
      "label": "Qw3-1.7B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_14b_base",
      "label": "Qw3-14B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "last_layer_surprisal",
      "daic": 225.24,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_14b_base",
      "label": "Qw3-14B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "shallow_surprisal",
      "daic": 1.16,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_14b_base",
      "label": "Qw3-14B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "lang_mae_z",
      "daic": -1.77,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_14b_base",
      "label": "Qw3-14B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_14b",
      "label": "Qw3-14B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "last_layer_surprisal",
      "daic": 194.6,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_14b",
      "label": "Qw3-14B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "shallow_surprisal",
      "daic": 6.28,
      "sig": "**"
    },
    {
      "model": "qwen_qwen3_14b",
      "label": "Qw3-14B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "lang_mae_z",
      "daic": -1.81,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_14b",
      "label": "Qw3-14B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_4b_base",
      "label": "Qw3-4B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "last_layer_surprisal",
      "daic": 212.35,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_4b_base",
      "label": "Qw3-4B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "shallow_surprisal",
      "daic": 4.01,
      "sig": "*"
    },
    {
      "model": "qwen_qwen3_4b_base",
      "label": "Qw3-4B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "lang_mae_z",
      "daic": -1.79,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_4b_base",
      "label": "Qw3-4B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_4b",
      "label": "Qw3-4B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "last_layer_surprisal",
      "daic": 187.09,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_4b",
      "label": "Qw3-4B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "shallow_surprisal",
      "daic": -0.02,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_4b",
      "label": "Qw3-4B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "lang_mae_z",
      "daic": -1.43,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_4b",
      "label": "Qw3-4B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_8b_base",
      "label": "Qw3-8B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "last_layer_surprisal",
      "daic": 216.6,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_8b_base",
      "label": "Qw3-8B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "shallow_surprisal",
      "daic": 1.4,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_8b_base",
      "label": "Qw3-8B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "lang_mae_z",
      "daic": -1.8,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_8b_base",
      "label": "Qw3-8B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_8b",
      "label": "Qw3-8B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "last_layer_surprisal",
      "daic": 184.87,
      "sig": "***"
    },
    {
      "model": "qwen_qwen3_8b",
      "label": "Qw3-8B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "shallow_surprisal",
      "daic": 1.49,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_8b",
      "label": "Qw3-8B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "lang_mae_z",
      "daic": -1.98,
      "sig": ""
    },
    {
      "model": "qwen_qwen3_8b",
      "label": "Qw3-8B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "predictor": "su_sgm_z",
      "daic": -1.09,
      "sig": ""
    }
  ],
  "fig2": [
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0,
      "daic": 19.36
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0435,
      "daic": 25.55
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.087,
      "daic": 21.92
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1304,
      "daic": 25.92
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1739,
      "daic": 42.1
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2174,
      "daic": 45.14
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2609,
      "daic": 52.14
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3043,
      "daic": 50.75
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3478,
      "daic": 54.17
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3913,
      "daic": 70.31
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4348,
      "daic": 79.47
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4783,
      "daic": 94.27
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5217,
      "daic": 102.73
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5652,
      "daic": 125.53
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6087,
      "daic": 160.83
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6522,
      "daic": 169.44
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6957,
      "daic": 194.64
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7391,
      "daic": 197.93
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7826,
      "daic": 222.65
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8261,
      "daic": 206.3
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8696,
      "daic": 224.44
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.913,
      "daic": 212.78
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9565,
      "daic": 199.58
    },
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 1.0,
      "daic": 216.65
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0,
      "daic": 2.8
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0286,
      "daic": 12.18
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0571,
      "daic": 17.06
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0857,
      "daic": 24.99
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1143,
      "daic": 41.83
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1429,
      "daic": 61.38
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1714,
      "daic": 62.32
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2,
      "daic": 70.03
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2286,
      "daic": 72.72
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2571,
      "daic": 81.01
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2857,
      "daic": 98.84
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3143,
      "daic": 108.44
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3429,
      "daic": 104.99
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3714,
      "daic": 118.56
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4,
      "daic": 124.78
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4286,
      "daic": 133.7
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4571,
      "daic": 160.82
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4857,
      "daic": 168.24
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5143,
      "daic": 180.94
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5429,
      "daic": 203.06
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5714,
      "daic": 215.01
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6,
      "daic": 231.69
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6286,
      "daic": 230.5
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6571,
      "daic": 229.24
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6857,
      "daic": 232.5
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7143,
      "daic": 237.22
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7429,
      "daic": 235.52
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7714,
      "daic": 243.3
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8,
      "daic": 232.5
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8286,
      "daic": 231.2
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8571,
      "daic": 236.64
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8857,
      "daic": 233.68
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9143,
      "daic": 235.91
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9429,
      "daic": 232.26
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9714,
      "daic": 222.89
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 1.0,
      "daic": 230.74
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0,
      "daic": 5.58
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0323,
      "daic": 20.61
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0645,
      "daic": 23.02
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0968,
      "daic": 34.02
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.129,
      "daic": 37.03
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1613,
      "daic": 53.4
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1935,
      "daic": 65.51
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2258,
      "daic": 77.57
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2581,
      "daic": 91.73
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2903,
      "daic": 102.35
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3226,
      "daic": 104.54
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3548,
      "daic": 107.78
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3871,
      "daic": 110.17
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4194,
      "daic": 123.79
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4516,
      "daic": 133.65
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4839,
      "daic": 160.35
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5161,
      "daic": 168.91
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5484,
      "daic": 184.1
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5806,
      "daic": 194.98
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6129,
      "daic": 213.01
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6452,
      "daic": 201.3
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6774,
      "daic": 220.53
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7097,
      "daic": 222.64
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7419,
      "daic": 233.8
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7742,
      "daic": 243.9
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8065,
      "daic": 243.77
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8387,
      "daic": 238.52
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.871,
      "daic": 243.09
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9032,
      "daic": 235.44
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9355,
      "daic": 231.71
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9677,
      "daic": 226.03
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 1.0,
      "daic": 237.2
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0,
      "daic": 12.63
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0435,
      "daic": 5.79
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.087,
      "daic": 11.58
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1304,
      "daic": 29.86
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1739,
      "daic": 32.19
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2174,
      "daic": 53.88
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2609,
      "daic": 64.98
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3043,
      "daic": 60.49
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3478,
      "daic": 64.02
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3913,
      "daic": 79.71
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4348,
      "daic": 89.8
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4783,
      "daic": 78.94
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5217,
      "daic": 109.39
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5652,
      "daic": 103.35
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6087,
      "daic": 123.11
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6522,
      "daic": 137.91
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6957,
      "daic": 116.48
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7391,
      "daic": 138.24
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7826,
      "daic": 154.18
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8261,
      "daic": 189.79
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8696,
      "daic": 179.78
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.913,
      "daic": 189.6
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9565,
      "daic": 190.91
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 1.0,
      "daic": 211.38
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0,
      "daic": 10.11
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0323,
      "daic": 17.61
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0645,
      "daic": 19.67
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.0968,
      "daic": 24.94
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.129,
      "daic": 33.92
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1613,
      "daic": 45.37
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.1935,
      "daic": 66.57
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2258,
      "daic": 79.59
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2581,
      "daic": 78.35
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.2903,
      "daic": 85.6
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3226,
      "daic": 89.26
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3548,
      "daic": 106.33
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.3871,
      "daic": 128.83
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4194,
      "daic": 148.09
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4516,
      "daic": 159.98
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.4839,
      "daic": 163.56
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5161,
      "daic": 181.1
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5484,
      "daic": 182.95
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.5806,
      "daic": 193.36
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6129,
      "daic": 195.65
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6452,
      "daic": 205.63
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.6774,
      "daic": 215.97
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7097,
      "daic": 224.23
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7419,
      "daic": 228.04
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.7742,
      "daic": 230.94
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8065,
      "daic": 231.31
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.8387,
      "daic": 222.71
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.871,
      "daic": 221.76
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9032,
      "daic": 217.4
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9355,
      "daic": 210.55
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 0.9677,
      "daic": 209.41
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "layer_pct": 1.0,
      "daic": 212.74
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0,
      "daic": 8.62
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0286,
      "daic": 51.42
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0571,
      "daic": 50.08
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0857,
      "daic": 51.0
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1143,
      "daic": 50.41
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1429,
      "daic": 51.72
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1714,
      "daic": 52.1
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2,
      "daic": 48.23
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2286,
      "daic": 49.93
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2571,
      "daic": 47.02
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2857,
      "daic": 52.98
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.3143,
      "daic": 58.62
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.3429,
      "daic": 62.16
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.3714,
      "daic": 67.77
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4,
      "daic": 73.66
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4286,
      "daic": 83.58
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4571,
      "daic": 98.73
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4857,
      "daic": 107.87
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5143,
      "daic": 109.44
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5429,
      "daic": 112.23
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5714,
      "daic": 121.99
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6,
      "daic": 128.95
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6286,
      "daic": 130.1
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6571,
      "daic": 139.05
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6857,
      "daic": 148.34
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7143,
      "daic": 154.25
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7429,
      "daic": 159.94
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7714,
      "daic": 159.68
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8,
      "daic": 166.81
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8286,
      "daic": 167.97
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8571,
      "daic": 175.94
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8857,
      "daic": 180.76
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9143,
      "daic": 184.64
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9429,
      "daic": 192.67
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9714,
      "daic": 183.08
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 1.0,
      "daic": 176.81
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0,
      "daic": 4.21
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0909,
      "daic": 29.43
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1818,
      "daic": 36.83
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2727,
      "daic": 47.73
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.3636,
      "daic": 63.04
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4545,
      "daic": 84.68
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5455,
      "daic": 109.15
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6364,
      "daic": 124.2
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7273,
      "daic": 140.29
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8182,
      "daic": 155.29
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9091,
      "daic": 149.79
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 1.0,
      "daic": 5.95
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0,
      "daic": 13.32
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0213,
      "daic": 25.75
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0426,
      "daic": 35.92
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0638,
      "daic": 36.26
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.0851,
      "daic": 37.46
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1064,
      "daic": 40.75
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1277,
      "daic": 45.85
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1489,
      "daic": 40.42
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1702,
      "daic": 42.67
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.1915,
      "daic": 45.76
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2128,
      "daic": 44.31
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.234,
      "daic": 44.17
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2553,
      "daic": 46.27
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2766,
      "daic": 46.87
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.2979,
      "daic": 52.95
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.3191,
      "daic": 58.19
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.3404,
      "daic": 60.56
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.3617,
      "daic": 63.06
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.383,
      "daic": 67.79
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4043,
      "daic": 73.76
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4255,
      "daic": 78.93
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4468,
      "daic": 84.93
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4681,
      "daic": 93.19
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.4894,
      "daic": 93.28
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5106,
      "daic": 102.17
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5319,
      "daic": 111.18
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5532,
      "daic": 119.77
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5745,
      "daic": 126.43
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.5957,
      "daic": 134.94
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.617,
      "daic": 142.46
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6383,
      "daic": 144.53
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6596,
      "daic": 153.53
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.6809,
      "daic": 157.76
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7021,
      "daic": 166.16
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7234,
      "daic": 174.89
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7447,
      "daic": 176.8
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.766,
      "daic": 175.71
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.7872,
      "daic": 181.09
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8085,
      "daic": 185.24
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8298,
      "daic": 190.02
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8511,
      "daic": 194.6
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8723,
      "daic": 201.32
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.8936,
      "daic": 202.22
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9149,
      "daic": 207.25
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9362,
      "daic": 207.68
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9574,
      "daic": 213.16
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 0.9787,
      "daic": 225.15
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "layer_pct": 1.0,
      "daic": 192.82
    }
  ],
  "fig3": [
    {
      "model": "eleutherai_pythia_1.4b_deduped",
      "label": "Py-1.4B",
      "family": "Pythia",
      "color": "#e63946",
      "params_b": 1.4,
      "daic": 233.39
    },
    {
      "model": "eleutherai_pythia_12b_deduped",
      "label": "Py-12B",
      "family": "Pythia",
      "color": "#e63946",
      "params_b": 12.0,
      "daic": 250.92
    },
    {
      "model": "eleutherai_pythia_2.8b_deduped",
      "label": "Py-2.8B",
      "family": "Pythia",
      "color": "#e63946",
      "params_b": 2.8,
      "daic": 246.13
    },
    {
      "model": "eleutherai_pythia_410m_deduped",
      "label": "Py-410M",
      "family": "Pythia",
      "color": "#e63946",
      "params_b": 0.41,
      "daic": 211.2
    },
    {
      "model": "eleutherai_pythia_6.9b_deduped",
      "label": "Py-6.9B",
      "family": "Pythia",
      "color": "#e63946",
      "params_b": 6.9,
      "daic": 230.66
    },
    {
      "model": "gpt2_large",
      "label": "GPT-2-L",
      "family": "GPT-2",
      "color": "#4361ee",
      "params_b": 0.774,
      "daic": 208.52
    },
    {
      "model": "gpt2",
      "label": "GPT-2",
      "family": "GPT-2",
      "color": "#4361ee",
      "params_b": 0.117,
      "daic": 194.46
    },
    {
      "model": "gpt2_xl",
      "label": "GPT-2-XL",
      "family": "GPT-2",
      "color": "#4361ee",
      "params_b": 1.5,
      "daic": 216.47
    },
    {
      "model": "qwen_qwen3_0.6b_base",
      "label": "Qw3-0.6B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "params_b": 0.6,
      "daic": 201.92
    },
    {
      "model": "qwen_qwen3_0.6b",
      "label": "Qw3-0.6B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "params_b": 0.6,
      "daic": 126.62
    },
    {
      "model": "qwen_qwen3_1.7b_base",
      "label": "Qw3-1.7B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "params_b": 1.7,
      "daic": 225.34
    },
    {
      "model": "qwen_qwen3_1.7b",
      "label": "Qw3-1.7B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "params_b": 1.7,
      "daic": 178.2
    },
    {
      "model": "qwen_qwen3_14b_base",
      "label": "Qw3-14B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "params_b": 14.0,
      "daic": 225.24
    },
    {
      "model": "qwen_qwen3_14b",
      "label": "Qw3-14B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "params_b": 14.0,
      "daic": 194.6
    },
    {
      "model": "qwen_qwen3_4b_base",
      "label": "Qw3-4B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "params_b": 4.0,
      "daic": 212.35
    },
    {
      "model": "qwen_qwen3_4b",
      "label": "Qw3-4B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "params_b": 4.0,
      "daic": 187.09
    },
    {
      "model": "qwen_qwen3_8b_base",
      "label": "Qw3-8B-b",
      "family": "Qwen3 Base",
      "color": "#7b2d8b",
      "params_b": 8.0,
      "daic": 216.6
    },
    {
      "model": "qwen_qwen3_8b",
      "label": "Qw3-8B",
      "family": "Qwen3 Instruct",
      "color": "#c77dff",
      "params_b": 8.0,
      "daic": 184.87
    }
  ]
};
