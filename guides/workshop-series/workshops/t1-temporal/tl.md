# Workshop sa Task 1: Pagtataya sa Nagbabagong Populasyon ng Selula

**75 minuto · 4–20 kalahok · hindi kailangan ng code o datos ng Challenge**

Inihanda ang sesyong ito para sa facilitator na may mga kalahok na nakaaalam ng mga batayang konsepto ng single-cell ngunit bago sa paghula ng temporal na gene expression. Gumagamit ito ng kathang bilang ng mga selula at halaga ng feature upang maihiwalay ang pagbabago sa komposisyon ng mga cell state mula sa pagbabago sa loob ng isang cell state. Layunin nitong pag-isipan ang target ng prediksyon at ang ebidensiya, hindi magtakda ng modelong dapat gamitin.

> Machine-assisted na unang salin ito at bukas sa mga pagwawasto ng katutubong tagapagsalita. [Orihinal sa English](en.md).

## Paghahanda

Buksan ang opisyal na [mga paglalarawan ng task](https://virtualembryo.ai/challenge/tasks), [schema ng datos](https://virtualembryo.ai/challenge/data), at [pahina ng evaluation](https://virtualembryo.ai/challenge/evaluation). Magdala ng papel o ibahagi ang gabay na ito. Inimbento ang mga bilang sa ibaba at hindi mga obserbasyon ng VEC. Huwag gumamit ng mga sukat mula sa nakatagong target. Ang mga opisyal na pahina ang dapat sundin at maaari silang magbago.

## Daloy ng sesyon

| Minuto | Gawain | Tanong ng facilitator |
|---:|---|---|
| 0–8 | Tukuyin ang prediksyon | “Indibidwal na selula ba ang hinuhulaan natin, o isang populasyon sa hinaharap?” |
| 8–20 | Basahin ang kasalukuyang split | “Aling mga stage ang training, validation, at hidden test ngayon?” |
| 20–38 | Ihiwalay ang pagkakakilanlan sa distribusyon | Gamitin ang Ehersisyo 1. |
| 38–52 | Unawain ang pagbabago sa pseudobulk | Gamitin ang Ehersisyo 2. |
| 52–65 | Suriin ang mga tanong ng metric | Gamitin ang Ehersisyo 3. |
| 65–72 | Magtakda ng hangganan ng pahayag | Bawat pares ay susulat ng isang suportadong pahayag at isang hindi suportado. |
| 72–75 | Pagtatapos | Bumalik sa opisyal na pahina ng task at sa mga tanong na hindi pa nasasagot. |

## Ehersisyo 1 — Bagong populasyon, hindi pagsubaybay sa selula

Kathang-isip ang mga bilang. Isipin na ang inilabas na training sample ay may 70 selulang uri A at 30 uri B. Ang kathang target sa susunod na yugto ay may 40 uri A, 30 uri B, at 30 uri C na bagong lumitaw. Itanong sa mga pares: aling mga selula sa target ang “parehong” selula mula sa training? Ano ang ipinakikita ng halimbawa tungkol sa paghula ng populasyon sa halip na pagsubaybay sa pagkakakilanlan ng bawat selula?

### Susi sa sagot

Walang ebidensiya sa kathang talahanayan tungkol sa pagkakakilanlan ng selula sa magkakaibang stage, kaya hindi mapagtutugma ang indibidwal na mga selula. May uri sa distribusyon ng target na wala sa kathang training sample at iba rin ang proporsiyon ng mga dati nang uri. Kailangang isaalang-alang ng temporal na prediksyon ng populasyon kung aling mga state ang lumilitaw at kung gaano kadalas ang mga ito; hindi ito utos na ilipat pasulong sa panahon ang bawat naobserbahang selula. Suriin ang aktuwal na split at depinisyon ng target sa kasalukuyang opisyal na pahina.

## Ehersisyo 2 — Maaaring baguhin ng komposisyon ang pinagsama-samang halaga

Hindi nagbabago ang kathang mean ng feature sa loob ng bawat uri ng selula, ngunit nagbabago ang halo:

| Yugto | Bahagi ng A | Mean ng A | Bahagi ng B | Mean ng B | Pinagsama-samang mean |
|---|---:|---:|---:|---:|---:|
| mas maaga | 80% | 2 | 20% | 12 | 4 |
| mas huli | 20% | 2 | 80% | 12 | 10 |

Ipakwenta sa mga pares ang pinagsama-samang mean sa bawat yugto. Ano ang nagbago: ang mean sa loob ng bawat uri o ang halo ng populasyon? Ano ang hindi masasabi ng pinagsamang bilang lamang?

### Susi sa sagot

Ang naunang pinagsama-samang mean ay `0.8 × 2 + 0.2 × 12 = 4`; ang sumunod ay `0.2 × 2 + 0.8 × 12 = 10`. Hindi nagbago ang mga mean sa loob ng uri; ang halo ang nagbago. Hindi maihihiwalay ng nag-iisang pooled shift ang tugon sa loob ng state at ang pagbabago sa proporsiyon ng mga cell state. Halimbawa ito para sa pagtuturo, hindi pahayag tungkol sa tunay na gene o yugto.

## Ehersisyo 3 — Apat na magkaibang tanong sa scoring

Magkakahiwalay na sinusukat sa opisyal na Task 1 evaluation ang pagkuha ng DE genes, direksiyon ng pagbabago, distribusyon ng cell state, at co-variation ng mga gene. Ipares ang bawat kathang pagkabigo sa tanong na pinakadirektang naaapektuhan: (a) maraming nagbabagong gene ang hindi nakuha; (b) salungat ang direksiyon ng pagbabago ng mga kaugnay na gene; (c) mali ang hinulaang proporsiyon ng mga uri ng selula; (d) kapani-paniwala ang mga mean ng bawat gene ngunit nawala ang ugnayan ng mga gene.

### Susi sa sagot

(a) pagkuha ng DE genes; (b) direksiyon ng pagbabago; (c) distribusyon ng cell state; (d) co-variation ng mga gene. Maaaring makaapekto ang isang pagkabigo sa higit sa isang metric; hindi tiyak na score pattern ang ipinakikita ng mga halimbawa. Hindi pinatutunayan ng magandang resulta sa isang metric na maganda rin ang iba.

## Worksheet ng kalahok

1. Mula sa kasalukuyang opisyal na task page, ilista ang nakikitang training stage, validation target, hidden test target, at dami o katangiang hinuhulaan.
2. Sa Ehersisyo 1, anong ebidensiya ang kailangan upang masabing iisang selula ang dalawang selula sa magkaibang stage? Nasa halimbawa ba ang ebidensiyang iyon?
3. Ipakita ang pagkukuwenta sa Ehersisyo 2. Ipaliwanag kung paanong nagbago ang pinagsama-samang mean habang hindi nagbabago ang mean sa loob ng dalawang uri.
4. Itugma ang bawat pagkabigo sa Ehersisyo 3 sa pinakadirektang opisyal na tanong ng metric.
5. Sumulat ng isang pahayag na sinusuportahan ng mga kathang halimbawa at isang biyolohikal na pahayag na hindi nila kayang suportahan.

## Pagtatapos para sa facilitator

Huwag ipakahulugan ang mga inimbentong halaga bilang tunay na biology o resulta ng modelo. Hikayatin ang mga kalahok na panatilihing magkahiwalay sa kanilang mga pagsusuri ang komposisyon ng cell state, expression sa loob ng state, split, at ebidensiya mula sa scorer. Independenteng materyal na pang-edukasyon ito, hindi opisyal na scoring guide o modeling recipe.
