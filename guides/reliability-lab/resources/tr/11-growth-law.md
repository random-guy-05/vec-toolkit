# İki büyüme varsayımı iki orta nokta verir

**Türkçe · Reliability Lab 11 · Çözümlü güvenilirlik deneyi**

Bu çalışma, tek hücreli ve uzamsal tahminlerdeki bir modelleme veya değerlendirme sorununu sentetik verilerle açıklar. Yarışma verilerini okumaz, resmî puan hesaplamaz ve gizli örnek sonuçlarını tahmin etmez.

Yarıçapı ve log yarıçapı doğrusal aradeğerlemek aynı uçları, farklı ara büyüklüklerle birleştirir. İki uç gözlem büyüme yasasını belirlemez.

## Örneği çalıştırın

Yeni bir ortam oluşturun, depoyu klonlayın ve belirtilen bağımlılığı kurun. Komutu depo kökünde çalıştırın. Önce kodu değiştirmeden çıktıyı okuyun. Komutlar ve JSON anahtarları bütün dil sürümlerinde ortak kod tanımlayıcılarıdır.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 11 --seed 7
```

## Soru

100 ile 400 arasındaki orta nokta nedir?

## Başvuru çıktısı: tohum 7

```json
{
  "early_radius": 100.0,
  "late_radius": 400.0,
  "linear_midpoint": 250.0,
  "constant_log_growth_midpoint": 200.0
}
```

## Yorum

Doğrusal yarıçap 250 verir. Sabit log büyümesi geometrik ortalama 200 verir. İkisi de varsayımlarına bağlıdır.

## Başka bir durum deneyin

İki eğriyi 0.25 ve 0.75 oranlarında hesaplayın.

## Sınırlar

Örnek tek bir sayısal mekanizmayı yalıtır. Gerçek verilerdeki önemini veya nedensel açıklamasını kanıtlamaz; resmî değerlendiricinin yerini almaz. Varsayımları, veri kaynağını ve özgün verileri koruyun.

Makine yardımıyla uyarlanmıştır; anadili Türkçe olan bir kişinin onaylanmış incelemesi yoktur. Düzeltmeler memnuniyetle karşılanır. Olgusal kaynak İngilizcedir; kod ve matematiksel değerler değiştirilmez.

[Source code](../../tools/experiments.py) · [Canonical English](../en/11-growth-law.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
