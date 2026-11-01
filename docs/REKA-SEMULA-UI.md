# Meta Didik: reka semula UI/UX (fasa 1)

Tarikh: 2026-11-01 · Versi: v18.59 · Branch: `claude/reka-semula-ui`. PR ini bertindan atas PR #66, iaitu prototaip Bangunan Sultan Abdul Samad.

Prinsip: *"Kurang antara muka, lebih pengembaraan."* Ini ialah reka semula aplikasi sedia ada. Akaun, avatar, kuiz, inovasi guru, multiplayer, Firebase dan kemajuan murid kekal.

## 1. Audit ringkas (berkaitan UI)

| Bahagian | Kod | Penemuan |
|---|---|---|
| Halaman utama | `index.html` `#v-map` (`#mdHero`, `#testi`, `#pjBar`), gaya dalam `app.css` | Tema gelap "ketenteraan" dan neon diwarisi dari permainan Tempur. Teks penerangan panjang. CTA "Masuk Meta Didik". Testimoni ialah karusel sedia ada (`renderTesti`), dipaparkan apabila Firebase memulangkan data. |
| HUD permainan | `dunia.js` `lmHud()` dan CSS `LM_CSS` | 9 pil maklumat di kiri atas (kawasan, masa/cuaca, mata, MD, tenaga, cop, stesen, rakan, destinasi), kad "Seterusnya", senarai misi, peta mini, menu, joystik, 4 butang bulat. Pada telefon, semuanya bersaing dengan dunia 3D. |
| Menu | `lmMenu()` (v18.57) | Grid 8 ikon dan baris togol. Lebih baik daripada versi sebelumnya tetapi masih rata, tanpa kategori. |
| Label 3D | `lmHudTick` / gelung `cullT` | Semua label dalam 260 unit (~35 km) dipaparkan, jadi Lembah Klang penuh dengan label bertindih. |
| Mercu tanda | `lmPlaceOpen` | Kuiz ziarah (5 soalan daripada tajuk negeri, cop pasport) **sudah wujud**, tetapi terus membuka kuiz tanpa pilihan. |
| Tenaga | `lmEnergy`, `lmMove` | Tenaga **hanya memperlahankan pergerakan**: <15% → 75% laju, 0% → 50% laju, dengan amaran. Makan di kedai atau kantin memulihkannya. Ia tidak menyekat permainan. |
| Avatar | `avatar3d.js`, `zvSvg` | Avatar sengaja tanpa wajah (dasar sedia ada); pakaian menutup aurat. |

## 2. Spesifikasi visual

**Palet:**

| Warna | Kod | Kegunaan |
|---|---|---|
| Langit | `#39BCEB` | Kad Jelajah, langit |
| Kuning | `#FFC857` | Tindakan utama |
| Hijau | `#65D6A0` | Kad Belajar, keadaan aktif |
| Ungu | `#9474E8` | Kad Kawan |
| Latar | `#F4FAFF` | Latar halaman dan panel cerah |
| Navy | `#17324D` | Teks dan panel terpilih |

**Fon:** Fredoka (tajuk) dan Nunito (teks), kedua-duanya sudah dimuat dan menyokong Bahasa Melayu. Tiada fon baharu.

### 2.1 Halaman utama
- **Hero cerah:**
  - tajuk "Jom Jelajah & Belajar!" dan teks sokongan;
  - CTA kuning **🚀 Mula Jelajah** (id `mdGo` dikekalkan, jadi aliran masuk dunia tidak berubah);
  - butang kedua **🎓 Ruang Guru** (`setView("guru")`) dan **▶ Cara Bermain** (skrol ke bahagian).
- **Jalur ilustrasi SVG ciptaan sendiri:** Menara Berkembar, Menara KL, Bangunan Sultan Abdul Samad (fasad putih krim, kubah tembaga), bukit, laluan, pokok kelapa dan satu booth inovasi kecil.
  - Avatar murid dilukis dengan `zvSvg` sedia ada. Jika murid sudah mencipta avatar, avatar mereka dipaparkan di tengah.
- **Bahagian ringkas:** Cara Bermain (3 langkah), Aktiviti Menarik (Jelajah, Kuiz, Inovasi Guru), testimoni (karusel sedia ada, gaya cerah) dan Penaja (`pjJalur` sedia ada, gaya cerah). Tiada testimoni atau logo rekaan.

### 2.2 HUD permainan

| Kedudukan | Kandungan |
|---|---|
| Kiri atas | Butang avatar (lencana pangkat; ketik untuk Profil), nama kawasan, butang ▾ status |
| Panel status (▾) | Masa/cuaca, mata hari ini, MD, tenaga, cop, Stesen Ilmu, rakan, misi pelancong hari ini |
| Amaran tenaga | Cip kecil di kiri atas **hanya apabila tenaga ≤ 35%**, contohnya "😫 Tenaga 12% · makan dahulu" |
| Tengah atas | Kad objektif "🎯 Seterusnya" (sedia ada, dipusatkan) |
| Kanan atas | Peta mini (bucu bulat, bingkai putih), butang ☰ Menu |
| Kiri bawah | Joystik lutsinar |
| Kanan bawah | **Lompat** (kuning, besar) dan **⋯**. Butang ⋯ membuka 🏃 Lari, 🎉 Raikan dan 💬 Chat (Chat hanya dalam bilik). |
| Tengah bawah | Butang tindakan kontekstual sedia ada (kuning, contohnya "🏛 Bangunan Sultan Abdul Samad") |
| Label 3D | Mercu tanda dan Stesen Ilmu muncul dalam ~22 km, objek lain dalam ~12 km (dahulu semua ~35 km) |

**Peta mini kekal segi empat.** Peta mini memaparkan seluruh Malaysia (Semenanjung hingga Sabah). Bentuk bulat akan memotong Sabah dan Sarawak. Peta mini bulat setempat boleh dibina dalam fasa lapisan negeri (rujuk `docs/MERCU-TANDA-AUDIT.md` §2).

### 2.3 Menu Utama
- **Grid 2×2 / 4×1** (ikut orientasi): 🌏 **Jelajah**, 📚 **Belajar**, 🧑‍🤝‍🧑 **Kawan**, 👤 **Profil**. Setiap kad membuka submenu:
  - **Jelajah:** Peta Malaysia, Destinasi, Pasport, Misi hari ini.
  - **Belajar:** Subjek, Tajuk, Kuiz, Inovasi Guru (guru: + Pacak inovasi).
  - **Kawan:** Main Bersama, Chat, Raikan, Swafoto (+ Suara jika dibenarkan).
  - **Profil:** Avatar & Profil (Gudang di dalamnya), Pencapaian, Ruang Privasi, Tetapan.
- **Baris utiliti:** Waktu Solat, Kolam Ikan, Bunyi, Siang/Malam, Top 5, Tetapan, Keluar. Butang yang aktif ditanda dengan bingkai hijau.
- Tiada fungsi lama dibuang. Semua fungsi kekal dalam satu atau dua ketikan.

### 2.4 Interaksi mercu tanda
Menghampiri mercu tanda memaparkan butang "🏛 *nama*". Ketik untuk membuka kad kecil:
- **📖 Jawab Kuiz** — kuiz ziarah sedia ada, 5 soalan, cop pasport;
- **🔎 Kenali Tempat** — fakta dan Swafoto;
- **Teruskan jelajah** atau ✕ untuk menutup.

Tiada bangunan kuiz baharu dan tiada penanda gergasi.

## 3. Perkara dalam master prompt yang BELUM dibuat (fasa seterusnya)

| Perkara | Sebab / keperluan |
|---|---|
| Lapisan "Jelajah Malaysia → Pilih Negeri" | Bergantung pada keputusan negeri perintis dan pelan tiga lapisan (PR #66) |
| Booth guru bebas dengan semakan pelayan | Bergantung pada keputusan grid lot (Rules) atau Cloud Functions (PR #66 §4) |
| Penambahbaikan persekitaran 3D (taman, laluan, bunga) | Perlu ukuran prestasi pada telefon sebenar dahulu; dibuat di zon perintis |
| Animasi avatar dan wajah lebih lembut | Avatar sengaja tanpa wajah (dasar sedia ada). Perubahan wajah memerlukan keputusan pemilik. |
| Mod potret khusus untuk dunia 3D | Susun atur potret disokong (tiada pertindihan dalam ujian 390×844). Landskap kekal disyorkan. |

## 4. Catatan mengenai lakaran rujukan
- Panel kuiz dalam lakaran menandakan **1909** sebagai jawapan betul bagi "Bilakah Bangunan Sultan Abdul Samad dibina?". Data Meta Didik sedia ada menyatakan **1897**. Bangunan itu siap dibina pada 1897; 1909 ialah tahun Masjid Jamek. Soalan sebenar dalam Meta Didik tidak diubah.
- Lakaran memaparkan wajah pada avatar. Meta Didik kekal dengan avatar tanpa wajah sehingga pemilik memutuskan sebaliknya.

## 5. Ujian

| Ujian | Keputusan |
|---|---|
| Node `tools/ujian/*.test.js` | 59/59 lulus |
| Playwright telefon potret 390×844 (sentuh) | Halaman utama; Cara Bermain skrol; Ruang Guru membuka paparan guru; Mula Jelajah membuka dunia; HUD, menu dan butang ⋯ tanpa pertindihan |
| Playwright telefon landskap 844×390 (sentuh) | HUD, panel status, menu 2×2, submenu Jelajah, kad mercu tanda (Bangunan Sultan Abdul Samad) |
| Playwright desktop 1280×800 | Halaman utama dan HUD |
| `pageerror` | Tiada dalam semua senario |

**Prestasi:** perubahan ini ialah DOM/CSS. Pengurangan jarak label mengurangkan sprite yang dilukis, tetapi kesan FPS **belum diukur pada peranti sebenar** (SwiftShader tidak mewakili).

## 6. Sebelum dan selepas
- `docs/reka-semula/utama-telefon.jpg`
- `docs/reka-semula/utama-desktop.jpg`
- `docs/reka-semula/hud-landskap.jpg`
- `docs/reka-semula/menu-landskap.jpg`
- `docs/reka-semula/potret.jpg`
- `docs/reka-semula/landskap-*.jpg` (panel status, butang ⋯, submenu, kad mercu tanda)

---

# Fasa 2 (v18.60): Meta Didik 2.0, pendaftaran dan modal iPhone

Turutan ikut cadangan pemilik: pendaftaran dan modal iPhone dahulu, kemudian ruangan komen, kemudian borang penaja.

## Audit (kod sebenar)

| Isu yang dilaporkan | Punca dalam kod |
|---|---|
| Modal bertindih dengan jam dan Dynamic Island | `.overlay` (`app.css`) hanya `padding:16px`, tanpa `env(safe-area-inset-*)`. Ini ditambah pula dengan `viewport-fit=cover` dan `black-translucent`. |
| Modal panjang melimpah atau bahagian atas tidak boleh dicapai | `.overlay` menggunakan `display:grid; place-items:center` dengan `overflow-y:auto`. Item yang lebih tinggi daripada skrin terkeluar di atas dan tidak boleh diskrol. |
| Jurang dan kandungan kelihatan di atas header | Gaya sebaris `:root{padding-top:env(...)}` bersama `.top{position:sticky; top:env(...)}`: kandungan yang diskrol kelihatan di celah status bar |
| Borang daftar panjang | Semua medan (peranan, tahap, nama, negeri, kelas, sekolah, pindah akaun, 4 butang) dalam satu skrin dengan 3 perenggan penerangan |
| Hierarki butang lemah | "Sahkan", "Batal", "Meta Didik ID" dan "Padam kemajuan" bersebelahan dalam satu baris |

## Pembaikan
- **Kawasan selamat:**
  - `.overlay` diberi padding `env()` di empat sisi;
  - item bermula di atas dengan `margin-block:auto` (berpusat jika muat, boleh diskrol dari atas jika tinggi);
  - satu kawasan skrol sahaja (`overscroll-behavior:contain`);
  - skrol latar dikunci (`body:has(.overlay:not([hidden]))`).
- **Header:** `.top{top:0; padding-top:env(safe-area-inset-top)}`. Padding atas sebaris pada `:root` dibuang.
- **Kad dunia** (`#lmOv .lm-card`) turut diberi padding `env()`.
- **Wizard pendaftaran 3 langkah** (`RG`, `rgGo`, `rgMula`, `rgSalah2`, `rgRingkas`):
  1. **Peranan:** kad besar Murid, Guru (DELIMa) atau Pelawat. Pengguna baharu terus ke langkah 2. "Sudah ada akaun?" (pindah antara peranti) dilipat.
  2. **Maklumat:** nama panggilan, tahap (murid), subjek (guru), negeri, sekolah (carian senarai sedia ada) dan kelas. Pengesahan berlaku di langkah ini dengan mesej yang jelas.
  3. **Sahkan:** ringkasan dengan butang ✎ untuk kembali ke langkah berkaitan, serta **Kembali** dan **✔ Sahkan & Mula Jelajah**. Pengguna baharu terus masuk dunia; mod ubah profil menggunakan butang "Simpan".
  - Semua id medan dan `confirmReg()` asal dikekalkan, jadi rekod sekolah, kelas, tahap, peranan dan Firebase tidak berubah. Tiada akaun baharu dicipta.
  - Mod ubah profil (`openReg(false)`) bermula di langkah 2 dengan tajuk "Kemas kini profil".
  - **Padam kemajuan** dipindah ke "Tetapan lanjut" (dilipat, berwarna merah) dengan penerangan kesan. Pengesahan dua ketikan sedia ada kekal.
- Butang paparan penuh disembunyikan semasa modal dibuka. Teks modal lama yang gelap dipulihkan supaya mudah dibaca.

## Ujian (Playwright, 390×844 sentuh)
- **Pengguna baharu:** pilih Murid → langkah 2 → pengesahan medan kosong (nama ditanda) → isi → langkah 3 → ringkasan betul → ✎ kembali → Sahkan. Rekod `P` dan `gt-tk` betul, dan dunia dibuka.
- **Guru:** medan subjek dan nota DELIMa dipaparkan. **Pelawat:** medan sekolah dan tahap disembunyikan.
- **Mod ubah:** bermula di langkah 2, nama diisi, dan "Tetapan lanjut" muncul.
- **Modal tinggi pada skrin 390×640:** bahagian atas kad berada pada 12 px dari atas dan boleh diskrol. Modal pendek (kod subjek) berpusat. Skrol latar dikunci.
- Node 59/59. Tiada `pageerror`.
- **Belum diuji:** Safari iOS sebenar (Dynamic Island). Inset kawasan selamat tidak boleh disimulasikan dalam Chromium. **Perlu disahkan pada iPhone.**

## Imej
- `docs/reka-semula/daftar.jpg` (sebelum dan 3 langkah)
- `docs/reka-semula/daftar-ubah.jpg` (mod ubah dengan Tetapan lanjut)

## Seterusnya
1. Ruangan komen "Suara Komuniti" (kad padat, Laporkan dalam menu ⋮).
2. Borang penaja: wizard 4 langkah dalam Ruang Penaja; butiran akaun bank hanya selepas diluluskan.
3. **Privasi murid (keputusan pemilik):** nama sekolah kini dipaparkan kepada pemain lain (papan kedudukan, bilik). Cadangan: sembunyikan sekolah secara lalai bagi murid, dengan tetapan untuk membukanya.

---

# Fasa 3 (v18.61): privasi sekolah murid dan Ruang Penaja (bayar dahulu)

Keputusan pemilik (2026-11-01):
- **setuju** nama sekolah murid disembunyikan secara lalai;
- **penaja mesti membuat bayaran sebelum disahkan.**

## Privasi sekolah murid
- **Tetapan:** `P.psk`.
  - Murid: **tertutup secara lalai**. Guru: dipaparkan secara lalai.
  - Pilihan dalam langkah 2 pendaftaran: "Paparkan nama sekolah saya kepada pemain lain". Ringkasan langkah 3 menunjukkan "Dipaparkan" atau "Disembunyikan".
- **Rekod:** setiap rekod pemain membawa `ps` (1 = dipaparkan). Rekod lama tanpa `ps` **dianggap tersembunyi**.
- **Paparan** (`skPapar`): nama sekolah pemain lain disembunyikan dalam:
  - papan kedudukan pemain;
  - senarai pangkat;
  - senarai rakan dalam bilik;
  - senarai Battle;
  - papan Top 5 dalam dunia 3D.
- **Kehadiran masa nyata** (bilik dan Battle) tidak lagi menghantar nama sekolah apabila tetapan ditutup.
- Papan kedudukan **sekolah** (agregat) tidak terjejas, dan markah murid tetap dikira untuk sekolahnya.
- **Had yang diakui:** rekod `pemain/` dan `rkm_*` masih menyimpan `sk` dan `sid` kerana diperlukan untuk agregat sekolah, dan kedua-dua nod itu boleh dibaca umum. Ini privasi peringkat paparan, bukan perlindungan data penuh. Perlindungan data penuh memerlukan perubahan skema, iaitu memisahkan rekod peribadi daripada agregat sekolah yang dikira oleh fungsi pelayan. Ia dicadangkan sebagai fasa berasingan.

## Ruang Penaja: wizard 4 langkah, bayar dahulu
Butiran aliran dalam `docs/PENAJA.md`. Ringkasan:
- Butiran → Pakej → Lokasi & organisasi → **Bayar & hantar**.
- Rujukan transaksi bayaran **wajib di borang dan dalam Firebase Rules**; resit pilihan.
- Pentadbir: **Bayaran disahkan → Luluskan**, dengan pengesahan jumlah dan rujukan.
- Butiran akaun bank hanya dalam Ruang Penaja (langkah 4), bukan dalam dunia murid.
- `ov()` tidak lagi menggunakan skrol bersarang (`max-height`/`overflow` dibuang; overlay sahaja yang diskrol).

**Pemasangan:** peraturan Firebase baharu (`docs/firebase-rules-*.json`) perlu dipasang oleh pemilik di Firebase Console. Penjana peraturan ialah `tools/ujian/penaja-rules.py`.

## Ujian
- **Node:** 59/59, termasuk 2 semakan baharu bagi `rb` dalam Rules.
- **Playwright 390×844, penaja** (Firebase disimulasikan):
  - langkah 1 menolak jumlah kosong;
  - hantar tanpa rujukan ditolak;
  - hantar tanpa tanda bayaran ditolak;
  - hantar lengkap menulis `penaja_mohon/…` dengan `rb`;
  - skrin "Permohonan diterima" dipaparkan.
- **Playwright, privasi:**
  - lalai murid tutup, guru buka, pelawat tiada medan;
  - ringkasan "Disembunyikan";
  - `P.psk = 0`;
  - `skPapar` menyembunyikan pemain `ps:0` dan rekod lama, memaparkan `ps:1` dan diri sendiri;
  - kehadiran tidak menghantar `sk`.
- Tiada `pageerror`.

---

# Fasa 4 (v18.62): borang Pacak Inovasi guru

- Borang yang sama digunakan dalam dunia 3D (☰ Menu → Belajar → 📌 Pacak inovasi) dan dalam Ruang Guru.
- **Sebelum:** satu senarai 9 medan bertema gelap dengan perenggan penerangan panjang, dalam kad yang mempunyai skrol bersarang.
- **Selepas:** kad cerah dengan:
  - lokasi 📍 di atas;
  - wizard **Inovasi → Subjek → Media & harga → Semak**;
  - kategori dan harga sebagai cip besar;
  - kiraan aksara huraian;
  - mesej ralat per langkah;
  - **pratonton kad booth** sebelum hantar.
- `stnSubmit` dan struktur data `stesen/<uid>` tidak berubah. Kelulusan pentadbir masih diperlukan.
- Imej: `docs/reka-semula/pacak-inovasi.jpg`.
