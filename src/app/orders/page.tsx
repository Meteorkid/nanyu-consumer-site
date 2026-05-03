"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { useOrders, statusLabels, statusColors, Order } from "@/lib/orders";

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  const { cancelOrder } = useOrders();
  const canCancel = order.status === "pending";

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-sm text-zinc-500 hover:text-zinc-700">
        ← 返回订单列表
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">订单详情</h2>
          <p className="mt-1 font-mono text-sm text-zinc-500">{order.id}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[order.status]}`}>
          {statusLabels[order.status]}
        </span>
      </div>

      {/* 订单商品 */}
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-900">订单商品</h3>
        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.slug} className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1">
                <Link
                  href={`/product/${item.slug}`}
                  className="text-sm font-medium text-zinc-900 hover:text-amber-700"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-zinc-500">x{item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-900">
                ¥{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-zinc-200 pt-4">
          <div className="flex justify-between text-lg font-semibold text-zinc-900">
            <span>订单总额</span>
            <span>¥{order.total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* 收货信息 */}
      <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-900">收货信息</h3>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">收件人</span>
            <span className="text-zinc-900">{order.address.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">联系电话</span>
            <span className="text-zinc-900">{order.address.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">收货地址</span>
            <span className="text-right text-zinc-900">
              {order.address.country} {order.address.city} {order.address.address}
              {order.address.postalCode ? ` (${order.address.postalCode})` : ""}
            </span>
          </div>
        </div>
      </section>

      {/* 支付信息 */}
      <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-900">支付信息</h3>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">支付方式</span>
            <span className="text-zinc-900">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">下单时间</span>
            <span className="text-zinc-900">
              {new Date(order.createdAt).toLocaleString("zh-CN")}
            </span>
          </div>
        </div>
      </section>

      {/* 操作按钮 */}
      <div className="mt-6 flex gap-3">
        {canCancel ? (
          <button
            onClick={() => cancelOrder(order.id)}
            className="rounded-full border border-red-300 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            取消订单
          </button>
        ) : null}
        <Link
          href="/shop"
          className="rounded-full bg-amber-600 px-5 py-2 text-sm font-medium text-white hover:bg-amber-700"
        >
          继续购物
        </Link>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!user) {
    return (
      <div className="section-shell">
        <div className="mx-auto max-w-md text-center">
          <h1 className="section-title">我的订单</h1>
          <p className="mt-4 text-zinc-600">请先登录查看订单</p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex rounded-full bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700"
          >
            去登录
          </Link>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter((o) => !o.userId || o.userId === user.id);

  if (selectedOrder) {
    return (
      <div className="section-shell">
        <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
      </div>
    );
  }

  if (userOrders.length === 0) {
    return (
      <div className="section-shell">
        <h1 className="section-title">我的订单</h1>
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <svg className="h-16 w-16 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900">暂无订单</h2>
          <p className="mt-2 text-sm text-zinc-600">快去选购心仪的商品吧</p>
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

  return (
    <div className="section-shell">
      <h1 className="section-title">我的订单</h1>
      <p className="section-subtitle">共 {userOrders.length} 个订单</p>

      <div className="mt-6 space-y-4">
        {userOrders.map((order) => (
          <button
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="block w-full rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm hover:border-amber-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">订单号</p>
                <p className="font-mono text-sm font-medium text-zinc-900">{order.id}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                {statusLabels[order.status]}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.slug}
                    className="relative h-12 w-12 overflow-hidden rounded-lg border-2 border-white bg-zinc-100"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-600">
                  {order.items.map((i) => i.name).join("、")}
                </p>
                <p className="text-xs text-zinc-400">
                  {order.items.length} 件商品
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-zinc-900">¥{order.total.toFixed(2)}</p>
                <p className="text-xs text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString("zh-CN")}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
