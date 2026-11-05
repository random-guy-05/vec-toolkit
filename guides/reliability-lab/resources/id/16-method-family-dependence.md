# Banyak varian bukan banyak keluarga metode

**Bahasa Indonesia · Reliability Lab 16 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Korelasi gabungan kuat bisa berasal dari perbedaan beberapa keluarga saja. Itu tidak menjamin pemeringkatan varian berdekatan di dalam satu keluarga.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 16 --seed 7
```

## Pertanyaan

Apakah korelasi gabungan dan dalam keluarga sama?

## Keluaran acuan: seed 7

```json
{
  "pooled_spearman": 0.9352941176470588,
  "within_family_spearman": [
    0.39999999999999997,
    0.39999999999999997,
    -0.7999999999999999,
    -0.39999999999999997
  ],
  "independent_families": 4,
  "variants": 16,
  "lesson": "Many variants do not create many independent method families."
}
```

## Penafsiran

Sinyal keluarga dibuat kuat dan derau internal kecil. Korelasi internal berubah dengan seed; perubahan itu perlu ditampilkan.

## Coba kasus lain

Tambahkan varian tanpa menambah keluarga.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/16-method-family-dependence.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
