# Laboratorio VEC tra pari: avviare un flusso di lavoro riproducibile

**75 minuti · 4–20 partecipanti · non servono programmazione né dati della Challenge**

Guida pronta per chi conduce, rivolta a nuovi partecipanti, studenti e collaboratori. La sessione usa scenari fittizi. Prima traduzione assistita da strumenti; sono benvenute correzioni da parte di italofoni.

## Preparazione e scaletta

Prima del laboratorio, consultare la [panoramica della Challenge](https://virtualembryo.ai/challenge), le [regole](https://virtualembryo.ai/challenge/rules) e le [risorse della community](https://virtualembryo.ai/challenge/resources). Le pagine ufficiali prevalgono e possono cambiare. Chiedere alle coppie di non condividere dati privati, credenziali, risultati non pubblicati o file nascosti.

| Minuti | Attività |
|---:|---|
| 0–8 | Scegliere un task e descriverne l'obiettivo. |
| 8–20 | Trovare una risorsa e verificarne requisiti e limiti. |
| 20–38 | Distinguere validazione del formato, valutazione locale e valutazione ufficiale. |
| 38–53 | Esaminare una proposta fittizia di dati esterni. |
| 53–66 | Scegliere che cosa registrare per riprodurre un'esecuzione. |
| 66–75 | Scrivere il passo successivo e un controllo da fare. |

## Scheda di lavoro

1. Trova una risorsa per un'esigenza concreta. A quale domanda risponde e quale limite dichiara?
2. Un validatore restituisce `PASS` e uno split locale favorisce il Modello A. Questo dimostra che i valori sono normalizzati biologicamente in modo corretto, che la fonte esterna è ammissibile o che A vincerà sul test nascosto? Spiega quali evidenze mancano.
3. Prima di usare un dataset pubblico, annota fonte e versione, licenza, stadio e tessuto, pertinenza per il task, regola ufficiale applicabile e dati di provenienza da conservare.
4. Per riprodurre un'esecuzione, registra revisione del codice, ambiente, configurazione, seed, comando, input ammessi e file valutato.

## Chiavi per chi conduce

`PASS` conferma solo i controlli implementati. Un confronto locale riguarda quello split e quel protocollo; da solo non prevede la classifica sul target nascosto. Il fatto che un dataset sia pubblico non prova che il suo uso sia ammissibile. Sospendere l'uso se la regola o la licenza non è chiara. Registri, hash e trascrizioni aiutano la verifica, ma nessuno di essi dimostra da solo la conformità completa.

**Chiusura:** ogni persona scrive una piccola azione, una fonte ufficiale che consulterà e un'incertezza da risolvere prima dell'invio. Non è un evento ufficiale né una raccomandazione strategica.
