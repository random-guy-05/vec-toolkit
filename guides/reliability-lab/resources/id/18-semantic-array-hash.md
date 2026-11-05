# Kesamaan semantik berbeda dari tata letak memori

**Bahasa Indonesia · Reliability Lab 18 · Latihan keandalan dengan pembahasan**

Latihan ini memakai data sintetis untuk menjelaskan masalah pemodelan atau evaluasi prediksi sel tunggal dan spasial. Tidak membaca data kompetisi, menghitung skor resmi, atau memprediksi hasil sampel tersembunyi.

Matriks bernilai sama dapat memiliki susunan memori berbeda. Tipe tetap dan urutan kontigu baku menghasilkan ringkasan yang tidak bergantung pada susunan itu.

## Jalankan contoh

Buat lingkungan baru, klon repositori, dan pasang dependensi yang disebutkan. Jalankan perintah dari direktori utama repositori. Baca keluaran sebelum mengubah kode. Perintah dan kunci JSON adalah pengenal kode yang sama pada semua edisi.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 18 --seed 7
```

## Pertanyaan

Mengapa hash kanonis sama?

## Keluaran acuan: seed 7

```json
{
  "c_layout": true,
  "f_layout": true,
  "semantic_digest_equal": true,
  "warning": "A real semantic hash must also include shape, gene order, cell order and coordinates."
}
```

## Penafsiran

Keduanya diubah menjadi tipe dan urutan sama. Hash lengkap juga memerlukan bentuk, urutan gen, urutan sel, dan koordinat.

## Coba kasus lain

Tukar kolom gen dan tentukan metadata yang perlu disertakan.

## Batasan

Contoh ini mengisolasi mekanisme numerik. Tidak membuktikan pentingnya mekanisme pada data nyata, tidak menetapkan sebab, dan tidak menggantikan evaluator resmi. Simpan asumsi, asal data, dan data asli.

Edisi adaptasi berbantuan mesin, tanpa peninjauan penutur asli yang tersertifikasi. Koreksi dipersilakan. Bahasa Inggris menjadi acuan fakta; kode dan nilai matematis tidak diubah.

[Source code](../../tools/experiments.py) · [Canonical English](../en/18-semantic-array-hash.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
