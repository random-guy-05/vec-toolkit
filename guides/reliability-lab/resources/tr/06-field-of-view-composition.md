# Daha büyük oran nüfus büyümesini kanıtlamaz

**Türkçe · Reliability Lab 06 · Çözümlü güvenilirlik deneyi**

Bu çalışma, tek hücreli ve uzamsal tahminlerdeki bir modelleme veya değerlendirme sorununu sentetik verilerle açıklar. Yarışma verilerini okumaz, resmî puan hesaplamaz ve gizli örnek sonuçlarını tahmin etmez.

Gözlenen oranlar görüş alanına bağlıdır. Bir türden hücre çıkarmak diğer türün sayısı değişmeden oranını artırabilir.

## Örneği çalıştırın

Yeni bir ortam oluşturun, depoyu klonlayın ve belirtilen bağımlılığı kurun. Komutu depo kökünde çalıştırın. Önce kodu değiştirmeden çıktıyı okuyun. Komutlar ve JSON anahtarları bütün dil sürümlerinde ortak kod tanımlayıcılarıdır.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 06 --seed 7
```

## Soru

İkinci nüfus büyüdü mü?

## Başvuru çıktısı: tohum 7

```json
{
  "early_counts": [
    900,
    100
  ],
  "late_counts": [
    90,
    100
  ],
  "early_fraction": [
    0.9,
    0.1
  ],
  "late_fraction": [
    0.47368421052631576,
    0.5263157894736842
  ],
  "unchanged_heart_count": true,
  "warning": "A changed observed fraction need not mean more heart cells."
}
```

## Yorum

Hayır; 100 hücre olarak kalır. Birinci nüfus 900'den 90 gözleme düştüğü için ikincinin oranı artar.

## Başka bir durum deneyin

Toplamı sabit tutup türler arasında hücre aktarın.

## Sınırlar

Örnek tek bir sayısal mekanizmayı yalıtır. Gerçek verilerdeki önemini veya nedensel açıklamasını kanıtlamaz; resmî değerlendiricinin yerini almaz. Varsayımları, veri kaynağını ve özgün verileri koruyun.

Makine yardımıyla uyarlanmıştır; anadili Türkçe olan bir kişinin onaylanmış incelemesi yoktur. Düzeltmeler memnuniyetle karşılanır. Olgusal kaynak İngilizcedir; kod ve matematiksel değerler değiştirilmez.

[Source code](../../tools/experiments.py) · [Canonical English](../en/06-field-of-view-composition.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
