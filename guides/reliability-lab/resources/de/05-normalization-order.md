# Normalisierung und zeitliche Mischung sind nicht vertauschbar

**Deutsch · Reliability Lab 05 · Zuverlässigkeitsexperiment mit Lösung**

Dieses Experiment erklärt anhand synthetischer Daten ein Problem bei der Modellierung oder Bewertung von Einzelzell- und räumlichen Vorhersagen. Es liest keine Wettbewerbsdaten, berechnet keinen offiziellen Score und sagt keine Ergebnisse verborgener Proben voraus.

Zählwerte vor der Normalisierung zu mischen unterscheidet sich vom Mitteln normalisierter Log-Expression. Zeilensummen und log1p führen zu Nichtlinearitäten und unterschiedlichen Modellannahmen.

## Beispiel ausführen

Erstellen Sie eine neue Umgebung, klonen Sie das Repository und installieren Sie die angegebene Abhängigkeit. Führen Sie den Befehl im Hauptverzeichnis aus. Lesen Sie zuerst die unveränderte Ausgabe. Befehle und JSON-Schlüssel sind in allen Sprachausgaben dieselben Code-Bezeichner.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 05 --seed 7
```

## Frage

Warum unterscheiden sich zwei Mittelpunkte mit Gewicht 0.5?

## Referenzausgabe: Seed 7

```json
{
  "normalize_after_mix": [
    9.115140186122302,
    6.813544494621113
  ],
  "mix_after_normalize": [
    4.6052201834882585,
    4.6052201834882585
  ],
  "difference": 5.0215609817365605
}
```

## Auswertung

[10,0] und [0,1] haben verschiedene Summen. Frühe Normalisierung entfernt diesen Unterschied; Log-Mittelung fügt eine weitere Nichtlinearität hinzu.

## Weiteres Experiment

Gleichen Sie die Summen an und wiederholen Sie den Vergleich.

## Grenzen

Das Beispiel isoliert einen numerischen Mechanismus. Es belegt weder dessen Bedeutung in realen Daten noch eine kausale Deutung und ersetzt nicht die offizielle Bewertung. Bewahren Sie Annahmen, Herkunft und Originaldaten auf.

Maschinell unterstützte, angepasste Ausgabe ohne bestätigte muttersprachliche Prüfung. Korrekturen sind willkommen. Englisch ist die sachliche Referenz; Code und mathematische Werte bleiben unverändert.

[Source code](../../tools/experiments.py) · [Canonical English](../en/05-normalization-order.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
