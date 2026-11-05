# Une estimation non biaisée de MMD peut être négative

**Français · Reliability Lab 07 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

La distance quadratique de noyau dans la population est non négative. Son estimateur non biaisé retire des termes diagonaux et peut devenir négatif à petit effectif. L'estimateur biaisé garde ces termes.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 07 --seed 7
```

## Question

Pourquoi les signes des estimateurs diffèrent-ils ?

## Résultat de référence : graine 7

```json
{
  "unbiased_mmd_squared": -0.8617044036602768,
  "biased_mmd_squared": 0.0029603131031104013,
  "population_distance_nonnegative": true
}
```

## Interprétation

La correction diagonale modifie l'estimation finie. Une valeur négative estimée ne signifie pas une distance de population négative.

## Aller plus loin

Éloignez le second échantillon sans changer le noyau et suivez les deux estimations.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/07-negative-unbiased-mmd.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
