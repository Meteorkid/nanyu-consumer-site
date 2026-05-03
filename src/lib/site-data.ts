import catalog from "@/data/catalog.json";

export type Product = {
  slug: string;
  folderId: string;
  name: string;
  nameEn?: string;
  tagline: string;
  taglineEn?: string;
  priceCny: number;
  category: "gift" | "daily" | "collection";
  meaning: "peace" | "career" | "love" | "health";
  material: string;
  materialEn?: string;
  size: string;
  sizeEn?: string;
  weight: string;
  weightEn?: string;
  image: string;
  gallery: string[];
  highlights: string[];
  highlightsEn?: string[];
  /**
   * 若 `preview3dMode === "glb"` 且路径有效，则用 model-viewer 加载。
   * 重点款默认 `photo-orbit`：主图透视摆动，避免占位 mesh 误判为故障。
   */
  modelGlb: string | null;
  /** `photo-orbit` | `glb` | 未设置 */
  preview3dMode?: "photo-orbit" | "glb" | null;
};

/** 根据语言获取商品字段值 */
export function getProductField<K extends keyof Product>(
  product: Product,
  field: K,
  locale: string,
): string | string[] {
  if (locale === "en") {
    const enField = `${field}En` as keyof Product;
    const enVal = product[enField];
    if (enVal !== undefined && enVal !== null) return enVal as string | string[];
  }
  return product[field] as string | string[];
}

/** 根据语言获取文章字段值 */
export function getArticleField<K extends keyof Article>(
  article: Article,
  field: K,
  locale: string,
): string | string[] {
  if (locale === "en") {
    const enField = `${field}En` as keyof Article;
    const enVal = article[enField];
    if (enVal !== undefined && enVal !== null) return enVal as string | string[];
  }
  return article[field] as string | string[];
}

export type Article = {
  slug: string;
  title: string;
  titleEn?: string;
  category: "style" | "story" | "guide";
  summary: string;
  summaryEn?: string;
  cover: string;
  /** 种草实拍视频（`public/videos/grass/`，由 `npm run grass:sync` 从「种草视频」目录生成） */
  grassVideoSrc?: string | null;
  relatedProductSlugs: string[];
  /** 段落数组（先用纯文本，后续可迁 CMS） */
  body: string[];
  bodyEn?: string[];
  readMinutes: number;
};

/** 是否展示页内 / 合集里的 3D 区域（光影预览或 GLB） */
export function productHasInline3d(product: Product): boolean {
  if (product.preview3dMode === "photo-orbit") return true;
  if (product.preview3dMode === "glb") return Boolean(product.modelGlb);
  return Boolean(product.modelGlb);
}

/** 是否使用 model-viewer（需有效 modelGlb） */
export function productUsesGlbViewer(product: Product): boolean {
  if (product.preview3dMode === "photo-orbit") return false;
  if (product.preview3dMode === "glb") return Boolean(product.modelGlb);
  return Boolean(product.modelGlb);
}

/** 翻译 key 映射 — 组件层用 tShop(key) / tContent(key) 取译文 */
export const articleCategoryLabel: Record<Article["category"], string> = {
  style: "style",
  story: "story",
  guide: "guide",
};

export const meaningLabel: Record<Product["meaning"], string> = {
  peace: "peace",
  career: "career",
  love: "love",
  health: "health",
};

export const categoryLabel: Record<Product["category"], string> = {
  gift: "categoryGift",
  daily: "categoryDaily",
  collection: "categoryCollection",
};

export const navItems = [
  { href: "/shop", labelKey: "shop" },
  { href: "/content", labelKey: "content" },
  { href: "/showcase-3d", labelKey: "showcase3d" },
  { href: "/support", labelKey: "support" },
  { href: "/brand", labelKey: "brand" },
];

/** 来自 `产品分类/manifest.json` 同步的目录商品（运行 `scripts/sync_catalog_to_consumer_site.py` 更新） */
export const products: Product[] = catalog as Product[];

/** 3D 展示页接入 model-viewer 的款（对应 `产品_18` / `产品_05` / `产品_28`） */
export const showcase3dSlugs = ["p-18", "p-05", "p-28"] as const;

export function getShowcase3dProducts(): Product[] {
  return showcase3dSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

export const articles: Article[] = [
  {
    slug: "style-guide-1",
    title: "通勤穿搭里，玉饰如何不显老气",
    titleEn: "How to Wear Jade Without Looking Old-Fashioned at Work",
    category: "style",
    summary: "3 套简洁通勤搭配模板，帮助新用户第一时间戴出质感。",
    summaryEn: "3 simple work outfit templates to help new wearers look polished from day one.",
    cover: "/images/content/grass/style-guide-1.jpg",
    grassVideoSrc: "/videos/grass/style-guide-1.mp4",
    relatedProductSlugs: ["p-01", "p-03", "p-18"],
    readMinutes: 3,
    body: [
      "过去一提到玉饰，很多人会想到偏传统的大件或复杂雕工；但对于 18–30 岁的年轻用户，简约轮廓 + 单点焦点是更容易驾驭的开始。",
      "通勤场景里建议以单件为主：手镯 / 单挂件 / 戒指选一件作为视觉中心，搭配素色内搭与极简金属，整体会立刻“年轻化”。",
      "颜色方面，浅色系玉石（白、青、浅绿）不挑肤色；深色玉石推荐配以浅色针织或真丝衬衫，避免整体过重。",
      "重点是尺寸：单品建议不超过一元硬币大小，佩戴不压颈、不卡肩；这也是我们在商品卡上保留尺寸说明的原因。",
    ],
    bodyEn: [
      "When people think of jade jewelry, they often imagine traditional large pieces or intricate carvings. But for younger wearers aged 18–30, a minimalist silhouette with a single focal point is the easiest way to start.",
      "For work settings, we recommend wearing one statement piece: choose a bracelet, pendant, or ring as your visual center, paired with solid-color basics and minimal metal for an instantly fresh look.",
      "Color-wise, lighter jade (white, celadon, light green) works with any skin tone; darker jade pairs best with light knitwear or silk blouses to avoid looking too heavy.",
      "Size matters: keep each piece no larger than a coin to avoid neck strain or shoulder interference — that's why we include exact dimensions on every product card.",
    ],
  },
  {
    slug: "story-guide-1",
    title: "从信宜到海外：一块玉的旅程",
    titleEn: "From Xinyi to the World: The Journey of a Jade Piece",
    category: "story",
    summary: "用图文讲清原料、设计、加工、发货全链路，让消费者更放心。",
    summaryEn: "A visual walkthrough of the full supply chain — from raw material to your doorstep.",
    cover: "/images/content/grass/story-guide-1.jpg",
    grassVideoSrc: "/videos/grass/story-guide-1.mp4",
    relatedProductSlugs: ["p-18", "p-05", "p-28"],
    readMinutes: 4,
    body: [
      "玉汝于成的原料集中来自广东信宜一带。我们会在工坊完成切割、初雕、抛光，再进入品控、打包、跨境物流。",
      "为避免消费者「看不见过程」的不安，我们会把每件商品的切料 / 工艺 / 质检节点留档，并通过溯源编号可查。",
      "在首批 SKU 中，产品_18 / 产品_05 / 产品_28 会提供三维预览（GLB 格式），消费者可直接旋转查看雕工细节。",
      "跨境包裹采用独立礼盒 + 防震内衬，东南亚地区平均 5–10 个工作日可达，并在站内提供物流跟踪。",
    ],
    bodyEn: [
      "Our raw jade is sourced primarily from the Xinyi region in Guangdong. Each piece goes through cutting, initial carving, and polishing at our workshop before quality control, packaging, and cross-border logistics.",
      "To ease the anxiety of not seeing the process, we document every step — cutting, craftsmanship, and quality inspection — and make it traceable via a unique source code on each item.",
      "In our initial SKU lineup, products 18, 05, and 28 offer 3D previews in GLB format, so customers can rotate and inspect carving details directly in the browser.",
      "Cross-border orders ship in individual gift boxes with shock-absorbing inserts. Delivery to Southeast Asia typically takes 5–10 business days, with tracking available on-site.",
    ],
  },
  {
    slug: "buying-guide-1",
    title: "第一次买玉，先看这 5 个避坑点",
    titleEn: "First Time Buying Jade? Read These 5 Tips First",
    category: "guide",
    summary: "用通俗语言解释材质、尺寸、证书和售后，降低决策难度。",
    summaryEn: "A plain-language guide to materials, sizing, certification, and after-sales — to lower the decision barrier.",
    cover: "/images/content/grass/buying-guide-1.jpg",
    grassVideoSrc: "/videos/grass/buying-guide-1.mp4",
    relatedProductSlugs: ["p-02", "p-23", "p-28"],
    readMinutes: 5,
    body: [
      "1. 看材质说明：商品页的「材质」字段对应真实矿料，如「天然玉石 / 镶嵌件」。警惕只写「玉」而不标注产地和处理的描述。",
      "2. 看尺寸 vs 人体：手镯先量内径，吊坠看直径 / 厚度；页面统一标注 mm，避免「大小合适」的模糊描述。",
      "3. 看证书与溯源：每件商品配有溯源编号，可在「售后保障 / 溯源」处核验。跨境件请保留质检样例。",
      "4. 看售后条款：7 天无理由 + 15 天质量问题换货，定制与明显佩戴损耗不适用。",
      "5. 看真实图：首选实拍 + 3D 展示；我们会在可行款加上 model-viewer 预览，避免只靠精修图带来的落差。",
    ],
    bodyEn: [
      "1. Check the material spec: the 'Material' field on each product page reflects the actual mineral — e.g., 'natural jade / inlay piece.' Be wary of listings that only say 'jade' without origin or treatment details.",
      "2. Check sizing vs. your body: measure your inner wrist diameter for bracelets; check diameter and thickness for pendants. All dimensions on our site are in mm — no vague 'one size fits all' descriptions.",
      "3. Check certification and traceability: every item comes with a source code you can verify under 'Support / Traceability.' Keep quality inspection samples for cross-border orders.",
      "4. Check after-sales terms: 7-day no-questions-asked returns and 15-day exchanges for quality issues. Custom pieces and obvious wear-and-tear are excluded.",
      "5. Check real photos: prioritize listings with actual product photos and 3D previews. We add model-viewer wherever feasible to avoid the gap between retouched images and reality.",
    ],
  },
];

/** 通过 slug 列表取商品（保留顺序 + 去掉缺失） */
export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}

/** 根据商品找相关文章：relatedProductSlugs 包含该商品 */
export function getArticlesForProduct(slug: string): Article[] {
  return articles.filter((a) => a.relatedProductSlugs.includes(slug));
}

/** 同类目同寓意的其他商品（不含自身），不足再用同类目补齐，最多 `limit` 条 */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const base = products.find((p) => p.slug === slug);
  if (!base) return [];
  const sameMeaning = products.filter((p) => p.slug !== slug && p.meaning === base.meaning);
  const sameCategory = products.filter((p) => p.slug !== slug && p.category === base.category);
  const seen = new Set<string>();
  const picked: Product[] = [];
  for (const p of [...sameMeaning, ...sameCategory, ...products]) {
    if (p.slug === slug || seen.has(p.slug)) continue;
    seen.add(p.slug);
    picked.push(p);
    if (picked.length >= limit) break;
  }
  return picked;
}

export const faqItems = [
  {
    question: "支持几天无理由退换？",
    answer:
      "支持 7 天无理由退货与 15 天质量问题换货。定制款和明显佩戴损耗商品不在无理由范围内。",
  },
  {
    question: "跨境物流多久送达？",
    answer:
      "国内现货通常 48 小时内发货；东南亚地区标准物流 5-10 个工作日，节假日可能延后。",
  },
  {
    question: "如何验证真伪与证书？",
    answer:
      "每件商品配有溯源编号，可在网站溯源页输入编号核验材质说明、质检信息和证书样例。",
  },
  {
    question: "日常保养怎么做？",
    answer:
      "避免高温暴晒与化学清洁剂接触，建议每周使用柔软布料擦拭，并放入独立收纳袋。",
  },
];

export const scenarios = [
  { key: "gift", labelKey: "gift" },
  { key: "daily", labelKey: "daily" },
  { key: "collection", labelKey: "collection" },
] as const;

export const priceBands = [
  { key: "low", label: "¥0-¥499", match: (p: Product) => p.priceCny < 500 },
  { key: "mid", label: "¥500-¥999", match: (p: Product) => p.priceCny >= 500 && p.priceCny < 1000 },
  { key: "high", label: "¥1000+", match: (p: Product) => p.priceCny >= 1000 },
] as const;

export const meaningOptions: { key: Product["meaning"]; labelKey: string }[] = [
  { key: "peace", labelKey: "peace" },
  { key: "career", labelKey: "career" },
  { key: "love", labelKey: "love" },
  { key: "health", labelKey: "health" },
];

export const sortOptions = [
  { key: "default", labelKey: "sortDefault" },
  { key: "price-asc", labelKey: "sortPriceAsc" },
  { key: "price-desc", labelKey: "sortPriceDesc" },
  { key: "name", labelKey: "sortName" },
] as const;

export type SortKey = (typeof sortOptions)[number]["key"];

export const trustBadges = ["每件可溯源", "7/15天售后保障", "跨境时效透明"];
