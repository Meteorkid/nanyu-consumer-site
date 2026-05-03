"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(form.email, form.password);

    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "登录失败");
    }

    setLoading(false);
  };

  return (
    <div className="section-shell">
      <div className="mx-auto max-w-md">
        <h1 className="section-title text-center">登录</h1>
        <p className="section-subtitle text-center">
          登录后可查看订单、管理收货地址、收藏商品等
        </p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {error ? (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
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
              <label className="block text-sm font-medium text-zinc-700">密码</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="输入密码"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-amber-600 py-3 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
          >
            {loading ? "登录中..." : "登录"}
          </button>

          <p className="mt-4 text-center text-sm text-zinc-600">
            还没有账号？{" "}
            <Link href="/auth/register" className="text-amber-700 hover:text-amber-800">
              注册
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
