# Setiap tipe dapat naik sementara rerata gabungan turun

**Bahasa Indonesia · Reliability Lab 17 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Rerata gabungan bergantung pada ekspresi per tipe dan komposisi. Pergeseran ke tipe berekspresi rendah dapat membalik arah keseluruhan.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 17 --seed 7
```

## Pertanyaan

Mengapa rerata turun saat kedua tipe naik?

## Keluaran acuan: seed 7

```json
{
  "type_means_before": [
    1.0,
    8.0
  ],
  "type_means_after": [
    2.0,
    9.0
  ],
  "aggregate_before": 7.3,
  "aggregate_after": 2.7
}
```

## Penafsiran

Campuran bergeser ke sel berekspresi rendah. Efek komposisi melampaui kenaikan di dalam tipe.

## Coba kasus lain

Jaga proporsi tetap lalu ulangi perhitungan.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/17-composition-simpson.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
