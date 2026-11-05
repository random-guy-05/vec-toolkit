# Task-2-Workshop: Räumliche und zeitliche Vorhersagen einordnen

**75 Minuten · 4–20 Teilnehmende · kein Code und keine Challenge-Daten erforderlich**

Diese moderierte Sitzung richtet sich an Personen mit Grundkenntnissen in der Einzelzellbiologie, die neu bei räumlich-zeitlichen 3D-Vorhersagen sind. Sie verwendet einen fiktiven Modellvergleich. Ziel ist, Aufgabenbeschreibung und Evidenz einzuordnen – keine ungeprüfte Modellierungsanleitung zu vermitteln.

## Vorbereitung

Öffnet die offiziellen [Aufgabenbeschreibungen](https://virtualembryo.ai/challenge/tasks), das [Datenschema](https://virtualembryo.ai/challenge/data) und die [Evaluationsseite](https://virtualembryo.ai/challenge/evaluation). Druckt dieses Blatt aus oder teilt es digital. Verwendet keine verborgenen Zielwerte und teilt keine privaten Modellergebnisse. Prüft die offiziellen Seiten vor der Sitzung erneut; maßgeblich sind die dort aktuellen Angaben.

## Ablauf

| Minuten | Aktivität | Frage für die Moderation |
|---:|---|---|
| 0–8 | Fragestellung klären | „Was muss eine Vorhersage genau enthalten?“ |
| 8–20 | Datensplit einordnen | „Ist dies Interpolation oder Extrapolation? Welche Entwicklungsstadien sind tatsächlich sichtbar?“ |
| 20–38 | Szenario bearbeiten | Übung 1 verwenden. |
| 38–52 | Score interpretieren | Übung 2 verwenden. |
| 52–65 | Koordinaten prüfen | Übung 3 verwenden. |
| 65–72 | Geltungsbereich einer Aussage festlegen | Jedes Paar formuliert eine gestützte und eine nicht gestützte Aussage. |
| 72–75 | Abschluss | Auf die aktuellen offiziellen Seiten verweisen und offene Fragen sammeln. |

## Übung 1 — Eine Aufgabe, verschiedene Einstellungen

Das fiktive Team „Small Atlas“ nimmt an, dass alle Task-2-Boards Stadien jenseits des letzten Trainingsstadiums vorhersagen lassen. Lasst die Paare die offizielle Split-Tabelle prüfen und diese Annahme korrigieren. Sie sollen die Interpolation beim Ganzembryo-Szenario benennen und sie den Interpolations- und Extrapolationsfragen im Herz-Szenario gegenüberstellen. Fragt, was gleich ist und was sich unterscheidet: In beiden Fällen werden Genexpression und 3D-Koordinaten vorhergesagt, aber die Einstellung und der Stadien-Split sind wichtig.

### Lösungshinweise

Task 2 umfasst zwei Einstellungen. Beim Test des Ganzembryos handelt es sich um Interpolation: Das zurückgehaltene Stadium liegt zwischen freigegebenen Stadien. Im Herz-Szenario ist eine zurückgehaltene Validierungsfrage eine Interpolation; spätere Stadien prüfen eine Extrapolation über den Bereich der freigegebenen Trainingsstadien hinaus. Prüft die genauen Stadiennamen und Board-IDs auf den aktuellen offiziellen Seiten, statt euch auf das Gedächtnis zu verlassen.

## Übung 2 — Vier gleich gewichtete Fragen

Das fiktive Modell A sagt Genexpressionsänderungen ungefähr richtig voraus, erzeugt aber eine gleichförmige Zellwolke. Modell B hat eine plausible Form und lokale Nachbarschaften, sagt aber nur schwache Expressionsänderungen voraus. Keines wurde offiziell bewertet. Fragt die Paare: Welche Evidenz würde molekulare, zelluläre, Gewebe- und lokale Organisationsleistung unterscheiden? Was kann ein lokaler Pseudo-Split zeigen – und was lässt sich daraus nicht über das verborgene Board schließen?

### Lösungshinweise

Der offizielle Task-2-Score gewichtet vier Bereiche jeweils mit einem Viertel: Expressionsänderung, Zellzustandsverteilung, Gewebeform und Wachstumsskala sowie lokale räumliche Organisation. Ein starkes Ergebnis in einem Bereich belegt keine gute Leistung in den anderen. Ein lokaler Vergleich beschreibt nur die gewählten Daten, den gewählten Split und den verwendeten Scorer; er ist kein Ergebnis für den verborgenen Test.

## Übung 3 — Koordinatenrahmen prüfen

Für zwei fiktive Stadien gibt es jeweils eine 3D-Punktwolke. Ein Teammitglied ordnet Zellen mit denselben numerischen `(x,y,z)`-Werten über die Stadien hinweg einander zu und bezeichnet sie als dieselben Zellen. Fragt: Welche Evidenz würde diese Identitätsaussage rechtfertigen?

### Lösungshinweise

Die Koordinaten allein liefern keine solche Evidenz. Laut offizieller Datenseite verwenden die Koordinaten einen lokalen Rahmen pro Embryo und sind über Zeitpunkte hinweg nicht registriert. Leitet aus übereinstimmenden Zahlen weder eine Zellzuordnung zwischen Stadien noch einen gemeinsamen Koordinatenrahmen ab. Prüft das offizielle Schema, bevor ihr eine Registrierungsannahme in eine Analyse einbaut.

## Arbeitsblatt

1. Listet für das gewählte Board die sichtbaren Trainingsstadien, die zurückgehaltene Frage und die vorherzusagenden Kanäle auf. Nennt eine aktuelle offizielle Quelle.
2. Haltet für einen berichteten Score den Split, die Scorer-Version und fest, welchen der vier Task-2-Bereiche er misst.
3. Welche zusätzliche Evidenz wäre nötig, bevor ihr behauptet, zwei Koordinaten aus verschiedenen Stadien bezeichneten denselben biologischen Ort oder dieselbe Zelle?
4. Formuliert eine enge Aussage, die eure Evidenz stützt, und eine weitergehende Aussage, die sie nicht stützt.

## Abschluss für die Moderation

Stellt den fiktiven Vergleich nicht als Ergebnis dar und empfehlt kein Gewinner-Modell. Bittet die Teilnehmenden, die Board-Bedingungen zu prüfen, Grenzen von Community-Tools zu beachten und Split sowie Annahmen zu dokumentieren. Dieses unabhängige Lehrmaterial ist kein offizieller Scoring-Leitfaden.
