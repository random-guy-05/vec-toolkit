# Eine feste Nachbarzahl hat keine feste räumliche Skala

**Deutsch · Reliability Lab 08 · Zuverlässigkeitsexperiment mit Lösung**

Dieses Experiment erklärt anhand synthetischer Daten ein Problem bei der Modellierung oder Bewertung von Einzelzell- und räumlichen Vorhersagen. Es liest keine Wettbewerbsdaten, berechnet keinen offiziellen Score und sagt keine Ergebnisse verborgener Proben voraus.

Die k nächsten Nachbarn legen eine Zellzahl statt eines Radius fest. Höhere Dichte bringt die Nachbarn auf demselben Gebiet näher zusammen.

## Beispiel ausführen

Erstellen Sie eine neue Umgebung, klonen Sie das Repository und installieren Sie die angegebene Abhängigkeit. Führen Sie den Befehl im Hauptverzeichnis aus. Lesen Sie zuerst die unveränderte Ausgabe. Befehle und JSON-Schlüssel sind in allen Sprachausgaben dieselben Code-Bezeichner.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 08 --seed 7
```

## Frage

Was geschieht mit der Ausdehnung von 15 Nachbarn?

## Referenzausgabe: Seed 7

```json
{
  "domain_length": 1,
  "fixed_neighbor_count": 15,
  "physical_span": {
    "100": 0.15151515151515152,
    "1000": 0.015015015015015015,
    "10000": 0.0015001500150015
  }
}
```

## Auswertung

Auf dem Einheitssegment sinkt der Abstand vom Rand zur fünfzehnten Position mit wachsender Punktzahl.

## Weiteres Experiment

Fixieren Sie einen Radius und zählen Sie die enthaltenen Punkte.

## Grenzen

Das Beispiel isoliert einen numerischen Mechanismus. Es belegt weder dessen Bedeutung in realen Daten noch eine kausale Deutung und ersetzt nicht die offizielle Bewertung. Bewahren Sie Annahmen, Herkunft und Originaldaten auf.

Maschinell unterstützte, angepasste Ausgabe ohne bestätigte muttersprachliche Prüfung. Korrekturen sind willkommen. Englisch ist die sachliche Referenz; Code und mathematische Werte bleiben unverändert.

[Source code](../../tools/experiments.py) · [Canonical English](../en/08-fixed-knn-scale.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
