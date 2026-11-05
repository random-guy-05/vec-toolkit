# Warsha ya Task 2: Kufikiri Katika Nafasi na Muda

**Dakika 75 · washiriki 4–20 · haihitaji msimbo wala data ya Challenge**

Kikao hiki kilichoandaliwa kwa mwezeshaji ni cha washiriki wanaojua dhana za msingi za single-cell lakini ni wapya katika utabiri wa anga-na-wakati wa 3D. Kinatumia ulinganisho wa modeli uliobuniwa. Lengo ni kujadili mkataba wa task na ushahidi, si kufundisha njia ya modeli ambayo haijathibitishwa.

> Hili ni toleo la kwanza lililotafsiriwa kwa msaada wa mashine; marekebisho kutoka kwa wazungumzaji wa lugha ya asili yanakaribishwa. [Chanzo cha Kiingereza](en.md).

## Maandalizi

Fungua [maelezo rasmi ya task](https://virtualembryo.ai/challenge/tasks), [schema ya data](https://virtualembryo.ai/challenge/data), na [ukurasa wa tathmini](https://virtualembryo.ai/challenge/evaluation). Leta karatasi au shiriki mwongozo huu. Waombe washiriki wasitumie hidden targets wala kushiriki matokeo binafsi ya modeli. Kagua tena kurasa rasmi kabla ya kikao; ndizo zenye mamlaka.

## Ratiba

| Dakika | Shughuli | Swali la mwezeshaji |
|---:|---|---|
| 0–8 | Weka swali | “Utabiri lazima uwe na nini hasa?” |
| 8–20 | Chora split | “Hii ni interpolation au extrapolation? Ni hatua zipi zinaonekana kweli?” |
| 20–38 | Changanua hali | Tumia Zoezi la 1 hapa chini. |
| 38–52 | Tafsiri score | Tumia Zoezi la 2 hapa chini. |
| 52–65 | Kagua coordinate | Tumia Zoezi la 3 hapa chini. |
| 65–72 | Andika mpaka wa dai | Kila jozi iandike dai moja linaloungwa mkono na moja lisiloungwa mkono. |
| 72–75 | Hitimisha | Elekeza kwenye kurasa rasmi za sasa na ukubali maswali yaliyobaki. |

## Zoezi la 1 — Task moja, setting tofauti

Timu ya kubuniwa “Small Atlas” inadhani board zote za Task 2 zinataka utabiri zaidi ya hatua ya mwisho ya training. Waambie washiriki waangalie jedwali rasmi la split na warekebishe dhana hiyo. Wanapaswa kutambua interpolation iliyowekwa kando katika setting ya whole-embryo, kisha kuilinganisha na maswali ya interpolation na extrapolation katika setting ya heart. Uliza kinachofanana na kutofautiana: zote hutabiri expression na coordinate za 3D, lakini setting na split ya stage ni muhimu.

### Majibu

Task 2 ina setting mbili. Jaribio la whole-embryo ni interpolation: hatua iliyowekwa kando iko kati ya hatua zilizotolewa. Katika setting ya heart, mojawapo ya maswali ya validation yaliyotengwa ni interpolation, huku hatua za baadaye zikijaribu extrapolation nje ya upeo wa training uliotolewa. Hakiki majina sahihi ya hatua na board ID kwenye kurasa rasmi za sasa badala ya kutegemea kumbukumbu.

## Zoezi la 2 — Maswali manne yenye uzito sawa

Model A ya kubuniwa inakisia mabadiliko ya expression kwa kiasi lakini hutabiri wingu la seli lililosambaa kwa usawa. Model B ina umbo na neighborhood za karibu zinazoonekana zenye mantiki lakini mabadiliko ya expression ni dhaifu. Hakuna iliyopata score rasmi. Waulize washiriki: ni ushahidi gani unaweza kutenganisha utendaji wa molecular, cellular, tissue, na local organization? Pseudo-split ya eneo fulani inaweza kuthibitisha nini na haiwezi kuthibitisha nini kuhusu hidden board?

### Majibu

Score rasmi ya T2 hutoa robo moja kwa kila kipengele: mabadiliko ya expression, usambazaji wa cell-state, umbo/ukubwa wa ukuaji wa tissue, na mpangilio wa anga wa karibu. Matokeo mazuri katika kipengele kimoja hayathibitishi vingine. Ulinganisho wa eneo hueleza tu data, split, na scorer vilivyochaguliwa; si matokeo ya hidden test.

## Zoezi la 3 — Kagua coordinate frame

Kuna point cloud ya 3D kwa kila moja ya stage mbili za kubuniwa. Mshiriki mwenzako anaunganisha seli zenye thamani zilezile za namba za `(x,y,z)` kati ya stage na kuzitaja seli zilezile. Uliza: ni ushahidi gani ungehalalisha dai hilo la utambulisho?

### Majibu

Hakuna ushahidi kama huo unaotokana na thamani za coordinate pekee. Ukurasa rasmi wa data unasema coordinate hutumia local frame tofauti kwa kila embryo na hazijasajiliwa kati ya time point. Usihitimishe ulinganifu wa seli kati ya stage au frame moja ya pamoja kwa namba zinazolingana tu. Soma schema rasmi kabla ya kuweka dhana ya registration kwenye uchanganuzi.

## Karatasi ya mshiriki

1. Kwa board uliyochagua, orodhesha training stage zinazoonekana, swali lililowekwa kando, na channels zinazotabiriwa. Taja ukurasa rasmi wa sasa.
2. Kwa score iliyoripotiwa, rekodi split, toleo la scorer, na ni kipengele gani kati ya vinne vya T2 kinachopimwa.
3. Ni ushahidi gani wa ziada unahitajika kabla ya kudai kuwa coordinate mbili kati ya stage zinawakilisha eneo au seli moja ya kibaolojia?
4. Andika dai finyu linaloungwa mkono na ushahidi wako na dai pana ambalo hauungi mkono.

## Hitimisho la mwezeshaji

Usiwasilishe ulinganisho wa kubuniwa kama matokeo wala kupendekeza modeli mshindi. Wahimize washiriki kuthibitisha mkataba wa board, kuchunguza mipaka ya zana za jamii, na kuandika split na dhana zao. Hii ni nyenzo huru ya elimu; si mwongozo rasmi wa scoring.
