import pytest

from vec_score_delta.core import board_score, compare, metric_skill, metric_status


def test_metric_directions():
    assert metric_status(0.2, 0.3, "higher") == "IMPROVED"
    assert metric_status(0.2, 0.1, "lower") == "IMPROVED"
    assert metric_status(-0.4, -0.2, "zero") == "IMPROVED"


def test_floor_maps_to_50_and_ceiling_to_100():
    assert metric_skill(0.0, 0.0, 0.8464, "higher") == pytest.approx(0.5)
    assert metric_skill(0.8464, 0.0, 0.8464, "higher") == pytest.approx(1.0)
    assert metric_skill(0.08359, 0.08359, 0.00406, "lower") == pytest.approx(0.5)
    assert metric_skill(0.00406, 0.08359, 0.00406, "lower") == pytest.approx(1.0)


def test_zero_ideal_uses_absolute_value():
    floor_skill = metric_skill(-6.9078, -6.9078, -0.0088, "zero")
    ceiling_skill = metric_skill(-0.0088, -6.9078, -0.0088, "zero")
    assert floor_skill == pytest.approx(0.5)
    assert ceiling_skill == pytest.approx(1.0)


def test_complete_floor_panel_scores_50():
    metrics = {
        "de_score": 0,
        "de_direction": 0,
        "mmd_u": 0.08359,
        "variogram": 0.005219,
    }
    score, _ = board_score(metrics, "T1:val")
    assert score == pytest.approx(50.0)


def test_missing_metric_counts_as_zero_skill():
    full = {
        "de_score": 0,
        "de_direction": 0,
        "mmd_u": 0.08359,
        "variogram": 0.005219,
    }
    missing = dict(full)
    del missing["variogram"]
    full_score, _ = board_score(full, "T1:val")
    missing_score, _ = board_score(missing, "T1:val")
    assert missing_score < full_score


def test_compare_rejects_wrong_board_task():
    with pytest.raises(ValueError):
        compare({}, {}, "T1", "T3:gata4")
