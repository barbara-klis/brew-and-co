---
name: optimize-image
description: Download an image from a URL (e.g. Pexels stock photos), resize it for web use and convert it to WebP, saving it in public/images so it is served locally. Use when adding or replacing site images, or when asked to localize or optimize external images.
allowed-tools: Bash, Read
---

# optimize-image

Downloads an image, resizes it with `sharp`, converts it to WebP and writes it to `public/images/<name>.webp` (override with `--out`). Run from the project root.

## Single image

```
node .claude/skills/optimize-image/optimize-image.mjs <url> <name> [--width N] [--height N] [--fit cover|inside] [--quality N] [--out DIR]
```

- Defaults: width 1600, `--fit inside` (keeps aspect ratio), quality 80. Images are never enlarged.
- Use `--fit cover` with both `--width` and `--height` to crop to an exact aspect ratio (e.g. 4:5 tiles).
- `<name>` is the output base name; any extension is ignored.

## Batch

```
node .claude/skills/optimize-image/optimize-image.mjs --manifest .claude/skills/optimize-image/stock-images.json
```

A manifest is a JSON array of `{ "url", "name", "width", "height", "fit", "quality" }`. Failures are reported per image and the exit code is 1 if any failed.

## Pexels URLs

Direct file: `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`. Note the photo id in `public/images/CREDITS.md`.

## After running

1. Point code and content at the `.webp` name (`next/image` with `src="/images/<name>.webp"`; keep `sizes`).
2. Update `public/images/CREDITS.md` for any new photo.
3. Delete superseded files in `public/images`.
