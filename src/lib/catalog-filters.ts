import { priceBands, Product, SortKey } from "@/lib/site-data";

export type ShopParams = {
  scenario: Product["category"] | null;
  price: "low" | "mid" | "high" | null;
  meaning: Product["meaning"] | null;
  threeD: boolean;
  q: string;
  sort: SortKey;
};

const CATEGORY_VALUES: Product["category"][] = ["gift", "daily", "collection"];
const MEANING_VALUES: Product["meaning"][] = ["peace", "career", "love", "health"];
const PRICE_KEYS = priceBands.map((p) => p.key);
const SORT_KEYS: SortKey[] = ["default", "price-asc", "price-desc", "name"];

function pickFirst(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value ?? undefined;
}

export function parseShopSearchParams(
  raw: Record<string, string | string[] | undefined>,
): ShopParams {
  const scenario = pickFirst(raw.scenario);
  const meaning = pickFirst(raw.meaning);
  const price = pickFirst(raw.price);
  const sort = pickFirst(raw.sort);

  return {
    scenario:
      scenario && (CATEGORY_VALUES as string[]).includes(scenario)
        ? (scenario as Product["category"])
        : null,
    meaning:
      meaning && (MEANING_VALUES as string[]).includes(meaning)
        ? (meaning as Product["meaning"])
        : null,
    price:
      price && (PRICE_KEYS as string[]).includes(price)
        ? (price as ShopParams["price"])
        : null,
    threeD: pickFirst(raw.threeD) === "1",
    q: (pickFirst(raw.q) ?? "").trim(),
    sort: sort && (SORT_KEYS as string[]).includes(sort) ? (sort as SortKey) : "default",
  };
}

export function filterAndSortProducts(list: Product[], params: ShopParams): Product[] {
  let items = list;

  if (params.scenario) items = items.filter((p) => p.category === params.scenario);
  if (params.meaning) items = items.filter((p) => p.meaning === params.meaning);
  if (params.price) {
    const band = priceBands.find((b) => b.key === params.price);
    if (band) items = items.filter((p) => band.match(p));
  }
  if (params.threeD) {
    items = items.filter((p) => p.preview3dMode === "glb" && p.modelGlb);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.folderId.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q),
    );
  }

  switch (params.sort) {
    case "price-asc":
      items = [...items].sort((a, b) => a.priceCny - b.priceCny);
      break;
    case "price-desc":
      items = [...items].sort((a, b) => b.priceCny - a.priceCny);
      break;
    case "name":
      items = [...items].sort((a, b) => a.name.localeCompare(b.name, "zh-Hans"));
      break;
    default:
      break;
  }
  return items;
}

export function serializeShopParams(params: ShopParams): string {
  const q = new URLSearchParams();
  if (params.scenario) q.set("scenario", params.scenario);
  if (params.meaning) q.set("meaning", params.meaning);
  if (params.price) q.set("price", params.price);
  if (params.threeD) q.set("threeD", "1");
  if (params.q) q.set("q", params.q);
  if (params.sort && params.sort !== "default") q.set("sort", params.sort);
  return q.toString();
}
