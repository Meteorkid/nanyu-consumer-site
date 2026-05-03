"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  if (!user) {
    return (
      <div className="section-shell">
        <div className="mx-auto max-w-md text-center">
          <h1 className="section-title">个人中心</h1>
          <p className="mt-4 text-zinc-600">请先登录查看个人信息</p>
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

  const handleEdit = () => {
    setForm({ name: user.name, phone: user.phone || "" });
    setEditing(true);
  };

  const handleSave = () => {
    updateProfile({
      name: form.name,
      phone: form.phone || undefined,
    });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="section-shell">
      <div className="mx-auto max-w-2xl">
        <h1 className="section-title">个人中心</h1>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.5fr]">
          {/* 用户头像和基本信息 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-3xl font-bold text-amber-700">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-zinc-900">{user.name}</h2>
            <p className="mt-1 text-sm text-zinc-500">{user.email}</p>
            <p className="mt-1 text-xs text-zinc-400">
              注册于 {new Date(user.createdAt).toLocaleDateString("zh-CN")}
            </p>

            <div className="mt-6 space-y-2">
              <Link
                href="/orders"
                className="block w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:border-amber-300 hover:text-amber-700"
              >
                我的订单
              </Link>
              <Link
                href="/favorites"
                className="block w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:border-amber-300 hover:text-amber-700"
              >
                我的收藏
              </Link>
              <Link
                href="/cart"
                className="block w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:border-amber-300 hover:text-amber-700"
              >
                购物车
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              退出登录
            </button>
          </div>

          {/* 个人信息详情 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900">个人信息</h3>
              {!editing ? (
                <button
                  onClick={handleEdit}
                  className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700 hover:border-amber-300 hover:text-amber-700"
                >
                  编辑
                </button>
              ) : null}
            </div>

            {editing ? (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700">姓名</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">手机号</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="flex justify-between border-b border-zinc-100 py-2">
                  <span className="text-sm text-zinc-500">姓名</span>
                  <span className="text-sm text-zinc-900">{user.name}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-100 py-2">
                  <span className="text-sm text-zinc-500">邮箱</span>
                  <span className="text-sm text-zinc-900">{user.email}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-100 py-2">
                  <span className="text-sm text-zinc-500">手机号</span>
                  <span className="text-sm text-zinc-900">{user.phone || "未设置"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-zinc-500">用户 ID</span>
                  <span className="text-xs text-zinc-500">{user.id}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
