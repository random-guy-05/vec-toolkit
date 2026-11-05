# Workshop sa Task 2: Pangangatwiran sa Espasyo at Panahon

**75 minuto · 4–20 kalahok · hindi kailangan ng code o datos ng Challenge**

Ang sesyong ito para sa facilitator ay para sa mga kalahok na nakaaalam ng mga batayang konsepto ng single-cell ngunit bago sa 3D spatial-temporal prediction. Gumagamit ito ng kathang paghahambing ng modelo. Layunin nitong pag-isipan ang kontrata ng task at ang ebidensiya, hindi magturo ng hindi napatunayang recipe para sa pagmomodelo.

> Machine-assisted na unang salin ito at bukas sa mga pagwawasto ng katutubong tagapagsalita. [Orihinal sa English](en.md).

## Paghahanda

Buksan ang opisyal na [mga paglalarawan ng task](https://virtualembryo.ai/challenge/tasks), [schema ng datos](https://virtualembryo.ai/challenge/data), at [pahina ng evaluation](https://virtualembryo.ai/challenge/evaluation). Magdala ng papel o ibahagi ang gabay na ito. Sabihan ang mga kalahok na huwag gumamit ng hidden target o magbahagi ng pribadong resulta ng modelo. Suriin muli ang opisyal na mga pahina bago ang sesyon; ang mga iyon ang awtoritatibong sanggunian.

## Daloy ng sesyon

| Minuto | Gawain | Tanong ng facilitator |
|---:|---|---|
| 0–8 | Itakda ang tanong | “Ano mismo ang kailangang laman ng isang prediksyon?” |
| 8–20 | Imapa ang split | “Interpolation ba ito o extrapolation? Anong mga stage ang nakikita talaga?” |
| 20–38 | Suriin ang sitwasyon | Gamitin ang Ehersisyo 1 sa ibaba. |
| 38–52 | Bigyang-kahulugan ang score | Gamitin ang Ehersisyo 2 sa ibaba. |
| 52–65 | Suriin ang coordinate | Gamitin ang Ehersisyo 3 sa ibaba. |
| 65–72 | Isulat ang hangganan ng pahayag | Bawat pares ay susulat ng isang suportado at isang hindi suportadong pahayag. |
| 72–75 | Pagtatapos | Ituro ang kasalukuyang opisyal na mga pahina at tanggapin ang natitirang tanong. |

## Ehersisyo 1 — Iisang task, magkakaibang setting

Ipinagpapalagay ng kathang pangkat na “Small Atlas” na hinihingi ng lahat ng Task 2 board ang pagtantya lampas sa pinakahuling training stage. Ipasuri sa mga pares ang opisyal na talahanayan ng split at itama ang palagay. Dapat nilang matukoy ang held-out interpolation sa whole-embryo setting, at ihambing ito sa mga tanong na interpolation at extrapolation sa heart setting. Itanong kung ano ang pareho at magkaiba: parehong hinuhulaan ang expression at 3D coordinate, ngunit mahalaga ang setting at stage split.

### Susi sa sagot

May dalawang setting ang Task 2. Interpolation ang whole-embryo test: nasa pagitan ng mga inilabas na stage ang held-out stage. Sa heart setting, interpolation ang isa sa mga held-out validation na tanong, samantalang sinusubok ng mas huling mga stage ang extrapolation lampas sa inilabas na training range. Suriin ang eksaktong pangalan ng stage at board ID sa kasalukuyang opisyal na pahina; huwag umasa sa memorya.

## Ehersisyo 2 — Apat na tanong na magkakapantay ang bigat

Tama-tama ang hulang expression change ng kathang Model A ngunit hinuhulaan nito ang pantay-pantay na ulap ng mga selula. Kapani-paniwala ang hugis at lokal na neighborhood ng Model B ngunit mahina ang expression change. Wala pang opisyal na score ang alinman. Itanong sa bawat pares: anong ebidensiya ang maghihiwalay sa molecular, cellular, tissue, at lokal na organisasyon? Ano ang maitatatag ng lokal na pseudo-split at ano ang hindi nito maitatatag tungkol sa hidden board?

### Susi sa sagot

Tig-isang-kapat ang bigat ng opisyal na T2 score sa expression change, cell-state distribution, tissue shape/growth scale, at local spatial organization. Hindi pinatutunayan ng malakas na resulta sa isang bahagi na mahusay ang iba. Ang lokal na paghahambing ay tungkol lamang sa napiling datos, split, at scorer; hindi ito resulta sa hidden test.

## Ehersisyo 3 — Suriin ang coordinate frame

May 3D point cloud para sa bawat isa sa dalawang kathang stage. Itinutugma ng isang teammate ang mga selulang may magkaparehong numerong `(x,y,z)` sa magkaibang stage at sinasabing pareho ang mga selula. Itanong: anong ebidensiya ang magbibigay-katwiran sa pahayag tungkol sa pagkakakilanlan?

### Susi sa sagot

Hindi sapat ang mga coordinate value lamang bilang ebidensiya. Sinasabi ng opisyal na pahina ng datos na gumagamit ang mga coordinate ng hiwalay na local frame sa bawat embryo at hindi naka-register sa pagitan ng mga time point. Huwag maghinuha ng pagtutugma ng mga selula sa magkaibang stage o iisang coordinate frame mula lamang sa magkatugmang numero. Basahin ang opisyal na schema bago magpalagay ng registration sa pagsusuri.

## Worksheet ng kalahok

1. Para sa board na pinili, ilista ang nakikitang training stage, held-out na tanong, at mga channel na hinuhulaan. Sipiin ang kasalukuyang opisyal na pahina.
2. Para sa iniulat na score, itala ang split, bersiyon ng scorer, at kung alin sa apat na dimensiyon ng T2 ang sinusukat nito.
3. Anong dagdag na ebidensiya ang kailangan bago sabihing iisang biyolohikal na lokasyon o selula ang dalawang coordinate sa magkaibang stage?
4. Sumulat ng isang makitid na pahayag na sinusuportahan ng ebidensiya at isang mas malawak na pahayag na hindi nito sinusuportahan.

## Pagtatapos para sa facilitator

Huwag iharap ang kathang paghahambing bilang resulta o magrekomenda ng panalong modelo. Hikayatin ang mga kalahok na tiyakin ang board contract, suriin ang limitasyon ng anumang community tool, at idokumento ang sarili nilang split at mga palagay. Independenteng materyal na pang-edukasyon ito; hindi opisyal na gabay sa scoring.
