# Warsha ya Task 3: Kutabiri Mwitikio wa Perturbation

**Dakika 75 · washiriki 4–20 · haihitaji msimbo wala data ya Challenge**

Kikao hiki huwasaidia washiriki kufikiri kuhusu task ya utabiri wa conditional knockout. Lengo kuu la kujifunza ni kutenganisha athari ya perturbation na background ya wild type. Hakipendekezi utaratibu wa kibaolojia au mapishi ya modeli.

> Hili ni toleo la kwanza lililotafsiriwa kwa msaada wa mashine; marekebisho kutoka kwa wazungumzaji wa lugha ya asili yanakaribishwa. [Chanzo cha Kiingereza](en.md).

## Maandalizi

Fungua [maelezo rasmi ya task](https://virtualembryo.ai/challenge/tasks), [schema ya data](https://virtualembryo.ai/challenge/data), na [sheria za sasa](https://virtualembryo.ai/challenge/rules). Leta karatasi au shiriki mwongozo huu. Mazoezi hutumia namba zilizobuniwa na majina ya jumla ya feature. Usitumie vipimo vya hidden target. Kurasa rasmi ndizo zenye mamlaka na zinaweza kubadilika.

## Ratiba

| Dakika | Shughuli | Swali la mwezeshaji |
|---:|---|---|
| 0–8 | Fafanua utabiri | “Challenge inataka modeli ibadilishe nini?” |
| 8–20 | Ramani ya conditions na split | “Ni knockout gani iko kwenye training, validation, au hidden test?” |
| 20–38 | Linganisha na wild type | Tumia Zoezi la 1. |
| 38–52 | Soma response metric | Tumia Zoezi la 2. |
| 52–65 | Kagua chanzo cha nje | Tumia Zoezi la 3. |
| 65–72 | Eleza kutokuwa na uhakika | Andika dai moja kuhusu response na kizuizi kimoja. |
| 72–75 | Hitimisha | Rudi kwenye kurasa rasmi za sasa na maswali yaliyobaki. |

## Zoezi la 1 — Background dhidi ya response

Thamani zifuatazo ni toy value zilizobuniwa, zilizosanifishwa kwa feature moja ya jumla. Si uchunguzi halisi wa VEC.

| Condition | Thamani ya kubuniwa |
|---|---:|
| matched wild type | 10.0 |
| perturbation, Model A | 10.1 |
| perturbation, Model B | 7.0 |

Waulize washiriki ni modeli gani inayonakili background ya wild type na ni ipi inatabiri mabadiliko makubwa zaidi. Kisha uliza kwa nini ulinganisho wa absolute expression pekee unaweza kuipa faida modeli inayorudia tu wild type.

### Majibu

Model A iko karibu na thamani ya wild type, kwa hiyo mabadiliko yake yaliyotabiriwa ni karibu sifuri. Model B inatabiri kupungua zaidi. Mfano huu hauonyeshi mwelekeo gani ni sahihi kibaolojia; response ya perturbation iliyozingatiwa ndiyo huamua hilo. Challenge hupima response ikilinganishwa na wild type, kwa hiyo kulinganisha background ya pamoja pekee hakutoshi.

## Zoezi la 2 — Maswali manne ya response

Metric rasmi za T3 zinahusu urejeshaji wa response-gene, mwelekeo wa response, ukubwa wa response, na usambazaji wa cell-state. Waombe washiriki waunganishe hitilafu ya kubuniwa na metric: (a) jeni sahihi hubadilika kuelekea mwelekeo usio sahihi; (b) mwelekeo ni sahihi lakini athari ni ndogo mno; (c) mabadiliko makubwa hutokea kwenye jeni zisizo sahihi; (d) uwiano wa cell-state huporomoka.

### Majibu

(a) mwelekeo wa response; (b) ukubwa wa response; (c) urejeshaji wa response-gene; (d) usambazaji wa cell-state. Kila metric ni ushahidi tofauti. Thamani nzuri kwenye moja haithibitishi kuwa nyingine ni nzuri.

## Zoezi la 3 — Kagua data ya nje

Mwenza anapendekeza dataset ya umma yenye knockout ya jeni linalohusiana katika stage inayofanana. Waombe vikundi vitambue ukaguzi kabla ya matumizi: jeni/allele na genotype sahihi, stage, chanzo na release, license, uhusiano na task, sheria za sasa za held-out, na masharti ya disclosure. Ni jambo gani lisilotatuliwa linapaswa kusimamisha matumizi?

### Majibu

Kikundi kinapaswa kusubiri hadi chanzo, perturbation, na stage sahihi vikaguliwe dhidi ya sheria za sasa. Allele inayohusiana au phenocopy inaweza kuangukia kwenye condition ya held-out iliyolindwa; URL ya umma haithibitishi eligibility. Fuata mpaka ulio wazi kwenye sheria na waulize waandaaji mapema kama ulinganifu haueleweki.

## Karatasi ya mshiriki

1. Kwenye ukurasa rasmi wa sasa wa Task 3, taja mfano wa training wa perturbation uliotolewa, validation target, na hidden test target.
2. Kokotoa `perturbation − matched wild type` kwa kila modeli. Tofauti hiyo ilifichua nini ambacho thamani kamili zilificha?
3. Linganisha kila hitilafu ya Zoezi la 2 na metric.
4. Orodhesha ushahidi unaohitajika kabla ya dataset ya perturbation ya nje kuhesabiwa kuwa inaruhusiwa na kutangazwa.
5. Andika dai linaloungwa mkono na mfano wa toy na dai la kibaolojia ambalo halijaungwa mkono.

## Hitimisho la mwezeshaji

Usihitimishe biolojia halisi kutoka kwa thamani zilizobuniwa. Wahimize washiriki kuweka wazi perturbation contrast, matched control, genotype, stage, na chanzo cha data katika uchanganuzi wowote. Hii ni nyenzo huru ya elimu, si mwongozo rasmi wa evaluation.
