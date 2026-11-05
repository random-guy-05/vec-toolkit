# Workshop sa Task 3: Pagtataya sa Tugon sa Perturbation

**75 minuto · 4–20 kalahok · hindi kailangan ng code o datos ng Challenge**

Tinutulungan ng sesyong ito ang mga kalahok na mangatwiran tungkol sa task ng conditional-knockout prediction. Pangunahing layunin nitong matutunang ihiwalay ang epekto ng perturbation sa wild-type background. Hindi ito nagmumungkahi ng biyolohikal na mekanismo o recipe sa pagmomodelo.

> Machine-assisted na unang salin ito at bukas sa mga pagwawasto ng katutubong tagapagsalita. [Orihinal sa English](en.md).

## Paghahanda

Buksan ang opisyal na [mga paglalarawan ng task](https://virtualembryo.ai/challenge/tasks), [schema ng datos](https://virtualembryo.ai/challenge/data), at kasalukuyang [mga tuntunin](https://virtualembryo.ai/challenge/rules). Magdala ng papel o ibahagi ang gabay na ito. Inimbento ang mga bilang at generic na pangalan ng feature sa mga ehersisyo. Huwag gumamit ng sukat mula sa hidden target. Ang opisyal na mga pahina ang dapat sundin at maaaring magbago.

## Daloy ng sesyon

| Minuto | Gawain | Tanong ng facilitator |
|---:|---|---|
| 0–8 | Tukuyin ang prediksyon | “Ano ang hinihingi ng challenge na baguhin ng modelo?” |
| 8–20 | Imapa ang mga condition at split | “Aling knockout ang training, validation, o hidden test?” |
| 20–38 | Ihambing sa wild type | Gamitin ang Ehersisyo 1. |
| 38–52 | Basahin ang mga response metric | Gamitin ang Ehersisyo 2. |
| 52–65 | Suriin ang panlabas na source | Gamitin ang Ehersisyo 3. |
| 65–72 | Sabihin ang kawalang-katiyakan | Sumulat ng isang pahayag tungkol sa response at isang limitasyon. |
| 72–75 | Pagtatapos | Balikan ang kasalukuyang opisyal na pahina at natitirang tanong. |

## Ehersisyo 1 — Background laban sa tugon

Inimbento ang mga sumusunod na normalized toy value para sa isang generic na feature. Hindi ito tunay na obserbasyon ng VEC.

| Condition | Kathang halaga |
|---|---:|
| matched wild type | 10.0 |
| perturbation, Model A | 10.1 |
| perturbation, Model B | 7.0 |

Itanong sa bawat pares kung aling modelo ang tumutulad sa wild-type background at alin ang humuhula ng mas malaking pagbabago. Pagkatapos, itanong kung bakit maaaring paboran ng paghahambing ng absolute expression lamang ang modelong basta kumokopya sa wild type.

### Susi sa sagot

Malapit ang Model A sa wild-type value kaya halos sero ang hinulaang pagbabago nito. Mas malaking pagbaba ang hinuhulaan ng Model B. Hindi sinasabi ng toy example na ito kung aling direksiyon ang tama sa biology; ang naobserbahang perturbation response ang tumutukoy rito. Sinusuri ng challenge ang response kaugnay ng wild type, kaya hindi sapat ang pagtutugma lamang sa shared background.

## Ehersisyo 2 — Apat na tanong tungkol sa response

Saklaw ng mga opisyal na T3 metric ang pagkuha ng response gene, direksiyon ng response, laki ng response, at distribusyon ng cell state. Itugma ang bawat kathang pagkabigo sa metric: (a) nagbabago ang tamang gene sa maling direksiyon; (b) tama ang direksiyon pero napakaliit ng epekto; (c) maling gene ang malaki ang pagbabago; (d) bumagsak ang proporsiyon ng cell state.

### Susi sa sagot

(a) direksiyon ng response; (b) laki ng response; (c) pagkuha ng response gene; (d) distribusyon ng cell state. Magkakaibang ebidensiya ang ibinibigay ng bawat metric. Hindi pinatutunayan ng magandang halaga sa isa na maganda rin ang iba.

## Ehersisyo 3 — Pagsusuri ng panlabas na datos

Nagmumungkahi ang isang kasamahan ng pampublikong dataset na may knockout ng kaugnay na gene sa katulad na yugto. Ipatukoy sa grupo ang mga dapat suriin bago ito gamitin: ang eksaktong gene/allele at genotype, yugto, pinagmulan at release, lisensiya, kaugnayan sa task, kasalukuyang mga tuntunin tungkol sa held-out data, at mga kinakailangan sa disclosure. Aling hindi pa nalulutas na katotohanan ang dapat magpatigil sa paggamit?

### Susi sa sagot

Dapat maghintay ang grupo hangga’t hindi nasusuri ang eksaktong source, perturbation, at yugto ayon sa kasalukuyang tuntunin. Maaaring saklaw ng protektadong held-out condition ang kaugnay na allele o phenocopy; hindi pinatutunayan ng pampublikong URL na eligible ito. Sundin ang tahasang hangganan sa mga tuntunin at magtanong muna sa organizers kung malabo ang pagtutugma.

## Worksheet ng kalahok

1. Mula sa kasalukuyang opisyal na Task page, pangalanan ang inilabas na Task 3 perturbation training example, validation target, at hidden test target.
2. Kuwentahin ang `perturbation − matched wild type` para sa bawat modelo. Ano ang ipinakita ng difference na hindi makita sa absolute value?
3. Itugma ang bawat pagkabigo sa Ehersisyo 2 sa metric.
4. Ilista ang kailangang ebidensiya bago ituring na eligible at maibubunyag ang panlabas na perturbation dataset.
5. Sumulat ng isang pahayag na sinusuportahan ng toy example at isang biyolohikal na pahayag na hindi nito sinusuportahan.

## Pagtatapos para sa facilitator

Huwag maghinuha ng totoong biology mula sa inimbentong halaga. Hikayatin ang mga kalahok na gawing malinaw ang perturbation contrast, matched control, genotype, stage, at source provenance sa anumang pagsusuri. Independenteng materyal na pang-edukasyon ito, hindi opisyal na gabay sa evaluation.
