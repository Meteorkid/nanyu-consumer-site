"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/lib/locale";
import { useCart, useCartActions } from "@/lib/cart";
import { useOrders } from "@/lib/orders";
import { useAuth } from "@/lib/auth";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const { state } = useCart();
  const { clearCart } = useCartActions();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"creditCard" | "alipay" | "wechatPay">("creditCard");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "中国",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentLabels: Record<string, string> = {
      creditCard: "信用卡",
      alipay: "支付宝",
      wechatPay: "微信支付",
    };

    const order = createOrder({
      items: state.items,
      total: state.total,
      paymentMethod: paymentLabels[paymentMethod] || paymentMethod,
      address: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      userId: user?.id,
    });

    setOrderId(order.id);
    clearCart();
  };

  if (state.items.length === 0 && !orderId) {
    return (
      <div className="section-shell">
        <h1 className="section-title">{t("title")}</h1>
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-12 text-center">
          <p className="text-zinc-600">购物车为空，请先添加商品</p>
          <Link
            href="/shop"
            className="mt-6 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700"
          >
            去选购
          </Link>
        </div>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="section-shell">
        <div className="mx-auto max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-zinc-900">{t("orderPlaced")}</h1>
          <p className="mt-2 text-sm text-zinc-600">{t("orderPlacedDescription")}</p>
          <p className="mt-2 text-sm text-zinc-500">
            订单号：<span className="font-mono font-medium text-zinc-900">{orderId}</span>
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href={`/orders/${orderId}`}
              className="rounded-full bg-amber-600 px-5 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              查看订单
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              继续购物
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-shell">
      <h1 className="section-title">{t("title")}</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">{t("shippingAddress")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-zinc-700">收件人</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">联系电话</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-zinc-700">{t("address")}</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">{t("city")}</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">{t("postalCode")}</label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">{t("country")}</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="中国">中国</option>
                  <option value="新加坡">新加坡</option>
                  <option value="马来西亚">马来西亚</option>
                  <option value="泰国">泰国</option>
                  <option value="越南">越南</option>
                  <option value="印度尼西亚">印度尼西亚</option>
                  <option value="菲律宾">菲律宾</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">{t("paymentMethod")}</h2>
            <div className="mt-4 space-y-3">
              {(["creditCard", "alipay", "wechatPay"] as const).map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    paymentMethod === method
                      ? "border-amber-500 bg-amber-50"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-zinc-900">{t(method)}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">{t("orderSummary")}</h2>

          <div className="mt-4 space-y-3">
            {state.items.map((item) => (
              <div key={item.slug} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500">x{item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-zinc-900">
                  ¥{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-zinc-200 pt-4">
            <div className="flex justify-between text-sm text-zinc-600">
              <span>商品小计</span>
              <span>¥{state.total.toFixed(2)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-zinc-600">
              <span>运费</span>
              <span className="text-green-600">免运费</span>
            </div>
            <div className="mt-3 border-t border-zinc-200 pt-3">
              <div className="flex justify-between text-lg font-semibold text-zinc-900">
                <span>应付金额</span>
                <span>¥{state.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-amber-600 py-3 text-sm font-medium text-white hover:bg-amber-700"
          >
            {t("placeOrder")}
          </button>
        </div>
      </form>
    </div>
  );
}
