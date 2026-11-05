# Ölçülmeyen gen ölçülmüş sıfır değildir

**Türkçe · Reliability Lab 19 · Çözümlü güvenilirlik deneyi**

Bu çalışma, tek hücreli ve uzamsal tahminlerdeki bir modelleme veya değerlendirme sorununu sentetik verilerle açıklar. Yarışma verilerini okumaz, resmî puan hesaplamaz ve gizli örnek sonuçlarını tahmin etmez.

Eksik geni sıfırla doldurmak ölçüm yapılıp yapılmadığını saklar. Ölçüm maskesi bu ayrımı atamadan önce korur.

## Örneği çalıştırın

Yeni bir ortam oluşturun, depoyu klonlayın ve belirtilen bağımlılığı kurun. Komutu depo kökünde çalıştırın. Önce kodu değiştirmeden çıktıyı okuyun. Komutlar ve JSON anahtarları bütün dil sürümlerinde ortak kod tanımlayıcılarıdır.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 19 --seed 7
```

## Soru

Sessiz sıfır doldurma hangi bilgiyi kaybettirir?

## Başvuru çıktısı: tohum 7

```json
{
  "measured_zero": {
    "gene": "G",
    "measured": true,
    "value": 0
  },
  "absent_panel_gene": {
    "gene": "G",
    "measured": false,
    "value": null
  },
  "zero_fill_cannot_preserve_measurement_status": true
}
```

## Yorum

Ölçüm durumunu. Örnek measured alanını tutar ve ölçülmeyen değere null verir.

## Başka bir durum deneyin

İşleme hatasından eksik kalan bir değer ekleyip üç durumu ayırın.

## Sınırlar

Örnek tek bir sayısal mekanizmayı yalıtır. Gerçek verilerdeki önemini veya nedensel açıklamasını kanıtlamaz; resmî değerlendiricinin yerini almaz. Varsayımları, veri kaynağını ve özgün verileri koruyun.

Makine yardımıyla uyarlanmıştır; anadili Türkçe olan bir kişinin onaylanmış incelemesi yoktur. Düzeltmeler memnuniyetle karşılanır. Olgusal kaynak İngilizcedir; kod ve matematiksel değerler değiştirilmez.

[Source code](../../tools/experiments.py) · [Canonical English](../en/19-unmeasured-is-not-zero.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
