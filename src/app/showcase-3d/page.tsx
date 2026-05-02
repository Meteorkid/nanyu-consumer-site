import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PhotoOrbit3D } from "@/components/photo-orbit-3d";
import { Product3dViewer } from "@/components/product-3d-viewer";
import { TrackLink } from "@/components/track-link";
import { getShowcase3dProducts, productUsesGlbViewer } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "3D 展示",
  description: "基于单张实物照片重建浮雕 GLB，通过 @google/model-viewer 在浏览器中旋转查看。",
};

export default function Showcase3DPage() {
  const showcase = getShowcase3dProducts();

  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: "首页" }, { label: "3D展示" }]} />
      <h1 className="section-title mt-3">3D展示</h1>
      <p className="section-subtitle">
        重点款（<code className="rounded bg-zinc-200 px-1">产品_18 / 产品_05 / 产品_28</code>
        ）已由脚本 <code className="rounded bg-zinc-200 px-1">scripts/build_relief_glb.py</code>{" "}
        基于单张实物照片重建为带纹理的浮雕 GLB，可直接拖拽旋转；其他款暂使用光影预览，待提供三维文件后替换同名{" "}
        <code className="rounded bg-zinc-200 px-1">public/models/*.glb</code> 即可。
      </p>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        {showcase.map((product) => (
          <article
            key={product.slug}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5"
          >
            <h2 className="text-lg font-semibold text-zinc-950">{product.name}</h2>
            <p className="mt-2 text-sm text-zinc-600">{product.tagline}</p>

            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              {productUsesGlbViewer(product) && product.modelGlb ? (
                <Product3dViewer
                  src={product.modelGlb}
                  poster={product.image}
                  alt={`${product.name} 3D`}
                  className="h-[320px] w-full rounded-xl bg-zinc-950"
                />
              ) : (
                <PhotoOrbit3D src={product.image} alt={product.name} />
              )}
            </div>

            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              {productUsesGlbViewer(product) && product.modelGlb
                ? "单图法线浮雕 GLB（示意沟通稿）；如需高精度，可用真实三维扫描 / 建模替换同名文件。"
                : "光影预览（未配置 GLB）；上传 GLB 后可切换为 model-viewer。"}
            </p>

            <TrackLink
              href={`/product/${product.slug}`}
              eventName="jump_from_3d"
              eventPayload={{ product_slug: product.slug }}
              className="mt-4 inline-flex rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              查看商品详情
            </TrackLink>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-950">AR升级路线</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
          <li>第1阶段：3D 旋转（光影预览 + 可选 GLB / model-viewer）</li>
          <li>第2阶段：支持摄像头权限的 AR 试戴</li>
          <li>第3阶段：试戴数据回流，优化选品与推荐</li>
        </ul>
      </section>
    </div>
  );
}
