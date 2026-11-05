# Pemotongan mengubah radius RMS tanpa pertumbuhan biologis

**Bahasa Indonesia · Reliability Lab 12 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Radius RMS merangkum awan teramati terhadap pusatnya. Pemotongan pusat membuang titik jauh tanpa memindahkan sel yang tersisa.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 12 --seed 7
```

## Pertanyaan

Mengapa radius awan terpotong lebih kecil?

## Keluaran acuan: seed 7

```json
{
  "full_rms": 1.7226292470793867,
  "cropped_rms": 1.0827934049272807,
  "retained_cells": 4852,
  "biological_growth": 0
}
```

## Penafsiran

Titik berjarak lebih dari 1.5 dihapus. Tidak ada perkembangan disimulasikan; selisih murni akibat pengamatan.

## Coba kasus lain

Potong satu sisi saja dan hitung ulang pusat serta radius.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/12-crop-rms.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
