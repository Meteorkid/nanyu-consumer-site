import catalog from "@/data/catalog.json";

export type Product = {
  slug: string;
  folderId: string;
  name: string;
  tagline: string;
  priceCny: number;
  category: "gift" | "daily" | "collection";
  meaning: "peace" | "career" | "love" | "health";
  material: string;
  size: string;
  weight: string;
  image: string;
  gallery: string[];
  highlights: string[];
  /**
   * 若 `preview3dMode === "glb"` 且路径有效，则用 model-viewer 加载。
   * 重点款默认 `photo-orbit`：主图透视摆动，避免占位 mesh 误判为故障。
   */
  modelGlb: string | null;
  /** `photo-orbit` | `glb` | 未设置 */
  preview3dMode?: "photo-orbit" | "glb" | null;
};

export type Article = {
  slug: string;
  title: string;
  category: "style" | "story" | "guide";
  summary: string;
  cover: string;
  /** 种草实拍视频（`public/videos/grass/`，由 `npm run grass:sync` 从「种草视频」目录生成） */
  grassVideoSrc?: string | null;
  relatedProductSlugs: string[];
  /** 段落数组（先用纯文本，后续可迁 CMS） */
  body: string[];
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

export const articleCategoryLabel: Record<Article["category"], string> = {
  style: "搭配教程",
  story: "用户故事",
  guide: "选购知识",
};

export const meaningLabel: Record<Product["meaning"], string> = {
  peace: "平安",
  career: "事业",
  love: "爱情",
  health: "健康",
};

export const categoryLabel: Record<Product["category"], string> = {
  gift: "送礼场景",
  daily: "日常通勤",
  collection: "轻收藏",
};

export const navItems = [
  { href: "/shop", label: "去购买" },
  { href: "/content", label: "看内容" },
  { href: "/showcase-3d", label: "3D展示" },
  { href: "/support", label: "售后保障" },
  { href: "/brand", label: "关于品牌" },
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
    category: "style",
    summary: "3 套简洁通勤搭配模板，帮助新用户第一时间戴出质感。",
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
  },
  {
    slug: "story-guide-1",
    title: "从信宜到海外：一块玉的旅程",
    category: "story",
    summary: "用图文讲清原料、设计、加工、发货全链路，让消费者更放心。",
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
  },
  {
    slug: "buying-guide-1",
    title: "第一次买玉，先看这 5 个避坑点",
    category: "guide",
    summary: "用通俗语言解释材质、尺寸、证书和售后，降低决策难度。",
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
  { key: "gift", label: "送礼场景" },
  { key: "daily", label: "日常通勤" },
  { key: "collection", label: "轻收藏" },
] as const;

export const priceBands = [
  { key: "low", label: "¥0-¥499", match: (p: Product) => p.priceCny < 500 },
  { key: "mid", label: "¥500-¥999", match: (p: Product) => p.priceCny >= 500 && p.priceCny < 1000 },
  { key: "high", label: "¥1000+", match: (p: Product) => p.priceCny >= 1000 },
] as const;

export const meaningOptions: { key: Product["meaning"]; label: string }[] = [
  { key: "peace", label: "平安" },
  { key: "career", label: "事业" },
  { key: "love", label: "爱情" },
  { key: "health", label: "健康" },
];

export const sortOptions = [
  { key: "default", label: "默认" },
  { key: "price-asc", label: "价格从低到高" },
  { key: "price-desc", label: "价格从高到低" },
  { key: "name", label: "名称" },
] as const;

export type SortKey = (typeof sortOptions)[number]["key"];

export const trustBadges = ["每件可溯源", "7/15天售后保障", "跨境时效透明"];
