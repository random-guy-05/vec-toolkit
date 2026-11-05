# Le biais créé par l'écrêtage d'un décalage additif

**Français · Reliability Lab 03 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

Décaler toutes les valeurs puis les borner à zéro ne décale pas exactement la moyenne. Les zéros ne peuvent pas diminuer ; l'écrêtage rend la transformation non linéaire.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 03 --seed 7
```

## Question

La moyenne diminue-t-elle exactement de 0.5 ?

## Résultat de référence : graine 7

```json
{
  "original_mean": 1.0,
  "shift": -0.5,
  "intended_mean": 0.5,
  "clipped_mean": 0.75
}
```

## Interprétation

Non. Une partie de la diminution prévue disparaît au seuil zéro. La moyenne obtenue dépasse la moyenne visée.

## Aller plus loin

Modifiez la proportion de zéros et mesurez l'écart entre moyenne visée et moyenne obtenue.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/03-clipping-bias.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
