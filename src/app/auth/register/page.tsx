"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    if (form.password.length < 6) {
      setError("密码长度至少 6 位");
      return;
    }

    setLoading(true);

    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone || undefined,
    });

    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "注册失败");
    }

    setLoading(false);
  };

  return (
    <div className="section-shell">
      <div className="mx-auto max-w-md">
        <h1 className="section-title text-center">注册</h1>
        <p className="section-subtitle text-center">
          创建账号，享受完整的购物体验
        </p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {error ? (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700">姓名</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="您的姓名"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">邮箱</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">手机号（选填）</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="13800138000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">密码</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="至少 6 位"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">确认密码</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="再次输入密码"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-amber-600 py-3 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
          >
            {loading ? "注册中..." : "注册"}
          </button>

          <p className="mt-4 text-center text-sm text-zinc-600">
            已有账号？{" "}
            <Link href="/auth/login" className="text-amber-700 hover:text-amber-800">
              登录
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
