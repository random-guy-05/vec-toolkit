# Yakın özdeğerler PCA eksenlerini kararsızlaştırır

**Türkçe · Reliability Lab 09 · Çözümlü güvenilirlik deneyi**

Bu çalışma, tek hücreli ve uzamsal tahminlerdeki bir modelleme veya değerlendirme sorununu sentetik verilerle açıklar. Yarışma verilerini okumaz, resmî puan hesaplamaz ve gizli örnek sonuçlarını tahmin etmez.

Tekrarlı özdeğerlerde tekil eksenler benzersiz değildir. Çok küçük kovaryans değişimi, altuzay neredeyse aynı kalırken ekseni büyük açıyla döndürebilir.

## Örneği çalıştırın

Yeni bir ortam oluşturun, depoyu klonlayın ve belirtilen bağımlılığı kurun. Komutu depo kökünde çalıştırın. Önce kodu değiştirmeden çıktıyı okuyun. Komutlar ve JSON anahtarları bütün dil sürümlerinde ortak kod tanımlayıcılarıdır.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 09 --seed 7
```

## Soru

Yaklaşık 45 derecelik dönüş nasıl oluşur?

## Başvuru çıktısı: tohum 7

```json
{
  "covariance_perturbation": 1.4142135623730952e-08,
  "principal_axis_angle_degrees": 45.00000000000001,
  "eigenvalues": [
    0.1,
    1.0,
    1.0
  ]
}
```

## Yorum

En büyük iki özdeğer eşittir. Küçük değişiklik aynı düzlemde başka bir geçerli taban seçer.

## Başka bir durum deneyin

Bir büyük özdeğeri 1.2 yapıp açıyı karşılaştırın.

## Sınırlar

Örnek tek bir sayısal mekanizmayı yalıtır. Gerçek verilerdeki önemini veya nedensel açıklamasını kanıtlamaz; resmî değerlendiricinin yerini almaz. Varsayımları, veri kaynağını ve özgün verileri koruyun.

Makine yardımıyla uyarlanmıştır; anadili Türkçe olan bir kişinin onaylanmış incelemesi yoktur. Düzeltmeler memnuniyetle karşılanır. Olgusal kaynak İngilizcedir; kod ve matematiksel değerler değiştirilmez.

[Source code](../../tools/experiments.py) · [Canonical English](../en/09-pca-eigenvalue-gap.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
