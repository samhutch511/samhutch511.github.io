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
