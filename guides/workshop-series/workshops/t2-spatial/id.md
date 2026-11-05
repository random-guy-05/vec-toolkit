# Lokakarya Task 2: Menalar Ruang dan Waktu

**75 menit · 4–20 peserta · tanpa kode atau data Challenge**

Sesi siap-fasilitator ini ditujukan bagi peserta yang memahami konsep dasar sel tunggal tetapi baru mengenal prediksi spasial-temporal 3D. Sesi memakai perbandingan model fiktif. Tujuannya menalar kontrak task dan bukti, bukan mengajarkan resep pemodelan yang belum terverifikasi.

## Persiapan

Buka halaman resmi [deskripsi task](https://virtualembryo.ai/challenge/tasks), [skema data](https://virtualembryo.ai/challenge/data), dan [evaluasi](https://virtualembryo.ai/challenge/evaluation). Siapkan kertas atau bagikan panduan ini. Minta peserta untuk tidak memakai target tersembunyi atau membagikan hasil model privat. Periksa kembali halaman resmi sebelum sesi; halaman tersebut adalah acuan.

## Susunan sesi

| Menit | Kegiatan | Pertanyaan fasilitator |
|---:|---|---|
| 0–8 | Tetapkan pertanyaan | “Apa saja yang harus ada dalam sebuah prediksi?” |
| 8–20 | Petakan pembagian data | “Ini interpolasi atau ekstrapolasi? Stadium mana yang benar-benar terlihat?” |
| 20–38 | Bahas skenario | Gunakan Latihan 1 di bawah. |
| 38–52 | Tafsirkan skor | Gunakan Latihan 2 di bawah. |
| 52–65 | Audit koordinat | Gunakan Latihan 3 di bawah. |
| 65–72 | Tulis batas klaim | Setiap pasangan menulis satu klaim yang didukung dan satu yang tidak didukung. |
| 72–75 | Penutup | Tunjukkan halaman resmi terkini dan undang pertanyaan yang belum terjawab. |

## Latihan 1 — Satu task, pengaturan berbeda

Tim fiktif “Small Atlas” menganggap semua board Task 2 meminta mereka memprediksi melampaui stadium pelatihan terbaru. Minta pasangan memeriksa tabel pembagian data resmi dan mengoreksi asumsi tersebut. Mereka harus mengenali interpolasi pada stadium uji pengaturan seluruh embrio, lalu membandingkannya dengan pertanyaan interpolasi dan ekstrapolasi pada pengaturan jantung. Tanyakan hal yang sama dan berbeda: keduanya memprediksi ekspresi dan koordinat 3D, tetapi pengaturan dan pembagian stadium juga penting.

### Kunci jawaban

Task 2 memiliki dua pengaturan. Pengujian seluruh embrio adalah interpolasi: stadium yang ditahan berada di antara stadium yang dirilis. Dalam pengaturan jantung, satu pertanyaan validasi adalah interpolasi, sedangkan stadium yang lebih akhir menguji ekstrapolasi di luar rentang pelatihan yang dirilis. Periksa nama stadium dan ID board yang tepat pada halaman resmi terkini, jangan mengandalkan ingatan.

## Latihan 2 — Empat pertanyaan dengan bobot setara

Model A fiktif memprediksi perubahan ekspresi dengan cukup baik tetapi menghasilkan awan sel yang seragam. Model B memiliki bentuk dan lingkungan lokal yang masuk akal tetapi perubahan ekspresinya lemah. Keduanya belum dinilai secara resmi. Tanyakan pada tiap pasangan: bukti apa yang membedakan kinerja molekuler, seluler, jaringan, dan organisasi lokal? Apa yang dapat dan tidak dapat disimpulkan dari pembagian data lokal tentang board tersembunyi?

### Kunci jawaban

Skor resmi T2 memberi seperempat bobot untuk masing-masing: perubahan ekspresi, distribusi keadaan sel, bentuk/pertumbuhan jaringan, dan organisasi spasial lokal. Hasil kuat pada satu komponen tidak membuktikan kinerja komponen lain. Perbandingan lokal hanya menjelaskan data, pembagian, dan scorer yang dipilih; itu bukan hasil uji tersembunyi.

## Latihan 3 — Periksa kerangka koordinat

Dua stadium fiktif masing-masing memiliki awan titik 3D. Seorang rekan mencocokkan sel dengan nilai numerik `(x,y,z)` yang sama di kedua stadium dan menyebutnya sel yang sama. Tanyakan: bukti apa yang membenarkan klaim identitas tersebut?

### Kunci jawaban

Nilai koordinat saja tidak menyediakan bukti tersebut. Halaman data resmi menjelaskan bahwa koordinat memakai kerangka lokal per embrio dan tidak disejajarkan antar titik waktu. Jangan menyimpulkan adanya korespondensi sel lintas stadium atau satu kerangka bersama dari angka yang kebetulan cocok. Baca skema resmi sebelum membuat asumsi registrasi sebagai bagian analisis.

## Lembar kerja peserta

1. Untuk board yang dipilih, tulis stadium pelatihan yang terlihat, pertanyaan yang ditahan, dan kanal prediksi. Cantumkan halaman resmi terkini.
2. Untuk skor yang dilaporkan, catat pembagian data, versi scorer, dan dimensi T2 mana dari empat dimensi yang diukur.
3. Bukti tambahan apa yang diperlukan sebelum mengklaim bahwa koordinat lintas stadium menunjukkan lokasi atau sel biologis yang sama?
4. Tulis satu klaim sempit yang didukung bukti dan satu klaim lebih luas yang tidak didukungnya.

## Penutup untuk fasilitator

Jangan sajikan perbandingan fiktif sebagai hasil atau rekomendasi model terbaik. Ajak peserta memeriksa kontrak board, batasan alat komunitas apa pun, serta mendokumentasikan pembagian dan asumsi mereka sendiri. Materi ini bersifat edukatif dan independen, bukan panduan penilaian resmi.
