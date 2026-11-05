# Quando l'espressione normalizzata non recupera le molecole

**Italiano · Reliability Lab 01 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

CP10K elimina il totale di riga. Se tutti i conteggi positivi condividono un fattore intero, il minimo positivo normalizzato non rappresenta necessariamente una molecola.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 01 --seed 7
```

## Domanda

Perché la prima riga non viene recuperata?

## Risultato di riferimento: seme 7

```json
{
  "input_counts": [
    [
      2.0,
      4.0,
      8.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "recovered_counts": [
    [
      1.0,
      2.0,
      4.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "exact_rows": 1,
  "lesson": "Normalization loses a common integer factor."
}
```

## Interpretazione

[2,4,8] e [1,2,4] hanno le stesse proporzioni. Il fattore comune è perso; [1,3,5] contiene invece un'osservazione di una molecola.

## Provate un altro caso

Confrontate [3,6,12] e [1,6,12].

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/01-count-recovery.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
