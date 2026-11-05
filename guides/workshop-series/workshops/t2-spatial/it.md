# Laboratorio Task 2: ragionare tra spazio e tempo

**75 minuti · 4–20 partecipanti · non servono codice né dati della Challenge**

Questa sessione, pronta per la conduzione, è pensata per chi conosce i concetti di base della biologia a singola cellula ma è alle prime armi con le previsioni spazio-temporali in 3D. Usa un confronto fittizio tra modelli. L'obiettivo è ragionare sul contratto del task e sulle evidenze, non insegnare una ricetta di modellazione non verificata.

## Preparazione

Aprire le [descrizioni ufficiali dei task](https://virtualembryo.ai/challenge/tasks), lo [schema dei dati](https://virtualembryo.ai/challenge/data) e la [pagina di valutazione](https://virtualembryo.ai/challenge/evaluation). Stampare questa guida o condividerla. Chiedere ai partecipanti di non usare target nascosti né condividere risultati privati dei modelli. Ricontrollare le pagine ufficiali prima della sessione: fanno fede le informazioni aggiornate lì.

## Scaletta

| Minuti | Attività | Spunto per chi conduce |
|---:|---|---|
| 0–8 | Definire la domanda | «Che cosa deve contenere esattamente una previsione?» |
| 8–20 | Mappare lo split | «È interpolazione o estrapolazione? Quali stadi sono davvero visibili?» |
| 20–38 | Analizzare lo scenario | Usare l'Esercizio 1. |
| 38–52 | Interpretare il punteggio | Usare l'Esercizio 2. |
| 52–65 | Verificare le coordinate | Usare l'Esercizio 3. |
| 65–72 | Delimitare un'affermazione | Ogni coppia scrive un'affermazione supportata e una non supportata. |
| 72–75 | Concludere | Indicare le pagine ufficiali aggiornate e raccogliere le domande aperte. |

## Esercizio 1 — Un task, impostazioni diverse

Il team fittizio «Small Atlas» presume che tutti i board di Task 2 chiedano di prevedere oltre lo stadio di training più avanzato. Chiedere alle coppie di consultare la tabella ufficiale degli split e correggere questa supposizione. Dovrebbero identificare l'interpolazione nel test dell'impostazione per l'intero embrione, poi confrontarla con le domande di interpolazione ed estrapolazione nell'impostazione cardiaca. Chiedere che cosa è uguale e che cosa cambia: in entrambi i casi si prevedono espressione e coordinate 3D, ma l'impostazione e lo split degli stadi contano.

### Soluzione

Task 2 ha due impostazioni. Il test dell'intero embrione è un'interpolazione: lo stadio escluso cade tra stadi rilasciati. Nell'impostazione cardiaca, una domanda di validazione esclusa è di interpolazione, mentre gli stadi successivi verificano l'estrapolazione oltre l'intervallo degli stadi di training rilasciati. Verificare i nomi esatti degli stadi e gli ID dei board nelle pagine ufficiali aggiornate, senza affidarsi alla memoria.

## Esercizio 2 — Quattro domande con lo stesso peso

Il Modello A fittizio riproduce più o meno bene i cambiamenti di espressione, ma prevede una nube uniforme di cellule. Il Modello B ha una forma plausibile e vicinati locali plausibili, ma cambiamenti di espressione deboli. Nessuno dei due è stato valutato ufficialmente. Chiedere a ogni coppia: quali evidenze distinguerebbero le prestazioni molecolari, cellulari, del tessuto e dell'organizzazione locale? Che cosa può stabilire uno split pseudo-locale e che cosa non può stabilire sul board nascosto?

### Soluzione

Il punteggio ufficiale di Task 2 assegna un quarto del peso a ciascuno di questi aspetti: cambiamento di espressione, distribuzione degli stati cellulari, forma e scala di crescita del tessuto, organizzazione spaziale locale. Un buon risultato su una componente non dimostra buone prestazioni sulle altre. Un confronto locale descrive soltanto i dati, lo split e lo scorer scelti; non è un risultato sul test nascosto.

## Esercizio 3 — Controllo del sistema di coordinate

Per due stadi fittizi è disponibile una nuvola di punti 3D per ciascuno. Un membro del team abbina cellule con gli stessi valori numerici `(x,y,z)` tra gli stadi e le considera le stesse cellule. Chiedere: quali evidenze giustificherebbero questa affermazione di identità?

### Soluzione

I soli valori delle coordinate non forniscono tali evidenze. La pagina ufficiale dei dati afferma che le coordinate usano un sistema locale per ciascun embrione e non sono registrate tra i diversi punti temporali. Non dedurre una corrispondenza cellulare tra stadi o un sistema di coordinate condiviso da numeri coincidenti. Consultare lo schema ufficiale prima di basare un'analisi su un'ipotesi di registrazione.

## Scheda per i partecipanti

1. Per il board scelto, elencare gli stadi di training visibili, la domanda esclusa e i canali da prevedere. Citare la pagina ufficiale aggiornata.
2. Per un punteggio riportato, annotare lo split, la versione dello scorer e quale delle quattro dimensioni di Task 2 misura.
3. Quali prove aggiuntive servirebbero prima di affermare che due coordinate tra stadi identificano la stessa posizione biologica o la stessa cellula?
4. Scrivere un'affermazione circoscritta supportata dalle evidenze e una più ampia che non lo è.

## Chiusura per chi conduce

Non presentare il confronto fittizio come un risultato e non indicare un modello vincente. Invitare i partecipanti a verificare il contratto del board, considerare i limiti degli strumenti della community e documentare split e ipotesi. Il materiale è didattico e indipendente; non è una guida ufficiale allo scoring.
