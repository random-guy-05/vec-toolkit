# Task-1-Workshop: Eine sich verändernde Zellpopulation prognostizieren

**75 Minuten · 4–20 Teilnehmende · kein Code und keine Challenge-Daten erforderlich**

Diese moderierte Sitzung richtet sich an Personen mit Grundkenntnissen der Einzelzellbiologie, die neu bei zeitlichen Vorhersagen der Genexpression sind. Fiktive Zellzahlen und Merkmalswerte helfen, Änderungen der Zellzustandszusammensetzung von Änderungen innerhalb eines Zellzustands zu unterscheiden. Ziel ist, Vorhersageziel und Evidenz einzuordnen – kein Modell vorzuschreiben.

## Vorbereitung

Öffnet die offiziellen [Aufgabenbeschreibungen](https://virtualembryo.ai/challenge/tasks), das [Datenschema](https://virtualembryo.ai/challenge/data) und die [Evaluationsseite](https://virtualembryo.ai/challenge/evaluation). Druckt dieses Blatt aus oder teilt es digital. Die Zahlen unten sind erfunden und stellen keine VEC-Beobachtungen dar. Verwendet keine Messwerte verborgener Zielbedingungen. Maßgeblich sind die aktuellen offiziellen Seiten; sie können sich ändern.

## Ablauf

| Minuten | Aktivität | Frage für die Moderation |
|---:|---|---|
| 0–8 | Vorhersage definieren | „Sagen wir einzelne Zellen oder eine zukünftige Population voraus?“ |
| 8–20 | Aktuellen Split lesen | „Welche Stadien dienen heute für Training, Validierung und verborgenen Test?“ |
| 20–38 | Identität und Verteilung trennen | Übung 1 verwenden. |
| 38–52 | Einen Pseudobulk-Versatz aufschlüsseln | Übung 2 verwenden. |
| 52–65 | Metrikfragen diagnostizieren | Übung 3 verwenden. |
| 65–72 | Geltungsbereich festlegen | Jedes Paar formuliert eine gestützte und eine nicht gestützte Aussage. |
| 72–75 | Abschluss | Zur offiziellen Aufgabenseite und zu offenen Fragen zurückkehren. |

## Übung 1 — Neue Population statt Zellverfolgung

Die folgenden Zellzahlen sind erfunden. Angenommen, eine freigegebene Trainingsstichprobe enthält 70 Zellen des Typs A und 30 des Typs B. Ein fiktives späteres Ziel enthält 40 vom Typ A, 30 vom Typ B und 30 eines neu auftretenden Typs C. Fragt die Paare: Welche Zielzellen sind „dieselben“ Zellen wie im Training? Was zeigt das Beispiel über die Vorhersage einer Population statt der Verfolgung einzelner Zellidentitäten?

### Lösungshinweise

Die Spielzeugtabelle enthält keine Evidenz zur Zellidentität über Stadien hinweg. Daher können Teilnehmende keine einzelnen Zellen zuordnen. Die Zielverteilung enthält einen Zelltyp, der in der fiktiven Trainingsstichprobe fehlt, sowie andere Anteile der vorhandenen Typen. Eine zeitliche Populationsvorhersage muss berücksichtigen, welche Zustände auftreten und wie häufig sie sind; sie verlangt nicht, jede beobachtete Zelle in der Zeit weiterzubewegen. Prüft den tatsächlichen Split und die Zieldefinition auf der aktuellen offiziellen Seite.

## Übung 2 — Die Zusammensetzung kann einen aggregierten Wert verschieben

Diese fiktiven Merkmalsmittelwerte bleiben innerhalb jedes Zelltyps gleich, während sich die Mischung ändert:

| Stadium | Anteil Typ A | Mittelwert Typ A | Anteil Typ B | Mittelwert Typ B | Gepoolter Mittelwert |
|---|---:|---:|---:|---:|---:|
| früher | 80% | 2 | 20% | 12 | 4 |
| später | 20% | 2 | 80% | 12 | 10 |

Lasst die Paare den gepoolten Mittelwert für jedes Stadium berechnen. Was hat sich geändert: die Mittelwerte innerhalb der Zelltypen oder die Populationsmischung? Was lässt sich aus der gepoolten Zahl allein nicht erkennen?

### Lösungshinweise

Der frühere gepoolte Mittelwert beträgt `0.8 × 2 + 0.2 × 12 = 4`, der spätere `0.2 × 2 + 0.8 × 12 = 10`. Die Mittelwerte innerhalb der Zelltypen blieben gleich; die Mischung änderte sich. Ein gepoolter Versatz allein unterscheidet keine Änderung innerhalb eines Zellzustands von einer Änderung der Zellzustandsanteile. Das ist ein Lehrbeispiel und keine Aussage über ein echtes Gen oder Stadium.

## Übung 3 — Vier verschiedene Scoring-Fragen

Die offizielle Task-1-Evaluation trennt die Wiederfindung differentiell exprimierter Gene, die Änderungsrichtung, die Zellzustandsverteilung und die Gen-Gen-Kovariation. Lasst die Gruppen jeden fiktiven Fehler der am direktesten betroffenen Frage zuordnen: (a) viele veränderte Gene werden übersehen; (b) die relevanten Gene ändern sich in die entgegengesetzte Richtung; (c) die vorhergesagten Zelltyp-Anteile sind falsch; (d) Genmittelwerte wirken plausibel, aber Beziehungen zwischen Genen gehen verloren.

### Lösungshinweise

(a) Wiederfindung differentiell exprimierter Gene; (b) Änderungsrichtung; (c) Zellzustandsverteilung; (d) Gen-Gen-Kovariation. Ein Fehler kann mehrere Metriken betreffen; diese Beispiele sind keine eindeutigen Score-Signaturen. Ein gutes Ergebnis bei einer Metrik beweist nicht, dass die anderen ebenfalls gut sind.

## Arbeitsblatt

1. Listet anhand der aktuellen offiziellen Aufgabenseite die sichtbaren Trainingsstadien, das Validierungsziel, das verborgene Testziel und die vorhergesagte Größe auf.
2. Welche Evidenz wäre in Übung 1 nötig, um zu behaupten, zwei Zellen aus verschiedenen Stadien seien dieselbe Zelle? Liegt sie vor?
3. Zeigt die Rechnung aus Übung 2. Erklärt, wie sich der gepoolte Mittelwert änderte, obwohl beide Mittelwerte innerhalb der Zelltypen gleich blieben.
4. Ordnet jeden Fehler aus Übung 3 der direktesten offiziellen Metrikfrage zu.
5. Formuliert eine Aussage, die die fiktiven Beispiele stützen, und eine biologische Aussage, die sie nicht stützen können.

## Abschluss für die Moderation

Deutet die erfundenen Werte nicht als reale Biologie oder Modellergebnis. Bittet die Teilnehmenden, Zellzustandszusammensetzung, Expression innerhalb eines Zustands, Split und Scorer-Evidenz in ihren Analysen getrennt zu behandeln. Dieses unabhängige Lehrmaterial ist weder ein offizieller Scoring-Leitfaden noch ein Modellierungsrezept.
