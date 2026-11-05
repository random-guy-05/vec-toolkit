# Zwei Wachstumsgesetze liefern zwei Mittelpunkte

**Deutsch · Reliability Lab 11 · Zuverlässigkeitsexperiment mit Lösung**

Dieses Experiment erklärt anhand synthetischer Daten ein Problem bei der Modellierung oder Bewertung von Einzelzell- und räumlichen Vorhersagen. Es liest keine Wettbewerbsdaten, berechnet keinen offiziellen Score und sagt keine Ergebnisse verborgener Proben voraus.

Lineare Interpolation des Radius und seines Logarithmus trifft dieselben Endpunkte, liefert aber unterschiedliche Zwischenwerte. Zwei Endpunkte bestimmen das Wachstumsgesetz nicht.

## Beispiel ausführen

Erstellen Sie eine neue Umgebung, klonen Sie das Repository und installieren Sie die angegebene Abhängigkeit. Führen Sie den Befehl im Hauptverzeichnis aus. Lesen Sie zuerst die unveränderte Ausgabe. Befehle und JSON-Schlüssel sind in allen Sprachausgaben dieselben Code-Bezeichner.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 11 --seed 7
```

## Frage

Welcher Mittelpunkt ergibt sich zwischen 100 und 400?

## Referenzausgabe: Seed 7

```json
{
  "early_radius": 100.0,
  "late_radius": 400.0,
  "linear_midpoint": 250.0,
  "constant_log_growth_midpoint": 200.0
}
```

## Auswertung

Linear im Radius ergibt sich 250. Konstantes logarithmisches Wachstum ergibt das geometrische Mittel 200. Beides hängt von der Annahme ab.

## Weiteres Experiment

Berechnen Sie beide Kurven bei 0.25 und 0.75.

## Grenzen

Das Beispiel isoliert einen numerischen Mechanismus. Es belegt weder dessen Bedeutung in realen Daten noch eine kausale Deutung und ersetzt nicht die offizielle Bewertung. Bewahren Sie Annahmen, Herkunft und Originaldaten auf.

Maschinell unterstützte, angepasste Ausgabe ohne bestätigte muttersprachliche Prüfung. Korrekturen sind willkommen. Englisch ist die sachliche Referenz; Code und mathematische Werte bleiben unverändert.

[Source code](../../tools/experiments.py) · [Canonical English](../en/11-growth-law.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
