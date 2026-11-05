# Laboratorio Task 1: prevedere una popolazione cellulare in cambiamento

**75 minuti · 4–20 partecipanti · non servono codice né dati della Challenge**

Questa sessione, pronta per la conduzione, è pensata per chi conosce i concetti di base della biologia a singola cellula ma è alle prime armi con la previsione temporale dell'espressione genica. Usa conteggi cellulari e valori di caratteristiche inventati per distinguere i cambiamenti nella composizione degli stati cellulari da quelli all'interno di uno stato. L'obiettivo è ragionare sul target e sulle evidenze, non prescrivere un modello.

## Preparazione

Aprire le [descrizioni ufficiali dei task](https://virtualembryo.ai/challenge/tasks), lo [schema dei dati](https://virtualembryo.ai/challenge/data) e la [pagina di valutazione](https://virtualembryo.ai/challenge/evaluation). Stampare questa guida o condividerla. I numeri seguenti sono inventati e non rappresentano osservazioni di VEC. Non usare misurazioni dei target nascosti. Le pagine ufficiali aggiornate fanno fede e possono cambiare.

## Scaletta

| Minuti | Attività | Spunto per chi conduce |
|---:|---|---|
| 0–8 | Definire la previsione | «Prevediamo singole cellule o una popolazione futura?» |
| 8–20 | Leggere lo split attuale | «Quali stadi sono di training, validazione e test nascosto oggi?» |
| 20–38 | Separare identità e distribuzione | Usare l'Esercizio 1. |
| 38–52 | Analizzare uno spostamento pseudobulk | Usare l'Esercizio 2. |
| 52–65 | Diagnosticare le domande delle metriche | Usare l'Esercizio 3. |
| 65–72 | Delimitare un'affermazione | Ogni coppia scrive un'affermazione supportata e una non supportata. |
| 72–75 | Concludere | Tornare alla pagina ufficiale del task e alle domande aperte. |

## Esercizio 1 — Una nuova popolazione, non il tracciamento delle cellule

I conteggi seguenti sono inventati. Immaginare un campione di training rilasciato con 70 cellule di tipo A e 30 di tipo B. Un target fittizio più tardivo contiene 40 cellule di tipo A, 30 di tipo B e 30 di un tipo C che compare per la prima volta. Chiedere alle coppie: quali cellule del target sono «le stesse» del training? Che cosa mostra l'esempio sulla previsione di una popolazione anziché sul tracciamento delle identità cellulari?

### Soluzione

La tabella didattica non fornisce evidenze sull'identità delle cellule tra stadi, quindi non è possibile abbinare le singole cellule. La distribuzione target include un tipo assente nel campione di training fittizio e proporzioni diverse dei tipi già presenti. Una previsione temporale di popolazione deve considerare quali stati compaiono e quanto sono frequenti; non chiede di far avanzare nel tempo ciascuna cellula osservata. Verificare lo split effettivo e la definizione del target nella pagina ufficiale aggiornata.

## Esercizio 2 — La composizione può spostare un valore aggregato

Queste medie fittizie della caratteristica restano invariate all'interno di ciascun tipo cellulare mentre cambia la miscela:

| Stadio | Quota tipo A | Media tipo A | Quota tipo B | Media tipo B | Media aggregata |
|---|---:|---:|---:|---:|---:|
| precedente | 80% | 2 | 20% | 12 | 4 |
| successivo | 20% | 2 | 80% | 12 | 10 |

Chiedere alle coppie di calcolare la media aggregata a ciascuno stadio. Che cosa è cambiato: le medie interne ai tipi o la miscela della popolazione? Che cosa non può rivelare il solo valore aggregato?

### Soluzione

La media aggregata precedente è `0.8 × 2 + 0.2 × 12 = 4`; quella successiva è `0.2 × 2 + 0.8 × 12 = 10`. Le medie interne ai tipi non sono cambiate; è cambiata la miscela. Un cambiamento aggregato, da solo, non distingue una risposta all'interno di uno stato da un cambiamento nelle proporzioni degli stati cellulari. È un esempio didattico, non un'affermazione su un gene o uno stadio reali.

## Esercizio 3 — Quattro domande distinte dello scoring

La valutazione ufficiale di Task 1 distingue il recupero dei geni DE, la direzione del cambiamento, la distribuzione degli stati cellulari e la co-variazione tra geni. Chiedere ai gruppi di associare ogni errore fittizio alla domanda più direttamente interessata: (a) molti geni che cambiano non vengono recuperati; (b) i geni pertinenti cambiano nella direzione opposta; (c) le proporzioni previste dei tipi cellulari sono errate; (d) le medie dei singoli geni sembrano plausibili ma scompaiono le relazioni tra geni.

### Soluzione

(a) recupero dei geni DE; (b) direzione del cambiamento; (c) distribuzione degli stati cellulari; (d) co-variazione tra geni. Un errore può interessare più metriche e questi esempi non sono firme deterministiche dei punteggi. Un buon risultato su una metrica non dimostra che lo siano anche le altre.

## Scheda per i partecipanti

1. Dalla pagina ufficiale aggiornata del task, elencare gli stadi di training visibili, il target di validazione, il target di test nascosto e la quantità da prevedere.
2. Nell'Esercizio 1, quali prove servirebbero per affermare che due cellule di stadi diversi sono la stessa cellula? Sono presenti?
3. Mostrare il calcolo dell'Esercizio 2. Spiegare come è cambiata la media aggregata mentre entrambe le medie interne ai tipi restavano uguali.
4. Associare ciascun errore dell'Esercizio 3 alla domanda della metrica ufficiale più diretta.
5. Scrivere un'affermazione supportata dagli esempi fittizi e un'affermazione biologica che non possono supportare.

## Chiusura per chi conduce

Non interpretare i valori inventati come biologia reale o risultati di un modello. Invitare i partecipanti a tenere distinti nelle proprie analisi la composizione degli stati cellulari, l'espressione all'interno di uno stato, lo split e le evidenze dello scorer. Il materiale è didattico e indipendente; non è una guida ufficiale allo scoring né una ricetta di modellazione.
