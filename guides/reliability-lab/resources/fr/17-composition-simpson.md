# Chaque type peut augmenter tandis que la moyenne globale baisse

**Français · Reliability Lab 17 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

La moyenne globale combine expression par type et composition. Un déplacement vers des types peu exprimés peut dominer la hausse de chaque type et inverser la direction agrégée.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 17 --seed 7
```

## Question

Pourquoi la moyenne baisse-t-elle malgré la hausse des deux types ?

## Résultat de référence : graine 7

```json
{
  "type_means_before": [
    1.0,
    8.0
  ],
  "type_means_after": [
    2.0,
    9.0
  ],
  "aggregate_before": 7.3,
  "aggregate_after": 2.7
}
```

## Interprétation

La population devient surtout composée de cellules peu exprimées. L'effet de composition dépasse les hausses internes.

## Aller plus loin

Gardez les proportions fixes et recalculez le sens du changement global.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/17-composition-simpson.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
