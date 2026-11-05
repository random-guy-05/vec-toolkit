from __future__ import annotations

import math
from typing import Any

from .specs import ANCHORS, TASK_METRICS


def _number(value: Any) -> float | None:
    if value is None or isinstance(value, bool):
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if math.isfinite(number) else None


def metric_status(old: Any, new: Any, direction: str, tol: float = 1e-12) -> str:
    old_number = _number(old)
    new_number = _number(new)
    if old_number is None or new_number is None:
        return "UNAVAILABLE"

    if direction == "higher":
        delta = new_number - old_number
    elif direction == "lower":
        delta = old_number - new_number
    elif direction == "zero":
        delta = abs(old_number) - abs(new_number)
    else:
        raise ValueError(f"unknown metric direction: {direction}")

    if abs(delta) <= tol:
        return "UNCHANGED"
    return "IMPROVED" if delta > 0 else "REGRESSED"


def metric_skill(value: Any, floor: float, ceiling: float, direction: str) -> float:
    number = _number(value)
    if number is None:
        return 0.0

    if direction == "zero":
        number = abs(number)
        floor = abs(floor)
        ceiling = abs(ceiling)
        direction = "lower"

    if direction == "higher":
        distance = max(0.0, ceiling - number)
        floor_distance = ceiling - floor
    elif direction == "lower":
        distance = max(0.0, number - ceiling)
        floor_distance = floor - ceiling
    else:
        raise ValueError(f"unknown metric direction: {direction}")

    if floor_distance <= 0:
        raise ValueError("invalid anchors: floor is not worse than ceiling")

    return min(floor_distance / (floor_distance + distance), 1.0)


def board_score(metrics: dict[str, Any], board: str) -> tuple[float, dict[str, float]]:
    anchor = ANCHORS[board]
    task = anchor["task"]
    skills: dict[str, float] = {}
    total = 0.0
    for metric, (direction, weight) in TASK_METRICS[task].items():
        floor, ceiling = anchor["metrics"][metric]
        skill = metric_skill(metrics.get(metric), floor, ceiling, direction)
        skills[metric] = skill
        total += weight * skill
    return total * 100.0, skills


def compare(
    old_metrics: dict[str, Any],
    new_metrics: dict[str, Any],
    task: str,
    board: str | None = None,
) -> dict[str, Any]:
    task = task.upper()
    if task not in TASK_METRICS:
        raise ValueError("task must be T1, T2, or T3")
    if board is not None:
        if board not in ANCHORS:
            raise ValueError(f"unknown published validation board: {board}")
        if ANCHORS[board]["task"] != task:
            raise ValueError(f"{board} does not belong to {task}")

    rows: list[dict[str, Any]] = []
    for metric, (direction, weight) in TASK_METRICS[task].items():
        old = old_metrics.get(metric)
        new = new_metrics.get(metric)
        rows.append(
            {
                "metric": metric,
                "direction": direction,
                "weight": weight,
                "old": _number(old),
                "new": _number(new),
                "raw_delta": (
                    None
                    if _number(old) is None or _number(new) is None
                    else _number(new) - _number(old)
                ),
                "status": metric_status(old, new, direction),
            }
        )

    result: dict[str, Any] = {"task": task, "metrics": rows}
    if board:
        old_score, old_skills = board_score(old_metrics, board)
        new_score, new_skills = board_score(new_metrics, board)
        result["board"] = board
        result["old_score"] = old_score
        result["new_score"] = new_score
        result["score_delta"] = new_score - old_score
        for row in rows:
            metric = row["metric"]
            row["old_skill"] = old_skills[metric]
            row["new_skill"] = new_skills[metric]
            row["skill_delta"] = new_skills[metric] - old_skills[metric]
    return result
