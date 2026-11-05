# Una stima non distorta di MMD può essere negativa

**Italiano · Reliability Lab 07 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

La distanza quadratica di popolazione è non negativa. Lo stimatore non distorto rimuove termini diagonali e può essere negativo con campioni piccoli; quello distorto li conserva.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 07 --seed 7
```

## Domanda

Perché gli stimatori hanno segni diversi?

## Risultato di riferimento: seme 7

```json
{
  "unbiased_mmd_squared": -0.8617044036602768,
  "biased_mmd_squared": 0.0029603131031104013,
  "population_distance_nonnegative": true
}
```

## Interpretazione

La correzione diagonale modifica la stima finita. Una stima negativa non rende negativa la distanza di popolazione.

## Provate un altro caso

Allontanate il secondo campione mantenendo fisso il kernel.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/07-negative-unbiased-mmd.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
