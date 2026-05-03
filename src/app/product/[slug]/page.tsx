import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, meaningLabel } from "@/lib/site-data";
import { ProductDetailBody } from "./product-detail-body";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: ProductDetailProps): Promise<Metadata> {
  const { slug } = await props.params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "商品未找到" };
  return {
    title: product.name,
    description: `${product.tagline}｜材质：${product.material}｜寓意：${meaningLabel[product.meaning]}`,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage(props: ProductDetailProps) {
  const { slug } = await props.params;
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }
  return <ProductDetailBody slug={slug} />;
}
