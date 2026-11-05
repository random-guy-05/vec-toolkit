# Uguaglianza semantica e disposizione in memoria

**Italiano · Reliability Lab 18 · Esercizio di affidabilità con soluzione**

Questo esercizio usa dati sintetici per spiegare un problema di modellazione o valutazione di previsioni unicellulari e spaziali. Non legge dati della competizione, non calcola punteggi ufficiali e non prevede risultati su campioni nascosti.

Matrici con gli stessi valori possono avere disposizioni di memoria diverse. Un tipo fisso e un ordine contiguo canonico consentono un digest indipendente dalla disposizione.

## Eseguire l'esempio

Create un ambiente nuovo, clonate il repository e installate la dipendenza indicata. Eseguite il comando dalla radice del repository. Leggete prima il risultato senza modificare il codice. Comandi e chiavi JSON sono identificatori letterali condivisi dalle edizioni.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 18 --seed 7
```

## Domanda

Perché i digest canonici coincidono?

## Risultato di riferimento: seme 7

```json
{
  "c_layout": true,
  "f_layout": true,
  "semantic_digest_equal": true,
  "warning": "A real semantic hash must also include shape, gene order, cell order and coordinates."
}
```

## Interpretazione

Le matrici sono convertite allo stesso tipo e ordine. Un hash completo deve includere forma, ordine dei geni, cellule e coordinate.

## Provate un altro caso

Scambiate colonne di geni e specificate quali metadati includere.

## Limiti

L'esempio isola un meccanismo numerico. Non ne dimostra l'importanza nei dati reali, non identifica cause e non sostituisce il valutatore ufficiale. Conservate ipotesi, provenienza e dati originali.

Edizione adattata con assistenza automatica, senza revisione certificata di un madrelingua. Sono benvenute correzioni. L'inglese è il riferimento fattuale; codice e valori matematici restano invariati.

[Source code](../../tools/experiments.py) · [Canonical English](../en/18-semantic-array-hash.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
