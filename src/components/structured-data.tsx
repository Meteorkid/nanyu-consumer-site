import { Product, Article } from "@/lib/site-data";

type StructuredDataProps = {
  type: "organization" | "product" | "article" | "website";
  data?: Product | Article;
};

/**
 * 结构化数据组件
 * 用于生成 JSON-LD 格式的结构化数据，提升 SEO 效果
 */
export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, any> = {};

  switch (type) {
    case "organization":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "玉汝于成",
        url: "https://yurucheng.com",
        logo: "https://yurucheng.com/images/logo.png",
        description: "面向消费者的玉文化品牌站，支持选品、内容种草、3D 展示与售后服务。",
        sameAs: [
          "https://www.facebook.com/yurucheng",
          "https://www.instagram.com/yurucheng",
          "https://twitter.com/yurucheng",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+86-xxx-xxxx-xxxx",
          contactType: "customer service",
          availableLanguage: ["Chinese", "English"],
        },
      };
      break;

    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "玉汝于成",
        url: "https://yurucheng.com",
        description: "做年轻人买得起的好玉，连接中国文化与全球消费者。",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://yurucheng.com/shop?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      };
      break;

    case "product":
      if (data && "priceCny" in data) {
        const product = data as Product;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.tagline,
          image: `https://yurucheng.com${product.image}`,
          sku: product.slug,
          brand: {
            "@type": "Brand",
            name: "玉汝于成",
          },
          offers: {
            "@type": "Offer",
            url: `https://yurucheng.com/product/${product.slug}`,
            priceCurrency: "CNY",
            price: product.priceCny,
            priceValidUntil: new Date(
              Date.now() + 365 * 24 * 60 * 60 * 1000
            ).toISOString().split("T")[0],
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "126",
          },
        };
      }
      break;

    case "article":
      if (data && "body" in data) {
        const article = data as Article;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          image: `https://yurucheng.com${article.cover}`,
          author: {
            "@type": "Organization",
            name: "玉汝于成",
          },
          publisher: {
            "@type": "Organization",
            name: "玉汝于成",
            logo: {
              "@type": "ImageObject",
              url: "https://yurucheng.com/images/logo.png",
            },
          },
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://yurucheng.com/content/${article.slug}`,
          },
        };
      }
      break;
  }

  if (Object.keys(structuredData).length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/**
 * 面包屑结构化数据
 */
export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/**
 * FAQ 结构化数据
 */
export function FAQStructuredData({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
