# Mengaktifkan nol yang seri dengan dukungan spasial

**Bahasa Indonesia · Reliability Lab 04 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Transportasi kuantil perlu memilih nol mana yang aktif. Pemilihan acak dan dukungan tetangga menghasilkan pola spasial berbeda pada jumlah aktivasi sama.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 04 --seed 7
```

## Pertanyaan

Sel mana yang dipilih dukungan lokal?

## Keluaran acuan: seed 7

```json
{
  "zero_cells": [
    0,
    1,
    2,
    3
  ],
  "random_activation": [
    2,
    3
  ],
  "supported_activation": [
    1,
    0
  ],
  "support": [
    0.9,
    0.8,
    0.2,
    0.1,
    2.0
  ]
}
```

## Penafsiran

Nol dengan dukungan 0.9 dan 0.8. Undian acak dapat kebetulan sama; satu undian tidak membuktikan keunggulan umum.

## Coba kasus lain

Balik urutan dukungan tanpa mengubah jumlah aktivasi.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/04-zero-tie-activation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
