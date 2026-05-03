"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/tracking";
import { useTranslations } from "@/lib/locale";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState<"presale" | "aftersale" | "collab">("presale");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError(t("nameRequired"));
    if (!contact.trim()) return setError(t("contactRequired"));
    if (message.trim().length < 5) return setError(t("messageMinLength"));

    setStatus("submitting");
    try {
      trackEvent("contact_submit", {
        name_len: name.trim().length,
        topic,
        message_len: message.trim().length,
      });
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      setName("");
      setContact("");
      setMessage("");
    } catch {
      setStatus("error");
      setError(t("submitFailed"));
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
        <p className="font-semibold">{t("submitSuccess")}</p>
        <p className="mt-1">{t("submitSuccessDesc")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 rounded-full border border-emerald-300 px-3 py-1 text-xs font-medium text-emerald-800 hover:bg-white"
        >
          {t("askAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("name")}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
            placeholder={t("namePlaceholder")}
          />
        </Field>
        <Field label={t("contactInfo")}>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
            placeholder={t("contactPlaceholder")}
          />
        </Field>
      </div>

      <Field label={t("inquiryType")}>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { key: "presale", label: t("presale") },
            { key: "aftersale", label: t("aftersale") },
            { key: "collab", label: t("collab") },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setTopic(opt.key as typeof topic)}
              className={`rounded-full px-3 py-1 ${
                topic === opt.key
                  ? "bg-amber-500 text-zinc-950"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label={t("problemDescription")}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
          placeholder={t("messagePlaceholder")}
        />
      </Field>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          {t("privacyNotice")}
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? t("submitting") : t("submitInquiry")}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-medium text-zinc-600">{label}</span>
      {children}
    </label>
  );
}
