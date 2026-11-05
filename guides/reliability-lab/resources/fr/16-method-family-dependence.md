# De nombreuses variantes ne font pas de nombreuses familles

**Français · Reliability Lab 16 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

Une table peut contenir beaucoup de variantes issues de peu de familles. Une forte corrélation globale peut refléter des écarts entre familles sans aider à départager leurs variantes proches.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 16 --seed 7
```

## Question

Les corrélations globale et internes concordent-elles ?

## Résultat de référence : graine 7

```json
{
  "pooled_spearman": 0.9352941176470588,
  "within_family_spearman": [
    0.39999999999999997,
    0.39999999999999997,
    -0.7999999999999999,
    -0.39999999999999997
  ],
  "independent_families": 4,
  "variants": 16,
  "lesson": "Many variants do not create many independent method families."
}
```

## Interprétation

Le signal partagé des familles est fort, le bruit interne petit et indépendant. Les corrélations internes varient selon la graine ; cette variabilité fait partie du résultat.

## Aller plus loin

Ajoutez des variantes sans ajouter de familles et distinguez les informations nouvelles.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/16-method-family-dependence.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
