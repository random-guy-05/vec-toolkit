# Un gène non mesuré n'est pas un zéro mesuré

**Français · Reliability Lab 19 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

Remplir d'un zéro un gène absent rend la matrice rectangulaire, mais cache si la mesure a eu lieu. Un masque de mesure préserve la distinction avant toute imputation.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 19 --seed 7
```

## Question

Quelle information le remplissage silencieux efface-t-il ?

## Résultat de référence : graine 7

```json
{
  "measured_zero": {
    "gene": "G",
    "measured": true,
    "value": 0
  },
  "absent_panel_gene": {
    "gene": "G",
    "measured": false,
    "value": null
  },
  "zero_fill_cannot_preserve_measurement_status": true
}
```

## Interprétation

Il efface le statut de mesure. L'exemple conserve measured et utilise null pour la valeur non mesurée.

## Aller plus loin

Ajoutez une valeur manquante due à un échec de traitement et représentez les trois situations.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/19-unmeasured-is-not-zero.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
