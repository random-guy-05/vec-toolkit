# Gen-Gen-Struktur und räumliche Struktur sind verschiedene Fragen

**Deutsch · Reliability Lab 20 · Zuverlässigkeitsexperiment mit Lösung**

Dieses Experiment erklärt anhand synthetischer Daten ein Problem bei der Modellierung oder Bewertung von Einzelzell- und räumlichen Vorhersagen. Es liest keine Wettbewerbsdaten, berechnet keinen offiziellen Score und sagt keine Ergebnisse verborgener Proben voraus.

Die Permutation ganzer Zellzeilen erhält manche Gen-Gen-Zusammenfassungen. Bei festen Positionen ändert sie aber benachbarte Expressionszustände. Eine Struktur belegt nicht die andere.

## Beispiel ausführen

Erstellen Sie eine neue Umgebung, klonen Sie das Repository und installieren Sie die angegebene Abhängigkeit. Führen Sie den Befehl im Hauptverzeichnis aus. Lesen Sie zuerst die unveränderte Ausgabe. Befehle und JSON-Schlüssel sind in allen Sprachausgaben dieselben Code-Bezeichner.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 20 --seed 7
```

## Frage

Welche Zusammenfassung bleibt bei Zeilenpermutation gleich?

## Referenzausgabe: Seed 7

```json
{
  "gene_pair_functional_before": 0.9446099464524159,
  "gene_pair_functional_after": 0.9446099464524159,
  "sequence_neighbor_distance_before": 2.1422813806369296,
  "sequence_neighbor_distance_after": 2.1619532929742107,
  "lesson": "Gene-gene structure and spatial structure answer different questions."
}
```

## Auswertung

Das mittlere Genpaargefälle wird nur umgeordnet. Abstände aufeinanderfolgender Zeilen ändern sich meist; hier stehen sie für feste Liniennachbarn.

## Weiteres Experiment

Permutieren Sie Positionen und Expression gemeinsam und erklären Sie die erhaltene Beziehung.

## Grenzen

Das Beispiel isoliert einen numerischen Mechanismus. Es belegt weder dessen Bedeutung in realen Daten noch eine kausale Deutung und ersetzt nicht die offizielle Bewertung. Bewahren Sie Annahmen, Herkunft und Originaldaten auf.

Maschinell unterstützte, angepasste Ausgabe ohne bestätigte muttersprachliche Prüfung. Korrekturen sind willkommen. Englisch ist die sachliche Referenz; Code und mathematische Werte bleiben unverändert.

[Source code](../../tools/experiments.py) · [Canonical English](../en/20-gene-versus-spatial-structure.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
