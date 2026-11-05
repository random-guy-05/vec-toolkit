# Lokakarya Task 1: Memprediksi Populasi Sel yang Berubah

**75 menit · 4–20 peserta · tanpa kode atau data Challenge**

Sesi siap-fasilitator ini ditujukan bagi peserta yang memahami konsep dasar sel tunggal dan baru mengenal prediksi ekspresi gen lintas waktu. Sesi memakai jumlah sel dan nilai fitur fiktif untuk membedakan perubahan komposisi keadaan sel dari perubahan ekspresi di dalam suatu keadaan sel. Tujuannya adalah menalar sasaran prediksi dan bukti, bukan meresepkan model.

## Persiapan

Buka halaman resmi [deskripsi task](https://virtualembryo.ai/challenge/tasks), [skema data](https://virtualembryo.ai/challenge/data), dan [evaluasi](https://virtualembryo.ai/challenge/evaluation). Siapkan kertas atau bagikan panduan ini. Semua angka di bawah dibuat-buat dan bukan pengamatan VEC. Jangan gunakan pengukuran target tersembunyi. Halaman resmi menjadi acuan utama dan dapat berubah.

## Susunan sesi

| Menit | Kegiatan | Pertanyaan fasilitator |
|---:|---|---|
| 0–8 | Definisikan prediksi | “Apakah kita memprediksi sel satu per satu, atau populasi di masa depan?” |
| 8–20 | Baca pembagian data saat ini | “Stadium mana yang menjadi data latih, validasi, dan uji tersembunyi sekarang?” |
| 20–38 | Bedakan identitas dari distribusi | Gunakan Latihan 1. |
| 38–52 | Uraikan pergeseran pseudobulk | Gunakan Latihan 2. |
| 52–65 | Kenali pertanyaan metrik | Gunakan Latihan 3. |
| 65–72 | Tetapkan batas klaim | Setiap pasangan menulis satu klaim yang didukung dan satu yang tidak didukung. |
| 72–75 | Penutup | Kembali ke halaman task resmi dan pertanyaan yang belum terjawab. |

## Latihan 1 — Populasi baru, bukan pelacakan sel

Jumlah berikut adalah contoh fiktif. Bayangkan sampel pelatihan yang dirilis berisi 70 sel tipe A dan 30 sel tipe B. Target berikutnya yang juga fiktif berisi 40 sel tipe A, 30 sel tipe B, dan 30 sel tipe C yang baru muncul. Tanyakan kepada pasangan: sel mana pada target yang merupakan “sel yang sama” dengan sel di data pelatihan? Apa yang ditunjukkan contoh ini tentang memprediksi populasi, alih-alih mengikuti identitas tiap sel?

### Kunci jawaban

Tabel mainan ini tidak memberi bukti identitas sel lintas stadium, jadi peserta tidak dapat memasangkan sel satu per satu. Distribusi target mencakup tipe yang tidak ada pada sampel pelatihan fiktif tersebut serta proporsi tipe yang sudah ada berubah. Prediksi populasi temporal perlu memperhitungkan keadaan sel yang muncul dan frekuensinya; tugasnya bukan memindahkan setiap sel yang diamati ke masa depan. Periksa pembagian data dan definisi target sebenarnya pada halaman resmi terkini.

## Latihan 2 — Komposisi dapat menggeser nilai agregat

Rerata fitur fiktif ini tetap di dalam tiap tipe sel, tetapi campurannya berubah:

| Stadium | Proporsi tipe A | Rerata A | Proporsi tipe B | Rerata B | Rerata gabungan |
|---|---:|---:|---:|---:|---:|
| lebih awal | 80% | 2 | 20% | 12 | 4 |
| lebih akhir | 20% | 2 | 80% | 12 | 10 |

Minta pasangan menghitung rerata gabungan pada tiap stadium. Apa yang berubah: rerata fitur di dalam tipe atau campuran populasinya? Apa yang tidak bisa dijelaskan oleh satu angka gabungan saja?

### Kunci jawaban

Rerata gabungan lebih awal adalah `0.8 × 2 + 0.2 × 12 = 4`; rerata lebih akhir adalah `0.2 × 2 + 0.8 × 12 = 10`. Rerata dalam masing-masing tipe tidak berubah; campurannya berubah. Pergeseran nilai gabungan saja tidak dapat membedakan respons di dalam keadaan sel dari perubahan proporsi keadaan sel. Ini contoh untuk pengajaran, bukan klaim tentang gen atau stadium nyata.

## Latihan 3 — Empat pertanyaan penilaian yang berbeda

Evaluasi resmi Task 1 memisahkan pemulihan gen diferensial (DE), arah perubahan, distribusi keadaan sel, dan kovariasi antar-gen. Minta kelompok memasangkan tiap kegagalan fiktif dengan pertanyaan yang paling langsung terdampak: (a) banyak gen yang berubah tidak ditemukan; (b) gen yang relevan berubah ke arah berlawanan; (c) proporsi tipe sel yang diprediksi keliru; (d) rerata per gen terlihat masuk akal, tetapi hubungan antar-gen menghilang.

### Kunci jawaban

(a) pemulihan gen DE; (b) arah perubahan; (c) distribusi keadaan sel; (d) kovariasi antar-gen. Satu kegagalan dapat memengaruhi lebih dari satu metrik, dan contoh-contoh ini bukan sidik jari skor yang pasti. Hasil baik pada satu metrik tidak membuktikan bahwa metrik lainnya juga baik.

## Lembar kerja peserta

1. Dari halaman task resmi terkini, tulis stadium pelatihan yang terlihat, target validasi, target uji tersembunyi, dan besaran yang diprediksi.
2. Dalam Latihan 1, bukti apa yang diperlukan untuk menyatakan bahwa dua sel pada stadium berbeda adalah sel yang sama? Apakah bukti tersebut tersedia?
3. Tunjukkan perhitungan Latihan 2. Jelaskan bagaimana rerata gabungan berubah sementara kedua rerata di dalam tipe tetap.
4. Pasangkan setiap kegagalan dalam Latihan 3 dengan pertanyaan metrik resmi yang paling langsung.
5. Tulis satu klaim yang didukung contoh fiktif dan satu klaim biologis yang tidak dapat didukungnya.

## Penutup untuk fasilitator

Jangan menafsirkan nilai rekaan sebagai biologi nyata atau hasil model. Ajak peserta membedakan komposisi keadaan sel, ekspresi di dalam keadaan sel, pembagian data, dan bukti dari scorer dalam analisis mereka. Materi edukasi independen ini bukan panduan skor resmi atau resep pemodelan.
