# Task 1 Atölyesi: Değişen bir hücre popülasyonunu tahmin etme

**75 dakika · 4–20 katılımcı · kod veya Challenge verisi gerekmez**

Kolaylaştırıcı için hazırlanan bu oturum, tek hücre kavramlarını bilen ancak zamansal gen ifadesi tahmininde yeni olan katılımcılara yöneliktir. Hücre durumu bileşimindeki değişiklikleri bir hücre durumu içindeki değişikliklerden ayırmak için uydurma hücre sayıları ve özellik değerleri kullanır. Amaç tahmin hedefi ve kanıtlar üzerine akıl yürütmektir; bir model önermek değildir.

## Hazırlık

Resmî [görev açıklamalarını](https://virtualembryo.ai/challenge/tasks), [veri şemasını](https://virtualembryo.ai/challenge/data) ve [değerlendirme sayfasını](https://virtualembryo.ai/challenge/evaluation) açın. Bu kılavuzu yazdırın veya paylaşın. Aşağıdaki sayılar uydurmadır ve VEC gözlemlerini temsil etmez. Gizli hedef ölçümlerini kullanmayın. Güncel resmî sayfalar önceliklidir ve değişebilir.

## Oturum akışı

| Dakika | Etkinlik | Kolaylaştırıcı sorusu |
|---:|---|---|
| 0–8 | Tahmini tanımlayın | “Tek tek hücreleri mi, yoksa gelecekteki bir popülasyonu mu tahmin ediyoruz?” |
| 8–20 | Güncel bölünmeyi okuyun | “Bugün hangi evreler eğitim, doğrulama ve gizli test için kullanılıyor?” |
| 20–38 | Kimliği dağılımdan ayırın | Alıştırma 1'i kullanın. |
| 38–52 | Bir psödobulk kaymasını çözümleyin | Alıştırma 2'yi kullanın. |
| 52–65 | Ölçüt sorularını teşhis edin | Alıştırma 3'ü kullanın. |
| 65–72 | İddianın sınırını belirleyin | Her ikili, desteklenen bir iddia ve desteklenmeyen bir iddia yazar. |
| 72–75 | Kapatın | Resmî görev sayfasına ve çözümlenmemiş sorulara dönün. |

## Alıştırma 1 — Hücre takibi değil, yeni bir popülasyon

Aşağıdaki sayılar uydurmadır. Yayımlanmış bir eğitim örneğinde A tipinden 70 ve B tipinden 30 hücre olduğunu varsayın. Daha sonraki kurgusal hedefte A tipinden 40, B tipinden 30 ve ilk kez görülen C tipinden 30 hücre olsun. İkililere sorun: hedefteki hangi hücreler eğitimdeki “aynı” hücrelerdir? Örnek, hücre kimliklerini izlemek yerine popülasyonu tahmin etme hakkında ne gösteriyor?

### Yanıt anahtarı

Öğretici tabloda evreler arasında hücre kimliğine dair kanıt yoktur; bu nedenle katılımcılar tek tek hücreleri eşleştiremez. Hedef dağılım, kurgusal eğitim örneğinde bulunmayan bir türü ve mevcut türlerin farklı oranlarını içerir. Zamansal popülasyon tahmini, hangi durumların ortaya çıktığını ve ne kadar yaygın olduklarını hesaba katmalıdır; gözlenen her hücreyi zaman içinde ileri taşımak değildir. Gerçek bölünmeyi ve hedef tanımını güncel resmî sayfadan doğrulayın.

## Alıştırma 2 — Bileşim, toplu bir değeri değiştirebilir

Popülasyon karışımı değişirken, her hücre türü içindeki bu kurgusal özellik ortalamaları sabit kalıyor:

| Evre | A türü oranı | A türü ortalaması | B türü oranı | B türü ortalaması | Havuzlanmış ortalama |
|---|---:|---:|---:|---:|---:|
| önceki | 80% | 2 | 20% | 12 | 4 |
| sonraki | 20% | 2 | 80% | 12 | 10 |

İkililerden her evre için havuzlanmış ortalamayı hesaplamalarını isteyin. Ne değişti: tür içi ortalamalar mı, popülasyon karışımı mı? Yalnızca havuzlanmış sayı bize neyi söyleyemez?

### Yanıt anahtarı

Önceki havuzlanmış ortalama `0.8 × 2 + 0.2 × 12 = 4`; sonraki ortalama `0.2 × 2 + 0.8 × 12 = 10` olur. Tür içi ortalamalar değişmedi; karışım değişti. Toplu değerlerdeki kayma tek başına, hücre durumu içindeki bir yanıtla hücre durumu oranlarındaki değişimi ayıramaz. Bu bir öğretici örnektir; gerçek bir gen veya evre hakkında iddia değildir.

## Alıştırma 3 — Birbirinden farklı dört puanlama sorusu

Resmî Task 1 değerlendirmesi; farklı ifade edilen genlerin (DE) bulunmasını, değişim yönünü, hücre durumu dağılımını ve gen-gen eşdeğişimini birbirinden ayırır. Gruplardan her kurgusal hatayı en doğrudan etkilediği soruyla eşleştirmelerini isteyin: (a) değişen genlerin çoğu bulunamaz; (b) ilgili genler ters yönde değişir; (c) tahmin edilen hücre türü oranları yanlıştır; (d) gen bazındaki ortalamalar makul görünür ama genler arası ilişkiler kaybolur.

### Yanıt anahtarı

(a) DE genlerinin bulunması; (b) değişim yönü; (c) hücre durumu dağılımı; (d) gen-gen eşdeğişimi. Bir hata birden fazla ölçütü etkileyebilir; bu örnekler skorun kesin imzaları değildir. Bir ölçütteki iyi sonuç diğerlerinin de iyi olduğunu kanıtlamaz.

## Katılımcı çalışma kâğıdı

1. Güncel resmî görev sayfasından görünür eğitim evrelerini, doğrulama hedefini, gizli test hedefini ve tahmin edilecek niceliği listeleyin.
2. Alıştırma 1'de, farklı evrelerdeki iki hücrenin aynı hücre olduğunu iddia etmek için hangi kanıt gerekir? Bu kanıt mevcut mu?
3. Alıştırma 2'deki hesabı gösterin. Her iki tür içi ortalama sabit kalırken havuzlanmış ortalamanın nasıl değiştiğini açıklayın.
4. Alıştırma 3'teki her hatayı en doğrudan ilgili resmî ölçüt sorusuyla eşleştirin.
5. Kurgusal örneklerin desteklediği bir iddia ve destekleyemediği bir biyolojik iddia yazın.

## Kolaylaştırıcı kapanışı

Uydurma değerleri gerçek biyoloji veya model sonucu olarak yorumlamayın. Katılımcıları analizlerinde hücre durumu bileşimini, durum içi ifadeyi, veri bölünmesini ve puanlayıcı kanıtını ayrı tutmaya teşvik edin. Bu bağımsız eğitim materyali resmî bir puanlama kılavuzu veya modelleme tarifi değildir.
