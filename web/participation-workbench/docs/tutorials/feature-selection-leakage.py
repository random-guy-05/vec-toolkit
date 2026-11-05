"""Synthetic demonstration of supervised feature-selection leakage.

Requires numpy and scikit-learn. The labels are random and every feature is
noise; any strong test result from the leaky pipeline is an artifact.
"""

import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline


def main():
    rng = np.random.default_rng(41)
    X = rng.normal(size=(400, 300))
    y = rng.integers(0, 2, size=400)  # independent of every feature
    train_idx, test_idx = train_test_split(
        np.arange(len(y)), test_size=0.30, random_state=12, stratify=y
    )

    # Leakage: SelectKBest sees every label, including labels that are later
    # called the test set. It can select noise features that fit those labels.
    globally_selected = SelectKBest(f_classif, k=20).fit_transform(X, y)
    leaky_model = LogisticRegression(max_iter=500).fit(
        globally_selected[train_idx], y[train_idx]
    )
    leaky_accuracy = leaky_model.score(globally_selected[test_idx], y[test_idx])

    # Safe pattern: the pipeline fits feature selection only on training rows.
    safe_model = make_pipeline(
        SelectKBest(f_classif, k=20), LogisticRegression(max_iter=500)
    )
    safe_model.fit(X[train_idx], y[train_idx])
    safe_accuracy = safe_model.score(X[test_idx], y[test_idx])

    print(f"Leaky test accuracy (selection fit before split): {leaky_accuracy:.3f}")
    print(f"Safe test accuracy (selection fit inside train-only pipeline): {safe_accuracy:.3f}")
    print("Labels are independent random draws; chance accuracy is about 0.5.")
    print("The difference varies by seed and is a teaching demonstration, not a model result.")


if __name__ == "__main__":
    main()
