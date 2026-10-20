#!/usr/bin/env node
// Download an image from a URL, resize it for web use and save it as WebP.
//
// Single:   node optimize-image.mjs <url> <name> [--width N] [--height N] [--fit cover|inside] [--quality N] [--out DIR]
// Batch:    node optimize-image.mjs --manifest <file.json> [--out DIR]
//
// Manifest entries: { "url": "...", "name": "hero", "width": 2000, "height": 1000, "fit": "cover", "quality": 80 }

import { createRequire } from "node:module";
import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "package.json"));
const sharp = require("sharp");

const MAX_BYTES = 50 * 1024 * 1024;
const DEFAULTS = { width: 1600, fit: "inside", quality: 80 };

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      flags[arg.slice(2)] = argv[++i];
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

function num(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) throw new Error(`Invalid number: ${value}`);
  return n;
}

async function download(url) {
  const parsed = new URL(url);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error(`Unsupported protocol: ${parsed.protocol}`);

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (optimize-image skill)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) throw new Error(`Not an image (content-type: ${type || "none"})`);

  const declared = Number(res.headers.get("content-length") ?? 0);
  if (declared > MAX_BYTES) throw new Error(`Image too large (${declared} bytes)`);

  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length > MAX_BYTES) throw new Error(`Image too large (${buffer.length} bytes)`);
  return buffer;
}

async function optimize(entry, outDir) {
  const name = path.basename(entry.name).replace(/\.[a-z0-9]+$/i, "");
  if (!name) throw new Error("Missing output name");

  const width = num(entry.width, entry.height ? undefined : DEFAULTS.width);
  const height = num(entry.height, undefined);
  const fit = entry.fit ?? DEFAULTS.fit;
  const quality = num(entry.quality, DEFAULTS.quality);
  if (!["cover", "inside"].includes(fit)) throw new Error(`Invalid fit: ${fit}`);

  const input = await download(entry.url);
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `${name}.webp`);

  await sharp(input)
    .rotate()
    .resize({ width, height, fit, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outFile);

  const meta = await sharp(outFile).metadata();
  const { size } = await stat(outFile);
  return { name, outFile, inBytes: input.length, outBytes: size, width: meta.width, height: meta.height };
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const outDir = path.resolve(flags.out ?? "public/images");

  let entries;
  if (flags.manifest) {
    entries = JSON.parse(await readFile(flags.manifest, "utf8"));
  } else {
    const [url, name] = positional;
    if (!url || !name) {
      console.error("Usage: optimize-image.mjs <url> <name> [--width N] [--height N] [--fit cover|inside] [--quality N] [--out DIR]");
      console.error("   or: optimize-image.mjs --manifest <file.json> [--out DIR]");
      process.exit(2);
    }
    entries = [{ url, name, width: flags.width, height: flags.height, fit: flags.fit, quality: flags.quality }];
  }

  let failed = 0;
  let totalIn = 0;
  let totalOut = 0;
  for (const entry of entries) {
    try {
      const r = await optimize(entry, outDir);
      totalIn += r.inBytes;
      totalOut += r.outBytes;
      console.log(`ok   ${r.name}.webp  ${r.width}x${r.height}  ${kb(r.inBytes)} -> ${kb(r.outBytes)}`);
    } catch (err) {
      failed++;
      console.error(`FAIL ${entry.name ?? entry.url}: ${err.message}`);
    }
  }
  console.log(`\n${entries.length - failed}/${entries.length} done, downloaded ${kb(totalIn)} -> ${kb(totalOut)}`);
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
