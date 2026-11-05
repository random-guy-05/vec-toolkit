# Kırpma biyolojik büyüme olmadan RMS yarıçapını değiştirir

**Türkçe · Reliability Lab 12 · Çözümlü güvenilirlik deneyi**

Bu çalışma, tek hücreli ve uzamsal tahminlerdeki bir modelleme veya değerlendirme sorununu sentetik verilerle açıklar. Yarışma verilerini okumaz, resmî puan hesaplamaz ve gizli örnek sonuçlarını tahmin etmez.

RMS yarıçapı gözlenen bulutu kendi merkezine göre özetler. Merkezi kırpma uzak noktaları çıkarır; kalan hücreler hareket etmese de yarıçap azalır.

## Örneği çalıştırın

Yeni bir ortam oluşturun, depoyu klonlayın ve belirtilen bağımlılığı kurun. Komutu depo kökünde çalıştırın. Önce kodu değiştirmeden çıktıyı okuyun. Komutlar ve JSON anahtarları bütün dil sürümlerinde ortak kod tanımlayıcılarıdır.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 12 --seed 7
```

## Soru

Kırpılmış bulutun yarıçapı neden küçük?

## Başvuru çıktısı: tohum 7

```json
{
  "full_rms": 1.7226292470793867,
  "cropped_rms": 1.0827934049272807,
  "retained_cells": 4852,
  "biological_growth": 0
}
```

## Yorum

1.5 uzaklığını aşan noktalar çıkarılmıştır. Gelişim simüle edilmez; fark yalnızca gözlem sürecindendir.

## Başka bir durum deneyin

Yalnızca bir tarafı kırpıp merkezi ve yarıçapı yeniden hesaplayın.

## Sınırlar

Örnek tek bir sayısal mekanizmayı yalıtır. Gerçek verilerdeki önemini veya nedensel açıklamasını kanıtlamaz; resmî değerlendiricinin yerini almaz. Varsayımları, veri kaynağını ve özgün verileri koruyun.

Makine yardımıyla uyarlanmıştır; anadili Türkçe olan bir kişinin onaylanmış incelemesi yoktur. Düzeltmeler memnuniyetle karşılanır. Olgusal kaynak İngilizcedir; kod ve matematiksel değerler değiştirilmez.

[Source code](../../tools/experiments.py) · [Canonical English](../en/12-crop-rms.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
