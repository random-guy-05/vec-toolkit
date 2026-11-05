# Atelier Task 1 : prévoir une population cellulaire en évolution

**75 minutes · 4–20 personnes · sans code ni données de la Challenge**

Cette séance prête à animer s'adresse aux personnes qui connaissent les bases de l'analyse unicellulaire et découvrent la prédiction temporelle de l'expression génique. Des effectifs et des valeurs de caractéristiques fictifs servent à distinguer les changements de composition des états cellulaires des changements au sein d'un état. L'objectif est de raisonner sur la cible et les preuves, pas de prescrire un modèle.

## Préparation

Ouvrez les [descriptions officielles des tâches](https://virtualembryo.ai/challenge/tasks), le [schéma des données](https://virtualembryo.ai/challenge/data) et la [page d'évaluation](https://virtualembryo.ai/challenge/evaluation). Imprimez ou partagez ce guide. Les nombres ci-dessous sont fictifs et ne représentent pas des observations VEC. N'utilisez pas les mesures de cibles cachées. Les pages officielles font autorité et peuvent changer.

## Déroulé

| Minutes | Activité | Question d'animation |
|---:|---|---|
| 0–8 | Définir la prédiction | « Prévoit-on des cellules individuelles ou une population future ? » |
| 8–20 | Lire le split actuel | « Quelles étapes sont utilisées pour l'entraînement, la validation et le test caché aujourd'hui ? » |
| 20–38 | Distinguer identité et distribution | Utilisez l'exercice 1. |
| 38–52 | Décomposer un changement de pseudobulk | Utilisez l'exercice 2. |
| 52–65 | Diagnostiquer les questions des métriques | Utilisez l'exercice 3. |
| 65–72 | Délimiter une affirmation | Chaque binôme écrit une affirmation étayée et une autre qui ne l'est pas. |
| 72–75 | Conclure | Revenir à la page officielle de la tâche et recueillir les questions ouvertes. |

## Exercice 1 — Une nouvelle population, pas un suivi des cellules

Les effectifs suivants sont fictifs. Imaginons un échantillon d'entraînement publié comprenant 70 cellules de type A et 30 de type B. Une cible ultérieure fictive comprend 40 cellules de type A, 30 de type B et 30 d'un type C nouvellement apparu. Demandez aux binômes : quelles cellules de la cible sont « les mêmes » que celles de l'entraînement ? Que montre cet exemple sur la prédiction d'une population plutôt que le suivi des identités cellulaires ?

### Corrigé

Le tableau pédagogique ne fournit aucune preuve d'identité cellulaire entre les étapes ; il est donc impossible d'apparier des cellules individuelles. La distribution cible comprend un type absent de l'échantillon d'entraînement fictif, ainsi que des proportions différentes pour les types déjà présents. Une prédiction temporelle de population doit tenir compte des états qui apparaissent et de leur fréquence ; il ne s'agit pas de faire avancer chaque cellule observée dans le temps. Vérifiez le split réel et la définition de la cible sur la page officielle à jour.

## Exercice 2 — La composition peut déplacer une valeur agrégée

Ces moyennes fictives d'une caractéristique restent constantes au sein de chaque type cellulaire, alors que le mélange change :

| Étape | Part du type A | Moyenne du type A | Part du type B | Moyenne du type B | Moyenne agrégée |
|---|---:|---:|---:|---:|---:|
| précédente | 80 % | 2 | 20 % | 12 | 4 |
| suivante | 20 % | 2 | 80 % | 12 | 10 |

Demandez aux binômes de calculer la moyenne agrégée à chaque étape. Qu'est-ce qui change : les moyennes au sein des types ou le mélange de la population ? Que ne peut pas révéler la seule valeur agrégée ?

### Corrigé

La moyenne agrégée précédente est `0.8 × 2 + 0.2 × 12 = 4` ; la suivante est `0.2 × 2 + 0.8 × 12 = 10`. Les moyennes au sein de chaque type n'ont pas changé ; le mélange a changé. Un changement agrégé ne permet pas, à lui seul, de distinguer une réponse au sein d'un état d'un changement des proportions d'états cellulaires. C'est un exemple pédagogique, pas une affirmation sur un gène ou une étape réels.

## Exercice 3 — Quatre questions d'évaluation distinctes

L'évaluation officielle de Task 1 distingue la récupération des gènes différentiellement exprimés (DE), la direction du changement, la distribution des états cellulaires et la co-variation entre gènes. Demandez aux groupes d'associer chaque échec fictif à la question qu'il affecte le plus directement : (a) de nombreux gènes modifiés ne sont pas retrouvés ; (b) les gènes concernés changent dans la direction opposée ; (c) les proportions de types cellulaires prédites sont incorrectes ; (d) les moyennes par gène semblent plausibles, mais les relations entre gènes disparaissent.

### Corrigé

(a) récupération des gènes DE ; (b) direction du changement ; (c) distribution des états cellulaires ; (d) co-variation entre gènes. Un échec peut affecter plusieurs métriques ; ces exemples ne constituent pas des signatures déterministes des scores. Un bon résultat sur une métrique ne prouve pas que les autres le sont aussi.

## Fiche participant

1. À partir de la page officielle actuelle, indiquez les étapes d'entraînement visibles, la cible de validation, la cible de test cachée et la quantité à prédire.
2. Dans l'exercice 1, quelles preuves faudrait-il pour affirmer que deux cellules d'étapes différentes sont la même cellule ? Ces preuves sont-elles présentes ?
3. Montrez le calcul de l'exercice 2. Expliquez comment la moyenne agrégée change alors que les deux moyennes par type restent fixes.
4. Associez chaque échec de l'exercice 3 à la question de métrique officielle la plus directement concernée.
5. Écrivez une affirmation étayée par les exemples fictifs et une affirmation biologique qu'ils ne peuvent pas étayer.

## Conclusion pour l'animation

N'interprétez pas les valeurs fictives comme de la biologie réelle ou comme le résultat d'un modèle. Invitez les participants à distinguer dans leurs analyses la composition des états cellulaires, l'expression au sein d'un état, le split et les preuves issues du scorer. Ce support pédagogique indépendant n'est ni un guide officiel d'évaluation ni une recette de modélisation.
