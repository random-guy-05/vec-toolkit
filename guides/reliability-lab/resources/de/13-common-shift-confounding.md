# Eine gemeinsame Änderung ist nicht automatisch technisch

**Deutsch · Reliability Lab 13 · Zuverlässigkeitsexperiment mit Lösung**

Dieses Experiment erklärt anhand synthetischer Daten ein Problem bei der Modellierung oder Bewertung von Einzelzell- und räumlichen Vorhersagen. Es liest keine Wettbewerbsdaten, berechnet keinen offiziellen Score und sagt keine Ergebnisse verborgener Proben voraus.

Der Median über Zelltypen trennt eine gemeinsame Komponente von typabhängigen Resten. Ihre technische Deutung braucht eine zusätzliche Annahme: Gemeinsame Biologie kann gleich aussehen.

## Beispiel ausführen

Erstellen Sie eine neue Umgebung, klonen Sie das Repository und installieren Sie die angegebene Abhängigkeit. Führen Sie den Befehl im Hauptverzeichnis aus. Lesen Sie zuerst die unveränderte Ausgabe. Befehle und JSON-Schlüssel sind in allen Sprachausgaben dieselben Code-Bezeichner.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 13 --seed 7
```

## Frage

Identifiziert die Rechnung eine Ursache?

## Referenzausgabe: Seed 7

```json
{
  "observed_type_deltas": [
    [
      -1.0,
      1.5
    ],
    [
      -1.0,
      -0.5
    ],
    [
      -1.0,
      0.5
    ]
  ],
  "common_component": [
    -1.0,
    0.5
  ],
  "residual": [
    [
      0.0,
      1.0
    ],
    [
      0.0,
      -1.0
    ],
    [
      0.0,
      0.0
    ]
  ],
  "caveat": "Common biology and batch remain confounded without additional assumptions."
}
```

## Auswertung

Nein. Sie rekonstruiert die eingebaute gemeinsame Komponente. Dieselben Werte könnten eine gemeinsame biologische Antwort darstellen.

## Weiteres Experiment

Fügen Sie allen Typen denselben biologischen Effekt hinzu.

## Grenzen

Das Beispiel isoliert einen numerischen Mechanismus. Es belegt weder dessen Bedeutung in realen Daten noch eine kausale Deutung und ersetzt nicht die offizielle Bewertung. Bewahren Sie Annahmen, Herkunft und Originaldaten auf.

Maschinell unterstützte, angepasste Ausgabe ohne bestätigte muttersprachliche Prüfung. Korrekturen sind willkommen. Englisch ist die sachliche Referenz; Code und mathematische Werte bleiben unverändert.

[Source code](../../tools/experiments.py) · [Canonical English](../en/13-common-shift-confounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
