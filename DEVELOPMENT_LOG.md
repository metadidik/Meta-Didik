# Meta Didik: Log pembangunan

Entri terbaru di atas. Setiap entri mengandungi:
- apa yang siap;
- apa yang diuji;
- apa yang belum siap;
- masalah;
- langkah seterusnya.

Status fasa ada dalam `ROADMAP.md`.

---

## 2026-11-01 · v18.76 · Uniform PKBM Darat, Laut dan Udara

- **Uniform baharu:**
  - item Avatar Studio **PKBM Darat**, **PKBM Laut** dan **PKBM Udara** (Pasukan Kadet Bersatu Malaysia), 120 MD setiap satu, untuk lelaki dan perempuan;
  - warna dipermudah sebagai ilustrasi, bukan replika rasmi: Darat hijau zaitun dengan lencana lengan merah, Laut putih dengan seluar biru tua dan tali leher, Udara biru muda dengan biru kelabu;
  - semua dengan lilitan bahu (lanyard) kuning.
- **Avatar Studio:** set lengkap Set PKBM Darat/Laut/Udara dan Padanan Sesuai (Jalur Gemilang, lencana pengawas).
- **Serasi dengan multiplayer:** klien lama yang belum dikemas kini memaparkan pakaian sekolah.
- **Ujian:**
  - Node 59/59;
  - Playwright: ketiga-tiga item dalam grid Pakaian dan pratonton;
  - tiada `pageerror`.

## 2026-11-01 · v18.75 · Evolusi avatar 3D (model, animasi, emote) dan HUD ikut lakaran

- **Audit:**
  - avatar ialah model prosedural Three.js r128 (`avatar3d.js`), dikongsi oleh pratonton Gudang, dunia Meta Didik dan multiplayer melalui satu kod konfigurasi (`AV3.code`, `g|sk|ou|...`);
  - tiada fail GLB;
  - animasi berasaskan pose (`POSE0`, `RAI`).
  - Pendekatan dipilih: naik taraf model sedia ada, bukan gantikan dengan GLB. Semua item Gudang, item dimiliki dan kod multiplayer kekal serasi tanpa migrasi data.
- **Model:**
  - kepala lebih besar (gaya watak pengembaraan mesra kanak-kanak, skala 1.36);
  - rambut bervolum (jambul, sisi, poni);
  - kening (bergerak), hidung kecil, mata, senyuman dan pipi (v18.74);
  - tapak kasut putih.
- **Animasi (mesin keadaan dengan pengadunan):**
  - diam: bernafas, alih berat badan, kepala bergerak, kelip mata, kening;
  - jalan → lari diadun lancar dengan condong ke depan semasa lari;
  - lompat: naik, udara, mendarat dengan mampatan lembut;
  - pusingan lancar tanpa lompat sudut, dengan condong ke arah pusingan.
- **Emote baharu:**
  - Lambaian (`em_lb`), Gembira (`em_gb`), Salam (`em_sl`), serta Tepuk Tangan (`rc_tp`) dan Keraian Saya;
  - dihantar kepada pemain lain melalui medan `rc` sedia ada; klien lama mengabaikan kunci baharu.
- **HUD:**
  - logo Meta Didik (skrin lebar);
  - panel kiri Inventori, Avatar, Misi dan Ganjaran (mendatar dalam landskap pendek);
  - bar emote ✋👍🙌👏 dengan butang 😊;
  - karusel emote bergambar avatar (sentiasa kelihatan di skrin lebar, ditogol di telefon);
  - panah pada joystick;
  - label nama lebih kecil;
  - emote disembunyikan semasa menaiki kenderaan.
- **Tidak dibuat (perlukan aset atau peranti sebenar):**
  - model GLB/rig rangka sebenar, LOD dan pemampatan tekstur;
  - kamera anti-tembus bangunan (kamera sedia ada dikekalkan);
  - ujian pada peranti fizikal.
- **Ujian:**
  - Node 59/59;
  - Playwright 900×414, 390×844 dan 1280×600: HUD tanpa pertindihan (panel kiri/joystick/panduan, bar emote/Lari-Lompat, karusel/joystick/butang), emote Lambaian dimainkan, dunia dimuat;
  - tiada `pageerror`.
  - Tangkapan: `docs/reka-semula/avatar-evolusi.jpg`.

## 2026-11-01 · v18.74 · Avatar Studio (Gudang avatar direka semula ikut lakaran)

- **Audit (sebelum):**
  - halaman gelap;
  - 12 butang kategori bertimbun;
  - kad item ringkas;
  - avatar 3D tanpa wajah;
  - beli terus tanpa pengesahan.
- **Avatar Studio:**
  - kepala halaman: ikon, tajuk, MD dan bantuan ❓;
  - pratonton 3D di atas pentas cerah dengan gelang bercahaya, butang Depan/Sisi dan zum ＋/－, serta "Seret untuk pusing";
  - butang jantina Lelaki/Perempuan dan warna kulit;
  - butang **Simpan Gaya**, **Rawak**, **Tanggalkan Semua** dan **Set Saya** (maksimum 4 gaya, `P.zv.sets`).
- **Kedai:**
  - cip kategori berikon;
  - Warna baju dan Warna penutup digabung ke dalam tab Pakaian dan Penutup Kepala;
  - tab **Set Lengkap** (Sekolah, Sekolah Agama, Sukan, Hari Raya, PBSM, Pengakap, Kadet Polis) dan tab **Percuma**.
- **Kad item:**
  - tahap Percuma, Biasa, ★ Rare atau 💎 Istimewa (ikut harga);
  - ✓ Dipakai, Dimiliki → Pakai, Beli N, atau "Kurang N MD";
  - butang 👕 Cuba.
- **Halaman butiran:**
  - pratonton besar, keterangan, harga dan status milikan;
  - butang Cuba Dulu, Beli Sekarang dan Pakai;
  - **Padanan Sesuai**: 3 aksesori yang sepadan.
- **Pembelian:**
  - dialog pengesahan ringkas dengan baki selepas beli;
  - jika MD tidak cukup, cara mendapatkan MD dipaparkan.
- **Interaksi:**
  - selepas memakai item, avatar bertepuk dan percikan ✨;
  - wajah ringkas (mata, senyuman, pipi) pada avatar 3D dan 2D;
  - mata berkelip.
- **Data kekal:**
  - `P.zv` (g, sk, own, eq, sb), harga, slot, MD, lencana sekolah dan integrasi dengan Meta Didik dan peta tidak berubah;
  - medan baharu `sets` adalah pilihan.
- **Tidak dibuat:**
  - "Popular minggu ini" dan "Murid lain juga suka", kerana tiada data penggunaan sebenar dan saya tidak mahu memaparkan populariti palsu;
  - item ganjaran kuiz dan koleksi mingguan (fasa seterusnya).
- **Ujian:**
  - Node 59/59;
  - Playwright 390×844: beli Baju Melayu melalui dialog (160 → 40 MD), set lengkap, simpan gaya, rawak, "Kurang N MD", wajah 3D lelaki/perempuan, dunia Meta Didik masih dimuat;
  - tiada `pageerror`.
  - Tangkapan: `docs/reka-semula/avatar-studio.jpg`.

## 2026-11-01 · v18.73 · Kuiz Tahun 1–6 dan Tingkatan 1–6 (draf) untuk BM, Matematik, Sains dan Pendidikan Islam

- **Kandungan:** 585 soalan dan 117 tajuk baharu, ditanda **draf, perlu semakan guru**. DSKP rasmi tidak dapat dicapai; lihat `docs/KUIZ-DRAF.md`.
- **Paparan:**
  - peta dan Stesen Ilmu memaparkan satu tahap pada satu masa;
  - pemilih tahap ada di Menu → Belajar (murid: tahap sendiri atau lebih rendah) dan di Peta Operasi (guru, lalai Tingkatan 4 & 5).
- **Stesen kuiz** di mercu tanda sedia ada yang sesuai dengan subjek (`KUIZ_STESEN` → `lmSilmuList`).
- **`tools/kuiz-gabung.py`:**
  - gabung draf ke `app.js`, `soalan_*.json` dan `dunia.js`;
  - kemas kini `SUBJS[].tk` dan versi cache;
  - kod tajuk ringkas (contoh 3.1, T1.1).
- **Pembaikan:**
  - semakan "bank soalan rosak" (< 50 soalan) kini mengira semua tahap, bukan tahap murid sahaja;
  - id soalan PI (medan `id`) tidak lagi bertindih.
- **Ujian:**
  - Node 59/59;
  - Playwright:
    - Tahun 3 Sains: 3 tajuk dan 3 stesen di Cameron Highlands, Tasik Kenyir dan Menara KL;
    - Tingkatan 5 Tasawwur Islam tidak berubah;
    - guru Sains lalai Tingkatan 4 & 5;
    - Tahun 6 PI: 90 soalan;
    - Tingkatan 1 Matematik: 105 soalan;
  - tiada `pageerror`.

## 2026-11-01 · v18.72 · Penilaian murid selepas bermain permainan kendiri (stesen rasmi)

- **Kad penilaian:**
  - selepas murid kembali daripada Tempur, Misi Lagenda, Amali, Dunia Ilmu, Busana atau Nelayan, kad "Bagaimana <permainan> tadi?" dibuka;
  - murid memberi 1 hingga 5 bintang dan komen pilihan (ditapis kata kesat, pautan dan nombor telefon), atau tekan "Nanti".
- **Penyimpanan:**
  - `stesen_nilai/md-<permainan>-<subjek>/<peranti>` dan `stesen_komen/...`, iaitu nod dan Rules sedia ada yang sama dengan inovasi guru;
  - hanya selepas pentadbir memasang stesen rasmi, kerana Rules mensyaratkan stesen "lulus".
- **Paparan:**
  - nota stesen di kad lokasi memaparkan purata bintang;
  - papan pentadbir memaparkan purata bintang setiap permainan dan 10 komen terkini.
  - Penilaian inovasi guru (v18.34) tidak berubah.
- **Ujian:**
  - Node 59/59;
  - Playwright: Mula Tempur (-5 MD), kembali ke dunia, kad penilaian dibuka, 4 bintang dihantar ke `stesen_nilai/md-tp-tw/<peranti>`;
  - tiada `pageerror`.

## 2026-11-01 · v18.71 · Pil perjalanan kecil (kereta api, bas, teksi, feri, kapal terbang)

- **Masalah:** panel perjalanan besar di tengah atas skrin menutup pemandangan dan kad panduan "Seterusnya".
- **Reka semula** (komponen `.lm-fl` yang sama untuk semua kenderaan):
  - pil separa lutsinar di bawah tengah;
  - laluan (satu baris, dipendekkan jika panjang) dan status/kelajuan kuning;
  - bar kemajuan nipis di tepi bawah pil;
  - butang **Langkau** kecil di kanan.
  - Bagi kapal terbang, butang "Langkau ke pendaratan" dipendekkan menjadi "Langkau ⏭".
- **Kedudukan:**
  - landskap: antara joystick dan butang Lari/Lompat;
  - potret: lebar penuh di atas joystick.
  - Tiada pertindihan dengan joystick, butang atau kad panduan (disemak secara automatik).
- **Ujian:**
  - Playwright 1000×460 dan 390×844;
  - tiada `pageerror`.

## 2026-11-01 · v18.70 · Butang bunyi, tenaga 3 kali makan sehari, permainan kendiri sebagai Stesen Inovasi

- **Butang bunyi (jimat bateri):**
  - butang 🔊/🔇 di lajur kanan HUD dan dalam Menu Utama;
  - pilihan disimpan (`gt-lm-senyap`);
  - apabila senyap, AudioContext digantung supaya tidak menggunakan CPU.
- **Tenaga:**
  - kadar susut dikurangkan: berjalan 0.5 → 0.2, lari 0.8 → 0.28, renang 0.9 → 0.32 % sesaat;
  - tenaga penuh tahan kira-kira 8 minit pergerakan berterusan, iaitu 8 jam permainan;
  - setiap kali makan (kedai makan atau kantin) tenaga menjadi penuh, jadi 3 kali makan sehari (permainan) mencukupi.
- **Permainan kendiri sebagai Stesen Inovasi Meta Didik:**
  - lokasi terlibat: Tempur dan Misi Lagenda (kem), Amali (masjid), Dunia Ilmu (perpustakaan), Busana (butik) dan Nelayan (jeti), iaitu 42 lokasi;
  - setiap lokasi kini ada lampu emas, nota "⭐ Stesen Inovasi Meta Didik · soalan <subjek semasa> · harga", dan tanda emas pada peta mini dan peta besar;
  - murid membayar MD sekali sehari bagi setiap permainan dan subjek melalui `stesen_guna/md-<permainan>-<subjek>` (Rules sedia ada, tidak berubah).
- **Pentadbir (Dashboard → tabung dan tuntutan MD):**
  - bahagian baharu "Permainan kendiri murid";
  - butang **Pasang stesen rasmi** (54 rekod: 6 permainan × 9 subjek, harga 5 hingga 50 MD);
  - jumlah MD diterima daripada murid setiap bulan mengikut permainan dan subjek.
  - MD ini **tidak** diagih kepada guru dalam tabung.
  - Sebelum dipasang, permainan kendiri kekal percuma.
- **Ujian:**
  - Node 59/59;
  - Playwright: 42 lokasi berlampu emas, butang bunyi tersimpan, kad kem memaparkan nota stesen, bayaran 40 → 35 MD direkod di `stesen_guna/md-tp-tw/...`, papan pentadbir mengasingkan MD guru (10) dan MD permainan (15), pasang 54 stesen;
  - tiada `pageerror`.

## 2026-11-01 · v18.69 · Gelaran guru/pelawat dan pintasan Salam

- **Pendaftaran:** guru dan pelawat memilih gelaran pada langkah 2.
  - Senarai guru: Cikgu, Ustaz, Ustazah, Sir, Puan, Encik, dan lain-lain.
  - Senarai pelawat: Encik, Puan, Cik, Tuan, Haji, Hajah, Dr., Prof., Ustaz, Ustazah, Cikgu, dan lain-lain.
  - Gelaran wajib dipilih dan dipaparkan dalam ringkasan.
  - Disimpan dalam `P.gel` (medan sama seperti gelaran guru v18.29).
- **Dalam Meta Didik:**
  - nama guru dipaparkan "🎓 Ustaz Ali" seperti sebelum ini;
  - pelawat kini dipaparkan bergelaran (contoh "Puan Aminah") melalui presence `pw` dan `pg`.
- **Pintasan Salam:**
  - butang hijau 👋 **Salam** muncul di lajur kanan HUD apabila murid berada dalam 14 unit daripada guru atau pelawat;
  - satu ketikan menghantar "Assalamualaikum, Ustaz Ali!" (presence `sl`/`sn`/`sk`, had 5 saat);
  - penerima melihat makluman dan butang kuning **Jawab** (20 saat) untuk membalas "Waalaikumussalam!".
- **Perubahan dasar pelawat (v18.64):**
  - pelawat kini masuk Dunia Terbuka supaya murid boleh memberi salam;
  - chat dua hala antara pelawat dan murid **tetap disekat** (tidak boleh hantar dan mesej diabaikan);
  - Kawan dan Ruang Privasi kekal ditutup untuk pelawat.
  - Satu-satunya interaksi ialah salam dengan frasa tetap.
- **Pembaikan kecil:**
  - medan sekolah tidak lagi muncul semula untuk pelawat selepas memilih negeri;
  - nota peranan pelawat dikemas kini.
- **Ujian:**
  - Node 59/59;
  - Playwright untuk pendaftaran pelawat bergelaran (ditolak tanpa gelaran), butang Salam muncul apabila guru dekat dan hilang apabila jauh, presence salam dan jawapan, chat pelawat disekat;
  - tiada `pageerror`.
  - Pertemuan sebenar dua peranti tidak dapat diuji kerana Firebase disekat oleh rangkaian pembangunan.

## 2026-11-01 · v18.68 · Peta Operasi & Pusat Pembelajaran (Meta Didik 2.0)

- **Audit (sebelum):**
  - peta SVG skematik (`buildMap`, `DATA.negeri` dan `DATA.topik`) bertema gelap neon;
  - penanda heksagon dengan 3 titik bintang;
  - panel misi di bawah peta yang menutup peta dalam landskap;
  - label "Misi kendiri murid" yang kosong kerana disembunyikan CSS.
- **Peta:** teknologi SVG sedia ada dikekalkan (ringan di telefon). Bentuk, susunan negeri dan koordinat tidak diubah. Gaya baharu:
  - laut biru cerah dengan riak;
  - darat hijau mengikut status;
  - tebing tanah cerah dan bayang lembut;
  - sempadan putih halus dan label negeri biru tua.
- **Miniatur mercu tanda (ilustrasi ringkas):** Menara Berkembar Petronas dan Gunung Kinabalu. Kedudukannya **anggaran** pada peta skematik, bukan koordinat sebenar, dan belum disemak dengan sumber rasmi.
- **Penanda:**
  - pin bulat dengan nombor;
  - ✓ hijau apabila selesai;
  - 🔒 kelabu apabila terkunci;
  - denyut lembut untuk misi seterusnya;
  - bingkai emas untuk 3 bintang.
  - ID tajuk, `sqLocked` dan `P.prog` tidak diubah.
- **Mission Card:**
  - cip bidang/tema, Tingkatan dan kod;
  - tajuk, negeri, bintang dan bar kemajuan;
  - objektif (nota pertama);
  - **▶ Mula Belajar** (membuka Slaid PdPc) dan **📍 Pergi ke Destinasi**;
  - aktiviti Slaid PdPc, Latihan AR, Misi Jentik, Misi Belon dan Next Level (butang, ID dan fungsi asal);
  - misi lain dalam negeri;
  - taklimat dan skop DSKP.
  - Kad boleh dikembang, dikecil, ditutup dan dibuka semula (**📋 Kad Misi**).
- **Pergi ke Destinasi:**
  - masuk Meta Didik dan bermula di Stesen Ilmu yang memegang tajuk itu (`tids`);
  - jika tiada, di pin negeri tajuk dengan formula yang sama seperti Menara Ilmu (`toW` dan `lmSnap`);
  - menggunakan mekanisme `LM.resume` sedia ada, tanpa koordinat baharu.
- **Susun atur:**
  - desktop: peta besar dengan kad di sisi kanan (sticky);
  - telefon potret: pemilih negeri, peta, kad sebagai bottom sheet yang dikecilkan dahulu;
  - telefon landskap: peta dominan dengan kad di sisi.
- **Ujian:**
  - Node 59/59;
  - Playwright 390×844, 844×390 dan 1366×800: penanda dipilih, kad dikecil, ditutup dan dibuka semula, Mula Belajar memanggil Slaid PdPc untuk tajuk yang betul;
  - tiada skrol mendatar dan tiada `pageerror`.
  - Tangkapan: `docs/reka-semula/peta-operasi-2-0.jpg` dan `peta-operasi-landskap.jpg`.
- **Belum dibuat:**
  - zum/cubit pada peta (masih guna butang besarkan sedia ada);
  - pengelompokan penanda (24 penanda tidak bertindih teruk);
  - lebih banyak miniatur mercu tanda yang disahkan sumber rasmi;
  - butang alat terapung lama (komen, dadu, Aa, anak panah) belum dikemas kini.

## 2026-11-01 · v18.67 · Reka bentuk ikut lakaran Meta Didik 2.0 (8 panel)

- **Permintaan pemilik:** "tiru design macam ni sebijik" (lakaran 8 panel).
- **Paparan utama:**
  - bendera Malaysia di penjuru dan logo Meta Didik bertopi graduasi;
  - tajuk ungu "Jom Jelajah & Belajar!" dan ilustrasi kanak-kanak dengan mercu tanda;
  - butang kuning "▶ Mula Jelajah";
  - tiga butang: Ruang Guru, Daftar Anggota dan Ruang Penaja;
  - menu hamburger: Cara Bermain, Suara Komuniti, Paparan penuh, Hubungi kami.
  - Header gelap disembunyikan pada paparan utama.
- **Daftar Anggota:**
  - kad peranan bergambar;
  - titik "Langkah 1 daripada 3";
  - tajuk "Daftar Anggota (Murid/Guru/Pelawat)";
  - ikon di dalam medan, termasuk bendera bagi negeri;
  - Kelas di bawah Sekolah;
  - "Sahkan Maklumat" dengan ikon biru dan butang hijau.
- **HUD:**
  - avatar dengan pil nama dan kawasan;
  - cip ⚡ tenaga dan syiling MD;
  - peta mini bulat yang berpusat pada pemain;
  - lajur kanan Menu, Kawan dan Chat;
  - Lari dan Lompat bulat;
  - kad destinasi biru tua.
  - Raikan dipindah ke Menu Utama.
- **Suara Komuniti:**
  - butang Tulis Komen (borang dilipat);
  - cip Semua/Murid/Guru;
  - kad padat dengan avatar huruf dan lencana peranan;
  - Laporkan dalam menu ⋮.
- **Ruang Penaja:**
  - halaman pakej dahulu (gambar pingat, "Mohon Tajaan →");
  - "Permohonan Tajaan" 4 langkah (Butiran, Pakej, Lokasi, Bayar) dengan ikon medan.
  - Bayar dahulu kekal wajib.
- **Aset:** `img/ui/*.webp` dipotong daripada lakaran pemilik projek (ilustrasi kanak-kanak, kad peranan, pingat penaja) dan dimasukkan ke dalam cache `sw.js`. Ia resolusi rendah: ganti dengan fail asal resolusi tinggi jika ada.
- **Dikekalkan dengan sengaja (berbeza dengan lakaran):**
  - Ruang Guru hanya untuk guru (peraturan v18.64);
  - tiada "Lv." atau 💎 permata, kerana tiada data sebenar dan pangkat dibuang dalam v18.65;
  - tiada ❤ suka atau Balas pada komen, kerana memerlukan nod dan Rules Firebase baharu;
  - tiada loceng notifikasi, kerana tiada sistem notifikasi;
  - avatar dalam permainan kekal tanpa wajah;
  - gelembung "Jawab Kuiz" dan papan maklumat mercu tanda kekal seperti sedia ada.
- **Ujian:**
  - Node 59/59;
  - Playwright 390×844 dan 1280×800 untuk paparan utama (murid/guru/pelawat), menu hamburger (buka/Escape), wizard 3 langkah sehingga dunia dibuka, HUD, Suara Komuniti (tapisan dan ⋮), dan Ruang Penaja (pakej → langkah 1 → pakej disegerakkan);
  - tiada `pageerror`.
  - Tangkapan: `docs/reka-semula/lakaran-2-0.jpg`.

## 2026-11-01 · v18.66 · Booth "akan datang" sentiasa muncul selepas guru memacak

- **Laporan pemilik:** booth bertanda "akan datang" tidak muncul selepas memacak.
- **Diuji dengan Firebase simulasi.** Logik paparan berfungsi jika simpan dan baca berjaya, tetapi gagal dalam dua keadaan:
  1. bacaan senarai `stesen` gagal: `lmStnFetch` berhenti, jadi tiada booth;
  2. simpan ditolak oleh Rules: mesej Inggeris "Permission denied" sahaja.
- **Pembaikan:**
  - selepas berjaya dihantar, dokumen disimpan dalam `gt-stn-saya`; `lmStnFetch` sentiasa menggabungkannya, jadi booth guru sendiri dilukis walaupun bacaan gagal;
  - mesej penolakan dalam Bahasa Melayu dengan punca (peraturan Firebase perlu dikemas kini);
  - kegagalan `stesen_em` tidak lagi menggagalkan permohonan;
  - makluman jika booth dipaparkan dalam dunia subjek lain.
- **Ujian:**
  - Node 59/59;
  - Playwright untuk 3 senario: biasa (booth muncul), bacaan gagal (booth tetap muncul), simpan ditolak (mesej Bahasa Melayu);
  - tiada `pageerror`.

## 2026-11-01 · v18.65 · Pangkat tentera dibuang dari Meta Didik (kekal dalam Tempur)

- Butang nama di paparan utama (`renderMe`), butang avatar HUD dan panel Profil dalam dunia kini memaparkan **avatar pemain** (`mdAvatarMini`, menggunakan `zvSvg`; huruf awal nama jika avatar belum dicipta) dan **peranan** (Guru, Murid · Tingkatan X, Pelawat), bukan lencana dan nama pangkat Tempur.
- Bar kemajuan pangkat di butang nama disembunyikan.
- Sistem pangkat, XP dan paparan pangkat dalam permainan Tempur tidak berubah.
- **Ujian:** Node 59/59; Playwright (butang nama "Guru · 35 mata" dengan avatar; profil tanpa pangkat); tiada `pageerror`.

## 2026-11-01 · v18.64 · Akses ikut peranan: murid, pelawat dan guru

- **Murid dan pelawat:** butang Ruang Guru di paparan utama disembunyikan (`mdGuru`, `guruUi`).
- **Guru:**
  - wajib e-mel DELIMa (`@moe-dl.edu.my`) dalam pendaftaran langkah 2; jika log masuk DELIMa sudah dipasang (`AUTH.on()`), butang log masuk sebenar dipaparkan;
  - e-mel disimpan dalam `gt-stn-em` dan dihantar ke `stesen_em` (pentadbir sahaja) semasa menghantar inovasi;
  - `guruDaftarOk()` menjadikan guru berdaftar sebagai guru (selagi `AUTH.on()` palsu);
  - butang **📌 Tambah Inovasi** dalam Menu Utama memasang booth di kedudukan semasa guru (`lmPacak`).
- **Pelawat** (`mdPelawat`, `lmPelawat`), tanpa e-mel:
  - interaksi dihadkan kepada `LM_PELAWAT_OK` (booth, tempat, pengangkutan, kedai makan, penaja, maklumat);
  - kuiz, Stesen Ilmu, Menara, kem Tempur, nelayan dan situasi akhlak ditolak;
  - kad tempat tanpa "Jawab Kuiz";
  - booth: pengenalan inovasi sahaja, tanpa Guna/Suka/penilaian;
  - tidak menyertai bilik multiplayer, jadi tiada chat atau suara dan tidak kelihatan kepada murid;
  - menu tanpa Kawan, Kuiz dan Ruang Privasi.
- **Ujian:**
  - Node 59/59;
  - Playwright untuk 3 peranan: daftar, butang Ruang Guru, menu, bilik, e-mel bukan DELIMa ditolak, Tambah Inovasi, Stesen Ilmu ditolak bagi pelawat, kad tempat tanpa kuiz;
  - tiada `pageerror`.

## 2026-11-01 · v18.63 · Terowong boleh dimasuki dan ditembusi

- **Tiub terowong** (`lmTunTiub`) untuk 6 terowong (Menora, Genting Sempah, Bukit Berapit, Genting ECRL, SMART, Penchala), sepanjang jajaran sebenar dari mulut ke mulut:
  - dinding konkrit berlengkung, jalan bergaris (atau landasan), kerb;
  - lampu siling (`InstancedMesh`);
  - bingkai mulut berlubang.
  - Pintu gelap portal lama di sepanjang tiub disembunyikan.
- **Profil lantai:** sekurang-kurangnya 1.2 unit di bawah permukaan bukit, dengan penapis minimum dan purata. Dari setiap mulut, cerun maksimum 1.0, jadi bahagian berbumbung di mulut ialah ~9 unit.
- **Mod terowong:**
  - `lmTunMasuk`: berjalan ke dalam mulut;
  - `lmTunGerak`: ikut lantai, dihadkan dinding;
  - keluar di mulut sebelah sana;
  - `lmTunSah`: mod ditamatkan jika avatar dipindahkan oleh sistem lain.
- **Kamera:** di belakang avatar sejajar terowong, dengan had tinggi ikut lantai di kedudukan kamera. Selepas keluar, kamera kekal dekat sehingga avatar jauh dari mulut. Laut disembunyikan semasa dalam terowong (lantai boleh di bawah paras laut).
- **Ujian:**
  - Node 59/59;
  - Playwright: berjalan menembusi Genting Sempah (masuk di Selangor, keluar di Pahang), Menora dan Penchala;
  - tiada `pageerror`.
- Imej: `docs/reka-semula/terowong.jpg`.

## 2026-11-01 · v18.62 · Borang Pacak Inovasi guru direka semula

- `stnGuruBox` (digunakan dalam dunia 3D dan Ruang Guru) menjadi wizard 4 langkah bertema cerah:
  1. **Inovasi:** tajuk, kategori (cip), huraian dengan kiraan aksara.
  2. **Subjek:** subjek dan tajuk berkaitan.
  3. **Media & harga:** YouTube, pautan, harga MD (cip), e-mel DELIMa (mod percubaan).
  4. **Semak:** pratonton kad booth.
- Pengesahan per langkah menggunakan peraturan yang sama dengan `stnSubmit`, yang kekal sebagai pengesahan akhir. Medan data dan struktur `stesen/<uid>` tidak berubah.
- Lokasi dipaparkan sebagai kad 📍 di atas. Kad dunia: tajuk "📌 Pacak Inovasi" dengan ✕, tema cerah (`lm-mu lm-pc`). Skrol bersarang `.lm-stnform` dibuang dalam kad ini.
- Borang perjanjian (guru baharu) dan nota mod percubaan turut menggunakan gaya cerah.
- **Ujian:**
  - Node 59/59;
  - Playwright 844×390 sentuh sebagai guru (kod sementara, Firebase disimulasikan): tajuk kosong ditolak; berbayar tanpa pautan ditolak; hantar menulis `stesen/<uid>` dengan tj, kat, sj, tp, hg, url, pn dan `st: tunggu`;
  - paparan perjanjian dan Ruang Guru disemak;
  - tiada `pageerror`.

## 2026-11-01 · v18.61 · Privasi sekolah murid dan Ruang Penaja (bayar dahulu)

- **Privasi sekolah** (`skPaparSaya`, `skPapar`, `P.psk`, medan `ps`):
  - murid tersembunyi secara lalai, guru dipaparkan;
  - pilihan dalam pendaftaran;
  - semua paparan pemain lain disembunyikan (papan kedudukan, pangkat, bilik, Battle, Top 5 dunia);
  - kehadiran tidak menghantar sekolah.
  - Agregat sekolah kekal. Had: rekod `pemain/` dan `rkm_*` masih menyimpan sekolah (didokumenkan).
- **Ruang Penaja:** wizard 4 langkah. Rujukan bayaran wajib di borang dan dalam Firebase Rules (`rb`), resit pilihan (`bukti`). Pentadbir "Bayaran disahkan → Luluskan".
- `tools/ujian/penaja-rules.py` dikemas kini dan Rules dijana semula. `docs/PENAJA.md` dikemas kini.
- **Ujian:**
  - Node 59/59, termasuk semakan `rb`;
  - Playwright untuk aliran penaja (Firebase disimulasikan) dan privasi;
  - tiada `pageerror`.

## 2026-11-01 · v18.60 · Meta Didik 2.0 fasa 2: wizard pendaftaran dan pembaikan modal iPhone

- **Punca pertindihan dengan status bar:**
  - `.overlay` tanpa padding `env()`;
  - `place-items:center` memotong modal yang tinggi;
  - `:root` sebaris diberi padding atas.
- **Diperbaiki:** padding `env()`, item bermula di atas dengan `margin-block:auto`, kunci skrol latar, `.top` dengan padding safe-area.
- **Borang daftar** menjadi wizard 3 langkah (Peranan, Maklumat, Sahkan):
  - kad peranan besar, pengesahan per langkah, ringkasan boleh diubah;
  - pengguna baharu terus masuk dunia;
  - Padam kemajuan dipindah ke "Tetapan lanjut".
  - Semua id medan dan `confirmReg` dikekalkan.
- Butiran dalam `docs/REKA-SEMULA-UI.md` (Fasa 2).
- **Ujian:**
  - Node 59/59;
  - Playwright 390×844 dan 390×640 (aliran murid/guru/pelawat, mod ubah, modal tinggi dan pendek);
  - tiada `pageerror`.
  - Safari iOS sebenar belum diuji.

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
