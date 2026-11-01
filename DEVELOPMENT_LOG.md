# Meta Didik: Log pembangunan

Entri terbaru di atas. Setiap entri mengandungi:
- apa yang siap;
- apa yang diuji;
- apa yang belum siap;
- masalah;
- langkah seterusnya.

Status fasa ada dalam `ROADMAP.md`.

---

## 2026-11-01 · v18.59 · Reka semula UI/UX fasa 1: halaman utama, HUD, menu dan kad mercu tanda

- Spesifikasi: `docs/REKA-SEMULA-UI.md`. Imej sebelum/selepas: `docs/reka-semula/`.
- **Halaman utama** (tema cerah, palet baharu):
  - hero "Jom Jelajah & Belajar!" dengan CTA 🚀 Mula Jelajah (`mdGo`), Ruang Guru dan Cara Bermain;
  - jalur ilustrasi SVG ciptaan sendiri (Menara Berkembar, Menara KL, Bangunan Sultan Abdul Samad), dengan avatar `zvSvg`;
  - bahagian Cara Bermain dan Aktiviti Menarik;
  - testimoni dan penaja sedia ada digayakan semula.
- **HUD:**
  - kiri atas: avatar, kawasan dan butang status;
  - panel status boleh dilipat (`lmstat`), dan cip tenaga hanya muncul apabila ≤ 35%;
  - kad Seterusnya di tengah atas;
  - kanan bawah: Lompat + ⋯ (Lari, Raikan, Chat);
  - label 3D: mercu tanda dalam 170 unit, lain-lain 95 unit (dahulu 260).
- **Menu Utama 2×2:** Jelajah, Belajar, Kawan, Profil, setiap satu dengan submenu, ditambah baris utiliti (Waktu Solat, Kolam Ikan, Bunyi, Siang/Malam, Top 5, Tetapan, Keluar).
- **Kad mercu tanda** (`lmPlaceKad`): Jawab Kuiz (kuiz ziarah sedia ada), Kenali Tempat (fakta, Swafoto), Teruskan jelajah.
- **Ujian:**
  - Node 59/59;
  - Playwright telefon potret, telefon landskap dan desktop (halaman utama, butang, HUD, menu, submenu, kad mercu tanda, masuk dunia);
  - tiada `pageerror`.

## 2026-11-01 · v18.58 · Malaysia Living Landmarks: audit dan prototaip mercu tanda pertama

- **Audit:** `docs/MERCU-TANDA-AUDIT.md`.
  - Seni bina dan kandungan dunia (diukur).
  - 64 daripada 97 destinasi menggunakan model generik.
  - 19 daripada 22 Stesen Ilmu ialah kiosk generik yang boleh dianjak sehingga ~16 km.
  - Booth guru hanya disemak di klien.
  - Garis dasar prestasi: bina 12.5 s, 13k mesh, 223 draw calls, 1.41 juta segi tiga, heap 141 MB (SwiftShader).
  - Seluruh Malaysia dimuat serentak.
- **Pelan:** tiga lapisan (Malaysia, negeri, zon mercu tanda), pemampatan jejarian monotonik yang boleh diuji, kuiz di pintu mercu tanda, dan booth disahkan melalui grid lot sah dalam RTDB Rules.
- **Prototaip:** `lmSultanAbdulSamad` dibina semula mengikut gambar rujukan pemilik:
  - fasad putih krim, arked dua tingkat;
  - serambi tiga gerbang;
  - menara jam berkubah tembaga dengan tanglung;
  - menara bulat hujung sayap;
  - chhatri dan bendera.
  - Tapak dikekalkan (r 18).
- Rekod rujukan `data/mercu-tanda/rujukan.json`. Calon destinasi `data/mercu-tanda/calon.json` (97, status "calon"). Perbandingan `docs/mercu-tanda/sultan-abdul-samad-banding.jpg`.
- **Disekat:** portal rasmi (MOTAC, Tourism Malaysia, portal negeri, JMM, Wikimedia, Overpass) ditolak oleh rangkaian persekitaran. Tiada destinasi disahkan dengan sumber rasmi.
- Ujian: Node 59/59; Playwright (dunia dibina, model dirakam, tiada `pageerror`).

## 2026-11-01 · v18.57 · Menu ringkas mesra murid dan Profil (Gudang di dalamnya)

**☰ Menu dalam Meta Didik**
- Senarai butang teks yang panjang diganti dengan panel `lmMenu`:
  - grid ikon besar: Profil, Subjek, Pasport, Tajuk, Waktu solat, Kolam Ikan, Swafoto, Main bersama;
  - guru juga mendapat Pacak inovasi dan Ruang Privasi;
  - butang Suara jika bilik membenarkan;
  - baris "Tukar pantas" (Bunyi, Suasana, Top 5);
  - baris bawah: Ruang Privasi, Tetapan, Keluar.
- Butang "👤 Profil & Gudang" kini "👤 Profil". Panel `lmProfil` memaparkan:
  - lencana pangkat, nama, tahap dan sekolah;
  - statistik (MD, XP, cop tempat, lencana);
  - butang Gudang, Lencana, Pasport dan Ubah maklumat.
- **Gudang hanya dibuka dari Profil.** Butang "⬅ Kembali ke Profil" kembali ke panel Profil. Bar "Peta operasi" dan butang paparan penuh disembunyikan semasa Gudang dibuka dari dunia (`body.lm-gd`).
- "Ubah maklumat" membuka borang profil (contohnya tukar tingkatan) tanpa menutup Meta Didik, dan dunia disambung semula selepas borang ditutup.

**Ujian (Playwright, telefon 844×390 sentuh dan desktop 1280×800)**
- Aliran diuji: Menu → Profil → Gudang → kembali ke Profil, togol Bunyi, dan Ubah maklumat → Batal → dunia disambung semula.
- Tiada `pageerror`. Node 59/59.

## 2026-11-01 · v18.56 · Tajuk dikunci ikut tahap murid

- Selepas data subjek dipilih, `DATA.topik` dan `DATA.tema` ditapis kepada tema dengan tahap ≤ tahap murid. Tahap tema: medan `tingkatan` (n → 6+n), atau `darjah` untuk kandungan sekolah rendah kelak.
- Ini menyembunyikan tajuk tahap lebih tinggi daripada:
  - peta misi;
  - Stesen Ilmu dan Pusat Ulangkaji dalam Meta Didik;
  - kuiz rawak (`QLIST`);
  - pilihan skop soalan permainan.
- `TOPIK`, `TEMA`, `QBYID` dan `BYTOPIK` kekal penuh (`DATA_PENUH`), supaya rekod lama, bilik multiplayer dan rujukan id tidak rosak.
- `sqLocked(id)` kini mengunci tajuk melebihi tahap. `openBrief` memaparkan makluman "dibuka apabila anda berada di Tingkatan 5".
- Guru, pelawat dan pentadbir tidak dihadkan.
- Ujian (Playwright):
  - T4 dalam Tasawwur Islam: 13/19 tajuk (tema 4 sahaja); dunia Meta Didik dibuka dengan "0/13", tanpa `pageerror`;
  - T5 dan guru: 19/19;
  - T3 dalam PI T3: 27/27.
- Node 59/59.

## 2026-11-01 · v18.55 · Paparan penuh automatik dan subjek ikut tahap murid

**Paparan penuh**
- Modul `mdAppFs` (akhir `app.js`): skrin penuh diminta pada klik, ketikan atau kekunci pertama di laman. Pelayar tidak membenarkannya tanpa tindakan pengguna.
- Butang terapung "⤡ Keluar paparan penuh" / "⤢ Paparan penuh" (`#mdFsBtn`). Jika pemain keluar, tiada permintaan automatik lagi dalam sesi itu (`sessionStorage gt-fs-off`).
- Butang disembunyikan dalam Meta Didik dan permainan (`body.ar-lock`), yang sudah ada butang sendiri.
- Tidak aktif di iPhone dan iPad (Safari iPhone tiada API; iPad, rujuk v18.50) dan dalam mod aplikasi PWA (manifest `display: fullscreen`).
- `window.MD_APPFS`: permainan dan modul yang ditutup tidak lagi keluar dari skrin penuh peringkat aplikasi.

**Tahap murid**
- `TAHAP`: Darjah 1–6 (1–6), Tingkatan 1–5 (7–11), Tingkatan 6 (12). Setiap subjek ada `tk`: Tasawwur Islam, PI, BA, Sejarah, Sains, Matematik, BM dan BI = [10, 11]; PI T3 = [9].
- Murid hanya boleh membuka subjek yang tahap terendahnya ≤ tahap murid, jadi murid tahap lebih tinggi boleh memilih subjek tahap lebih rendah. Guru, pelawat dan pentadbir tidak dihadkan.
- Borang daftar: medan "Darjah / Tingkatan" (wajib untuk murid). Tahap tanpa kandungan ditanda "(kandungan akan datang)". Disimpan dalam `localStorage gt-tk` dan `P.tk` (tempatan sahaja; Firebase tidak diubah).
- Murid lama tanpa tahap diminta memilih semasa dibuka. Pilihan diisi awal daripada kelas dan jenis sekolah (`tahapTeka`).
- Pemilih subjek (Menu, pengepala, bar subjek) memaparkan "🔒 Untuk murid Tingkatan 4 hingga 5".
- Ujian (Playwright):
  - murid T3 hanya dapat PI T3, dan subjek bertukar automatik selepas daftar;
  - murid T4 dan T5 mendapat semua subjek;
  - guru tidak dihadkan;
  - murid lama diminta memilih tahap;
  - skrin penuh masuk pada klik pertama, keluar melalui butang dan tidak masuk semula;
  - tiada `pageerror`. Node 59/59.

## 2026-11-01 · v18.54 · E-mel rasmi admin@metadidik.com

- Pemalar `MD_EMEL` ditambah dalam `app.js`. E-mel dihoskan di Zoho Mail; rekod MX, SPF, DKIM dan DMARC disediakan oleh pemilik di DNS Exabytes.
- Alamat dipaparkan di empat tempat:
  - kaki halaman utama (`#cpFoot`, pautan mailto);
  - kotak akaun rasmi (`mdBayarBox`), iaitu borang penaja dan dompet MD;
  - mesej selepas permohonan penaja dihantar;
  - tab Privasi & data Meta Didik ID.
- Ujian: 59/59 ujian Node lulus. Kaki halaman disemak dengan Playwright (teks muncul, tiada `pageerror`).

## 2026-11-01 · v18.53 · Butang kawasan perintis Setapak dibuang dari Menu
- **Atas arahan pemilik:** butang "🏙 Setapak (data sebenar)" dibuang dari ☰ Menu dunia Meta Didik. Tanpa data OSM, ia hanya padang kosong.
- **Prakache:** `mod/perintis*.js` dikeluarkan daripada prakache service worker.
- **Kod dikekalkan:** modul, pipeline OSM, DEM dan Geospatial Validation Engine masih dalam repo (`mod/perintis*.js`, `tools/geo/`) untuk kegunaan masa depan. Ia tidak lagi boleh dicapai oleh pengguna.

---

## 2026-11-01 · v18.52 · Kod guru SEMENTARA untuk memacak inovasi
Branch `claude/guru-kod-sementara`.

**Atas arahan pemilik**
- `GURU_DELIMA_WAJIB = false`: selagi Web API Key DELIMa belum diisi, guru boleh masuk dengan kod guru di Ruang Guru.
- Selepas itu, guru nampak "🏛 Pacak inovasi di sini" dalam ☰ Menu dunia Meta Didik.
- E-mel DELIMa diisi sendiri oleh guru dan disemak pentadbir sebelum booth diluluskan (mod percubaan v18.27).

**Penutupan automatik:** sebaik `window.TW_AUTH.apiKey` diisi, `AUTH.on()` benar, jadi `guruKod()` dan `stnTrial()` menjadi palsu dan DELIMa kembali wajib tanpa perubahan kod lain.

**Diuji** (Playwright):
- kod salah ditolak dan kod betul diterima;
- butang Pacak muncul dalam Menu dan borang dibuka;
- dengan API Key diisi, `guruKod` dan `stnTrial` menjadi palsu;
- tiada ralat; Node 59/59 (ujian automasi dikemas kini untuk dasar sementara).

**Perhatian:** peraturan Firebase yang aktif mesti membenarkan mod percubaan (`docs/firebase-rules-lengkap-percubaan.json`). Peraturan "ketat" memerlukan log masuk.

---

## 2026-11-01 · v18.51 · Jalan raya di atas laut (Port Dickson dan lain-lain)
Branch `claude/jalan-pantai`.

**Masalah (dilaporkan dari iPad):** di Port Dickson, jalan raya dilukis sebagai jambatan bertiang di atas laut.

**Punca**
- Garis pantai dunia adalah kasar (~1 km), dan data jalan Natural Earth 10m serta tambahan manual juga kasar.
- Jalan pesisir jatuh ke dalam laut, dan setiap titik jalan basah dijadikan dek jambatan.

**Pembaikan** (`lmJalanPantai` dalam `lmJalanBuild`):
- **Jalan pesisir:** jika daratan ada di satu sisi jalan (serenjang, sehingga 60 unit ~ 8 km), titik itu dialih ke darat (3 unit ke dalam dari pantai) dan dilicinkan.
- **Muara sempit:** lintasan pendek (≤ 3 titik, ~2.8 km) dengan darat di kedua-dua sisi kekal sebagai jambatan.
- **Lebuh raya bertanda** (contohnya Jambatan Pulau Pinang) menggunakan jajaran sendiri dan tidak terjejas.
- **Data `meta-jalan.json`:** entri tambahan manual Sandakan → Lahad Datu → Tawau dibuang. Entri itu hanya 9 titik untuk ~250 km dan memotong Teluk Darvel sejauh ~13 km di atas laut. Laluan Sandakan → Tawau tetap bersambung melalui data Natural Earth.

**Diuji** (Playwright, seluruh Malaysia):

| Ukuran | Sebelum | Selepas |
|---|---|---|
| Titik jalan basah | 226 / 11,800 | 26 / 11,561 |
| Larian basah lebih 2 titik | 17 (terpanjang 54) | 0 |

- Semua 47 terminal bas kekal (Semenanjung 30, Borneo 17).
- Jambatan Pulau Pinang utuh.
- Tiada ralat halaman; Node 59/59.

---

## 2026-11-01 · v18.49–v18.50 · iPad: avatar tidak berjalan di dunia Meta Didik
Branch `claude/ipad-gerak` (termasuk diagnostik v18.49 daripada PR #57).

**Bukti daripada pemilik** (tangkapan iPad mini sebenar):
- gelang kayu bedik muncul di tempat jari, jadi `touchstart` sampai;
- bulatan tengah tidak bergerak, jadi `touchmove` tidak sampai ke kanvas;
- Safari dalam mod skrin penuh (butang ✕).

Emulasi Chromium tidak dapat meniru masalah ini.

**Pembaikan**
- **Diagnostik `?dbg=sentuh`:** panel peristiwa sentuhan, untuk peranti sebenar.
- **Pendengar di peringkat tetingkap:** `touchmove`, `touchend`, `touchcancel` serta `pointermove`, `pointerup`, `pointercancel` didengar pada `window` (fasa capture) untuk sentuhan kayu bedik dan kamera yang aktif. Ia tidak lagi bergantung pada sasaran kanvas.
- **Tiada skrin penuh automatik di iPad**, sama ada semasa masuk Meta Didik atau dalam dunia. Butang "Skrin penuh" masih ada.
- **Butang arah (D-pad) di iPad:** sandaran yang hanya memerlukan sentuhan mula dan tamat.

**Diuji** (emulasi iPad Mini landskap dan potret):
- kayu bedik: avatar bergerak 9.6–14.4 unit;
- butang arah: 3.8–10.7 unit;
- tiada skrin penuh;
- iPhone tidak berubah;
- Node 59/59.

**Belum disahkan pada iPad sebenar.**

---

## 2026-10-31 · v18.48 · Pusat bandar Kota Bharu ikut peta pelancong
Branch `claude/kota-bharu`, disusun di atas `claude/penerbangan-3d` (PR #55).

**Siap** (`dunia.js`)
- **Kanta berbilang:** kanta Lembah Klang dijadikan senarai `LENSES`, dan kanta kedua `KBL` ditambah untuk Kota Bharu (kira-kira 17x di tengah, radius 80 km). Fungsi yang dikemas kini: `lmWarp`, `lmUnwarp`, sempadan negeri, DEM dan lat/lon. Kawasan di luar 80 km tidak berubah. KL tidak berubah (disemak dengan tangkapan Istana Budaya).
- **Susun atur bandar:** jalan, Sungai Kelantan dan bangunan diambil daripada peta pelancong Kota Bharu (piksel ke unit, utara di atas).
  - **Kedudukan dalam bandar ialah ANGGARAN ikut peta, bukan ukuran.** Ia dilabel begitu di dalam permainan.
  - **Jalan:** 24 jalan dengan garisan tengah, dan label nama untuk jalan utama.
  - **Sungai Kelantan:** di barat, dengan pokok di tebing dan halangan supaya avatar tidak berjalan di atas air.
  - **Mercu tanda interaktif (Ziarah):**
    - Istana Balai Besar;
    - Padang Merdeka dan Muzium Perang (Bank Kerapu, dengan Jalur Gemilang);
    - Jeti Kampung Laut dan menara peninjau;
    - Pasar Siti Khadijah (id `kn-siti` dikekalkan, jadi cop lama kekal);
    - Menara Jam;
    - Stadium Sultan Muhammad IV;
    - Kelantan Trade Centre.
  - **14 bangunan bernama:**
    - Istana Jahar, Masjid Muhammadi, Muzium Diraja, Kampung Kraftangan, Istana Kota Lama;
    - Bazar Buluh Kubu, Parkson/Mydin, KB Mall;
    - Muzium Negeri, Dewan Jubli Perak, Gelanggang Seni, Perpustakaan;
    - Masjid Pakistan, gerbang Kampung Cina.
  - **Kedai:** kira-kira 430 kedai dua dan tiga tingkat di sepanjang jalan, dibina selepas jaringan jalan raya supaya tidak menindih jalan persekutuan.
  - **Gerbang:** "Selamat Datang" di Jln. Hamzah.
- **Item sedia ada dipindahkan ikut peta:** Terminal Bas Kota Bharu ke Jln. Padang Garong, dan gerai Nasi Kerabu ke Pasar Malam.
- **Tarikan seluruh Kelantan** ikut peta pelancong "Jom Terokai Kelantan" (TIC Kelantan): 19 tempat ziarah baharu. Koordinatnya ANGGARAN (pengetahuan umum lokasi), belum diukur.
  - **Tumpat:** Wat Phothivihan; Pantai Sri Tujuh dan Pengkalan Kubor.
  - **Pasir Mas:** Masjid Beijing di Rantau Panjang; Danau Tok Uban.
  - **Bachok:** Pantai Irama dan Pantai Senok; Pantai Melawi.
  - **Pasir Puteh:** Tok Bali dan Pantai Bisikan Bayu; Jeram Pasu.
  - **Machang:** Jeram Linang; Bukit Bakar.
  - **Kuala Krai:** Zoo Kuala Krai.
  - **Jeli:** Tasik Pergau; Gunung Reng.
  - **Tanah Merah:** Bukit Bunga.
  - **Dabong:** Gua Ikan.
  - **Gua Musang:** Gua Cha; Tokong Gua Musang; Taman Negara Kuala Koh; Rafflesia Lojing.
- **Model khas:**
  - air terjun bertingkat;
  - Masjid Beijing (bumbung pagoda);
  - Wat Siam dengan patung Buddha berbaring;
  - tokong Cina.
- **Zon larangan:** sistem penempatan lain (sekolah, menara, stesen, gerai dan lain-lain) kini mengelak zon pusat bandar.

**Diuji** (Playwright, desktop):
- 7 mercu tanda di kedudukan peta;
- tiada item lain bertindih dalam zon;
- jalan persekutuan tidak ditindih kedai;
- tiada ralat halaman;
- Node 59/59.

**Had**
- Peta pelancong ialah peta skematik, jadi kedudukan ialah anggaran.
- Jalan bandar ialah hiasan dan belum masuk graf navigasi atau teksi.
- Fail PDF peta tidak disimpan dalam repo (hak cipta pihak penerbit peta).

---

## 2026-10-31 · v18.47 · Penerbangan KLIA ⇄ Tanah Suci dalam 3D
Branch `claude/penerbangan-3d`, disusun di atas `claude/grafik-tanahsuci` (PR #54).

**Siap**

Peta 2D (poligon kasar) diganti dengan adegan Three.js:
- **Glob bumi:**
  - garis pantai sebenar Natural Earth (domain awam): 1:110m untuk seluruh dunia, 1:50m untuk rantau laluan;
  - warna daratan ikut zon iklim (anggaran visual);
  - air cetek di pesisir;
  - kilauan laut (peta spekular);
  - awan, atmosfera bercahaya dan bintang.
- **Laluan:** bulatan besar sebenar KLIA ke Jeddah atau Madinah (kira-kira 7,100 km), ditanda tiub emas. Pesawat naik, terbang mendatar, kemudian turun.
- **Pesawat Didik Air 3D:** model yang sama seperti di Jeddah, berorientasi ikut arah dan permukaan bumi, dengan jejak putih.
- **Kamera:** pandangan luas di permulaan, kemudian mengekori pesawat.
- **Paparan:**
  - HUD: baki km dan ketinggian;
  - label bandar bersaiz tetap di skrin;
  - kapsyen, butang Langkau dan pertanyaan miqat dikekalkan.
- **Sandaran:** peta 2D lama (`flight2D`) digunakan jika WebGL atau fail daratan gagal dimuat.

**Data dan alat**
- Data: `tanahsuci-darat.json` (233 KB, ~74 KB gzip).
- Skrip penjanaan: `tools/geo/darat_penerbangan.py`.
- Atribusi dipaparkan: "Peta: Natural Earth (domain awam) · saiz pesawat dan ketinggian dibesarkan".

**Diuji** (Playwright, emulasi iPad Mini):
- tangkapan pada 1.5 s, 5 s, 9 s dan 14 s;
- HUD dikemas kini;
- tiada ralat halaman.
- **Belum diuji pada iPad sebenar** (prestasi tekstur 4096 px).

---

## 2026-10-31 · v18.46 · Grafik Tanah Suci (Jeddah, Makkah, Madinah) dipertingkat
Branch `claude/grafik-tanahsuci`.

**Laporan pengguna:** grafik dunia Tanah Suci di Terminal Haji kurang baik:
- khemah kon ringkas;
- pasir silau tanpa tekstur;
- pesawat kotak;
- apron berjalur (z-fighting).

**Siap** (`mod/tanahsuci.js`; semua tekstur dilukis dengan kod, tiada aset luar):
- **Pencahayaan dan atmosfera:**
  - tone mapping ACES;
  - langit bergradien dengan jerebu gurun di ufuk dan cahaya matahari;
  - kabus hangat;
  - cahaya hemisfera dan matahari diseimbangkan, bayang lebih bersih.
- **Rupa bumi:** tekstur pasir (bintik dan riak angin) didarab dengan warna ketinggian dan cerun. Laut Merah berkilat.
- **Terminal Haji Jeddah:**
  - 32 modul khemah fabrik melengkung (profil konkaf);
  - tiang tinggi di setiap bucu grid dengan kabel ke gelang puncak;
  - lantai plaza;
  - blok terminal berkaca;
  - barisan pokok kurma.
- **Lapangan terbang Madinah:** terminal moden, bukan khemah haji. Sebelum ini kedua-dua lapangan terbang menggunakan model khemah Jeddah.
- **Apron dan landasan:** bertekstur, dengan garis tepi dan tengah, garis teksi kuning dan garis tempat letak pesawat. Jalur z-fighting dihapuskan.
- **Pesawat Didik Air** (2 buah):
  - badan bertekstur dengan jalur hijau dan tingkap;
  - hidung dan kokpit, ekor tirus;
  - sayap dan penstabil bersudut, enjin, sirip hijau, roda.
- **Bangunan bandar:** bertingkap dengan 6 warna batu.
- **Pembetulan rupa bumi:**
  - Ketinggian kaki avatar dan kamera kini dikira daripada jejaring yang sama seperti yang dilukis: bucu bersela 2 sampel, tapak rata pada bucu, pembahagian segi tiga yang sama.
  - Sebelum ini, di lembah curam seperti Mina, avatar dan kamera berada di bawah permukaan dan pemain nampak laut "di bawah tanah". Masalah ini wujud sebelum v18.46.
  - Kamera kini dinaikkan apabila bukit menghalang pandangan ke avatar.

**Diuji** (Playwright, emulasi iPad Mini, SwiftShader):
- tangkapan Jeddah (dekat dan jauh), Makkah dan Mina;
- raycast mengesahkan kamera di atas jejaring rupa bumi;
- ~155k segi tiga, 45–48 panggilan lukisan;
- tiada ralat halaman;
- Node 59/59.
- **Belum diuji pada iPad sebenar.**

---

## 2026-10-31 · v18.45 · Pembaikan iPad: simulasi haji 3D dan kawalan sentuh
Branch `claude/haji-ipad`.

**Laporan pengguna**
- Simulasi haji 3D di iPad: avatar pemain berada di tepi kanan dan sebahagian dunia kosong.
- iPad mini: tidak boleh berjalan.

**Punca (disahkan)**
- **Paparan senget** (`mod/prak.js`):
  - Kanvas WebGL hanya ada `inset:0` tanpa lebar dan tinggi CSS, jadi ia dipapar mengikut saiz penimbal (lebar × dpr).
  - Pada iPad (dpr 2), kanvas 1024×768 dipapar 2048×1536. Hanya suku atas-kiri kelihatan dan pemain (di tengah) terhumban ke kanan bawah.
  - Disahkan dengan kod lama dalam Playwright (emulasi iPad Mini): saiz CSS kanvas 2048×1536.
- **Tidak boleh berjalan di Tanah Suci** (`mod/tanahsuci.js`):
  - Gelang kayu bedik `.ts-js` ialah `div` di atas kanvas tanpa `pointer-events:none`.
  - Sentuhan pada gelang itu tidak sampai ke kanvas: 0 peristiwa `touchstart` atau `pointerdown` pada kanvas.
- **Sentuhan iOS** (`prak`, `tanahsuci`, `perintis`):
  - Ketiga-tiganya bergantung pada Pointer Events untuk sentuhan.
  - Dunia Meta Didik utama sudah lama menggunakan Touch Events di Safari iOS kerana Pointer Events tidak boleh dipercayai di sana.

**Pembaikan**
- `.hj-cv`: `width:100%; height:100%`. `hj3Fit` juga menetapkan saiz gaya kanvas.
- `.ts-js`: `pointer-events:none`.
- Logik sentuhan dalam simulasi haji, Tanah Suci dan kawasan perintis dikongsi melalui fungsi `down`, `move` dan `end`:
  - peranti sentuh menggunakan Touch Events (`preventDefault`, `passive:false`);
  - tetikus dan pen menggunakan Pointer Events.

**Diuji** (Playwright, emulasi "iPad Mini landscape", dpr 2, sentuhan melalui CDP):
- **Simulasi haji:** saiz CSS kanvas 1024×768, sama dengan skrin. Kayu bedik menggerakkan pemain dan seretan kamera dilepaskan dengan betul.
- **Desktop:** tiada perubahan.
- **Tanah Suci:** kayu bedik menggerakkan pemain 5.4 unit. Sebelum pembaikan: 0.
- **Kawasan perintis:** regresi desktop dan telefon lulus (pergerakan, jejambat, A*, auto-jalan).
- **Ujian unit:** Node 59/59.
- **Belum disahkan pada iPad sebenar:** Chromium tidak meniru semua tingkah laku Safari iOS.

---

## 2026-10-31 · v18.44 · Topografi sebenar (Copernicus DEM) dan rupa bumi berpetak
Branch `claude/rupa-bumi-dem`.

**Siap**

Pipeline DEM (`tools/geo/dem.py`):
- Memuat turun hanya blok GeoTIFF yang diperlukan daripada Copernicus DEM GLO-30 (AWS Open Data) melalui HTTP Range.
- Pembaca COG ditulis sendiri dalam Python dan numpy (deflate, peramal titik apung). Tiada GDAL.
- Menjana `data/perintis/setapak-dem.json` dengan grid 153 × 152 pada jarak ~30.9 × 30.7 m.
- Menyimpan nilai DSM asal, dan tanah sebagai **anggaran** (pembukaan morfologi + purata).
- Merekod sumber, lesen, atribusi, rujukan EGM2008, pendaftaran piksel (PixelIsPoint) dan indeks baris/lajur asal.

Teras (`mod/perintis-teras.js`):
- `dem` dan `tinggiTanah`: interpolasi segi tiga sama dengan jejaring yang dilukis.
- `petakTanah` dan `indeksPetak`: petak dengan bucu tepi dikongsi.
- `ysNod`: jalan ikut tanah; jambatan lurus antara tebing + dek; terowong di bawah tanah.
- `padat`.
- `sediaLot` dan `semakLot`: lot pameran tidak dibenarkan menghalang jalan, berada dalam sungai, tasik atau kolam, atau bertindih bangunan.
- `tinggiPermukaan` kini menerima tinggi tanah.
- `semakTanah` kini menerima toleransi per objek.

Enjin (`mod/perintis.js`):
- Rupa bumi 25 petak, berwarna ikut ketinggian dan cerun, dengan LOD jarak.
- Jalan, garisan, tepi, sungai dan laluan A* ikut kontur.
- Tiang jejambat dari tanah ke dek.
- Bangunan dibenam pada tanah terendah tapak.
- Pokok, lampu isyarat dan label POI di atas tanah.
- Avatar dan kamera tidak menembusi tanah.
- Matahari dan bayang mengikut ketinggian.
- Info memaparkan ketinggian "~X m dpl (anggaran)".
- Peta mini dan peta penuh dengan lorekan bukit daripada DEM.
- **Mod topografi sahaja:** jika data OSM belum ada tetapi DEM ada, Setapak dibuka dengan rupa bumi sebenar dan mesej jelas bahawa jalan, sungai dan bangunan belum dimuat. Navigasi dimatikan dengan mesej.
- Atribusi Copernicus sentiasa dipaparkan.

Dokumen: `ROADMAP.md` dan log ini.

**Diuji**

Ujian unit:
- `python3 -m unittest tools/geo/ujian_validasi.py`: 10/10 lulus. Termasuk TIFF berjubin sintetik merentas 4 jubin dibaca tepat, serta anggaran tanah yang membuang "bangunan" sempit tetapi mengekalkan bukit lebar.
- `node --test tools/ujian/*.test.js`: 59/59 lulus. Termasuk 5 ujian baharu untuk rupa bumi, petak, `ysNod`, `padat` dan lot pameran.

Playwright (SwiftShader), desktop 1280×720 dan telefon 844×390 (sentuh), DEM Setapak sebenar:
- **Jurang petak:** 1,236 bucu tepi dikongsi, beza ketinggian maksimum 0 m.
- **Avatar jatuh dari 20 m** di 5 titik (ketinggian 48–114 m): mendarat tepat di tanah, beza 0.000 m.
- **Berjalan atau berlari mendaki:** y-tanah = 0.
- **Prestasi:** 25 petak, 20 panggilan lukisan, ~14k segi tiga, heap JS ~15 MB, 10–16 FPS. Angka ini dari SwiftShader dan bersifat relatif sahaja.

Regresi fixture sintetik tanpa DEM: semua keputusan sama seperti v18.42:
- jejambat 6.5 m;
- tidak menembusi bangunan;
- laluan A* 1.44 km;
- tiada ralat halaman.

Gabungan ujian enjin (fixture sintetik di atas DEM sebenar, **bukan geografi sebenar**):
- V8 = 0;
- berdiri di dek jejambat 8.46 m di atas tanah;
- di bawahnya kekal di tanah.

Data DEM: lembah Sungai Gombak dan Setapak di barat (~40–60 m), bukit di timur laut dan tenggara (sehingga ~216 m anggaran tanah; DSM sehingga 301 m). Ini konsisten dengan rupa bumi kawasan, tetapi belum disemak dengan titik ukur JUPEM.

**Belum siap**
- Data jalan, sungai dan bangunan OSM Setapak: ⛔ rangkaian.
- Penstriman berbilang kawasan (Fasa 4).
- Integrasi `semakLot` dengan portal guru.
- Ujian pada telefon sebenar.

**Masalah**
- **Rangkaian:** `overpass-api.de`, `overpass.kumi.systems`, `api.openstreetmap.org` dan `download.geofabrik.de` masih disekat. `copernicus-dem-30m.s3.amazonaws.com` dibenarkan.
- **Copernicus GLO-30 ialah DSM.** Di kawasan bandar padat, tanah anggaran mungkin masih termasuk sebahagian blok bangunan besar (lebih lebar daripada ~210 m).
- **Teks lesen Copernicus** dalam fail perlu disemak sekali lagi oleh pemilik dengan dokumen lesen rasmi ESA sebelum terbitan awam.

**Seterusnya:** lihat `ROADMAP.md` → "Tugasan seterusnya".

---

## 2026-10-31 · v18.43 · Istana Budaya (PR #51, telah di-merge)
- Siap: model khas Istana Budaya dalam dunia utama. Landasan kereta api mengelak tapaknya.
- Diuji: ujian Node lulus; Playwright tangkapan skrin; tiada ralat halaman.

## 2026-10-31 · v18.42 · Fasa 1 kawasan perintis Setapak (PR #50, telah di-merge)
- **Siap:**
  - audit;
  - kajian dataset;
  - pipeline OSM;
  - Geospatial Validation Engine;
  - enjin 3D berskala meter;
  - navigasi A*.
- **Diuji:** pada fixture sintetik (lihat `docs/FASA1-PERINTIS.md` §6).
- **Disekat:** data OSM sebenar (rangkaian).

---

## Automasi (cadangan, BELUM diaktifkan)
Persekitaran Claude Code di cloud menyokong **tugasan berjadual**. Ia memulakan sesi baharu mengikut jadual dan menghantar prompt tetap.

Cadangan kitaran harian:
1. **Jadual:** sekali sehari di luar waktu sibuk, contohnya 02:40 waktu Malaysia.
2. **Mod:** sesi baharu setiap kali dijalankan, dalam persekitaran repositori ini.
3. **Prompt:**
   > Baca `ROADMAP.md` dan `DEVELOPMENT_LOG.md`. Semak branch, commit dan PR terbuka. Pilih SATU tugasan teratas yang belum siap dan boleh diuji, laksanakan, jalankan `node --test tools/ujian/*.test.js` dan `python3 -m unittest tools/geo/ujian_validasi.py`, kemas kini kedua-dua dokumen, commit ke branch baharu `claude/harian-<tarikh>` dan buka PR untuk semakan. Jangan merge, jangan deploy, jangan ubah data produksi Firebase. Jika disekat (rangkaian, kunci API), tulis halangan dalam log dan berhenti.
4. **Pagar keselamatan:**
   - PR sahaja, tiada merge automatik;
   - tiada akses rahsia produksi;
   - pemilik menyemak setiap PR.

**Cara mengaktifkan:** pemilik boleh meminta dalam sesi Claude Code: "jadualkan kitaran pembangunan harian seperti dalam DEVELOPMENT_LOG.md". Jadual akan dicipta dan dipaparkan untuk pengesahan. Ia juga boleh dibuang atau dijeda bila-bila masa.
