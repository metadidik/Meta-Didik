# Kuiz Tahun 1–6 dan Tingkatan 1–6 (draf, v18.73)

> **Status: DRAF, perlu semakan guru.** DSKP rasmi KPM tidak dapat dicapai semasa penyediaan. Ini kerana rangkaian pembangunan menyekat portal KPM. Tajuk dan soalan disediakan berdasarkan pengetahuan umum tentang struktur KSSR (Semakan 2017), KSSM dan STPM. Tiada kod Standard Pembelajaran direka; medan `dskp` hanya menerangkan bidang dalam perkataan.

## Ringkasan

| Subjek | Tahap | Tajuk | Soalan |
|---|---|---|---|
| Bahasa Melayu | Tahun 1–6, Tingkatan 1–3, 6 | 30 | 150 |
| Matematik | Tahun 1–6, Tingkatan 1–3, 6 | 30 | 150 |
| Sains | Tahun 1–6, Tingkatan 1–3, 6 (STPM Biologi) | 30 | 150 |
| Pendidikan Islam | Tahun 1–6, Tingkatan 1, 2, 6 | 27 | 135 |

- Setiap tahap mempunyai 3 tajuk, dan setiap tajuk 5 soalan aneka pilihan.
- Tingkatan 4–5 sedia ada tidak diubah.
- Pendidikan Islam Tingkatan 3 kekal sebagai subjek "Pendidikan Islam Tingkatan 3".

## Cara ia berfungsi

- **Satu tahap pada satu masa:** peta dan Stesen Ilmu memaparkan satu tahap sahaja. Tingkatan 4 dan 5 dipaparkan bersama seperti dahulu.
- **Pemilihan tahap:**
  - Murid: Menu → Belajar → 🎚 Tahap. Hanya tahap sendiri atau lebih rendah boleh dipilih.
  - Guru: pemilih tahap di Peta Operasi. Lalai guru ialah Tingkatan 4 & 5.
- **Stesen kuiz di bangunan sedia ada yang sesuai:**
  - Sains: Taman Negara, Gunung Kinabalu, Gua Niah dan lain-lain;
  - Matematik: Menara Petronas, Bursa Malaysia, Jambatan Pulau Pinang dan lain-lain;
  - Bahasa Melayu: Istana Budaya, Kota A Famosa, Kampung Budaya Sarawak dan lain-lain;
  - Pendidikan Islam: masjid dan institusi Islam.
- **Penandaan draf:** soalan ditanda `draf: 1`. Guru boleh membaiki atau mencadang buang soalan melalui Bank Soalan sedia ada (semakan pentadbir).

## Fail

- **Sumber draf:** `data/kuiz-draf/{bm,mt,sc,pi}.json`.
- **Penggabungan:** `python3 tools/kuiz-gabung.py`. Skrip ini menambah tajuk ke `app.js`, soalan ke `soalan_*.json` dan peta stesen ke `dunia.js`. Ia boleh dijalankan semula tanpa pendua.

## Perkara yang perlu disemak guru/ustaz (daripada penyedia draf)

**Umum**
- Tahap setiap tajuk ialah anggaran. Contohnya peratus di Tahun 4, jam 24 jam di Tahun 5, dan Pythagoras di Tingkatan 3 (mungkin Tingkatan 1 dalam KSSM).

**Bahasa Melayu**
- Peraturan Tatabahasa Dewan yang halus:
  - ayat pasif dengan kata ganti nama diri pertama/kedua;
  - menghadiahi / menghadiahkan;
  - kakitangan / kaki tangan;
  - koma sebelum "dan".
- Fakta STPM:
  - Batu Bersurat Kedukan Bukit 683 M;
  - Batu Bersurat Terengganu 1303 M;
  - Perkara 152;
  - DBP ditubuhkan 1956.

**Matematik**
- Soalan nisbah dan bentuk piawai meminta "bentuk termudah/piawai".
- Varians STPM menggunakan formula populasi.

**Sains**
- Soalan Buruj Belantik (tradisi musim menanam padi).
- Ubat gigi bersifat alkali.
- Istilah STPM seperti "ternyahasli".
- Beberapa padanan stesen agak longgar, contohnya Gua Tempurung untuk magnet.

**Pendidikan Islam**
- Tiada teks Arab al-Quran atau hadis.
- Fakta untuk disemak:
  - bilangan huruf tajwid (izhar halqi 6, ikhfa' haqiqi 15);
  - Masjid Quba sebagai masjid pertama;
  - Wasil bin Ata' sebagai pengasas Muktazilah;
  - jarak qasar "dua marhalah".
- Tingkatan 6 dilabel "Sukatan STPM Pengajian Syariah/Usuluddin (draf)".
