"""Synthetic demonstration of row-wise versus sample-grouped validation.

This is a teaching example, not a VEC baseline or a recommended model.
Requires numpy and scikit-learn.
"""

import numpy as np
from sklearn.model_selection import GroupKFold, cross_val_score, train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score


def make_synthetic_cells(seed=23, n_samples=40, cells_per_sample=30, n_features=20):
    """Make cells with a strong sample signature and a sample-level binary label."""
    rng = np.random.default_rng(seed)
    sample_ids = np.repeat(np.arange(n_samples), cells_per_sample)
    sample_labels = rng.integers(0, 2, size=n_samples)
    y = np.repeat(sample_labels, cells_per_sample)

    # Each sample has a stable multivariate signature. Nearby cells from the
    # same sample are very similar, while the sample label is shared by them.
    # In real data this stands in for sample-specific expression or batch
    # structure; it is not a literal sample-ID feature.
    signatures = rng.normal(0, 4, size=(n_samples, n_features))
    X = signatures[sample_ids] + rng.normal(0, 0.25, size=(len(y), n_features))
    return X, y, sample_ids


def main():
    X, y, sample_ids = make_synthetic_cells()
    model = KNeighborsClassifier(n_neighbors=3, weights="distance")

    # Row-wise split: cells from each sample can appear in both sets.
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=7, stratify=y
    )
    model.fit(X_train, y_train)
    rowwise_accuracy = accuracy_score(y_test, model.predict(X_test))

    # Grouped CV: every cell from a sample stays in the same fold.
    grouped_scores = cross_val_score(
        KNeighborsClassifier(n_neighbors=3, weights="distance"),
        X,
        y,
        cv=GroupKFold(n_splits=5),
        groups=sample_ids,
        scoring="accuracy",
    )

    print(f"Cells: {len(y)} across {len(np.unique(sample_ids))} independent samples")
    print(f"Row-wise split accuracy (same samples in train and test): {rowwise_accuracy:.3f}")
    print("Grouped fold accuracies (held-out samples):", np.round(grouped_scores, 3))
    print(f"Grouped mean accuracy: {grouped_scores.mean():.3f}")
    print("\nInterpretation: the row-wise split rewards recognizing a sample signature")
    print("that also occurs in training. Grouped validation asks whether the pattern")
    print("generalizes to new samples. This intentional toy example is not a biological result.")


if __name__ == "__main__":
    main()
