# Laboratorio Task 3: prevedere la risposta a una perturbazione

**75 minuti · 4–20 partecipanti · non servono codice né dati della Challenge**

Questa sessione aiuta i partecipanti a ragionare su un compito di previsione con knockout condizionale. L'obiettivo didattico principale è distinguere l'effetto di una perturbazione dal profilo di riferimento wild type. La sessione non propone né un meccanismo biologico né una ricetta di modellazione.

## Preparazione

Aprire le [descrizioni ufficiali dei task](https://virtualembryo.ai/challenge/tasks), lo [schema dei dati](https://virtualembryo.ai/challenge/data) e le [regole attuali](https://virtualembryo.ai/challenge/rules). Stampare questa guida o condividerla. Gli esercizi usano numeri inventati e nomi generici di caratteristiche. Non usare misurazioni dei target nascosti. Le pagine ufficiali fanno fede e possono cambiare.

## Scaletta

| Minuti | Attività | Spunto per chi conduce |
|---:|---|---|
| 0–8 | Definire la previsione | «Che cosa chiede al modello di cambiare la Challenge?» |
| 8–20 | Mappare condizioni e split | «Quale knockout è per training, validazione o test nascosto?» |
| 20–38 | Confrontare con il wild type | Usare l'Esercizio 1. |
| 38–52 | Leggere le metriche di risposta | Usare l'Esercizio 2. |
| 52–65 | Valutare una fonte esterna | Usare l'Esercizio 3. |
| 65–72 | Esplicitare l'incertezza | Scrivere un'affermazione sulla risposta e un limite. |
| 72–75 | Concludere | Rivedere le pagine ufficiali aggiornate e le domande aperte. |

## Esercizio 1 — Riferimento versus risposta

I valori seguenti sono inventati, normalizzati e didattici, riferiti a una caratteristica generica. Non sono osservazioni reali di VEC.

| Condizione | Valore fittizio |
|---|---:|
| wild type corrispondente | 10.0 |
| perturbazione, Modello A | 10.1 |
| perturbazione, Modello B | 7.0 |

Chiedere alle coppie quale modello riproduce il profilo wild type di riferimento e quale prevede un cambiamento maggiore. Poi chiedere perché un confronto dei soli valori assoluti di espressione potrebbe favorire un modello che copia semplicemente la condizione wild type.

### Soluzione

Il Modello A resta vicino al valore wild type, quindi il suo cambiamento previsto è quasi nullo. Il Modello B prevede una diminuzione maggiore. Questo esempio didattico non indica quale direzione sia biologicamente corretta: lo determina la risposta alla perturbazione osservata. La Challenge valuta la risposta rispetto al wild type, quindi riprodurre un fondo condiviso non basta.

## Esercizio 2 — Quattro domande sulla risposta

Le metriche ufficiali di Task 3 coprono il recupero dei geni risposta, la direzione della risposta, la sua entità e la distribuzione degli stati cellulari. Chiedere alle coppie di associare errori fittizi alle metriche: (a) cambiano i geni giusti ma nella direzione sbagliata; (b) la direzione è corretta ma l'effetto è troppo piccolo; (c) cambiamenti grandi avvengono nei geni sbagliati; (d) le proporzioni della popolazione collassano.

### Soluzione

(a) direzione della risposta; (b) entità della risposta; (c) recupero dei geni risposta; (d) distribuzione degli stati cellulari. Le metriche forniscono evidenze distinte. Un buon valore in una metrica non prova che lo siano anche le altre.

## Esercizio 3 — Valutare dati esterni

Una collega propone un dataset pubblico con il knockout di un gene correlato e uno stadio simile. Chiedere ai gruppi quali controlli servono prima dell'uso: gene/allele e genotipo esatti, stadio, fonte e release, licenza, pertinenza al task, regole attuali sulle condizioni escluse e obblighi di dichiarazione. Quale fatto irrisolto dovrebbe impedire l'uso?

### Soluzione

Il gruppo dovrebbe fermarsi finché fonte, perturbazione e stadio non siano verificabili rispetto alle regole attuali. Un allele correlato o un fenotipo simile potrebbe ricadere in una condizione protetta ed esclusa; un URL pubblico non dimostra che il dataset sia ammissibile. Seguire il limite esplicito delle regole e chiedere in anticipo agli organizzatori se la corrispondenza è ambigua.

## Scheda per i partecipanti

1. Indicare, dalla pagina ufficiale del task, l'esempio di training con perturbazione, il target di validazione e il target di test nascosto attualmente rilasciati per Task 3.
2. Per una caratteristica inventata, calcolare `perturbazione − wild type corrispondente` per ogni modello. Che cosa ha rivelato la differenza che i valori assoluti nascondevano?
3. Associare ciascun errore dell'Esercizio 2 alla metrica di risposta interessata.
4. Elencare le evidenze necessarie prima di considerare ammissibile e dichiarabile un dataset esterno di perturbazione.
5. Scrivere un'affermazione sui risultati supportata dall'esempio e un'affermazione biologica che l'esempio non supporta.

## Chiusura per chi conduce

Non dedurre biologia reale dall'esempio inventato. Invitare i partecipanti a esplicitare in ogni analisi il contrasto di perturbazione, il controllo corrispondente, il genotipo, lo stadio e la provenienza della fonte. Il materiale è didattico e indipendente; non è una guida ufficiale alla valutazione.
