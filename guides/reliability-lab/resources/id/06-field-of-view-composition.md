# Proporsi lebih besar bukan bukti pertumbuhan populasi

**Bahasa Indonesia · Reliability Lab 06 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Proporsi pengamatan bergantung pada bidang pandang. Menghilangkan sel satu tipe menaikkan fraksi tipe lain meski jumlah tipe kedua tetap.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 06 --seed 7
```

## Pertanyaan

Apakah populasi kedua tumbuh?

## Keluaran acuan: seed 7

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

## Penafsiran

Tidak, tetap 100 sel. Populasi pertama turun dari 900 ke 90 pengamatan, sehingga fraksi kedua naik.

## Coba kasus lain

Tetapkan total dan pindahkan sel antartipe.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/06-field-of-view-composition.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
