import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnalyticsScript } from "@/components/analytics-script";
import { CartProvider } from "@/lib/cart";
import { LocaleProvider } from "@/lib/locale";

/** 静态包本地预览默认与根目录「启动南玉网站」脚本端口一致 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:8787";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "玉汝于成 | 消费者入口",
    template: "%s | 玉汝于成",
  },
  description: "面向消费者的玉文化品牌站，支持选品、内容种草、3D 展示与售后服务。",
  applicationName: "玉汝于成",
  keywords: ["玉石", "玉饰", "南玉", "信宜", "3D 展示", "跨境电商"],
  authors: [{ name: "玉汝于成" }],
  openGraph: {
    title: "玉汝于成 | 做年轻人买得起的好玉",
    description: "场景选品、内容种草、3D 可旋转预览，连接中国玉文化与全球年轻用户。",
    locale: "zh_CN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-zinc-100 text-zinc-950">
        <LocaleProvider>
          <CartProvider>
            <AnalyticsScript />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
