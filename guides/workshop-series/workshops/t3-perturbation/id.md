# Lokakarya Task 3: Memprediksi Respons Perturbasi

**75 menit · 4–20 peserta · tanpa kode atau data Challenge**

Sesi ini membantu peserta menalar tugas prediksi knockout bersyarat. Tujuan belajar utamanya adalah membedakan efek perturbasi dari latar tipe liar (wild type). Sesi ini tidak mengusulkan mekanisme biologis atau resep pemodelan.

## Persiapan

Buka halaman resmi [deskripsi task](https://virtualembryo.ai/challenge/tasks), [skema data](https://virtualembryo.ai/challenge/data), dan [aturan terkini](https://virtualembryo.ai/challenge/rules). Siapkan kertas atau bagikan panduan ini. Latihan memakai angka rekaan dan nama fitur generik. Jangan gunakan pengukuran target tersembunyi. Halaman resmi menjadi acuan utama dan dapat berubah.

## Susunan sesi

| Menit | Kegiatan | Pertanyaan fasilitator |
|---:|---|---|
| 0–8 | Definisikan prediksi | “Apa yang diminta Challenge untuk diubah oleh model?” |
| 8–20 | Petakan kondisi dan split | “Knockout mana yang menjadi data latih, validasi, atau uji tersembunyi?” |
| 20–38 | Bandingkan dengan tipe liar | Gunakan Latihan 1. |
| 38–52 | Baca metrik respons | Gunakan Latihan 2. |
| 52–65 | Saring sumber eksternal | Gunakan Latihan 3. |
| 65–72 | Nyatakan ketidakpastian | Tulis satu klaim tentang respons dan satu keterbatasannya. |
| 72–75 | Penutup | Tinjau kembali halaman resmi terkini dan pertanyaan yang belum terjawab. |

## Latihan 1 — Latar belakang versus respons

Nilai berikut adalah nilai mainan yang dinormalisasi dan fiktif untuk satu fitur generik. Ini bukan pengamatan VEC nyata.

| Kondisi | Nilai fiktif |
|---|---:|
| tipe liar yang dipasangkan | 10.0 |
| perturbasi, Model A | 10.1 |
| perturbasi, Model B | 7.0 |

Tanyakan kepada pasangan model mana yang mereproduksi latar tipe liar dan mana yang memprediksi perubahan lebih besar. Lalu tanyakan mengapa perbandingan ekspresi absolut saja dapat menguntungkan model yang sekadar menyalin tipe liar.

### Kunci jawaban

Model A tetap dekat dengan nilai tipe liar, sehingga perubahan yang diprediksinya hampir nol. Model B memprediksi penurunan lebih besar. Contoh mainan ini tidak memberi tahu arah mana yang benar secara biologis; respons perturbasi yang diamati yang menentukannya. Challenge menilai respons relatif terhadap tipe liar, jadi mencocokkan latar bersama saja tidak cukup.

## Latihan 2 — Empat pertanyaan tentang respons

Metrik T3 resmi mencakup pemulihan gen respons, arah respons, besar respons, dan distribusi keadaan sel. Minta setiap pasangan memasangkan kegagalan fiktif dengan metrik: (a) gen yang benar berubah ke arah keliru; (b) arah benar tetapi efek terlalu kecil; (c) perubahan besar terjadi pada gen yang keliru; (d) proporsi populasi runtuh.

### Kunci jawaban

(a) arah respons; (b) besar respons; (c) pemulihan gen respons; (d) distribusi keadaan sel. Metrik memberikan bukti yang berbeda. Nilai baik pada satu metrik bukan bukti bahwa hasil lainnya juga baik.

## Latihan 3 — Saring data eksternal

Seorang rekan mengusulkan dataset publik dengan knockout gen terkait dan stadium yang mirip. Minta kelompok menyebutkan pemeriksaan sebelum memakainya: gen/alel dan genotipe yang tepat, stadium, sumber dan rilis, lisensi, relevansi dengan task, aturan target-tertahan terkini, serta kewajiban pengungkapan. Fakta apa yang belum terjawab dan harus menghentikan penggunaan?

### Kunci jawaban

Kelompok sebaiknya menunda sampai sumber, perturbasi, dan stadium yang tepat dapat diperiksa terhadap aturan terkini. Alel terkait atau fenokopi dapat termasuk dalam kondisi uji-tertahan yang dilindungi; URL publik tidak membuktikan kelayakan. Ikuti batas eksplisit di aturan dan tanyakan kepada penyelenggara sebelumnya jika kecocokannya ambigu.

## Lembar kerja peserta

1. Sebutkan contoh perturbasi Task 3 yang dirilis untuk pelatihan, target validasi, dan target uji tersembunyi saat ini dari halaman task resmi.
2. Untuk fitur rekaan, hitung `perturbasi − tipe liar yang dipasangkan` bagi tiap model. Apa yang terungkap dari selisih yang tidak terlihat pada nilai absolut?
3. Pasangkan tiap kegagalan pada Latihan 2 dengan metrik respons yang terdampak.
4. Sebutkan bukti yang diperlukan sebelum dataset perturbasi eksternal dapat dianggap layak dan diungkapkan.
5. Tulis satu klaim hasil yang didukung contoh mainan dan satu klaim biologis yang tidak didukungnya.

## Penutup untuk fasilitator

Jangan menyimpulkan biologi nyata dari contoh rekaan. Minta peserta mencantumkan secara eksplisit kontras perturbasi, kontrol pasangan, genotipe, stadium, dan asal-usul sumber dalam analisis. Ini materi edukasi independen, bukan panduan evaluasi resmi.
