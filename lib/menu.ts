import { readFileSync } from "node:fs";
import path from "node:path";

export type MenuItem = {
  category: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  image: string;
};

export type MenuCategory = { name: string; slug: string; items: MenuItem[] };

/** Splits CSV text into rows of fields, handling quoted fields with commas and "" escapes. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }
  row.push(field);
  if (row.some((value) => value !== "")) rows.push(row);
  return rows;
}

export function getMenuItems(): MenuItem[] {
  const file = path.join(process.cwd(), "content", "menu-items.csv");
  const [header, ...rows] = parseCsv(readFileSync(file, "utf8"));

  return rows.map((row) => {
    const record = Object.fromEntries(header.map((key, index) => [key, row[index] ?? ""]));
    return {
      category: record.category,
      name: record.name,
      description: record.description,
      price: Number(record.price),
      badge: record.badge || undefined,
      image: `/images/${record.image}`,
    };
  });
}

export function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Groups items by category, keeping the order in which categories first appear in the CSV. */
export function getMenuByCategory(): MenuCategory[] {
  const categories = new Map<string, MenuItem[]>();
  for (const item of getMenuItems()) {
    categories.set(item.category, [...(categories.get(item.category) ?? []), item]);
  }
  return [...categories].map(([name, items]) => ({ name, slug: slugify(name), items }));
}

export function getPopularItems(): MenuItem[] {
  return getMenuItems().filter((item) => item.badge);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
