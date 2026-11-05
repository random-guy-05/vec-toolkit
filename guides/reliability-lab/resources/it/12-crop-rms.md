# Un ritaglio cambia RMS senza crescita biologica

**Italiano · Reliability Lab 12 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

Il raggio RMS descrive la nube osservata rispetto al suo centro. Un ritaglio centrale elimina punti lontani senza muovere le cellule conservate.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 12 --seed 7
```

## Domanda

Perché il raggio del ritaglio è inferiore?

## Risultato di riferimento: seme 7

```json
{
  "full_rms": 1.7226292470793867,
  "cropped_rms": 1.0827934049272807,
  "retained_cells": 4852,
  "biological_growth": 0
}
```

## Interpretazione

Sono esclusi i punti oltre distanza 1.5. Non è simulato sviluppo: la differenza deriva solo dall'osservazione.

## Provate un altro caso

Ritagliate un solo lato e ricalcolate centro e raggio.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/12-crop-rms.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
