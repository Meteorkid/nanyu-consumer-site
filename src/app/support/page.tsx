import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { ContactForm } from "@/components/contact-form";
import { faqItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "售后保障",
  description: "查看退换、物流、溯源、保养等常见问题；或直接通过咨询表单联系客服。",
};

export default function SupportPage() {
  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: "首页" }, { label: "售后保障" }]} />
      <h1 className="section-title mt-3">售后保障</h1>
      <p className="section-subtitle">
        用最常见问题直达核心政策，降低购买疑虑。正式上线前请替换为最终法务口径。
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h2 className="text-lg font-semibold text-zinc-900">退换政策</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            <li>7 天无理由退货（不影响二次销售）</li>
            <li>15 天质量问题换货</li>
            <li>跨境订单按收货地政策执行补充条款</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h2 className="text-lg font-semibold text-zinc-900">物流与时效</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            <li>国内现货 48 小时内发货</li>
            <li>东南亚地区标准物流 5–10 个工作日</li>
            <li>物流延误将通过站内通知与客服同步</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h2 className="text-lg font-semibold text-zinc-900">常见问题</h2>
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl bg-zinc-50 p-4 transition-colors open:bg-white open:ring-1 open:ring-zinc-200"
              >
                <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:hidden">
                  <span className="mr-2 text-amber-600 group-open:rotate-90 inline-block transition-transform">
                    ›
                  </span>
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-zinc-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </article>

        <article>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">联系客服</h2>
          <ContactForm />
        </article>
      </section>
    </div>
  );
}
