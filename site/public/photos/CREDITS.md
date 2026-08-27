# Photography provenance

Every photograph in this directory is **CC0 1.0** — public-domain dedication.
Commercial use is permitted and **no attribution is required**. This file exists
so the sourcing is auditable, not because the licence demands a credit.

`docs/design.md` §22 asks for imagery that is real, tactile, and human — people
building, workshops, tools, materials, physical spaces — and rules out generic
corporate stock. That is a ban on a *genre*, not on open-licensed sourcing.

| File | Subject | Licence | Source | Native size |
|---|---|---|---|---|
| `workshop-tools.jpg` | Hand-tool wall in a woodworking shop | CC0 1.0 | StockSnap (`KD30XPQR0A`), via Openverse | 960 × 640 |
| `making-by-hand.jpg` | Potter throwing a form at the wheel | CC0 1.0 | StockSnap (`43JYGRS06H`), via Openverse | 960 × 540 |

## Notes

- Both were located through the Openverse API filtered to `license=cc0,pdm`,
  then **opened and inspected** before use — subject, framing, and watermark
  status all confirmed by eye rather than trusted from metadata.
- A third candidate (a farmers-market scene from rawpixel) was **rejected**: the
  delivered file carried a repeating `rawpixel` watermark across the frame. The
  metadata said CC0; the actual bytes were a watermarked preview. Treat rawpixel
  delivery URLs as previews unless proven otherwise.
- StockSnap's CDN began returning `403` to direct requests after the first
  fetch, so only the 960w renditions were retrievable. These are used at
  contained sizes rather than full-bleed, where 960w is sufficient. If a
  full-bleed treatment is ever wanted, re-source at native resolution
  (5000 × 3333 and 5472 × 3078) from the StockSnap pages directly.

## Still missing

Product interface screenshots. `docs/landing.md` §6 wants real product UI in the
portfolio cards, and no photograph substitutes for it — those wells stay marked
"Interface pending" until real captures exist.
