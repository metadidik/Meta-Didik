#!/usr/bin/env python3
"""Jana tanahsuci-darat.json: garis pantai untuk glob 3D penerbangan KLIA - Jeddah/Madinah.
Sumber: Natural Earth (domain awam, "Made with Natural Earth"), github.com/nvkelso/natural-earth-vector, fail geojson:
  - ne_110m_land.geojson : seluruh dunia (latar glob)
  - ne_50m_land.geojson  : perincian rantau laluan (lon 25..115, lat -15..42)
Koordinat dibundarkan dan titik terlalu rapat dibuang (pemudahan ringan). Tiada titik direka.
Guna: python3 -I tools/geo/darat_penerbangan.py <dir_geojson> tanahsuci-darat.json"""
import json, sys

def cincin(geom):
    t = geom["type"]
    if t == "Polygon":
        return geom["coordinates"]
    if t == "MultiPolygon":
        return [r for p in geom["coordinates"] for r in p]
    return []

def mudah(r, k, minjarak):
    out = []
    for lo, la in r:
        p = [round(lo, k), round(la, k)]
        if out and abs(p[0] - out[-1][0]) < minjarak and abs(p[1] - out[-1][1]) < minjarak:
            continue
        out.append(p)
    return out if len(out) >= 4 else None

def main(d, keluar):
    dunia, rantau = [], []
    for f in json.load(open(d + "/ne_110m_land.geojson"))["features"]:
        for r in cincin(f["geometry"]):
            m = mudah(r, 1, 0.25)
            if m: dunia.append(m)
    for f in json.load(open(d + "/ne_50m_land.geojson"))["features"]:
        for r in cincin(f["geometry"]):
            if not any(25 <= lo <= 115 and -15 <= la <= 42 for lo, la in r):
                continue
            m = mudah(r, 2, 0.05)
            if m: rantau.append(m)
    out = {"sumber": "Natural Earth 1:110m (dunia) dan 1:50m (rantau laluan), domain awam", "atribusi": "Made with Natural Earth",
           "dunia": dunia, "rantau": rantau}
    json.dump(out, open(keluar, "w"), separators=(",", ":"))
    print(keluar, len(dunia), "cincin dunia,", len(rantau), "cincin rantau")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
