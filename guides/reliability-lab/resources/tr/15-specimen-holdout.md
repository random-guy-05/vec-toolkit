# Hücre bölmesi bütün biyolojik örnekleri paylaşabilir

**Türkçe · Reliability Lab 15 · Çözümlü güvenilirlik deneyi**

Bu çalışma, tek hücreli ve uzamsal tahminlerdeki bir modelleme veya değerlendirme sorununu sentetik verilerle açıklar. Yarışma verilerini okumaz, resmî puan hesaplamaz ve gizli örnek sonuçlarını tahmin etmez.

Rastgele hücre bölmesi aynı embriyodan hücreleri eğitim ve teste dağıtabilir. Satırlar farklı olsa da örneğe özgü etkiler paylaşılır.

## Örneği çalıştırın

Yeni bir ortam oluşturun, depoyu klonlayın ve belirtilen bağımlılığı kurun. Komutu depo kökünde çalıştırın. Önce kodu değiştirmeden çıktıyı okuyun. Komutlar ve JSON anahtarları bütün dil sürümlerinde ortak kod tanımlayıcılarıdır.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 15 --seed 7
```

## Soru

Kaç örnek kimliği iki tarafta da bulunur?

## Başvuru çıktısı: tohum 7

```json
{
  "cell_split_shared_specimens": 6,
  "specimen_split_shared_specimens": 0,
  "total_specimens": 6
}
```

## Yorum

Hücre bölmesinde örnekler ortaktır. Açık grup bölmesinde ortak örnek yoktur. Çok hücre, çok bağımsız embriyo değildir.

## Başka bir durum deneyin

Aynı embriyoya iki farklı ad verip kaçan bağımlılığı açıklayın.

## Sınırlar

Örnek tek bir sayısal mekanizmayı yalıtır. Gerçek verilerdeki önemini veya nedensel açıklamasını kanıtlamaz; resmî değerlendiricinin yerini almaz. Varsayımları, veri kaynağını ve özgün verileri koruyun.

Makine yardımıyla uyarlanmıştır; anadili Türkçe olan bir kişinin onaylanmış incelemesi yoktur. Düzeltmeler memnuniyetle karşılanır. Olgusal kaynak İngilizcedir; kod ve matematiksel değerler değiştirilmez.

[Source code](../../tools/experiments.py) · [Canonical English](../en/15-specimen-holdout.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
