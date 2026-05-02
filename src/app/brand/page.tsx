import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { TrackLink } from "@/components/track-link";

export const metadata: Metadata = {
  title: "关于品牌",
  description:
    "玉汝于成以「做年轻人买得起的好玉」为核心理念，用现代设计与跨境电商方式传递中国玉文化。",
};

export default function BrandPage() {
  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: "首页" }, { label: "关于品牌" }]} />
      <h1 className="section-title mt-3">关于品牌</h1>
      <p className="section-subtitle">
        玉汝于成致力于把中国玉文化以年轻化设计与跨境电商方式带到全球消费者面前。
      </p>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5">
        <h2 className="text-xl font-semibold text-zinc-900">品牌定位</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-700">
          我们以「做年轻人买得起的好玉」为核心理念，围绕送礼、日常和轻收藏三大消费场景进行产品设计。
          通过现代化视觉表达与跨境社媒传播，降低传统玉石品类的理解门槛和决策门槛。
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h3 className="text-lg font-semibold text-zinc-900">文化与非遗价值</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-700">
            通过内容化表达，讲清玉石寓意、雕刻工艺与文化来源，帮助海外消费者理解中国玉文化。
            项目积极推动青年群体接触非遗工艺，促进传统文化当代表达。
          </p>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h3 className="text-lg font-semibold text-zinc-900">产业与就业价值</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-700">
            通过设计、内容、销售、履约协同，连接原料、加工、营销等环节，提升产业链数字化能力。
            同时与地方企业合作，带动相关岗位增长。
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-50">
        <h2 className="text-xl font-semibold">准备好开始选购了吗？</h2>
        <p className="mt-2 text-sm text-zinc-300">先从场景选品进入，再通过内容中心了解搭配与选购知识。</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackLink
            href="/shop"
            eventName="brand_to_shop"
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
          >
            去购买
          </TrackLink>
          <TrackLink
            href="/content"
            eventName="brand_to_content"
            className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            看内容
          </TrackLink>
        </div>
      </section>
    </div>
  );
}
