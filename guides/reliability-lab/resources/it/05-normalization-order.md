# Normalizzazione e miscela non commutano

**Italiano · Reliability Lab 05 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

Mescolare conteggi prima della normalizzazione differisce dal mediare espressioni logaritmiche già normalizzate. Totali e log1p introducono non linearità e ipotesi diverse.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 05 --seed 7
```

## Domanda

Perché due punti medi con peso 0.5 differiscono?

## Risultato di riferimento: seme 7

```json
{
  "normalize_after_mix": [
    9.115140186122302,
    6.813544494621113
  ],
  "mix_after_normalize": [
    4.6052201834882585,
    4.6052201834882585
  ],
  "difference": 5.0215609817365605
}
```

## Interpretazione

[10,0] e [0,1] hanno totali diversi. Normalizzare prima elimina quella differenza; mediare logaritmi introduce un'altra non linearità.

## Provate un altro caso

Rendete uguali i totali e ripetete il confronto.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/05-normalization-order.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
