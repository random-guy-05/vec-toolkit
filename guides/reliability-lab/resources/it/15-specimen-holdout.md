# Separare cellule può condividere tutti gli esemplari

**Italiano · Reliability Lab 15 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

Una divisione casuale può mettere cellule dello stesso embrione in addestramento e test. Le righe sono diverse, ma gli effetti dell'esemplare rimangono condivisi.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 15 --seed 7
```

## Domanda

Quanti identificatori compaiono da entrambi i lati?

## Risultato di riferimento: seme 7

```json
{
  "cell_split_shared_specimens": 6,
  "specimen_split_shared_specimens": 0,
  "total_specimens": 6
}
```

## Interpretazione

La divisione cellulare condivide esemplari. La divisione esplicita per gruppi non ne condivide nessuno; cellule numerose non sono embrioni indipendenti.

## Provate un altro caso

Assegnate due alias allo stesso embrione e discutete la dipendenza non rilevata.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/15-specimen-holdout.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
