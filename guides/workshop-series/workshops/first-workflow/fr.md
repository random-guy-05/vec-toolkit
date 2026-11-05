# Atelier entre pairs : démarrer un flux de travail reproductible

**75 minutes · 4 à 20 personnes · sans code ni données du Challenge**

Guide prêt à animer pour les nouveaux participants, les étudiants et leurs collaborateurs. Les scénarios sont fictifs. Cette première traduction a été réalisée avec une aide automatique ; les corrections de personnes francophones sont bienvenues.

## Préparation et déroulé

Avant l’atelier, consultez les pages officielles du [Challenge](https://virtualembryo.ai/challenge), des [règles](https://virtualembryo.ai/challenge/rules) et des [ressources communautaires](https://virtualembryo.ai/challenge/resources). Elles font autorité et peuvent évoluer. Demandez aux participants de ne pas partager de données privées, d’identifiants, de résultats inédits ni de fichiers d’évaluation cachés.

| Minutes | Activité |
|---:|---|
| 0–8 | Choisir une tâche et expliquer sa cible. |
| 8–20 | Trouver une ressource et vérifier ses prérequis et limites. |
| 20–38 | Distinguer validation de format, évaluation locale et évaluation officielle. |
| 38–53 | Examiner une proposition fictive d’usage de données externes. |
| 53–66 | Lister les traces nécessaires pour reproduire une exécution. |
| 66–75 | Choisir une prochaine action et un contrôle avant soumission. |

## Fiche participant

1. Trouvez une ressource adaptée à un besoin précis. À quelle question répond-elle et quelle limite indique-t-elle ?
2. Un validateur affiche `PASS` et un pseudo-split favorise le modèle A. Cela prouve-t-il la bonne normalisation, l’éligibilité d’une source externe ou une meilleure performance sur le test caché ? Quelle preuve manque ?
3. Avant d’utiliser un jeu de données public, notez sa source et sa version, sa licence, le stade et le tissu, sa pertinence, la règle officielle applicable et les éléments de provenance à conserver.
4. Pour reproduire une exécution, gardez la révision du code, l’environnement, la configuration, la graine aléatoire, la commande, les entrées autorisées et le fichier évalué.

## Repères pour la réponse

`PASS` confirme uniquement les contrôles exécutés par ce validateur. Un résultat local décrit le split et le protocole choisis ; il ne prédit pas à lui seul le classement caché. « Public » ne signifie pas automatiquement « autorisé ». Si une règle ou une licence reste ambiguë, suspendez l’usage. Journaux, empreintes et traces aident à l’audit, sans prouver seuls une conformité complète.

**Conclusion :** chacun note une petite action, une page officielle à consulter et une incertitude à résoudre avant la soumission. Ce matériel indépendant n’est ni un événement officiel ni un conseil de stratégie.
