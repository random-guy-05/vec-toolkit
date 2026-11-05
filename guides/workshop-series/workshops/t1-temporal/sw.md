# Warsha ya Task 1: Kutabiri Idadi ya Seli Inayobadilika

**Dakika 75 · washiriki 4–20 · haihitaji msimbo wala data ya Challenge**

Kikao hiki kilichoandaliwa kwa mwezeshaji ni cha washiriki wanaojua dhana za msingi za single-cell lakini ni wapya katika utabiri wa muda wa usemi wa jeni. Kinatumia idadi ya seli na thamani za sifa zilizobuniwa ili kutenganisha mabadiliko ya muundo wa hali za seli na mabadiliko ndani ya hali moja ya seli. Lengo ni kujadili kinachotabiriwa na ushahidi unaohitajika, si kuagiza modeli fulani.

> Hili ni toleo la kwanza lililotafsiriwa kwa msaada wa mashine; marekebisho kutoka kwa wazungumzaji wa lugha ya asili yanakaribishwa. [Chanzo cha Kiingereza](en.md).

## Maandalizi

Fungua [maelezo rasmi ya task](https://virtualembryo.ai/challenge/tasks), [schema ya data](https://virtualembryo.ai/challenge/data), na [ukurasa wa tathmini](https://virtualembryo.ai/challenge/evaluation). Leta karatasi au shiriki mwongozo huu. Namba zilizo hapa chini zimebuniwa na si uchunguzi wa VEC. Usitumie vipimo vya lengo lililofichwa. Kurasa rasmi ndizo zenye mamlaka na zinaweza kubadilika.

## Ratiba

| Dakika | Shughuli | Swali la mwezeshaji |
|---:|---|---|
| 0–8 | Fafanua utabiri | “Tunatabiri seli moja moja, au idadi ya baadaye?” |
| 8–20 | Soma split ya sasa | “Ni hatua zipi sasa ni training, validation, na hidden test?” |
| 20–38 | Tenganisha utambulisho na usambazaji | Tumia Zoezi la 1. |
| 38–52 | Changanua mabadiliko ya pseudobulk | Tumia Zoezi la 2. |
| 52–65 | Tambua maswali ya metric | Tumia Zoezi la 3. |
| 65–72 | Weka mpaka wa dai | Kila jozi iandike dai moja linaloungwa mkono na moja lisiloungwa mkono. |
| 72–75 | Hitimisha | Rudi kwenye ukurasa rasmi wa task na maswali ambayo hayajajibiwa. |

## Zoezi la 1 — Idadi mpya, si kufuatilia seli moja moja

Idadi hizi zimebuniwa. Fikiria sampuli ya training iliyotolewa ina seli 70 za aina A na 30 za aina B. Lengo la kubuniwa la hatua ya baadaye lina seli 40 za A, 30 za B, na 30 za aina C iliyojitokeza mpya. Waulize washiriki wawili wawili: ni seli zipi kwenye lengo ni “seli zilezile” kutoka training? Mfano huu unaonyesha nini kuhusu kutabiri idadi badala ya kufuatilia utambulisho wa kila seli?

### Majibu

Jedwali la kubuniwa halina ushahidi wa utambulisho wa seli kati ya hatua, kwa hiyo washiriki hawawezi kuoanisha seli moja moja. Usambazaji wa lengo una aina ambayo haikuwapo kwenye sampuli ya training ya kubuniwa, na uwiano wa aina zilizokuwapo pia umetofautiana. Utabiri wa idadi kwa muda lazima uzingatie hali zinazojitokeza na jinsi zilivyo za kawaida; si ombi la kusogeza kila seli iliyozingatiwa mbele kwa wakati. Hakiki split halisi na ufafanuzi wa lengo kwenye ukurasa rasmi wa sasa.

## Zoezi la 2 — Muundo unaweza kubadilisha thamani ya jumla

Wastani wa sifa za kubuniwa ndani ya kila aina ya seli unabaki uleule, lakini mchanganyiko unabadilika:

| Hatua | Sehemu ya A | Wastani A | Sehemu ya B | Wastani B | Wastani wa pamoja |
|---|---:|---:|---:|---:|---:|
| ya awali | 80% | 2 | 20% | 12 | 4 |
| ya baadaye | 20% | 2 | 80% | 12 | 10 |

Waombe washiriki wakokotoe wastani wa pamoja kwa kila hatua. Nini kilibadilika: wastani wa sifa ndani ya kila aina, au mchanganyiko wa idadi? Namba ya pamoja peke yake haiwezi kutuambia nini?

### Majibu

Wastani wa awali ni `0.8 × 2 + 0.2 × 12 = 4`; wa baadaye ni `0.2 × 2 + 0.8 × 12 = 10`. Wastani ndani ya aina haukubadilika; mchanganyiko ndio uliobadilika. Mabadiliko ya pooled pekee hayawezi kutenganisha mwitikio ndani ya hali na mabadiliko ya uwiano wa hali za seli. Huu ni mfano wa kufundishia, si dai kuhusu jeni au hatua halisi.

## Zoezi la 3 — Maswali manne tofauti ya scoring

Tathmini rasmi ya Task 1 hutenganisha: urejeshaji wa jeni tofauti (DE), mwelekeo wa mabadiliko, usambazaji wa hali za seli, na mabadiliko ya pamoja kati ya jeni. Waambie vikundi viunganishe kila hitilafu ya kubuniwa na swali linaloathiriwa moja kwa moja zaidi: (a) jeni nyingi zinazobadilika hazikupatikana; (b) jeni husika zinabadilika kuelekea upande tofauti; (c) uwiano wa aina za seli uliotabiriwa si sahihi; (d) wastani wa kila jeni unaonekana wa kawaida lakini uhusiano kati ya jeni unapotea.

### Majibu

(a) urejeshaji wa jeni DE; (b) mwelekeo wa mabadiliko; (c) usambazaji wa hali za seli; (d) mabadiliko ya pamoja kati ya jeni. Hitilafu moja inaweza kuathiri metric zaidi ya moja, na mifano hii haionyeshi alama maalum kwa uhakika. Matokeo mazuri kwenye metric moja hayathibitishi kuwa nyingine ni nzuri.

## Karatasi ya mshiriki

1. Kutoka ukurasa rasmi wa sasa wa task, orodhesha hatua za training zinazoonekana, validation target, hidden test target, na kiasi kinachotabiriwa.
2. Katika Zoezi la 1, ni ushahidi gani ungehitajika kudai kuwa seli mbili za hatua tofauti ni seli moja? Je, ushahidi huo upo?
3. Onyesha hesabu za Zoezi la 2. Eleza jinsi wastani wa pamoja ulivyobadilika ilhali wastani ndani ya aina zote mbili ulibaki vilevile.
4. Linganisha kila hitilafu ya Zoezi la 3 na swali rasmi la metric linalolingana moja kwa moja zaidi.
5. Andika dai moja linaloungwa mkono na mifano ya kubuniwa na dai moja la kibaolojia ambalo haliwezi kuungwa mkono nayo.

## Hitimisho la mwezeshaji

Usitafsiri thamani zilizobuniwa kama biolojia halisi au matokeo ya modeli. Wahimize washiriki kuweka tofauti kati ya muundo wa hali za seli, usemi ndani ya hali, split, na ushahidi wa scorer katika uchanganuzi wao. Hii ni nyenzo huru ya elimu, si mwongozo rasmi wa scoring au mapishi ya modeli.
