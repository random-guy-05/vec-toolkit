# Yansız MMD tahmini negatif olabilir

**Türkçe · Reliability Lab 07 · Çözümlü güvenilirlik deneyi**

Bu çalışma, tek hücreli ve uzamsal tahminlerdeki bir modelleme veya değerlendirme sorununu sentetik verilerle açıklar. Yarışma verilerini okumaz, resmî puan hesaplamaz ve gizli örnek sonuçlarını tahmin etmez.

Anakütledeki karesel çekirdek uzaklığı negatif değildir. Yansız tahminci köşegen terimleri çıkarır ve küçük örneklemde negatif olabilir; yanlı tahminci bu terimleri tutar.

## Örneği çalıştırın

Yeni bir ortam oluşturun, depoyu klonlayın ve belirtilen bağımlılığı kurun. Komutu depo kökünde çalıştırın. Önce kodu değiştirmeden çıktıyı okuyun. Komutlar ve JSON anahtarları bütün dil sürümlerinde ortak kod tanımlayıcılarıdır.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 07 --seed 7
```

## Soru

Tahmincilerin işaretleri neden farklıdır?

## Başvuru çıktısı: tohum 7

```json
{
  "unbiased_mmd_squared": -0.8617044036602768,
  "biased_mmd_squared": 0.0029603131031104013,
  "population_distance_nonnegative": true
}
```

## Yorum

Köşegen düzeltmesi sonlu örneklem değerini değiştirir. Negatif tahmin, negatif anakütle uzaklığı demek değildir.

## Başka bir durum deneyin

Çekirdeği değiştirmeden ikinci örneklemi uzaklaştırın.

## Sınırlar

Örnek tek bir sayısal mekanizmayı yalıtır. Gerçek verilerdeki önemini veya nedensel açıklamasını kanıtlamaz; resmî değerlendiricinin yerini almaz. Varsayımları, veri kaynağını ve özgün verileri koruyun.

Makine yardımıyla uyarlanmıştır; anadili Türkçe olan bir kişinin onaylanmış incelemesi yoktur. Düzeltmeler memnuniyetle karşılanır. Olgusal kaynak İngilizcedir; kod ve matematiksel değerler değiştirilmez.

[Source code](../../tools/experiments.py) · [Canonical English](../en/07-negative-unbiased-mmd.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
