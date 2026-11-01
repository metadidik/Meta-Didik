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
