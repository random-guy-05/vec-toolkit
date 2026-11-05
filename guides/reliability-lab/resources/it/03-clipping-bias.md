# Il bias introdotto dal taglio a zero

**Italiano · Reliability Lab 03 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

Spostare tutti i valori e troncare quelli negativi non sposta esattamente la media. Gli zeri non possono diminuire, rendendo l'operazione non lineare.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 03 --seed 7
```

## Domanda

La media diminuisce esattamente di 0.5?

## Risultato di riferimento: seme 7

```json
{
  "original_mean": 1.0,
  "shift": -0.5,
  "intended_mean": 0.5,
  "clipped_mean": 0.75
}
```

## Interpretazione

No. Il taglio elimina parte della diminuzione prevista e lascia una media superiore all'obiettivo.

## Provate un altro caso

Cambiate la frazione di zeri e misurate lo scarto.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/03-clipping-bias.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
