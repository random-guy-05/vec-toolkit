# Validasi lokal dapat membalik peringkat resmi

**Bahasa Indonesia · Reliability Lab 14 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Pengganti lokal membantu pemilihan model jika urutannya berpindah ke evaluasi tujuan. Skor lokal tinggi tidak membuktikannya; nilai seri perlu peringkat seri.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 14 --seed 7
```

## Pertanyaan

Apa arti Spearman -1?

## Keluaran acuan: seed 7

```json
{
  "local_scores": [
    1.0,
    2.0,
    2.0,
    4.0
  ],
  "official_scores": [
    4.0,
    2.0,
    2.0,
    1.0
  ],
  "tie_aware_spearman": -1.0,
  "constant_series_correlation": null
}
```

## Penafsiran

Urutan berlawanan tepat, termasuk seri di tengah. Korelasi deret konstan tidak terdefinisi dan ditulis null.

## Coba kasus lain

Pecahkan satu seri dengan mengubah skor lalu hitung peringkat ulang.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/14-proxy-rank-reversal.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
