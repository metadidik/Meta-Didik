# Meta Didik: Malaysia Living Landmarks

**Fasa 1: audit repositori dan cadangan prototaip pertama**

Tarikh: 2026-11-01 · Versi kod yang diaudit: v18.57 (`main` selepas PR #65) · Branch kerja: `claude/mercu-tanda-prototaip`

Dokumen ini ialah langkah pertama master prompt "Malaysia Living Landmarks". Semua fakta di bawah datang daripada kod sebenar dan ukuran yang dijalankan dalam sesi ini. Perkara yang belum disahkan dilabel dengan jelas.

---

## 0. Sekatan semasa (perlu tindakan pemilik)

| Sekatan | Kesan | Tindakan |
|---|---|---|
| Rangkaian persekitaran pembangunan menolak sambungan ke `motac.gov.my`, `malaysia.travel`, `selangor.travel`, `tourism.johor.gov.my`, `jmm.gov.my`, `visitkl.gov.my`, `upload.wikimedia.org` dan `overpass-api.de` (diuji 2026-11-01) | **Tiada destinasi yang dapat disahkan dengan portal rasmi** dalam sesi ini. Senarai dalam §6 hanyalah *calon*. | Tambah domain portal rasmi dalam tetapan rangkaian persekitaran (Allowed domains), atau hantar pautan/tangkapan halaman rasmi kepada pembangun |
| Tiada akses konsol Firebase | Peraturan baharu hanya boleh diuji dengan emulator, dan dipasang oleh pemilik | Pemilik memasang peraturan selepas semakan |
| Prestasi hanya diukur dengan SwiftShader (GPU perisian) | Nilai FPS tidak mewakili telefon sebenar | Uji pada Android pertengahan dan iPhone/iPad sebenar |

---

## 1. Audit teknikal (daripada kod)

### 1.1 Seni bina

| Komponen | Pelaksanaan sebenar |
|---|---|
| Hos | Laman statik GitHub Pages (`metadidik.com`). Service worker `sw.js` dengan cache berversi. |
| Enjin 3D | Three.js r128 (global), tanpa pemuat glTF |
| Kod | `app.js` (1.9 MB: platform, kuiz, profil, guru, Firebase), `dunia.js` (650 KB: dunia Malaysia 3D), modul `mod/*.js` dimuat bila perlu |
| Data dunia | `meta-geo.json` (sempadan Natural Earth), `meta-jalan.json` (jalan utama), rel GTFS terbenam, `PLACES` (97 destinasi) dalam `dunia.js` |
| Skala | `WS = 2.5`, iaitu 7.5 unit = 1 km. Dua "kanta" pembesaran: Lembah Klang (`KV`) dan Kota Bharu (`KBL`). |
| Pangkalan data | **Firebase Realtime Database** (REST, `FB.req`), bukan Firestore. Peraturan ada dalam `docs/firebase-rules-*.json`. |
| Pengesahan | Firebase Auth REST untuk DELIMa (`TW_AUTH`). Kunci API belum dipasang, jadi kod guru sementara (`1991`) masih aktif. |
| Avatar | `avatar3d.js` + Gudang (`setView("gudang")`) |
| Profil dan kemajuan | `P` dalam localStorage dan nod `pemain/<uid>`, Lifelong ID (`mod/lid.js`), `LM.st` (cop, lencana dan stesen) |
| Kuiz | Bank soalan `soalan*.json`, `BYTOPIK`. Tajuk dikunci ikut tahap murid (v18.56). Kuiz dunia: `lmQuiz`. |

### 1.2 Kandungan dunia semasa

Kiraan `g.items`, diukur:

| Jenis | Bil. | Catatan |
|---|---|---|
| `pl` destinasi | 97 | Lihat 1.3 |
| `si` Stesen Ilmu | 22 | Lihat 1.4 |
| `st` stesen rel | 299 | |
| `pu` pulau / `bt` terminal bas / `sn` stesen lain | 69 / 47 / 42 | |
| `ap` lapangan terbang | 28 | |
| `ny` nelayan / `fd` kedai makan / `tl` tol / `vn` / `ip` / `km` / `jt` / `tn` / `kh` | 21 / 14 / 15 / 13 / 20 / 8 / 8 / 6 / 4 | |

### 1.3 Mercu tanda: tahap ketepatan model

| Kategori | Bil. | Contoh |
|---|---|---|
| Model khusus (berasaskan bangunan sebenar) | 18 | KLCC, Menara KL, TRX 106, Bangunan Sultan Abdul Samad, Kampung Baru, Bukit Bintang dan 12 tarikan Kota Bharu/Kelantan |
| Masjid: penjana prosedural, dengan varian khusus bagi sesetengah id | 15 | Masjid Kristal, Masjid Bandaraya KK, Masjid Jamek |
| **Model generik ikut jenis** (`lmModel(type)`) yang diberi nama sebenar | **64** | Gunung Kinabalu, Taman Negara, Lembah Bujang, Kampung Budaya Sarawak |

Daripada 16 mercu tanda dalam kolaj rujukan pemilik:
- **ada model khusus (2):** Petronas, Bangunan Sultan Abdul Samad;
- **ada tetapi generik atau prosedural (6):** Masjid Kristal, Kinabalu, Mulu, Taman Negara, Lembah Bujang, Kampung Budaya Sarawak;
- **tiada langsung (8):** Bandar Bersejarah Melaka (hanya Masjid Selat), George Town, Lenggong, Batu Caves, Muzium Negara, Muzium Kesenian Islam, Kek Lok Si, Geopark Langkawi.

**Penemuan penting:** model Bangunan Sultan Abdul Samad (v18.57) berwarna **bata merah dengan kubah hijau**. Gambar rujukan pemilik menunjukkan **fasad putih krim dan kubah tembaga merah jambu**. Model itu dibina semula dalam PR ini sebagai prototaip pertama (§5).

### 1.4 Stesen Ilmu (kuiz)

- 22 stesen (`SILMU`). **19 menggunakan model kiosk generik** (`lmIlmuModel`: tapak bulat, empat tiang, bumbung berwarna). Hanya 3 menggunakan bangunan sebenar: Parlimen, Tabung Haji dan Istana Budaya.
- Jika tapak sebenar tidak lapang, stesen **dianjak sehingga 120 unit (~16 km)** dari koordinat sebenar (`lmIlmuBuild`).
- Setiap stesen ada label "📖 Stesen Ilmu" dan **sinar hijau setinggi 260 unit**.
- Ini bercanggah dengan §5 master prompt, iaitu kuiz pada bangunan sebenar tanpa bangunan khas.

### 1.5 Stesen Inovasi guru (booth)

- **Ada:** guru memacak booth di kedudukan avatar semasa (`lmPacak` → `stnGuruBox`). Satu booth bagi setiap guru (nod `stesen/<uid>`). Ada kelulusan pentadbir, statistik (lawat, suka, klik) dan cahaya emas.
- **Semakan lokasi hanya di klien:** titik mesti di darat dalam negeri (`lmAt`).
- **Tiada:**
  - semakan bertindih dengan booth lain;
  - semakan jalan, sungai atau zon mercu tanda;
  - pratonton 3D sebelum hantar;
  - semakan di pelayan.
- `semakLot` dalam `mod/perintis-teras.js` (sudah diuji: jalan, air, bangunan) **wujud tetapi belum disambung** ke borang guru.
- Struktur data kekal (`stesen/<uid>`); tiada perubahan pangkalan data dibuat dalam PR ini.

### 1.6 Prestasi (garis dasar "sebelum")

Diukur dengan Playwright Chromium, desktop 1280×720, GPU perisian SwiftShader.

| Metrik | Nilai |
|---|---|
| Masa bina dunia (klik Masuk hingga dunia sedia) | 12.5 s |
| Objek adegan / mesh | 15,521 / 13,051 |
| Draw calls / segi tiga | 223 / 1.41 juta |
| Geometri / tekstur dalam memori GPU | 185 / 18 |
| Heap JavaScript | 141 MB |

- **Seluruh Malaysia dimuat serentak dalam satu adegan.** Ini bercanggah dengan §9 ("jangan muatkan semua model serentak").
- FPS SwiftShader (~1) tidak bermakna. **Ukuran pada peranti sebenar masih diperlukan.**

### 1.7 Kesesakan visual

Bukti: `docs/mercu-tanda/sultan-abdul-samad-banding.jpg`, sudut atas. Di Dataran Merdeka terdapat:
- landasan LRT/monorel yang melintasi dataran di hadapan bangunan;
- kiosk Stesen Ilmu berbumbung kuning;
- papan Top 5;
- beberapa sinar cahaya;
- banyak label kecil yang bertindih.

Ini selari dengan permintaan "minimalis, kurangkan objek hiasan".

### 1.8 Kekalkan, guna semula atau permudahkan

| Komponen | Keputusan |
|---|---|
| Avatar 3D, Gudang, profil, Lifelong ID, kemajuan murid, bank soalan, kunci tahap | **Kekal** tanpa ubahan |
| Stesen Inovasi guru (data `stesen/<uid>`, kelulusan, statistik, sewaan) | **Kekal**. Tambah pemilihan lokasi bebas yang disahkan (§4). |
| `mod/perintis.js` dan `perintis-teras.js` (rupa bumi berpetak, jalan ikut kontur, perlanggaran, A*, `semakLot`, ujian V1–V8) | **Guna semula** sebagai enjin Lapisan C (zon mercu tanda) |
| Kanta pembesaran (`LENSES`), transformasi `ll()`/`lmLatLon()` | **Guna semula** sebagai asas transformasi lapisan B |
| Model khusus sedia ada (18) | **Guna semula**, kemudian semak ketepatan satu per satu |
| Kiosk Stesen Ilmu, sinar 260 unit, label berganda | **Permudahkan:** kuiz dipindah ke bangunan sebenar (§3) |
| Dunia satu-adegan seluruh Malaysia | **Permudahkan secara berfasa** kepada tiga lapisan (§2). Dunia sedia ada kekal sehingga lapisan baharu lulus ujian. |

---

## 2. Reka bentuk: peta minimalis tiga lapisan

### 2.1 Lapisan

| Lapisan | Kandungan | Sumber kod |
|---|---|---|
| **A. Malaysia** | Peta 2D/3D ringan: bentuk negeri, ikon 3–5 mercu tanda utama setiap negeri. Ketik negeri untuk masuk. | Peta besar sedia ada (`lmBigMap`) dan `meta-geo.json` |
| **B. Negeri** | Negeri dipadatkan: mercu tanda, jalan penghubung bersambung, pantai dan sungai utama. Butang "Pergi ke destinasi". | Enjin `dunia.js` dihadkan kepada satu negeri, dimuat ikut negeri |
| **C. Zon mercu tanda** | Kawasan ~300×300 m pada skala meter: model terperinci, pintu atau dataran sebagai zon kuiz, lot booth guru | Enjin `mod/perintis.js` |

### 2.2 Sistem koordinat (boleh diaudit)

- **Koordinat sebenar** (lat/lon, sumber dan tarikh) disimpan dalam `data/mercu-tanda/<negeri>.json`, **berasingan** daripada koordinat permainan.
- **Lapisan B, pemampatan jejarian monotonik** di sekitar pusat negeri `c`:
  - `d = jarak(c, p)`, `θ = bearing(c, p)`;
  - `d' = k · d^α` dengan `0.6 ≤ α ≤ 1`;
  - `p' = c + d'·(sin θ, cos θ)`.
  - **Arah (bearing) tidak berubah dan susunan jarak dari pusat kekal.** Ini boleh diuji: ujian unit menyemak setiap pasangan destinasi.
- **Lapisan C:** unjuran equirectangular setempat dalam meter (sama seperti `perintis.py`).
- Paparan tetap di lapisan B: *"Peta pendidikan yang dipermudahkan, bukan peta navigasi sebenar."*

### 2.3 Design system ringkas

| Aspek | Peraturan |
|---|---|
| Label | Satu label nama bagi setiap mercu tanda, saiz besar dan mudah dibaca di telefon. Label lain muncul hanya apabila dekat. |
| Penanda kuiz | Ikon kecil 📖 di pintu, muncul hanya dalam radius interaksi. Tiada sinar 260 unit. |
| Booth guru | Saiz seragam kecil, ikon 🏛 dengan warna subjek, cahaya emas lembut |
| Landskap | Rumput, pokok berkelompok, laluan pejalan kaki dan air. Tiada bangunan hiasan tanpa fungsi. |
| Warna | Mercu tanda ikut rujukan sebenar. Persekitaran menggunakan palet lembut supaya mercu tanda menonjol. |
| UI | Menu grid ikon (v18.57). Butang besar: Cari Tempat, Kuiz, Inovasi Guru, Profil. Bahasa Melayu. |

---

## 3. Kuiz pada mercu tanda sebenar (rancangan)

1. Setiap rekod mercu tanda menyimpan `pintu: {x, z, r}` dalam koordinat lapisan C, atau di luar bangunan jika tidak boleh dimasuki.
2. Avatar masuk ke zon pintu, butang "📖 Jawab Kuiz" muncul, kemudian `lmQuiz` yang sedia ada dipanggil dengan tajuk yang dipetakan (`SILMU_TOPIK` dipindah ke rekod mercu tanda).
3. Model kiosk `lmIlmuModel` dibuang secara berperingkat. Rekod Stesen Ilmu sedia ada (`LM.st`, had 30/hari, cop) dipetakan ke id mercu tanda supaya **kemajuan murid tidak hilang**.
4. Guru yang dibenarkan memetakan set kuiz ke mercu tanda. Ini dilaksanakan dalam fasa berikut, mengikut struktur Bank Soalan sedia ada.

---

## 4. Booth guru bebas tetapi disahkan (rancangan)

**Masalah:** Realtime Database Rules tidak boleh mengira geometri. Semakan "bukan atas jalan atau air" tidak boleh dibuat terus dalam peraturan.

**Cadangan tanpa Cloud Functions** (pelan Spark percuma kekal):
1. Pipeline `tools/geo/` menjana **grid lot sah** bagi setiap zon dan negeri: sel ~10×10 m yang lulus `semakLot` (bukan jalan, air, bangunan, laluan pintu atau zon perlindungan mercu tanda). Hasil disimpan sebagai fail statik **dan** sebagai senarai `lot_sah/<lotId>: true` di RTDB, ditulis oleh pentadbir.
2. Booth menyimpan `lot: <lotId>`. Peraturan RTDB:
   - `root.child('lot_sah/' + lot).exists()` — lot sah, disemak di pelayan;
   - `lot_guna/<lotId>` hanya boleh ditulis jika kosong atau milik `auth.uid` — tiada pertindihan;
   - booth hanya boleh ditulis oleh pemiliknya, dan pentadbir boleh memindah atau menyahaktif.
3. **Pratonton 3D** di klien sebelum hantar. Pindah lokasi = tukar `lot`, dengan semakan yang sama.

Alternatif ialah Cloud Function untuk semakan geometri penuh, tetapi ia memerlukan pelan Blaze. Ini keputusan pemilik.

---

## 5. Prototaip pertama dalam PR ini: Bangunan Sultan Abdul Samad

Prototaip ini membuktikan pendekatan *Landmark-Accurate, Environment-Simplified* pada satu bangunan sebelum peta keseluruhan diubah.

| | Sebelum (v18.57) | Selepas (v18.58) |
|---|---|---|
| Warna fasad | Bata merah berjalur putih | Putih krim dengan kornis putih (ikut rujukan) |
| Kubah | Hijau (`#5f9f86`) | Tembaga merah jambu (`#d4917a`) |
| Arked | Satu baris jalur gelap | Dua tingkat gerbang berlengkung bulat, di hadapan dan belakang |
| Serambi tengah | Tiada | Menonjol, tiga gerbang besar dan tiga gerbang atas, menara penjuru berkubah |
| Menara jam | Kotak bata, kubah hijau | Batang krim, jam empat muka, tingkat loceng bergerbang, kubah tembaga, tanglung gelap |
| Menara hujung sayap | Kotak bata, kubah hijau kecil | Menara bulat dua tingkat bergerbang, kubah bawang tembaga besar |
| Bumbung | Rata | Parapet, genting, kubah kecil (chhatri), tiga bendera |

- **Rekod rujukan:** `data/mercu-tanda/rujukan.json`.
- **Perbandingan:** `docs/mercu-tanda/sultan-abdul-samad-banding.jpg`.
- Gambar rujukan pemilik **tidak** disimpan dalam repo kerana status hak cipta tidak diketahui.
- **Had yang diakui:**
  - nisbah panjang:tinggi ialah anggaran daripada gambar;
  - koordinat belum disahkan dengan sumber rasmi;
  - butiran ukiran halus dipermudahkan.
- **Status model:** `prototaip`, bukan `disahkan`.
- **Tapak tidak berubah** (jejari 18 unit), jadi susun atur dunia sekitar tidak terjejas. Kesan prestasi kecil (beberapa ratus mesh dalam satu model).

---

## 6. Calon destinasi (belum disahkan)

`data/mercu-tanda/calon.json` mengandungi 97 destinasi sedia ada, dengan negeri, jenis, koordinat, jenis model dan `status: "calon"`. Semuanya perlu disemak dengan portal rasmi negeri sebelum dikekalkan.

| Negeri | Destinasi sedia ada | Model khusus |
|---|---|---|
| Perlis | 3 | 0 |
| Kedah | 5 | 0 |
| Pulau Pinang | 4 | 0 |
| Perak | 6 | 0 |
| Kelantan | 29 | 12 |
| Terengganu | 5 | 0 |
| Pahang | 7 | 0 |
| Selangor | 5 | 0 |
| WP Kuala Lumpur | 9 | 6 |
| Negeri Sembilan | 3 | 0 |
| Melaka | 3 | 0 |
| Johor | 5 | 0 |
| Sarawak | 6 | 0 |
| Sabah | 7 | 0 |

Kelantan sudah mempunyai 29 tarikan berasaskan peta pelancongan Kota Bharu dan "Jom Terokai Kelantan" yang diberi pemilik (PR #56). Ini sumber paling hampir dengan bahan rasmi negeri setakat ini.

---

## 7. Cadangan prototaip negeri perintis (Fasa 2)

| Pilihan | Kelebihan | Kekurangan |
|---|---|---|
| **A. WP Kuala Lumpur, zon Dataran Merdeka** (Bangunan Sultan Abdul Samad, Masjid Jamek, Dataran Merdeka, Pasar Seni, Masjid Negara / Muzium Kesenian Islam) | Model khusus dan kanta pembesaran sudah ada; prototaip pertama siap; dekat dengan Parlimen dan Istana Budaya | Kawasan bandar padat (rel, lebuh raya), jadi perlu banyak pemudahan |
| **B. Melaka** (Bandar Bersejarah UNESCO: A Famosa, Stadthuys, Christ Church, Masjid Selat) | Ikon pelancongan yang sangat dikenali; zon kecil dan padat; nilai sejarah tinggi | Hampir tiada model sedia ada; perlu bina 4–5 model baharu |
| **C. Kelantan** | 29 tarikan dan 12 model khusus sudah ada; sumber peta negeri diberi pemilik | Kurang dikenali di peringkat kebangsaan berbanding KL atau Melaka |

**Syor:** Pilihan A dahulu. Ia paling cepat menghasilkan zon lapisan C yang lengkap: lima mercu tanda, kuiz di pintu dan lot booth guru. Pilihan B boleh menyusul sebagai negeri kedua.

---

## 8. Keputusan yang diperlukan daripada pemilik

1. **Negeri perintis:** A (KL, disyorkan), B (Melaka) atau C (Kelantan).
2. **Akses rangkaian** ke portal pelancongan rasmi untuk pengesahan destinasi.
3. **Booth:** grid lot sah dengan Rules (percuma, disyorkan) atau Cloud Functions (Blaze).
4. **Kiosk Stesen Ilmu:** setuju dibuang berperingkat selepas kuiz di pintu mercu tanda berfungsi, dengan kemajuan murid dipetakan.
5. **Gambar rujukan:** jika pemilik mempunyai hak atau lesen gambar, ia boleh disimpan dalam repo untuk audit visual. Jika tidak, ia kekal di luar repo seperti sekarang.

---

## 9. Bukti ujian PR ini

- `node --check` dunia.js lulus. Node: 59/59 ujian lulus.
- Playwright desktop 1280×720:
  - dunia dibina;
  - model `wp-sas` dirakam dari hadapan dan sudut atas;
  - tiada `pageerror`.
- Garis dasar prestasi: §1.6.
