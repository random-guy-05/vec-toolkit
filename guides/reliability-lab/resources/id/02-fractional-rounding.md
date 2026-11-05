# Pembulatan stokastik untuk hitungan pecahan

**Bahasa Indonesia · Reliability Lab 02 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Pembulatan ke bawah menurunkan rerata secara sistematis. Penambahan undian Bernoulli untuk bagian pecahan menjaga nilai harapan, tetapi tiap hasil tetap acak.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 02 --seed 7
```

## Pertanyaan

Operasi mana mempertahankan nilai secara rata-rata?

## Keluaran acuan: seed 7

```json
{
  "target": [
    0.2,
    0.7,
    1.4,
    3.8
  ],
  "floor": [
    0.0,
    0.0,
    1.0,
    3.0
  ],
  "randomized_mean": [
    0.202,
    0.70021,
    1.39812,
    3.79941
  ],
  "max_error": 0.0020000000000000018
}
```

## Penafsiran

Pembulatan bawah memberi 0,0,1,3. Rerata banyak pembulatan acak mendekati 0.2,0.7,1.4,3.8.

## Coba kasus lain

Kurangi pengulangan dari 100000 menjadi 100 dan ganti seed.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/02-fractional-rounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
