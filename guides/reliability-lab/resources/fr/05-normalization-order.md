# Normalisation et mélange temporel ne commutent pas

**Français · Reliability Lab 05 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

Mélanger les comptes puis normaliser diffère de mélanger les expressions logarithmiques déjà normalisées. Les totaux et log1p introduisent des non-linéarités. Chaque ordre traduit une hypothèse différente.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 05 --seed 7
```

## Question

Pourquoi deux milieux de poids 0.5 diffèrent-ils ?

## Résultat de référence : graine 7

```json
{
  "normalize_after_mix": [
    9.115140186122302,
    6.813544494621113
  ],
  "mix_after_normalize": [
    4.6052201834882585,
    4.6052201834882585
  ],
  "difference": 5.0215609817365605
}
```

## Interprétation

[10,0] et [0,1] ont des totaux différents. Normaliser d'abord efface cette différence ; moyenner les logarithmes ajoute une autre non-linéarité.

## Aller plus loin

Égalisez les totaux des deux lignes et cherchez la différence restante.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/05-normalization-order.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
