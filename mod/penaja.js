/* =====================================================================
   PENAJA META DIDIK (dimuat apabila perlu melalui modLoad("penaja"))
   Borang permohonan penaja, kad maklumat penaja dan kotak semakan Dashboard Pentadbir.
   Bergantung pada app.js: el, toast, mdBayarBox, FB, AUTH, kmAdm, kmAdmReq, kmAdmPut, PJ, PJ_PAKEJ, PJ_TEMPOH, PJ_LOK, pjLok, pjMuat.
   ===================================================================== */
(function () {
  "use strict";
  const PANTANG = "rokok/vape, minuman keras, perjudian, pinjaman wang tidak berlesen, kandungan dewasa, politik kepartian, dan apa-apa yang bercanggah dengan nilai murni atau dasar pendidikan";
  function ov(id, label) {
    let o = document.getElementById(id);
    if (!o) { o = el("div", { class: "overlay", id: id, role: "dialog", "aria-modal": "true", "aria-label": label }); document.body.appendChild(o); o.addEventListener("click", (e) => { if (e.target === o) o.hidden = true; }); }
    o.textContent = ""; o.hidden = false;
    const c = el("div", { class: "mcard", style: "max-width:760px;width:100%" }); o.appendChild(c); /* v18.61: satu kawasan skrol (overlay), tiada skrol bersarang */
    const x = el("button", { type: "button", class: "btn alt sm", style: "float:right" }, "Tutup"); x.addEventListener("click", () => { o.hidden = true; }); c.appendChild(x);
    return c;
  }
  const webOk = (u) => /^https?:\/\/[\w.-]+\.[a-z]{2,}(\/[^\s]*)?$/i.test(String(u || ""));

  /* ---------- kad maklumat penaja ---------- */
  function pjKad(d) {
    const c = ov("pjKadOv", "Penaja " + d.n), pk = PJ_PAKEJ[d.pk] || {}, lk = pjLok(d.lk);
    c.append(el("div", { class: "tagline" }, (pk.ic || "") + " " + (pk.n || "PENAJA").toUpperCase()), el("div", { class: "pjprev", style: "margin:8px 0" }, el("img", { src: d.logo, alt: d.n })), el("h1", { style: "margin:4px 0" }, d.n));
    if (d.tl) c.appendChild(el("p", { style: "margin:0 0 6px" }, d.tl));
    if (lk) c.appendChild(el("p", { class: "muted", style: "margin:0 0 6px;font-size:14px" }, "🏢 Cari bangunan " + d.n + " di " + lk.n + " dalam Meta Didik."));
    if (webOk(d.web)) c.appendChild(el("a", { class: "btn alt sm", href: d.web, target: "_blank", rel: "sponsored noopener noreferrer" }, "Lawati laman web ↗"));
    c.appendChild(el("p", { class: "muted", style: "margin:10px 0 0;font-size:12px" }, "Kandungan tajaan. Meta Didik menyemak setiap penaja sebelum dipaparkan."));
  }

  /* ---------- logo: kecilkan dalam pelayar supaya muat dalam pangkalan data (tiada storan fail diperlukan) ---------- */
  function logoProses(file) {
    return new Promise((ok, no) => {
      if (!file || !/^image\//.test(file.type)) { no(new Error("Pilih fail imej (PNG, JPG, SVG atau WebP).")); return; }
      if (file.size > 5 * 1024 * 1024) { no(new Error("Fail logo melebihi 5 MB.")); return; }
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => {
        const W = 400, H = 200, s = Math.min(W / (img.naturalWidth || W), H / (img.naturalHeight || H), 1), w = Math.max(1, Math.round((img.naturalWidth || W) * s)), h = Math.max(1, Math.round((img.naturalHeight || H) * s));
        const cv = document.createElement("canvas"); cv.width = w; cv.height = h; const x = cv.getContext("2d"); x.drawImage(img, 0, 0, w, h); URL.revokeObjectURL(url);
        let d = cv.toDataURL("image/png");
        if (d.length > 110000) { x.globalCompositeOperation = "destination-over"; x.fillStyle = "#fff"; x.fillRect(0, 0, w, h); d = cv.toDataURL("image/jpeg", 0.85); }
        if (d.length > 110000) d = cv.toDataURL("image/jpeg", 0.6);
        ok(d);
      };
      img.onerror = () => { URL.revokeObjectURL(url); no(new Error("Logo tidak dapat dibaca.")); };
      img.src = url;
    });
  }

  /* ---------- v18.61: borang permohonan penaja: wizard 4 langkah, BAYAR DAHULU sebelum disahkan ----------
     1 Butiran (jumlah, tempoh, jenis) · 2 Pakej · 3 Lokasi & organisasi · 4 Pegawai, bayaran & hantar.
     Rujukan transaksi bayaran wajib (juga dikuatkuasakan dalam Firebase Rules); pentadbir mengesahkan penerimaan bayaran sebelum meluluskan. */
  function pjBuka() {
    const c = ov("pjOv", "Jadi Penaja Meta Didik"); c.classList.add("pjw");
    const S = { s: 1, logo: "", bukti: "" };
    const hd = el("div", { class: "pjw-hd" }, el("div", { class: "tagline" }, "RUANG PENAJA"), el("h1", null, "🤝 Jadi Penaja Meta Didik"), el("p", { class: "muted" }, "Sokong pembangunan pendidikan digital Malaysia."));
    const prog = el("ol", { class: "pjw-prog", "aria-hidden": "true" }); ["Butiran", "Pakej", "Lokasi", "Bayar & hantar"].forEach((t, i) => prog.appendChild(el("li", { "data-p": String(i + 1) }, el("b", null, String(i + 1)), el("span", null, t))));
    const no = el("p", { class: "pjw-no", "aria-live": "polite" });
    c.append(hd, prog, no);
    const st = [1, 2, 3, 4].map((n) => { const x = el("section", { class: "pjw-s pjform", "data-s": String(n) }); c.appendChild(x); return x; });
    const fld = (box, lab, node, nota) => { const d = el("div", { class: "field" }); d.append(el("label", null, lab), node); if (nota) d.appendChild(el("small", { class: "muted" }, nota)); box.appendChild(d); return node; };
    /* 1. butiran */
    const rm = fld(st[0], "Jumlah tajaan (RM) *", el("input", { type: "number", min: "1", step: "1", inputmode: "numeric", placeholder: "Contoh: 500" }), "Meta Didik menerima sebarang jumlah. Semua sumbangan digunakan untuk pembangunan Meta Didik.");
    const bln = el("select", { "aria-label": "Tempoh paparan logo" }); PJ_TEMPOH.forEach((v) => bln.appendChild(el("option", { value: String(v) }, v + " bulan")));
    const jenis = el("select", { "aria-label": "Jenis organisasi" }); [["syarikat", "Syarikat / perniagaan"], ["pendidikan", "Sekolah, PIBG, NGO atau badan pendidikan"], ["individu", "Individu"]].forEach(([v, t]) => jenis.appendChild(el("option", { value: v }, t)));
    fld(st[0], "Tempoh paparan logo *", bln); fld(st[0], "Jenis penaja *", jenis);
    /* 2. pakej */
    const pkBox = el("div", { class: "pjpk pjw-pk", role: "radiogroup", "aria-label": "Paparan yang diingini" }); st[1].appendChild(pkBox);
    Object.keys(PJ_PAKEJ).forEach((k, i) => { const p = PJ_PAKEJ[k], r = el("input", { type: "radio", name: "pjpk", value: k }); if (i === 1) r.checked = true;
      const more = el("details", null, el("summary", null, "Lihat butiran"), el("small", null, p.d));
      pkBox.appendChild(el("label", { class: "pjw-pkc" }, r, el("i", { "aria-hidden": "true" }, p.ic), el("b", null, p.n), more)); });
    st[1].appendChild(el("small", { class: "muted" }, "Pilihan ini cadangan anda. Paparan sebenar disahkan oleh pentadbir."));
    /* 3. lokasi & organisasi */
    const lok = el("select", { "aria-label": "Lokasi tajaan" }); lok.appendChild(el("option", { value: "" }, "Pilih kedai/bangunan di lokasi sebenar..."));
    const ambil = {}; PJ.list.forEach((d) => { ambil[d.lk] = d.n; });
    PJ_LOK.forEach(([id, n]) => { const o = el("option", { value: id }, n + (ambil[id] ? " (sudah ditaja)" : "")); if (ambil[id]) o.disabled = true; lok.appendChild(o); });
    fld(st[2], "Lokasi dalam Meta Didik *", lok, "Satu penaja bagi setiap lokasi. Rakan Pendidikan: papan iklan. Emas dan Platinum: kedai/bangunan berjenama.");
    const sy = fld(st[2], "Nama syarikat / organisasi *", el("input", { maxlength: "60", autocomplete: "organization" }));
    const ssm = fld(st[2], "No. pendaftaran (SSM / ROS / kod sekolah)", el("input", { maxlength: "30" }));
    const tl = fld(st[2], "Slogan ringkas", el("input", { maxlength: "80", placeholder: "Contoh: Bersama membina generasi celik digital" }));
    const web = fld(st[2], "Laman web (pilihan)", el("input", { maxlength: "120", type: "url", placeholder: "https://" }));
    const wk = fld(st[2], "Warna jenama", el("input", { type: "color", value: "#1f6feb", style: "width:80px;height:44px" }));
    const lg = fld(st[2], "Logo * (PNG, JPG, SVG atau WebP)", el("input", { type: "file", accept: "image/*" }));
    const prev = el("div", { class: "pjprev", "aria-live": "polite" }, el("span", { class: "muted", style: "font-size:12px" }, "Pratonton logo")); st[2].appendChild(prev);
    st[2].appendChild(el("small", { class: "muted" }, "Pratonton sahaja; penempatan sebenar dalam dunia 3D disahkan oleh pentadbir."));
    lg.addEventListener("change", async () => { try { S.logo = await logoProses(lg.files[0]); prev.textContent = ""; prev.appendChild(el("img", { src: S.logo, alt: "Pratonton logo" })); } catch (e) { S.logo = ""; prev.textContent = e.message; } });
    /* 4. pegawai, bayaran, pengesahan */
    const pic = fld(st[3], "Nama pegawai *", el("input", { maxlength: "60", autocomplete: "name" }));
    const hp = fld(st[3], "No. telefon *", el("input", { maxlength: "20", type: "tel", autocomplete: "tel" }));
    const em = fld(st[3], "E-mel *", el("input", { maxlength: "80", type: "email", autocomplete: "email" }));
    const nota = fld(st[3], "Nota (pilihan)", el("textarea", { maxlength: "300", rows: "2" }));
    const bayar = el("div", { class: "pjw-bayar" }); st[3].appendChild(bayar);
    const rb = fld(st[3], "No. rujukan transaksi bayaran *", el("input", { maxlength: "40", autocomplete: "off", placeholder: "Contoh: rujukan dalam resit perbankan" }), "Wajib. Permohonan disahkan hanya selepas pentadbir menyemak penerimaan bayaran.");
    const bk = fld(st[3], "Resit / bukti bayaran (pilihan, gambar)", el("input", { type: "file", accept: "image/*" }));
    const bkp = el("div", { class: "pjprev", style: "height:90px" }); st[3].appendChild(bkp);
    bk.addEventListener("change", async () => { try { S.bukti = await logoProses(bk.files[0]); bkp.textContent = ""; bkp.appendChild(el("img", { src: S.bukti, alt: "Bukti bayaran" })); } catch (e) { S.bukti = ""; bkp.textContent = e.message; } });
    const ck = el("input", { type: "checkbox", id: "pjCk" }), ck2 = el("input", { type: "checkbox", id: "pjCk2" });
    st[3].append(el("label", { for: "pjCk2", class: "pjw-chk" }, ck2, el("span", null, "Saya telah membuat bayaran ke akaun rasmi Meta Didik di atas.")),
      el("label", { for: "pjCk", class: "pjw-chk" }, ck, el("span", null, "Saya mengesahkan logo dan maklumat ini milik organisasi saya, dan produk/perkhidmatan kami tidak melibatkan " + PANTANG + ".")));
    /* navigasi */
    const out = el("p", { class: "pjw-err", role: "alert" }), prevB = el("button", { type: "button", class: "btn alt" }, "Kembali"), next = el("button", { type: "button", class: "btn" }, "Seterusnya →"), sb = el("button", { type: "button", class: "btn pjw-go" }, "Hantar permohonan");
    c.append(out, el("div", { class: "pjw-ft" }, prevB, next, sb));
    const v = (n, m) => String(n.value || "").replace(/[<>]/g, "").trim().slice(0, m);
    const pk = () => (pkBox.querySelector("input:checked") || {}).value || "emas";
    const salah = (n) => n === 1 ? (!(Math.round(+rm.value || 0) >= 1 && +rm.value <= 10000000) ? [rm, "Isi jumlah tajaan (RM)."] : null)
      : n === 3 ? (!lok.value ? [lok, "Pilih lokasi dalam Meta Didik."] : v(sy, 60).length < 3 ? [sy, "Isi nama penaja."] : !S.logo ? [lg, "Muat naik logo."] : v(web, 120) && !webOk(v(web, 120)) ? [web, "Laman web mesti bermula dengan https://"] : null)
      : n === 4 ? (v(pic, 60).length < 3 ? [pic, "Isi nama pegawai."] : !/^\+?6?0[\d\s-]{8,13}$/.test(v(hp, 20)) ? [hp, "Isi nombor telefon yang sah."] : !/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(v(em, 80)) ? [em, "Isi e-mel yang sah."] : v(rb, 40).length < 4 ? [rb, "Isi no. rujukan transaksi bayaran."] : !ck2.checked ? [ck2, "Sahkan bahawa bayaran telah dibuat."] : !ck.checked ? [ck, "Tandakan pengesahan."] : null) : null;
    const go = (n) => {
      S.s = n; st.forEach((x, i) => { x.hidden = i + 1 !== n; });
      prog.querySelectorAll("li").forEach((x) => { const p = +x.dataset.p; x.className = p < n ? "ok" : p === n ? "on" : ""; });
      no.textContent = "Langkah " + n + " daripada 4"; out.textContent = "";
      prevB.hidden = n === 1; next.hidden = n === 4; sb.hidden = n !== 4;
      if (n === 4) { bayar.textContent = ""; const jum = Math.round(+rm.value || 0); bayar.append(el("b", null, "💳 Langkah bayaran"), el("p", null, "Sila buat bayaran RM" + jum.toLocaleString("ms-MY") + " (" + PJ_PAKEJ[pk()].n + ", " + bln.value + " bulan) ke akaun rasmi di bawah, kemudian masukkan no. rujukan transaksi."), mdBayarBox(v(sy, 60) || "nama organisasi")); }
      const o = document.getElementById("pjOv"); if (o) o.scrollTop = 0;
    };
    next.addEventListener("click", () => { const x = salah(S.s); if (x) { out.textContent = x[1]; try { x[0].focus(); } catch (e) { /* abaikan */ } return; } go(S.s + 1); });
    prevB.addEventListener("click", () => go(Math.max(1, S.s - 1)));
    sb.addEventListener("click", async () => {
      for (const n of [1, 3, 4]) { const x = salah(n); if (x) { go(n); out.textContent = x[1]; try { x[0].focus(); } catch (e) { /* abaikan */ } return; } }
      const d = { sy: v(sy, 60), ssm: v(ssm, 30), tl: v(tl, 80), web: v(web, 120), wk: /^#[0-9a-f]{6}$/i.test(wk.value) ? wk.value : "#1f6feb", pic: v(pic, 60), hp: v(hp, 20), em: v(em, 80), nota: v(nota, 300), pk: pk(), lk: lok.value, bln: +bln.value, jn: jenis.value, rm: Math.round(+rm.value || 0), logo: S.logo, rb: v(rb, 40), t: { ".sv": "timestamp" } };
      if (S.bukti) d.bukti = S.bukti;
      if (!d.web) delete d.web; if (!d.ssm) delete d.ssm; if (!d.tl) delete d.tl; if (!d.nota) delete d.nota;
      if (!FB.url) { out.textContent = "Permohonan memerlukan sambungan pelayan Meta Didik."; return; }
      sb.disabled = true; out.textContent = "Menghantar...";
      try {
        if (typeof AUTH !== "undefined" && AUTH.on()) await AUTH.ensure();
        await FB.req("PUT", "penaja_mohon/pj" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), d);
        c.textContent = ""; c.classList.add("pjw");
        c.append(el("div", { class: "pjw-ok" }, el("i", { "aria-hidden": "true" }, "✅"), el("h1", null, "Permohonan diterima"),
          el("p", null, "Terima kasih, " + d.sy + ". Permohonan dan maklumat bayaran RM" + d.rm.toLocaleString("ms-MY") + " (rujukan " + d.rb + ") telah dihantar."),
          el("p", null, "Pentadbir akan menyemak penerimaan bayaran. Logo dipaparkan selepas bayaran disahkan. Kami akan menghubungi " + d.em + (typeof MD_EMEL !== "undefined" ? " dari " + MD_EMEL : "") + ".")));
        const t = el("button", { type: "button", class: "btn" }, "Tutup"); t.addEventListener("click", () => { document.getElementById("pjOv").hidden = true; }); c.appendChild(t);
      } catch (e) { sb.disabled = false; out.textContent = "Gagal dihantar (kod " + (e.code || "rangkaian") + "). Cuba lagi."; }
    });
    go(1);
  }

  /* ---------- pentadbir: semak permohonan, luluskan, urus penaja aktif ---------- */
  const ADM = { m: null, a: null };
  async function pjAdminBox(host) {
    if (typeof kmAdm !== "function" || !kmAdm()) return;
    host.textContent = "";
    const c = el("details", { class: "card", style: "margin:8px 0" }); host.appendChild(c);
    const n = ADM.m ? ADM.m.filter((x) => !x.st).length : 0;
    c.appendChild(el("summary", { style: "cursor:pointer;font-weight:700" }, "Pentadbir: penaja Meta Didik" + (ADM.m ? " (" + n + " permohonan baharu, " + ADM.a.length + " aktif)" : ""))); c.open = !!ADM.m;
    const muat = el("button", { type: "button", class: "btn alt sm" }, "Muat permohonan & penaja"); c.appendChild(muat);
    muat.addEventListener("click", async () => {
      try {
        const m = (await kmAdmReq("GET", "penaja_mohon")) || {}; ADM.m = Object.keys(m).map((id) => Object.assign({ id: id }, m[id])).sort((a, b) => (b.t || 0) - (a.t || 0));
        const a = (await kmAdmReq("GET", "penaja")) || {}; ADM.a = Object.keys(a).map((id) => Object.assign({ id: id }, a[id])).sort((x, y) => (y.tamat || 0) - (x.tamat || 0));
      } catch (e) { toast("Gagal memuat (kod " + (e.code || "rangkaian") + ").", "bad"); return; }
      pjAdminBox(host);
    });
    if (!ADM.m) return;
    const now = Date.now(), aktifLk = {}; ADM.a.forEach((d) => { if (!d.tamat || d.tamat > now) aktifLk[d.lk] = d.n; });
    const tarikh = (t) => (t ? new Date(t).toLocaleDateString("ms-MY") : "-");
    c.appendChild(el("h3", { style: "margin:10px 0 4px" }, "Permohonan"));
    if (!ADM.m.length) c.appendChild(el("p", { class: "muted" }, "Tiada permohonan."));
    ADM.m.forEach((x) => {
      const d = el("div", { class: "card", style: "gap:6px;padding:10px" }); c.appendChild(d);
      const p = PJ_PAKEJ[x.pk] || { n: x.pk, ic: "" }, lk = pjLok(x.lk);
      d.append(el("div", { class: "row", style: "gap:10px;align-items:center;flex-wrap:wrap" }, el("div", { class: "pjprev", style: "width:120px;height:60px" }, x.logo ? el("img", { src: x.logo, alt: x.sy }) : null), el("div", null, el("b", null, x.sy + " · RM" + (x.rm | 0).toLocaleString("ms-MY") + " · " + x.bln + " bulan · cadangan: " + p.ic + " " + p.n), el("div", { style: "font-size:13px" }, "Lokasi: " + (lk ? lk.n : x.lk) + (aktifLk[x.lk] && !x.st ? " ⚠ sudah ditaja " + aktifLk[x.lk] : "")), el("div", { style: "font-size:13px" }, "Tajaan: RM" + (x.rm | 0).toLocaleString("ms-MY") + (x.jn === "pendidikan" ? " (badan pendidikan)" : x.jn === "individu" ? " (individu)" : "") + " · " + tarikh(x.t) + (x.st ? " · " + x.st : " · baharu")))));
      d.appendChild(el("div", { style: "font-size:13px" }, "Pegawai: " + x.pic + " · " + x.hp + " · " + x.em + (x.ssm ? " · No. daftar: " + x.ssm : "") + (x.web ? " · " + x.web : "")));
      if (x.tl) d.appendChild(el("div", { style: "font-size:13px" }, "Slogan: " + x.tl)); if (x.nota) d.appendChild(el("div", { style: "font-size:13px;color:#ffe9a8" }, "Nota: " + x.nota));
      d.appendChild(x.rb ? el("div", { style: "font-size:13px;color:#9fe8b0" }, "💳 Rujukan bayaran: " + x.rb + " · RM" + (x.rm | 0).toLocaleString("ms-MY")) : el("div", { style: "font-size:13px;color:#ffb3a8" }, "⚠ Tiada maklumat bayaran (permohonan lama)."));
      if (x.bukti) { const im = el("img", { src: x.bukti, alt: "Bukti bayaran " + x.sy, style: "max-height:120px;max-width:100%;border-radius:8px;background:#fff" }); d.appendChild(el("details", null, el("summary", { style: "cursor:pointer;font-size:13px" }, "Lihat bukti bayaran"), im)); }
      if (x.st) return;
      const tanda = (st) => { const o = Object.assign({}, x, { st: st }); delete o.id; return kmAdmPut("penaja_mohon/" + x.id, o); };
      const pkSel = el("select", { "aria-label": "Paparan diluluskan" }); Object.keys(PJ_PAKEJ).forEach((k) => pkSel.appendChild(el("option", { value: k }, PJ_PAKEJ[k].ic + " " + PJ_PAKEJ[k].n))); pkSel.value = PJ_PAKEJ[x.pk] ? x.pk : "rakan";
      const ok = el("button", { type: "button", class: "btn sm" }, "Bayaran disahkan → Luluskan"), no = el("button", { type: "button", class: "btn alt sm" }, "Tolak");
      ok.addEventListener("click", async () => {
        if (!confirm("Sahkan bahawa bayaran RM" + (x.rm | 0).toLocaleString("ms-MY") + (x.rb ? " (rujukan " + x.rb + ")" : " (TIADA rujukan)") + " daripada " + x.sy + " telah diterima dalam akaun Meta Didik?")) return; /* v18.61: bayar dahulu */
        if (aktifLk[x.lk] && !confirm("Lokasi ini sudah ditaja " + aktifLk[x.lk] + ". Teruskan juga?")) return;
        const mula = Date.now(), d2 = { n: x.sy, logo: x.logo, pk: pkSel.value, lk: x.lk, wk: x.wk || "#1f6feb", mula: mula, tamat: mula + (x.bln || 3) * 30.44 * 864e5, mohon: x.id };
        if (x.tl) d2.tl = x.tl; if (x.web && webOk(x.web)) d2.web = x.web;
        try { await kmAdmPut("penaja/" + x.id, d2); await tanda("lulus"); toast(x.sy + " kini dipaparkan.", "ok"); ADM.m = null; pjMuat(); muat.click(); } catch (e) { toast("Gagal (kod " + (e.code || "rangkaian") + ").", "bad"); }
      });
      no.addEventListener("click", async () => { if (!confirm("Tolak permohonan " + x.sy + "?")) return; try { await tanda("tolak"); x.st = "tolak"; pjAdminBox(host); } catch (e) { toast("Gagal (kod " + (e.code || "rangkaian") + ").", "bad"); } });
      d.appendChild(el("div", { class: "row", style: "gap:8px;flex-wrap:wrap;align-items:center" }, el("span", { style: "font-size:13px" }, "Paparan:"), pkSel, ok, no));
    });
    c.appendChild(el("h3", { style: "margin:12px 0 4px" }, "Penaja aktif & tamat"));
    if (!ADM.a.length) c.appendChild(el("p", { class: "muted" }, "Belum ada penaja."));
    ADM.a.forEach((x) => {
      const aktif = !x.tamat || x.tamat > now, p = PJ_PAKEJ[x.pk] || { n: x.pk, ic: "" }, lk = pjLok(x.lk);
      const d = el("div", { class: "row", style: "gap:10px;align-items:center;flex-wrap:wrap;padding:6px 0;border-top:1px solid var(--line2)" }); c.appendChild(d);
      const lj = el("button", { type: "button", class: "btn alt sm" }, "Lanjut 3 bulan"), tb = el("button", { type: "button", class: "btn alt sm" }, "Tarik balik");
      lj.addEventListener("click", async () => { try { await kmAdmPut("penaja/" + x.id + "/tamat", Math.max(now, x.tamat || now) + 3 * 30.44 * 864e5); toast("Dilanjutkan.", "ok"); muat.click(); pjMuat(); } catch (e) { toast("Gagal (kod " + (e.code || "rangkaian") + ").", "bad"); } });
      tb.addEventListener("click", async () => { if (!confirm("Tarik balik " + x.n + " daripada paparan dan Meta Didik?")) return; try { await kmAdmReq("DELETE", "penaja/" + x.id); toast("Ditarik balik.", "ok"); muat.click(); pjMuat(); } catch (e) { toast("Gagal (kod " + (e.code || "rangkaian") + ").", "bad"); } });
      d.append(el("div", { class: "pjprev", style: "width:90px;height:44px" }, el("img", { src: x.logo, alt: x.n })), el("span", { style: "flex:1 1 220px;font-size:13px" }, el("b", null, x.n), " · " + p.ic + " " + p.n + " · " + (lk ? lk.n : x.lk) + " · " + (aktif ? "aktif hingga " : "tamat ") + tarikh(x.tamat)), lj, tb);
    });
  }
  window.pjKad = pjKad; window.pjBuka = pjBuka; window.pjAdminBox = pjAdminBox;
})();
