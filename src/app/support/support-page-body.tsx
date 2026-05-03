"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { ContactForm } from "@/components/contact-form";
import { useTranslations, useTranslationsArray } from "@/lib/locale";

export function SupportPageBody() {
  const t = useTranslations("support");
  const tArr = useTranslationsArray("support");
  const tCommon = useTranslations("common");
  const faqQuestions = tArr("faqQuestions");
  const faqAnswers = tArr("faqAnswers");

  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: tCommon("home") }, { label: t("title") }]} />
      <h1 className="section-title mt-3">{t("title")}</h1>
      <p className="section-subtitle">{t("description")}</p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h2 className="text-lg font-semibold text-zinc-900">{t("returnPolicy")}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            {tArr("returnPolicyItems").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h2 className="text-lg font-semibold text-zinc-900">{t("shipping")}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            {tArr("shippingItems").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h2 className="text-lg font-semibold text-zinc-900">{t("faq")}</h2>
          <div className="mt-4 space-y-3">
            {faqQuestions.map((question, i) => (
              <details
                key={i}
                className="group rounded-xl bg-zinc-50 p-4 transition-colors open:bg-white open:ring-1 open:ring-zinc-200"
              >
                <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:hidden">
                  <span className="mr-2 text-amber-600 group-open:rotate-90 inline-block transition-transform">
                    ›
                  </span>
                  {question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-zinc-700">{faqAnswers[i]}</p>
              </details>
            ))}
          </div>
        </article>

        <article>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">{t("contactUs")}</h2>
          <ContactForm />
        </article>
      </section>
    </div>
  );
}
