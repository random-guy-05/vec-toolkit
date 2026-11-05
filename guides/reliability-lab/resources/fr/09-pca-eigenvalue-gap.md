# Des valeurs propres proches déstabilisent les axes PCA

**Français · Reliability Lab 09 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

Lorsque des valeurs propres sont répétées, les directions individuelles ne sont pas uniques dans leur sous-espace. Une perturbation minuscule peut changer fortement un axe sans changer sensiblement la covariance.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 09 --seed 7
```

## Question

Comment obtenir environ 45 degrés avec une si petite perturbation ?

## Résultat de référence : graine 7

```json
{
  "covariance_perturbation": 1.4142135623730952e-08,
  "principal_axis_angle_degrees": 45.00000000000001,
  "eigenvalues": [
    0.1,
    1.0,
    1.0
  ]
}
```

## Interprétation

Les deux premières valeurs propres sont égales. La perturbation choisit une autre base du même plan ; le changement d'axe ne mesure pas directement le changement de forme.

## Aller plus loin

Remplacez une valeur propre principale par 1.2 et mesurez de nouveau l'angle.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/09-pca-eigenvalue-gap.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
