# Task 3 Atölyesi: Perturbasyon yanıtını tahmin etme

**75 dakika · 4–20 katılımcı · kod veya Challenge verisi gerekmez**

Bu oturum, koşullu knockout tahmin görevini anlamlandırmaya yardımcı olur. Temel öğrenme hedefi, perturbasyonun etkisini yabanıl tip (wild type) arka planından ayırmaktır. Oturum bir biyolojik mekanizma veya modelleme tarifi önermez.

## Hazırlık

Resmî [görev açıklamalarını](https://virtualembryo.ai/challenge/tasks), [veri şemasını](https://virtualembryo.ai/challenge/data) ve güncel [kuralları](https://virtualembryo.ai/challenge/rules) açın. Bu kılavuzu yazdırın veya paylaşın. Alıştırmalarda uydurma sayılar ve genel özellik adları kullanılır. Gizli hedef ölçümlerini kullanmayın. Resmî sayfalar önceliklidir ve değişebilir.

## Oturum akışı

| Dakika | Etkinlik | Kolaylaştırıcı sorusu |
|---:|---|---|
| 0–8 | Tahmini tanımlayın | “Challenge modele neyi değiştirmesini soruyor?” |
| 8–20 | Koşulları ve bölünmeyi eşleyin | “Hangi knockout eğitim, doğrulama veya gizli test için?” |
| 20–38 | Yabanıl tip ile karşılaştırın | Alıştırma 1'i kullanın. |
| 38–52 | Yanıt ölçütlerini okuyun | Alıştırma 2'yi kullanın. |
| 52–65 | Haricî bir kaynağı denetleyin | Alıştırma 3'ü kullanın. |
| 65–72 | Belirsizliği ifade edin | Yanıtla ilgili bir iddia ve bir sınırlama yazın. |
| 72–75 | Kapatın | Güncel resmî sayfaları ve çözümlenmemiş soruları gözden geçirin. |

## Alıştırma 1 — Arka plan ve yanıt

Aşağıdaki değerler tek bir genel özellik için uydurulmuş, normalize edilmiş öğretici değerlerdir. Gerçek VEC gözlemleri değildir.

| Koşul | Kurgusal değer |
|---|---:|
| eşleştirilmiş yabanıl tip | 10.0 |
| perturbasyon, Model A | 10.1 |
| perturbasyon, Model B | 7.0 |

İkililere hangi modelin yabanıl tip arka planını yeniden ürettiğini ve hangisinin daha büyük bir değişiklik tahmin ettiğini sorun. Ardından yalnızca mutlak ifade düzeylerini karşılaştırmanın, yabanıl tipi kopyalayan bir modeli neden avantajlı gösterebileceğini sorun.

### Yanıt anahtarı

Model A yabanıl tip değerine yakın kalır, dolayısıyla öngördüğü değişiklik sıfıra yakındır. Model B daha büyük bir düşüş öngörür. Bu öğretici örnek biyolojik açıdan doğru yönün hangisi olduğunu söylemez; bunu gözlenen perturbasyon yanıtı belirler. Challenge yanıtı yabanıl tipe göre değerlendirir; ortak bir arka planı yakalamak tek başına yeterli değildir.

## Alıştırma 2 — Yanıtla ilgili dört soru

Resmî Task 3 ölçütleri; yanıt genlerinin bulunmasını, yanıt yönünü, yanıt büyüklüğünü ve hücre durumu dağılımını kapsar. İkililerden kurgusal hataları bir ölçütle eşleştirmelerini isteyin: (a) doğru genler yanlış yönde değişir; (b) yön doğru ama etki çok küçüktür; (c) büyük değişiklikler yanlış genlerde olur; (d) popülasyon oranları çöker.

### Yanıt anahtarı

(a) yanıt yönü; (b) yanıt büyüklüğü; (c) yanıt genlerinin bulunması; (d) hücre durumu dağılımı. Ölçütler ayrı kanıtlar sunar. Bir ölçütteki iyi değer diğerlerinin de iyi olduğunu kanıtlamaz.

## Alıştırma 3 — Haricî veriyi denetleme

Bir meslektaş, ilişkili bir genin knockout'unu ve benzer bir evreyi içeren herkese açık bir veri kümesi öneriyor. Gruplardan kullanmadan önce yapılması gereken kontrolleri belirlemelerini isteyin: tam gen/allel ve genotip, evre, kaynak ve sürüm, lisans, görevle ilgisi, gizli tutulan koşullara ilişkin güncel kurallar ve açıklama gereklilikleri. Hangi çözümlenmemiş bilgi kullanımı durdurmalı?

### Yanıt anahtarı

Kaynak, perturbasyon ve evre güncel kurallara göre doğrulanana dek grup duraklamalıdır. İlişkili bir allel veya benzer bir fenotip, korunan ve gizli tutulan bir koşula girebilir; herkese açık bir URL, uygun kullanımı kanıtlamaz. Kurallardaki açık sınıra uyun ve eşleşme belirsizse organizatörlere önceden sorun.

## Katılımcı çalışma kâğıdı

1. Resmî görev sayfasından, şu anda yayımlanan Task 3 perturbasyon eğitim örneğini, doğrulama hedefini ve gizli test hedefini adlandırın.
2. Uydurma bir özellik için her modelde `perturbasyon − eşleştirilmiş yabanıl tip` değerini hesaplayın. Fark, mutlak değerlerin gizlediği neyi gösterdi?
3. Alıştırma 2'deki her hatayı etkilediği yanıt ölçütüyle eşleştirin.
4. Haricî bir perturbasyon veri kümesini uygun ve açıklanabilir saymadan önce gereken kanıtları listeleyin.
5. Öğretici örneğin desteklediği bir sonuç iddiası ve desteklemediği bir biyolojik iddia yazın.

## Kolaylaştırıcı kapanışı

Uydurma örnekten gerçek biyoloji sonucu çıkarmayın. Katılımcılardan her analizde perturbasyon karşıtlığını, eşleştirilmiş kontrolü, genotipi, evreyi ve kaynak kökenini açıkça belirtmelerini isteyin. Bu bağımsız eğitim materyali resmî değerlendirme yönergesi değildir.
