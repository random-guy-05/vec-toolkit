# Atelier Task 3 : prédire la réponse à une perturbation

**75 minutes · 4 à 20 personnes · sans code ni données du Challenge**

Cette séance porte sur la prédiction de knock-outs conditionnels. L’objectif central est de distinguer l’effet de la perturbation du fond de type sauvage (WT). Elle ne propose ni mécanisme biologique ni recette de modélisation. Traduction initiale assistée ; corrections francophones bienvenues.

## Préparation et déroulé

Consultez les pages officielles des [tâches](https://virtualembryo.ai/challenge/tasks), des [données](https://virtualembryo.ai/challenge/data) et des [règles](https://virtualembryo.ai/challenge/rules). Vérifiez le split actuel. Les nombres et noms d’exemple sont fictifs ; aucune mesure de cible cachée n’est utilisée.

| Minutes | Activité |
|---:|---|
| 0–8 | Définir ce qui doit changer dans la prédiction. |
| 8–20 | Identifier entraînement, validation et test. |
| 20–38 | Comparer chaque perturbation à son WT apparié. |
| 38–52 | Relier les erreurs aux métriques de réponse. |
| 52–65 | Examiner une proposition fictive de données externes. |
| 65–75 | Écrire une affirmation étayée et sa limite. |

## Exercice 1 — Fond et réponse

Valeurs normalisées fictives pour une caractéristique générique : WT = 10,0 ; modèle A perturbé = 10,1 ; modèle B = 7,0. Quel modèle prédit le changement le plus marqué par rapport au WT ?

**Réponse :** A prédit un changement presque nul ; B prédit une baisse plus forte. Cet exemple ne détermine pas la direction biologiquement correcte. L’évaluation porte sur la réponse par rapport au WT ; copier le fond WT ne suffit pas.

## Exercice 2 — Quatre métriques de réponse

Associez les erreurs : (a) les bons gènes changent dans le sens opposé ; (b) le sens est correct mais l’amplitude trop faible ; (c) les mauvais gènes changent ; (d) les proportions cellulaires s’effondrent. **Réponses :** direction, amplitude, récupération des gènes de réponse et distribution des états cellulaires. Elles apportent des preuves distinctes.

## Exercice 3 — Éligibilité d’une source

Un collègue propose un jeu de données public portant sur un stade proche et le knock-out d’un gène apparenté. Avant usage, vérifiez source/version, allèle/génotype, stade, licence, pertinence, règles actuelles et divulgation. Un allèle apparenté ou un phénotype semblable peut relever d’une condition protégée. En cas d’incertitude, suspendez l’usage et demandez conseil aux organisateurs.

## Fiche participant

1. Sur la page officielle, relevez la perturbation d’entraînement, la cible de validation et la cible de test cachée.
2. Calculez `perturbation − WT` dans l’exemple. Que révèle cette différence ?
3. Associez chaque erreur de l’exercice 2 à sa métrique.
4. Quelle preuve manquerait pour formuler une vraie conclusion biologique ?

Ces valeurs sont pédagogiques, pas des données VEC. Ce guide communautaire indépendant n’est pas une consigne officielle d’évaluation ou de stratégie.
