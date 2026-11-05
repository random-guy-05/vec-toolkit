# Räumlich gestützte Aktivierung gleicher Nullwerte

**Deutsch · Reliability Lab 04 · Zuverlässigkeitsexperiment mit Lösung**

Dieses Experiment erklärt anhand synthetischer Daten ein Problem bei der Modellierung oder Bewertung von Einzelzell- und räumlichen Vorhersagen. Es liest keine Wettbewerbsdaten, berechnet keinen offiziellen Score und sagt keine Ergebnisse verborgener Proben voraus.

Quantiltransport muss entscheiden, welche ranggleichen Nullwerte aktiviert werden. Zufallsauswahl und Nachbarschaftsunterstützung erzeugen bei gleicher Aktivierungszahl unterschiedliche räumliche Muster.

## Beispiel ausführen

Erstellen Sie eine neue Umgebung, klonen Sie das Repository und installieren Sie die angegebene Abhängigkeit. Führen Sie den Befehl im Hauptverzeichnis aus. Lesen Sie zuerst die unveränderte Ausgabe. Befehle und JSON-Schlüssel sind in allen Sprachausgaben dieselben Code-Bezeichner.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 04 --seed 7
```

## Frage

Welche Zellen wählt die lokale Unterstützung?

## Referenzausgabe: Seed 7

```json
{
  "zero_cells": [
    0,
    1,
    2,
    3
  ],
  "random_activation": [
    2,
    3
  ],
  "supported_activation": [
    1,
    0
  ],
  "support": [
    0.9,
    0.8,
    0.2,
    0.1,
    2.0
  ]
}
```

## Auswertung

Die Nullwerte mit Unterstützung 0.9 und 0.8. Eine Zufallsziehung kann übereinstimmen; eine einzelne Ziehung beweist keine allgemeine Überlegenheit.

## Weiteres Experiment

Kehren Sie die Unterstützung bei gleicher Aktivierungszahl um.

## Grenzen

Das Beispiel isoliert einen numerischen Mechanismus. Es belegt weder dessen Bedeutung in realen Daten noch eine kausale Deutung und ersetzt nicht die offizielle Bewertung. Bewahren Sie Annahmen, Herkunft und Originaldaten auf.

Maschinell unterstützte, angepasste Ausgabe ohne bestätigte muttersprachliche Prüfung. Korrekturen sind willkommen. Englisch ist die sachliche Referenz; Code und mathematische Werte bleiben unverändert.

[Source code](../../tools/experiments.py) · [Canonical English](../en/04-zero-tie-activation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
