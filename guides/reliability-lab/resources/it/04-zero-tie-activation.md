# Attivare zeri a pari rango con supporto spaziale

**Italiano · Reliability Lab 04 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

Un trasporto per quantili deve scegliere quali zeri attivare. La scelta casuale e il supporto dei vicini producono distribuzioni spaziali diverse a parità di attivazioni.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 04 --seed 7
```

## Domanda

Quali cellule sceglie il supporto locale?

## Risultato di riferimento: seme 7

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

## Interpretazione

Gli zeri con supporto 0.9 e 0.8. Una singola estrazione casuale può coincidere e non prova una superiorità generale.

## Provate un altro caso

Invertite i supporti lasciando fisso il numero di attivazioni.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/04-zero-tie-activation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
