# Viele Varianten sind nicht viele Methodenfamilien

**Deutsch · Reliability Lab 16 · Zuverlässigkeitsexperiment mit Lösung**

Dieses Experiment erklärt anhand synthetischer Daten ein Problem bei der Modellierung oder Bewertung von Einzelzell- und räumlichen Vorhersagen. Es liest keine Wettbewerbsdaten, berechnet keinen offiziellen Score und sagt keine Ergebnisse verborgener Proben voraus.

Eine starke gepoolte Korrelation kann Unterschiede zwischen wenigen Familien widerspiegeln. Sie garantiert keine gute Reihenfolge eng verwandter Varianten innerhalb einer Familie.

## Beispiel ausführen

Erstellen Sie eine neue Umgebung, klonen Sie das Repository und installieren Sie die angegebene Abhängigkeit. Führen Sie den Befehl im Hauptverzeichnis aus. Lesen Sie zuerst die unveränderte Ausgabe. Befehle und JSON-Schlüssel sind in allen Sprachausgaben dieselben Code-Bezeichner.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 16 --seed 7
```

## Frage

Stimmen gepoolte und familieninterne Korrelationen überein?

## Referenzausgabe: Seed 7

```json
{
  "pooled_spearman": 0.9352941176470588,
  "within_family_spearman": [
    0.39999999999999997,
    0.39999999999999997,
    -0.7999999999999999,
    -0.39999999999999997
  ],
  "independent_families": 4,
  "variants": 16,
  "lesson": "Many variants do not create many independent method families."
}
```

## Auswertung

Der Familieneffekt ist stark und das interne Rauschen klein. Interne Korrelationen variieren mit dem Seed; diese Streuung gehört zum Ergebnis.

## Weiteres Experiment

Ergänzen Sie Varianten, ohne neue Familien hinzuzufügen.

## Grenzen

Das Beispiel isoliert einen numerischen Mechanismus. Es belegt weder dessen Bedeutung in realen Daten noch eine kausale Deutung und ersetzt nicht die offizielle Bewertung. Bewahren Sie Annahmen, Herkunft und Originaldaten auf.

Maschinell unterstützte, angepasste Ausgabe ohne bestätigte muttersprachliche Prüfung. Korrekturen sind willkommen. Englisch ist die sachliche Referenz; Code und mathematische Werte bleiben unverändert.

[Source code](../../tools/experiments.py) · [Canonical English](../en/16-method-family-dependence.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
