#!/usr/bin/env python3
"""v18.73: gabung draf kuiz Tahun 1-6 / Tingkatan 1-6 (data/kuiz-draf/<subjek>.json) ke dalam Meta Didik.

- Tema dan tajuk ditambah ke DATA_<SUBJEK> dalam app.js (tajuk diletakkan di negeri stesennya).
- Soalan ditambah ke soalan_<subjek>.json (ditanda draf: 1, perlu semakan guru).
- Peta tajuk -> stesen ditulis ke blok KUIZ-STESEN dalam dunia.js.
- SUBJS[...].tk dan versi bank soalan dikemas kini.
Boleh dijalankan berulang kali (tajuk/soalan lama dengan id yang sama diganti).
Jalankan: python3 tools/kuiz-gabung.py
"""
import json, os, re, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUBJ = {"bm": ("DATA_BM", "soalan_bm.json"), "mt": ("DATA_MT", "soalan_mt.json"),
        "sc": ("DATA_SC", "soalan_sc.json"), "pi": ("DATA_PI", "soalan_pi.json")}
WARNA = {1: "#ff9f6b", 2: "#ffc857", 3: "#65d6a0", 4: "#39bceb", 5: "#9474e8", 6: "#e8558a",
         7: "#3fb37f", 8: "#2f8fd8", 9: "#7a4cf0", 12: "#b8902c"}
OFF = [(0, 0), (16, 0), (-16, 0), (0, 16), (0, -16), (14, 14)]


def baca(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as f:
        return f.read()


def tulis(p, s):
    with open(os.path.join(ROOT, p), "w", encoding="utf-8") as f:
        f.write(s)


def main():
    app, dun = baca("app.js"), baca("dunia.js")
    data = json.loads(app.split("\n")[1][len("const DATA="):].rstrip().rstrip(";"))
    pins = {k: v["pins"] for k, v in data["negeri"].items()}
    # negeri bagi setiap nama stesen (SILMU + PLACES)
    stn = {}
    for m in re.finditer(r'\["(si-[^"]+)", "([a-z]+)", "([^"]+)"', dun):
        stn[m.group(3)] = m.group(2)
    pl = re.search(r"const PLACES = \[(.*?)\n\];", dun, re.S).group(1)
    for m in re.finditer(r'\["([^"]+)", "([a-z]+)", "([^"]+)"', pl):
        stn.setdefault(m.group(3), m.group(2))
    ver = time.strftime("%Y%m%d%H%M")
    peta, jumlah = {}, {}
    for sj, (dname, qfile) in SUBJ.items():
        src = os.path.join(ROOT, "data", "kuiz-draf", sj + ".json")
        if not os.path.exists(src):
            continue
        dr = json.load(open(src, encoding="utf-8"))
        m = re.search(r"^const " + dname + r" = (\{.*\});\s*$", app, re.M)
        if not m:
            sys.exit("tiada " + dname)
        D = json.loads(m.group(1))
        tema_baru, topik_baru, soalan_baru, peta[sj] = [], [], [], {}
        for lv in dr["tahap"]:
            tm = dict(lv["tema"])
            tk = tm.get("darjah") or (6 + tm["tingkatan"])
            tm["warna"] = WARNA.get(tk, "#9474e8")
            tm["draf"] = 1
            tema_baru.append(tm)
            guna = {}
            for i, t in enumerate(lv["topik"]):
                ng = stn.get(t["stesen"])
                if not ng or ng not in pins:
                    sys.exit("stesen tidak dikenali: " + t["stesen"])
                n = guna.get(ng, 0)
                guna[ng] = n + 1
                p = pins[ng][n % len(pins[ng])]
                dx, dy = OFF[(n // len(pins[ng])) % len(OFF)]
                topik_baru.append({"id": t["id"], "tema": tm["id"], "nama": t["nama"], "dskp": t["dskp"],
                                   "buku": "Draf Meta Didik (perlu semakan guru)", "negeri": ng, "pin": 0,
                                   "xy": [round(p[0] + dx, 1), round(p[1] + dy, 1)], "nota": t["nota"][:3], "draf": 1})
                peta[sj][t["id"]] = t["stesen"]
                for q in t["soalan"]:
                    soalan_baru.append({"t": t["id"], "d": int(q.get("d", 1)), "q": q["q"], "o": q["o"], "a": int(q["a"]),
                                        "e": q.get("e", ""), "s": "Draf Meta Didik: " + t["dskp"], "status": "aktif", "draf": 1})
        ids_tm = {x["id"] for x in tema_baru}
        ids_tp = {x["id"] for x in topik_baru}
        D["tema"] = [x for x in D["tema"] if x["id"] not in ids_tm] + tema_baru
        D["topik"] = [x for x in D["topik"] if x["id"] not in ids_tp] + topik_baru
        lvl = lambda x: x.get("darjah") or (6 + x.get("tingkatan", 0))
        D["tema"].sort(key=lvl)
        D["topik"].sort(key=lambda t: lvl(next(m for m in D["tema"] if m["id"] == t["tema"])))
        app = app[:m.start(1)] + json.dumps(D, ensure_ascii=False, separators=(",", ":")) + app[m.end(1):]
        # bank soalan
        Q = json.load(open(os.path.join(ROOT, qfile), encoding="utf-8"))
        Q["soalan"] = [x for x in Q["soalan"] if x.get("t") not in ids_tp]
        nx = max([int(x.get("i", 0)) for x in Q["soalan"]] + [0]) + 1
        for q in soalan_baru:
            q["i"] = nx
            nx += 1
            Q["soalan"].append(q)
        Q["versi"] = ver
        tulis(qfile, json.dumps(Q, ensure_ascii=False, indent=1) + "\n")
        # tahap subjek dan versi cache
        tks = sorted({lvl(x) for x in D["tema"]})
        app = re.sub(r'(  ' + sj + r': \{ k: "' + sj + r'".*?ver: ")[0-9]+(", tk: )\[[0-9, ]*\]',
                     lambda mm: mm.group(1) + ver + mm.group(2) + json.dumps(tks).replace(",", ", "), app, count=1)
        jumlah[sj] = (len(tema_baru), len(topik_baru), len(soalan_baru), tks)
    blok = "/* KUIZ-STESEN:MULA */\nconst KUIZ_STESEN = " + json.dumps(peta, ensure_ascii=False) + ";\n/* KUIZ-STESEN:TAMAT */"
    dun = re.sub(r"/\* KUIZ-STESEN:MULA \*/.*?/\* KUIZ-STESEN:TAMAT \*/", lambda _: blok, dun, flags=re.S)
    tulis("app.js", app)
    tulis("dunia.js", dun)
    for sj, (a, b, c, tks) in jumlah.items():
        print(f"{sj}: {a} tahap, {b} tajuk, {c} soalan; tk={tks}")


if __name__ == "__main__":
    main()
