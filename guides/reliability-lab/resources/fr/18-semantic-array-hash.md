# Égalité sémantique et disposition mémoire sont distinctes

**Français · Reliability Lab 18 · Exercice de fiabilité commenté**

Ce petit exercice utilise des données synthétiques pour expliquer un problème de modélisation ou d'évaluation des prédictions unicellulaires et spatiales. Il ne lit aucune donnée du concours et ne calcule ni score officiel ni prévision sur une cible cachée.

Deux matrices de mêmes valeurs peuvent avoir des dispositions mémoire différentes. Une représentation contiguë canonique avec type fixé permet un condensat indépendant de cette disposition.

## Exécuter l'exemple

Créez un environnement neuf, clonez le dépôt et installez la dépendance indiquée. Lancez la commande depuis la racine du dépôt. Lisez d'abord le résultat sans modifier le code. Les commandes et les clés JSON sont des identifiants littéraux communs aux éditions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 18 --seed 7
```

## Question

Pourquoi les condensats canoniques sont-ils égaux ?

## Résultat de référence : graine 7

```json
{
  "c_layout": true,
  "f_layout": true,
  "semantic_digest_equal": true,
  "warning": "A real semantic hash must also include shape, gene order, cell order and coordinates."
}
```

## Interprétation

Les deux matrices sont converties au même type et au même ordre. Un véritable condensat AnnData doit aussi intégrer forme, gènes, cellules et coordonnées.

## Aller plus loin

Échangez deux colonnes de gènes et précisez les métadonnées nécessaires au condensat.

## Limites

Cet exemple isole un mécanisme numérique. Il ne mesure pas son importance dans des données réelles, ne prouve pas une interprétation causale et ne remplace pas l'évaluateur officiel. Conservez les hypothèses, la provenance et les données originales.

Édition adaptée avec assistance automatique, sans validation certifiée par une personne de langue maternelle française. Les corrections sont bienvenues. L'anglais reste la référence factuelle ; le code et les valeurs mathématiques sont conservés.

[Source code](../../tools/experiments.py) · [Canonical English](../en/18-semantic-array-hash.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
