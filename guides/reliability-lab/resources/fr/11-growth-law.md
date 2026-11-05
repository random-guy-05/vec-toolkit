# Deux hypothèses de croissance donnent deux milieux

**Français · Reliability Lab 11 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

Interpoler le rayon ou son logarithme reproduit les mêmes extrémités, mais pas les mêmes tailles intermédiaires. Deux observations ne déterminent pas une loi de croissance.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 11 --seed 7
```

## Question

Quel milieu obtient-on entre les rayons 100 et 400 ?

## Résultat de référence : graine 7

```json
{
  "early_radius": 100.0,
  "late_radius": 400.0,
  "linear_midpoint": 250.0,
  "constant_log_growth_midpoint": 200.0
}
```

## Interprétation

Le rayon linéaire donne 250 ; la croissance logarithmique constante donne la moyenne géométrique 200. Les deux résultats sont conditionnels à leur hypothèse.

## Aller plus loin

Calculez les deux courbes aux fractions 0.25 et 0.75.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/11-growth-law.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
