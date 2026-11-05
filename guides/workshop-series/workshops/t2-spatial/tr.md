# Task 2 Atölyesi: Uzay ve zaman boyunca akıl yürütme

**75 dakika · 4–20 katılımcı · kod veya Challenge verisi gerekmez**

Kolaylaştırıcı için hazırlanan bu oturum, tek hücre kavramlarını bilen ancak 3B uzamsal-zamansal tahmin konusunda yeni olan katılımcılara yöneliktir. Kurgusal bir model karşılaştırması kullanır. Amaç, doğrulanmamış bir modelleme tarifi öğretmek değil, görev tanımı ve kanıtlar üzerine akıl yürütmektir.

## Hazırlık

Resmî [görev açıklamalarını](https://virtualembryo.ai/challenge/tasks), [veri şemasını](https://virtualembryo.ai/challenge/data) ve [değerlendirme sayfasını](https://virtualembryo.ai/challenge/evaluation) açın. Bu kılavuzu yazdırın veya paylaşın. Katılımcılardan gizli hedefleri kullanmamalarını ve özel model sonuçlarını paylaşmamalarını isteyin. Oturumdan önce resmî sayfaları yeniden kontrol edin; güncel ve yetkili bilgiler oradadır.

## Oturum akışı

| Dakika | Etkinlik | Kolaylaştırıcı sorusu |
|---:|---|---|
| 0–8 | Tahmin sorusunu tanımlayın | “Bir tahmin tam olarak neleri içermeli?” |
| 8–20 | Veri bölünmesini haritalayın | “Bu interpolasyon mu, ekstrapolasyon mu? Hangi evreler gerçekten görünür?” |
| 20–38 | Senaryoyu inceleyin | Aşağıdaki Alıştırma 1'i kullanın. |
| 38–52 | Skoru yorumlayın | Aşağıdaki Alıştırma 2'yi kullanın. |
| 52–65 | Koordinatları denetleyin | Aşağıdaki Alıştırma 3'ü kullanın. |
| 65–72 | İddianın sınırını yazın | Her ikili, desteklenen bir iddia ve desteklenmeyen bir iddia yazar. |
| 72–75 | Kapatın | Güncel resmî sayfalara yönlendirin ve açık soruları alın. |

## Alıştırma 1 — Tek görev, farklı ayarlar

Kurgusal “Small Atlas” ekibi, tüm Task 2 panolarının en son eğitim evresinin ötesini tahmin etmeyi istediğini varsayıyor. İkililerden resmî bölünme tablosuna bakıp bu varsayımı düzeltmelerini isteyin. Tüm embriyoyu kapsayan ayardaki testin interpolasyon olduğunu belirlemeli; ardından bunu kalp ayarındaki interpolasyon ve ekstrapolasyon sorularıyla karşılaştırmalılar. Ortak ve farklı yönleri sorun: her iki ayarda da gen ifadesi ve 3B koordinatlar tahmin edilir, ancak ayar ve evre bölünmesi önemlidir.

### Yanıt anahtarı

Task 2'nin iki ayarı vardır. Tüm embriyo testi interpolasyondur: ayrılan evre, yayımlanmış evrelerin arasındadır. Kalp ayarında, ayrılan doğrulama sorularından biri interpolasyondur; daha sonraki evreler ise yayımlanmış eğitim aralığının ötesine ekstrapolasyonu sınar. Tam evre adlarını ve pano kimliklerini belleğe güvenmek yerine güncel resmî sayfalardan doğrulayın.

## Alıştırma 2 — Eşit ağırlıklı dört soru

Kurgusal Model A, gen ifadesindeki değişiklikleri kabaca doğru tahmin ediyor ama tekdüze bir hücre bulutu öngörüyor. Model B'nin biçimi ve yerel komşulukları makul, ancak gen ifadesindeki değişiklikler zayıf. İkisi de resmî olarak puanlanmadı. İkililere sorun: moleküler, hücresel, doku ve yerel düzen performansını hangi kanıtlar birbirinden ayırır? Yerel bir sözde-bölünme neyi ortaya koyabilir; gizli pano hakkında neyi ortaya koyamaz?

### Yanıt anahtarı

Resmî Task 2 puanı dört boyutun her birine dörtte bir ağırlık verir: gen ifadesi değişimi, hücre durumu dağılımı, doku biçimi/büyüme ölçeği ve yerel uzamsal düzen. Bir boyuttaki güçlü sonuç, diğerlerinde de güçlü performans olduğunu kanıtlamaz. Yerel bir karşılaştırma yalnızca seçilen verileri, bölünmeyi ve puanlayıcıyı tanımlar; gizli test sonucu değildir.

## Alıştırma 3 — Koordinat çerçevesini denetleme

İki kurgusal evrenin her biri için bir 3B nokta bulutu var. Bir takım arkadaşı, evreler arasında aynı sayısal `(x,y,z)` değerlerine sahip hücreleri eşleştirip bunların aynı hücreler olduğunu söylüyor. Sorun: Bu kimlik iddiasını hangi kanıtlar haklı çıkarır?

### Yanıt anahtarı

Koordinat değerleri tek başına böyle bir kanıt sağlamaz. Resmî veri sayfasına göre koordinatlar her embriyo için yerel bir çerçeve kullanır ve zaman noktaları arasında hizalanmamıştır. Eşleşen sayılardan evreler arası hücre eşleşmesi veya ortak koordinat çerçevesi çıkarmayın. Bir analize koordinat hizalama varsayımı eklemeden önce resmî şemayı okuyun.

## Katılımcı çalışma kâğıdı

1. Seçtiğiniz pano için görünür eğitim evrelerini, ayrılan soruyu ve tahmin edilecek kanalları listeleyin. Güncel resmî sayfayı kaynak gösterin.
2. Bildirilen bir skor için bölünmeyi, puanlayıcı sürümünü ve Task 2'nin dört boyutundan hangisini ölçtüğünü kaydedin.
3. Farklı evrelerdeki iki koordinatın aynı biyolojik konumu veya hücreyi tanımladığını iddia etmeden önce hangi ek kanıt gerekir?
4. Kanıtınızın desteklediği dar kapsamlı bir iddia ve desteklemediği daha geniş bir iddia yazın.

## Kolaylaştırıcı kapanışı

Kurgusal karşılaştırmayı bir sonuç gibi sunmayın ve kazanan bir model önermeyin. Katılımcıları pano koşullarını doğrulamaya, topluluk araçlarının sınırlarını incelemeye ve kendi bölünme ile varsayımlarını belgelemeye teşvik edin. Bu bağımsız eğitim materyali resmî bir puanlama kılavuzu değildir.
