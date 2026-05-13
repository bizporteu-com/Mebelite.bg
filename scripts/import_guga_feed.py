"""Convert guga.bg XML product feed to a typed TypeScript module.

Reads /tmp/guga.xml (the full feed) and writes
src/data/products.generated.ts plus src/data/kids-categories.generated.ts.

Run from project root:
    python3 scripts/import_guga_feed.py
"""
from __future__ import annotations

import html
import json
import os
import re
import sys
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
FEED = Path("/tmp/guga.xml")
OUT_PRODUCTS = ROOT / "src" / "data" / "products.generated.ts"
OUT_CATEGORIES = ROOT / "src" / "data" / "kids-categories.generated.ts"

BGN_PER_EUR = 1.95583


def slugify(text: str) -> str:
    cyr = "абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ"
    lat = [
        "a", "b", "v", "g", "d", "e", "zh", "z", "i", "y", "k", "l", "m", "n",
        "o", "p", "r", "s", "t", "u", "f", "h", "ts", "ch", "sh", "sht", "a",
        "y", "yu", "ya",
        "A", "B", "V", "G", "D", "E", "Zh", "Z", "I", "Y", "K", "L", "M", "N",
        "O", "P", "R", "S", "T", "U", "F", "H", "Ts", "Ch", "Sh", "Sht", "A",
        "Y", "Yu", "Ya",
    ]
    table = {ord(c): l for c, l in zip(cyr, lat)}
    s = text.translate(table)
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s


def slug_from_link(link: str, fallback: str) -> str:
    m = re.search(r"https?://[^/]+/([^?]+)", link or "")
    if m:
        s = m.group(1).strip("/").split("/")[-1]
        return s or slugify(fallback)
    return slugify(fallback)


def strip_html(s: str) -> str:
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"</p>", "\n\n", s, flags=re.I)
    s = re.sub(r"</li>", "\n", s, flags=re.I)
    s = re.sub(r"<li[^>]*>", " · ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def text_or(elem, tag, default=""):
    el = elem.find(tag)
    if el is None or el.text is None:
        return default
    return el.text.strip()


COLOR_NAME_TO_HEX = {
    "бял": "#ffffff", "бяла": "#ffffff", "бяло": "#ffffff",
    "черен": "#1a1a1a", "черна": "#1a1a1a", "черно": "#1a1a1a",
    "сив": "#7d7d7d", "сива": "#7d7d7d", "сиво": "#7d7d7d",
    "розов": "#f4a3b5", "розова": "#f4a3b5", "розово": "#f4a3b5",
    "червен": "#e23b3b", "червена": "#e23b3b", "червено": "#e23b3b",
    "син": "#3b6fe2", "синя": "#3b6fe2", "синьо": "#3b6fe2", "тъмносин": "#27384f",
    "зелен": "#4caf50", "зелена": "#4caf50", "зелено": "#4caf50",
    "жълт": "#ffd54f", "жълта": "#ffd54f", "жълто": "#ffd54f",
    "оранжев": "#ff9800", "оранжева": "#ff9800", "оранжево": "#ff9800",
    "лилав": "#9c27b0", "лилава": "#9c27b0", "лилаво": "#9c27b0",
    "кафяв": "#8b5a2b", "кафява": "#8b5a2b", "кафяво": "#8b5a2b",
    "бежов": "#cdb89a", "бежова": "#cdb89a", "бежово": "#cdb89a",
    "многоцветен": "#cccccc", "многоцветна": "#cccccc",
    "натурален": "#d6c19c",
}


def parse_colors(raw: str):
    out = []
    seen = set()
    for chunk in re.split(r"[;,/]", raw):
        c = chunk.strip()
        if not c:
            continue
        key = c.lower().split()[0] if " " in c else c.lower()
        hex_val = COLOR_NAME_TO_HEX.get(key) or COLOR_NAME_TO_HEX.get(c.lower())
        if hex_val and c not in seen:
            out.append({"name": c, "hex": hex_val})
            seen.add(c)
    return out


def parse_materials(raw: str):
    return [m.strip() for m in re.split(r"[;,]", raw) if m.strip()]


def deterministic_rating(seed: str):
    h = sum(ord(c) for c in seed) % 10
    return round(4.3 + h / 33, 1), 40 + (h * 13) % 200


FURNITURE_TOP_CATEGORIES = {"Мебели"}


def parse_product(p: ET.Element):
    sku = text_or(p, "sku")
    title = text_or(p, "title")
    if not title:
        return None
    manufacturer = text_or(p, "manufacturer")
    cats = [text_or(p, f"category{i}") for i in range(6)]
    cats = [c for c in cats if c]
    if not cats or cats[0] not in FURNITURE_TOP_CATEGORIES:
        return None
    description_html = text_or(p, "description")
    description = strip_html(description_html)
    description = description[:600]
    link = text_or(p, "link")
    slug = slug_from_link(link, title or sku)
    if not slug:
        return None

    images = []
    for tag in ("image", "image0", "image1", "image2", "image3", "image4", "image5", "image6"):
        url = text_or(p, tag)
        if url and url not in images:
            images.append(url)
    if not images:
        return None

    try:
        price_bgn = float(text_or(p, "price", "0"))
    except ValueError:
        price_bgn = 0
    try:
        base_bgn = float(text_or(p, "base_price", "0"))
    except ValueError:
        base_bgn = 0

    price_eur = round(price_bgn / BGN_PER_EUR)
    old_eur = None
    if base_bgn > price_bgn and base_bgn - price_bgn > 1:
        old_eur = round(base_bgn / BGN_PER_EUR)

    width = height = length = 0.0
    try:
        width = float(text_or(p, "width", "0"))
    except ValueError:
        pass
    try:
        height = float(text_or(p, "height", "0"))
    except ValueError:
        pass
    try:
        length = float(text_or(p, "length", "0"))
    except ValueError:
        pass

    colors = []
    materials = []
    for i in range(18):
        n = text_or(p, f"attribute_name{i}").lower()
        v = text_or(p, f"attribute_value{i}")
        if not n or not v:
            continue
        if "цвят" in n:
            colors.extend(parse_colors(v))
        elif "материал" in n:
            materials.extend(parse_materials(v))

    if not colors:
        colors = [{"name": "Многоцветен", "hex": "#cccccc"}]
    if not materials:
        materials = ["Пластмаса"]

    rating, reviews = deterministic_rating(slug)
    delivery_days = 3 + (sum(ord(c) for c in slug) % 8)

    badges = []
    avail = text_or(p, "availability").lower()
    if old_eur:
        badge = "sale"
    elif "instock" in avail or "наличен" in avail:
        badge = None
    else:
        badge = None

    # Use the *subcategory* (category1) as the product's category — that's where the
    # real furniture taxonomy lives (Детски легла, Бюра, Гардероби, etc.).
    cat_name = cats[1] if len(cats) > 1 else cats[0]
    return {
        "slug": slug,
        "name": title,
        "sku": sku,
        "brand": manufacturer,
        "category": slugify(cat_name),
        "categoryName": cat_name,
        "categoryPath": cats,
        "room": "detska",
        "price": price_eur,
        "oldPrice": old_eur,
        "rating": rating,
        "reviews": reviews,
        "deliveryDays": delivery_days,
        "colors": colors[:6],
        "materials": materials[:6],
        "dimensions": {
            "w": round(width or 0),
            "d": round(length or 0),
            "h": round(height or 0),
        },
        "images": images[:5],
        "description": description,
        "features": [],
        "badge": badge,
    }


def main():
    if not FEED.exists():
        print(f"missing {FEED}; download first", file=sys.stderr)
        sys.exit(1)

    print(f"Parsing {FEED} ({FEED.stat().st_size / 1024 / 1024:.1f} MB)…")
    tree = ET.parse(FEED)
    root = tree.getroot()

    products = []
    seen_slugs = set()
    skipped = 0

    for prod in root.findall("product"):
        rec = parse_product(prod)
        if rec is None:
            skipped += 1
            continue
        s = rec["slug"]
        suffix = 0
        while s in seen_slugs:
            suffix += 1
            s = f"{rec['slug']}-{suffix}"
        rec["slug"] = s
        seen_slugs.add(s)
        products.append(rec)

    print(f"Parsed {len(products)} products ({skipped} skipped).")

    # Build subcategory list from category0
    cat_map = {}
    for p in products:
        name = p["categoryName"]
        if name not in cat_map:
            cat_map[name] = {
                "name": name,
                "slug": slugify(name),
                "count": 0,
            }
        cat_map[name]["count"] += 1

    categories = sorted(cat_map.values(), key=lambda c: -c["count"])

    # Update products with normalized category slug
    cat_name_to_slug = {c["name"]: c["slug"] for c in categories}
    for p in products:
        p["category"] = cat_name_to_slug.get(p["categoryName"], p["category"])

    serialized = []
    for p in products:
        rec = {
            "slug": p["slug"],
            "name": p["name"],
            "category": p["category"],
            "room": "detska",
            "brand": p["brand"],
            "price": p["price"],
            "rating": p["rating"],
            "reviews": p["reviews"],
            "deliveryDays": p["deliveryDays"],
            "colors": p["colors"],
            "materials": p["materials"],
            "dimensions": p["dimensions"],
            "images": p["images"],
            "description": p["description"],
            "features": p["features"],
        }
        if p["oldPrice"]:
            rec["oldPrice"] = p["oldPrice"]
        if p["badge"]:
            rec["badge"] = p["badge"]
        serialized.append(rec)

    products_ts = (
        "// AUTO-GENERATED by scripts/import_guga_feed.py. Do not edit by hand.\n"
        "import type { Product } from \"@/lib/types\";\n\n"
        "export const GENERATED_PRODUCTS: Product[] = "
        + json.dumps(serialized, ensure_ascii=False, indent=0)
        + ";\n"
    )

    OUT_PRODUCTS.parent.mkdir(parents=True, exist_ok=True)
    OUT_PRODUCTS.write_text(products_ts, encoding="utf-8")
    print(f"Wrote {OUT_PRODUCTS} ({OUT_PRODUCTS.stat().st_size / 1024:.1f} KB)")

    cats_ts = (
        "// AUTO-GENERATED by scripts/import_guga_feed.py. Do not edit by hand.\n"
        "export type KidsCategory = { slug: string; name: string; count: number };\n\n"
        "export const KIDS_CATEGORIES: KidsCategory[] = "
        + json.dumps(categories, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT_CATEGORIES.write_text(cats_ts, encoding="utf-8")
    print(f"Wrote {OUT_CATEGORIES} ({OUT_CATEGORIES.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
