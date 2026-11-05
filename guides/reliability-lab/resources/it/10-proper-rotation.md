# L'allineamento per rotazione richiede un vincolo sul determinante

**Italiano · Reliability Lab 10 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

Un adattamento ortogonale libero può includere una riflessione. Le rotazioni proprie hanno determinante +1 e preservano l'orientamento; il vincolo cambia le soluzioni ammissibili.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 10 --seed 7
```

## Domanda

Perché l'adattamento perfetto ha determinante -1?

## Risultato di riferimento: seme 7

```json
{
  "unconstrained_determinant": -1.0000000000000007,
  "proper_determinant": 1.0000000000000016,
  "unconstrained_error": 6.891658975852732e-15,
  "proper_error": 15.367278961474724
}
```

## Interpretazione

Il bersaglio riflette un asse. La riflessione lo adatta esattamente; una rotazione propria lascia un residuo.

## Provate un altro caso

Generate il bersaglio con una rotazione propria nota.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/10-proper-rotation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
