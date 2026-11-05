# Task-3-Workshop: Die Antwort auf eine Perturbation vorhersagen

**75 Minuten · 4–20 Teilnehmende · kein Code und keine Challenge-Daten erforderlich**

Diese Sitzung hilft Teilnehmenden, eine Vorhersageaufgabe mit bedingtem Knockout einzuordnen. Das zentrale Lernziel ist, den Effekt einer Perturbation vom Wildtyp-Hintergrund zu unterscheiden. Die Sitzung schlägt weder einen biologischen Mechanismus noch ein Modellierungsrezept vor.

## Vorbereitung

Öffnet die offiziellen [Aufgabenbeschreibungen](https://virtualembryo.ai/challenge/tasks), das [Datenschema](https://virtualembryo.ai/challenge/data) und die aktuellen [Regeln](https://virtualembryo.ai/challenge/rules). Druckt dieses Blatt aus oder teilt es digital. Die Übungen verwenden erfundene Zahlen und allgemeine Merkmalsnamen. Verwendet keine Messwerte verborgener Zielbedingungen. Die offiziellen Seiten sind maßgeblich und können sich ändern.

## Ablauf

| Minuten | Aktivität | Frage für die Moderation |
|---:|---|---|
| 0–8 | Vorhersage definieren | „Was soll das Modell laut Challenge ändern?“ |
| 8–20 | Bedingungen und Split zuordnen | „Welcher Knockout gehört zu Training, Validierung oder verborgenem Test?“ |
| 20–38 | Mit dem Wildtyp vergleichen | Übung 1 verwenden. |
| 38–52 | Antwortmetriken lesen | Übung 2 verwenden. |
| 52–65 | Externe Quelle prüfen | Übung 3 verwenden. |
| 65–72 | Unsicherheit ausdrücken | Eine Aussage zur Antwort und eine Einschränkung notieren. |
| 72–75 | Abschluss | Aktuelle offizielle Seiten und offene Fragen erneut aufgreifen. |

## Übung 1 — Hintergrund versus Antwort

Die folgenden Werte sind erfundene, normalisierte Spielzeugwerte für ein allgemeines Merkmal. Es sind keine echten VEC-Beobachtungen.

| Bedingung | Fiktiver Wert |
|---|---:|
| passender Wildtyp | 10.0 |
| Perturbation, Modell A | 10.1 |
| Perturbation, Modell B | 7.0 |

Fragt die Paare, welches Modell den Wildtyp-Hintergrund reproduziert und welches eine größere Änderung vorhersagt. Fragt danach, warum ein Vergleich absoluter Expressionswerte ein Modell begünstigen kann, das den Wildtyp lediglich kopiert.

### Lösungshinweise

Modell A bleibt nahe am Wildtyp-Wert, daher liegt seine vorhergesagte Änderung nahe null. Modell B sagt einen stärkeren Rückgang voraus. Dieses Spielzeugbeispiel sagt nicht, welche Richtung biologisch korrekt ist; das bestimmt die beobachtete Perturbationsantwort. Bewertet wird die Antwort relativ zum Wildtyp. Ein gemeinsamer Hintergrund allein reicht daher nicht.

## Übung 2 — Vier Fragen zur Antwort

Die offiziellen Task-3-Metriken decken die Wiederfindung von Antwortgenen, die Antwortrichtung, die Antwortstärke und die Zellzustandsverteilung ab. Lasst die Paare fiktive Fehler den Metriken zuordnen: (a) die richtigen Gene ändern sich in die falsche Richtung; (b) die Richtung stimmt, aber der Effekt ist zu klein; (c) große Änderungen treten bei den falschen Genen auf; (d) die Populationsanteile brechen ein.

### Lösungshinweise

(a) Antwortrichtung; (b) Antwortstärke; (c) Wiederfindung von Antwortgenen; (d) Zellzustandsverteilung. Die Metriken liefern getrennte Evidenz. Ein guter Wert bei einer Metrik beweist nicht, dass die anderen ebenfalls gut sind.

## Übung 3 — Externe Daten prüfen

Eine Kollegin schlägt einen öffentlichen Datensatz mit einem Knockout eines verwandten Gens und einem ähnlichen Entwicklungsstadium vor. Lasst die Gruppen die nötigen Prüfungen benennen: genaues Gen/Allel und Genotyp, Stadium, Quelle und Version, Lizenz, Bezug zur Aufgabe, aktuelle Regeln für zurückgehaltene Bedingungen und Offenlegungspflichten. Welche ungeklärte Tatsache sollte die Nutzung stoppen?

### Lösungshinweise

Die Gruppe sollte pausieren, bis Quelle, Perturbation und Stadium genau genug geprüft und mit den aktuellen Regeln abgeglichen wurden. Ein verwandtes Allel oder ein ähnlicher Phänotyp kann zu einer geschützten zurückgehaltenen Bedingung gehören. Eine öffentliche URL belegt nicht, dass die Nutzung zulässig ist. Haltet euch an die ausdrückliche Grenze in den Regeln und fragt die Organisatoren vorab, wenn die Zuordnung unklar ist.

## Arbeitsblatt

1. Nennt das derzeit freigegebene Task-3-Perturbationstraining, das Validierungsziel und das verborgene Testziel von der offiziellen Aufgabenseite.
2. Berechnet für ein erfundenes Merkmal `Perturbation − passender Wildtyp` für jedes Modell. Was zeigte die Differenz, das die absoluten Werte verbargen?
3. Ordnet jeden Fehler aus Übung 2 der betroffenen Antwortmetrik zu.
4. Listet die Evidenz auf, die nötig ist, bevor ein externer Perturbationsdatensatz als zulässig und offenzulegen gelten kann.
5. Formuliert eine Ergebnisaussage, die das Spielzeugbeispiel stützt, und eine biologische Aussage, die es nicht stützt.

## Abschluss für die Moderation

Leitet keine reale Biologie aus dem erfundenen Beispiel ab. Bittet die Teilnehmenden, Perturbationskontrast, passende Kontrolle, Genotyp, Stadium und Quellenherkunft in jeder Analyse ausdrücklich festzuhalten. Dieses unabhängige Lehrmaterial ist keine offizielle Evaluationsanleitung.
