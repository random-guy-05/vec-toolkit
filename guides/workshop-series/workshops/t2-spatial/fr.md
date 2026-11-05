# Atelier Task 2 : raisonner sur l’espace et le temps

**75 minutes · 4 à 20 personnes · sans code ni données du Challenge**

Pour les participants connaissant les bases du single-cell et découvrant la prédiction spatio-temporelle 3D. L’objectif est de lire le contrat de la tâche et de délimiter les preuves, pas de recommander un modèle. Traduction initiale assistée ; corrections francophones bienvenues.

## Préparation et déroulé

Consultez les pages officielles des [tâches](https://virtualembryo.ai/challenge/tasks), des [données](https://virtualembryo.ai/challenge/data) et de l’[évaluation](https://virtualembryo.ai/challenge/evaluation). Vérifiez le split en vigueur. Tous les exemples sont fictifs ; ne partagez ni données privées ni prédictions d’équipe.

| Minutes | Activité |
|---:|---|
| 0–8 | Que doit contenir la prédiction ? |
| 8–20 | Lire le split : interpolation ou extrapolation ? |
| 20–38 | Corriger l’idée que tous les tableaux T2 testent l’extrapolation. |
| 38–52 | Comparer les preuves moléculaires, cellulaires et spatiales. |
| 52–65 | Examiner le sens des coordonnées entre stades. |
| 65–75 | Écrire une affirmation étayée et une affirmation non étayée. |

## Exercices et éléments de réponse

**1. Deux contextes.** Une équipe fictive pense que tout test T2 prédit après le dernier stade d’entraînement. Consultez le split officiel. **Réponse :** le contexte embryon entier teste l’interpolation ; le contexte cœur comporte une question d’interpolation et une d’extrapolation. Vérifiez les stades exacts sur la page actuelle.

**2. Quatre dimensions.** Le modèle A prédit des changements d’expression plausibles mais une nuée uniforme. Le modèle B a une forme et des voisinages plausibles, mais de faibles changements d’expression. **Réponse :** en T2, les changements d’expression, la distribution des états cellulaires, la forme/échelle du tissu et l’organisation spatiale locale valent chacun 25 %. Une dimension ne prouve pas les autres. Un pseudo-split local ne prédit pas le test caché.

**3. Repères locaux.** Deux stades contiennent des coordonnées identiques `(x,y,z)`. S’agit-il de la même cellule ? **Réponse :** les coordonnées seules ne le prouvent pas. La page officielle indique que `spatial_3D` est dans un repère local par embryon et qu’il n’y a pas d’enregistrement entre stades.

## Fiche participant

Notez les stades d’entraînement visibles et la cible du tableau choisi, avec le lien officiel ; la dimension concernée par votre preuve ; ce qu’il faudrait pour établir une correspondance de coordonnées entre stades ; et une limite explicite. Les exemples fictifs ne sont pas des résultats réels.
